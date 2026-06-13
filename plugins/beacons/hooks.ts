import { FastifyRequest, FastifyReply } from "fastify";

export async function transformBeaconConfigHook(_: FastifyRequest, __: FastifyReply, payload: unknown) {
  const body = typeof payload === "string" ? JSON.parse(payload) : payload;

  const transformed = {
    ...(body as any),
    startTimestamp: Math.round((body as any).startTimestamp / 1000),
    endTimestamp: Math.round((body as any).endTimestamp / 1000),
    currentDateTime: Math.round((body as any).currentDateTime / 1000),
  };

  return JSON.stringify(transformed);
}

export async function transformBeaconSubmitReadingHook(request: FastifyRequest) {
  const body = request.body as any;

  if (body.readingTimestamp) {
    body.readingTimestamp = body.readingTimestamp * 1000;
  }
}
