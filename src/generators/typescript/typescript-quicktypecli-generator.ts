import * as cp from "child_process";

// three steps (model), then writing to file (one or many)
export async function generateTypeScriptCode(): Promise<void> {
  const inFile = "./__tests__/assets/*.json";
  const outDir = "./__tests__/out/message-schema/generated/typescript/quicktype";
  const outFileName = "candidateprofile-external-events.ts";

  executeSystemCommand(`mkdir -p ${outDir}`);
  executeSystemCommand(`rm -rf ${outDir}/*`);
  executeSystemCommand(`
  quicktype 
  -s schema ${inFile} 
  -o ${outDir}/${outFileName} 
  --just-types 
  --acronym-style original 
  --nice-property-names 
  --explicit-unions 
  --prefer-types
  `);
}

function executeSystemCommand(command: string): void {
  cp.execSync(command.replace(/(\r\n|\n|\r)/gm, ""));
}
