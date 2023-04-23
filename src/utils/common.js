import crypto from "crypto";

const createHash = (data) => {
  return crypto.createHash("md5").update(data).digest("hex");
};

export default {
  createHash,
};
