import crypto from "crypto";

export function pseudonym(seed) {
  return crypto
    .createHash("sha256")
    .update(seed)
    .digest("hex")
    .slice(0, 12);
}
