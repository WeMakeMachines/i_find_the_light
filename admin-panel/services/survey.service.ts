import type { Survey } from "../../types/sqlite";
import type { CreateSurveyInput } from "../../types/types";

export async function deleteSurvey(surveyId: number): Promise<{ surveyId: number } | null> {
  const res = await fetch(`/surveys/${surveyId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    return { surveyId };
  }

  return null;
}

export async function updateSurvey(surveyId: number, surveyInput: CreateSurveyInput): Promise<Survey | null> {
  const res = await fetch(`/surveys/${surveyId}/update`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(surveyInput),
  });

  if (res.ok) {
    return await res.json();
  }

  return null;
}

export async function createSurvey(surveyInput: CreateSurveyInput): Promise<Survey | null> {
  const res = await fetch(`/surveys/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(surveyInput),
  });

  if (res.ok) {
    return await res.json();
  }

  return null;
}
