import { GeneratorParams } from "../../process-params";
import { executeSystemCommand } from "../../generators/shared/command-executor";

export async function createDotNetPackage(out: GeneratorParams["out"]): Promise<void> {
  if (out.mode.type !== "package") {
    return;
  }
  const outDir = out.dir;
  const classlibName = out.mode.name;
  
  executeSystemCommand(`mkdir -p ${outDir}`);
  executeSystemCommand(`rm -rf ${outDir}/*`);
  executeSystemCommand(`dotnet new classlib -o ${outDir} -n ${classlibName} --no-restore`);
  executeSystemCommand(`rm ${outDir}/Class1.cs`);
}
