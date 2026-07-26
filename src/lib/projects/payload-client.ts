import config from "@payload-config";
import { getPayload } from "payload";

let payloadPromise: ReturnType<typeof getPayload> | undefined;

export const getProjectsPayload = () => {
  payloadPromise ??= getPayload({ config });
  return payloadPromise;
};
