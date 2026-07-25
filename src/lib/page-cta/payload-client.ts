import config from "@payload-config";
import { getPayload } from "payload";

let payloadPromise: ReturnType<typeof getPayload> | undefined;

export const getPageCtaPayload = () => {
  payloadPromise ??= getPayload({ config });
  return payloadPromise;
};
