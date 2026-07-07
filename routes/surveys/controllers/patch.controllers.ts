import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import * as fs from "node:fs";
import path from "node:path";

import { surveyService } from "../../../services";
import type { CreateSurveyInput } from "../../../types/types";

export const patch = {
  setSurveyActiveState,
  setSurveyArchiveState,
  setSurveyDraftState,
  updateSurvey,
  uploadSurveyMap,
};

class InvalidSurveyId extends Error {}
class UnsupportedMediaType extends Error {}

function setSurveyActiveState(
  request: FastifyRequest<{ Params: { surveyId: string }; Body: Partial<CreateSurveyInput> }>,
  reply: FastifyReply,
) {
  try {
    const surveyId = Number(request.params.surveyId);

    if (!request.params.surveyId || isNaN(surveyId)) throw new InvalidSurveyId("Invalid survey id provided");

    surveyService.setSurveyActiveState(surveyId);

    return { message: `Successfully activated ${surveyId}` };
  } catch (error) {
    if (error instanceof InvalidSurveyId) {
      reply.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
      return { error: error.message };
    } else {
      return { error: "Server error" };
    }
  }
}

function setSurveyArchiveState(request: FastifyRequest<{ Params: { surveyId: string } }>, reply: FastifyReply) {
  try {
    const surveyId = Number(request.params.surveyId);

    if (!request.params.surveyId || isNaN(surveyId)) throw new InvalidSurveyId("Invalid survey id provided");

    surveyService.setSurveyArchiveState(surveyId);

    return { message: `Successfully archived ${surveyId}` };
  } catch (error) {
    if (error instanceof InvalidSurveyId) {
      reply.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
      return { error: error.message };
    } else {
      return { error: "Server error" };
    }
  }
}

function setSurveyDraftState(request: FastifyRequest<{ Params: { surveyId: string } }>, reply: FastifyReply) {
  try {
    const surveyId = Number(request.params.surveyId);

    if (!request.params.surveyId || isNaN(surveyId)) throw new InvalidSurveyId("Invalid survey id provided");

    surveyService.setSurveyDraftState(surveyId);

    return { message: `Successfully drafted ${surveyId}` };
  } catch (error) {
    if (error instanceof InvalidSurveyId) {
      reply.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
      return { error: error.message };
    } else {
      return { error: "Server error" };
    }
  }
}

function updateSurvey(
  request: FastifyRequest<{ Params: { surveyId: string }; Body: Partial<CreateSurveyInput> }>,
  reply: FastifyReply,
) {
  try {
    const surveyId = Number(request.params.surveyId);
    const surveyInput = { ...request.body };

    if (!request.params.surveyId || isNaN(surveyId)) throw new InvalidSurveyId("Invalid survey id provided");

    return surveyService.updateSurvey(surveyId, surveyInput);
  } catch (error) {
    if (error instanceof InvalidSurveyId) {
      reply.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
      return { error: error.message };
    } else {
      return { error: "Server error" };
    }
  }
}

async function uploadSurveyMap(request: FastifyRequest<{ Params: { surveyId: string } }>, reply: FastifyReply) {
  try {
    const data = await request.file();

    if (!data) throw new Error("No file");

    const allowedMimeTypes = new Set(["image/png", "image/jpeg"]);

    if (!allowedMimeTypes.has(data.mimetype)) {
      throw new UnsupportedMediaType("File must be image/png or image/jpeg");
    }

    const buffer = await data.toBuffer();
    const uploadFolder = process.env.MAP_UPLOAD_FOLDER || "./maps";
    const folderPath = `${uploadFolder}/${request.params.surveyId}`;

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const extension = path.extname(data.filename);
    const newFilename = `${crypto.randomUUID()}${extension}`;
    const filePath = `${folderPath}/${newFilename}`;

    Bun.write(filePath, buffer);

    return surveyService.updateSurveyMapPath(Number(request.params.surveyId), filePath);
  } catch (error) {
    if (error instanceof Error && (error as Error & { code?: string }).code === "FST_REQ_FILE_TOO_LARGE") {
      reply.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
      return { error: error.message };
    }
    if (error instanceof InvalidSurveyId) {
      reply.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
      return { error: error.message };
    }
    if (error instanceof UnsupportedMediaType) {
      reply.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
      return { error: error.message };
    } else {
      console.log(error);
      reply.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
      return { error: "Server error" };
    }
  }
}
