import { globSync } from "glob";
let models = {};

const files = globSync("**/*.model.js");
for (const file of files) {
  const modelName = file.split(/[/,\\]/)[2].split(".")[0];
  let name = modelName.charAt(0).toUpperCase() + modelName.slice(1);
  models[name] = require(`./${file.split(/[/,\\]/)[2]}`);
}

export default models;
