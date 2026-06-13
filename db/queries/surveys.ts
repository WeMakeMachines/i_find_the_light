import { Database } from "bun:sqlite";

import type { Survey } from "../../types/sqlite";
import { SurveyStatus } from "../../types/sqlite";
import type { CreateSurveyInput } from "../../types/types";

class DbSurveyQueryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DbSurveyQueryError";
  }
}

class DbSurveyNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DbSurveyNotFoundError";
  }
}

export function makeSurveysQueries(db: Database) {
  return {
    selectSurvey(surveyId: number): Survey {
      try {
        return db.prepare("SELECT * FROM surveys WHERE id = ?;").get(surveyId) as Survey;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error trying to SELECT surveys";
        throw new DbSurveyQueryError(message);
      }
    },

    selectAllSurveys(): Survey[] {
      try {
        return db.prepare("SELECT * FROM surveys ORDER BY id ASC;").all() as Survey[];
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error trying to SELECT surveys";
        throw new DbSurveyQueryError(message);
      }
    },

    selectActiveSurvey(): Survey | null {
      try {
        return db.prepare("SELECT * FROM surveys WHERE status = 'active';").get() as Survey | null;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error trying to SELECT a survey";
        throw new DbSurveyQueryError(message);
      }
    },

    checkSurveyIsNotArchived(surveyId: number): boolean | null {
      try {
        const result = db.prepare("SELECT status FROM surveys WHERE id = ?").get(surveyId) as Pick<
          Survey,
          "status"
        > | null;

        if (!result) return null;

        return result.status !== SurveyStatus.ARCHIVED;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error trying to SELECT a survey";
        throw new DbSurveyQueryError(message);
      }
    },

    updateSurvey(surveyId: number, surveyInput: Partial<CreateSurveyInput>) {
      const createSurveyInputNulled = {
        startTimestamp: surveyInput.startTimestamp || null,
        endTimestamp: surveyInput.endTimestamp || null,
        description: surveyInput.description || null,
        pollIntervalSeconds: surveyInput.pollIntervalSeconds || null,
      };

      try {
        const updatedSurvey = db
          .prepare(
            `
            UPDATE surveys
            SET
              startTimestamp = COALESCE($startTimestamp, startTimestamp),
              endTimestamp = COALESCE($endTimestamp, endTimestamp),
              pollIntervalSeconds = COALESCE($pollIntervalSeconds, pollIntervalSeconds),
              description = COALESCE($description, description)
            WHERE id = $surveyId
            RETURNING *;`,
          )
          .get({
            $surveyId: surveyId,
            $startTimestamp: createSurveyInputNulled.startTimestamp,
            $endTimestamp: createSurveyInputNulled.endTimestamp,
            $description: createSurveyInputNulled.description,
            $pollIntervalSeconds: createSurveyInputNulled.pollIntervalSeconds,
          });

        if (!updatedSurvey) {
          throw new DbSurveyNotFoundError(String(surveyId));
        }

        return updatedSurvey;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error trying to UPDATE survey table";

        throw new DbSurveyQueryError(message);
      }
    },

    updateSurveyStatus(surveyId: number, status: SurveyStatus): Survey {
      try {
        db.prepare(
          `
          UPDATE surveys
          SET status = ?
          WHERE id = ?
            AND status != 'archived';
        `,
        ).run(status, surveyId);

        const updatedSurvey = db.prepare("SELECT * FROM surveys WHERE id = ?;").get(surveyId);

        if (!updatedSurvey) {
          throw new DbSurveyNotFoundError(String(surveyId));
        }

        return updatedSurvey as Survey;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error trying to UPDATE survey table";

        throw new DbSurveyQueryError(message);
      }
    },

    insertSurvey(survey: CreateSurveyInput) {
      try {
        const input: CreateSurveyInput = {
          ...survey,
        };

        if (typeof input.description === null) {
          delete input.description;
        }

        if (typeof input.pollIntervalSeconds === null) {
          delete input.pollIntervalSeconds;
        }

        const columns = Object.keys(input);
        const values = Object.values(input);

        const sql = `
          INSERT INTO surveys (${columns.join(", ")})
          VALUES (${values.map(() => "?").join(", ")})
          RETURNING *;
        `;

        return db.query(sql).get(...values);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error trying to UPDATE survey table";
        throw new DbSurveyQueryError(message);
      }
    },

    deleteAllSurveys(): number {
      try {
        const result = db.prepare("DELETE FROM surveys;").run();
        db.prepare("DELETE FROM sqlite_sequence WHERE name = 'surveys';").run(); // reset auto-increment

        return result.changes;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error trying to DELETE survey table";
        throw new DbSurveyQueryError(message);
      }
    },

    deleteSurvey(surveyId: number): number {
      try {
        const result = db.prepare("DELETE FROM surveys WHERE id = ?;").run(surveyId);

        return result.changes;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error trying to DELETE survey record";
        throw new DbSurveyQueryError(message);
      }
    },
  };
}
