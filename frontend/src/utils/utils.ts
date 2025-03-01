import crypto from "crypto";

export function generateThreeDESKey() {
  return crypto.randomBytes(24).toString("hex");
}