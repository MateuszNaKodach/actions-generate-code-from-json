import { GeneratorParams } from "../../process-params";
import { executeSystemCommand } from "../../generators/shared/command-executor";
import { promises as fs } from "fs";

export async function createNpmPackage(out: GeneratorParams["out"]): Promise<void> {
  if (out.mode.type !== "package") {
    return;
  }
  const outDir = out.dir;
  const packageName = out.mode.name;
  const packageVersion = out.mode.version;

  executeSystemCommand(`mkdir -p ${outDir}`);
  executeSystemCommand(`rm -rf ${outDir}/*`);
  executeSystemCommand(`cp -a src/bundlers/typescript/template/. ${outDir}`);

  const packageJsonpath = `${outDir}/package.json`;
  const packageJson = JSON.parse(await fs.readFile(packageJsonpath, 'utf8'));
  packageJson.name = packageName;
  packageJson.version = packageVersion;
  await fs.writeFile(packageJsonpath, JSON.stringify(packageJson));
}
