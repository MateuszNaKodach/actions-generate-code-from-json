import { CodeGeneratorResult } from "./code-generator";
import { promises as fs } from "fs";
import { GeneratorParams } from "../../process-params";
import { executeSystemCommand } from "./command-executor";
import * as path from "path";
import { FileHelpers } from "@asyncapi/modelina";

export async function writeGeneratedCodeToDir({
                                                dir,
                                                file
                                              }: GeneratorParams["out"], generatorResult: CodeGeneratorResult): Promise<void> {
  executeSystemCommand(`mkdir -p ${dir}`);
  executeSystemCommand(`rm -rf ${dir}/*`);

  // await Promise.all(
  //   generatorResult.generated.map(async (generated) => {
  //     await fs.writeFile(`${dir}/${generated.name}`, generated.code, "utf8");
  //   })
  // );  

  if (file.mode === "one-file-per-schema") {
    await Promise.all(
      generatorResult.generated.map(async (generated) => {
        const generatedModels = generated.models.filter((outputModel) => {
          return outputModel.modelName !== "";
        });
        for (const outputModel of generatedModels) {
          const filePath = path.resolve(
            dir,
            `${outputModel.modelName.replaceAll("Minus", "")}.cs`
          );
          await FileHelpers.writerToFileSystem(
            outputModel.result,
            filePath,
            true
          );
        }
      })
    );
  } else if (file.mode === "one-file-for-all-schemas") {
    throw new Error("not implemented!!!");
  }
}
