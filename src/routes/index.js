import { glob } from "glob";

export const router = async (app, { container }) => {
  const files = await glob("**/*.router.js");
  for (const file of files) {
    require(`./${file.split(/[/,\\]/)[2]}`)(app, { container });
  }
};
