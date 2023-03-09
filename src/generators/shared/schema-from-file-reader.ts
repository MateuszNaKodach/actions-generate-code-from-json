import { GeneratorParams } from "../../process-params";
import { promises as fs } from "fs";

export async function readJsonSchemasFromDir({ dir }: GeneratorParams["in"]): Promise<{ name: string, content: string }[]> {
  const inputDirJsonFilesNames = (await fs.readdir(dir))
    .filter((file) => file.includes(".json"));
  return await Promise.all(
    inputDirJsonFilesNames
      .map(async fileName => ({
        name: fileName,
        content: JSON.parse((await fs.readFile(`${dir}/${fileName}`, "utf8")))
      }))
  );
}
