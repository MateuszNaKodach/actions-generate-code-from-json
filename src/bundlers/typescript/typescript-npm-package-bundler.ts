import { GeneratorParams } from "../../process-params";
import { executeSystemCommand } from "../../generators/shared/command-executor";

export async function createNpmPackage(out: GeneratorParams["out"]): Promise<void> {
  if (out.mode.type !== "package") {
    return;
  }
  const outDir = out.dir;
  const packageName = out.mode.name;

  executeSystemCommand(`mkdir -p ${outDir}`);
  executeSystemCommand(`rm -rf ${outDir}/*`);
  executeSystemCommand(`npm init -y`);
  executeSystemCommand(`npm install --save-dev typescript`);
  executeSystemCommand(`npx tsc --init`);
}
