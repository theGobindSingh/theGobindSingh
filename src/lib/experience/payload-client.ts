import config from "@payload-config";
import { getPayload } from "payload";

let payloadPromise: ReturnType<typeof getPayload> | undefined;

export const getExperiencePayload = () => {
  payloadPromise ??= getPayload({ config });
  return payloadPromise;
};
