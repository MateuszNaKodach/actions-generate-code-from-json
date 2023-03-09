import {expect, test} from '@jest/globals'
import { executeSystemCommand } from "../../../../src/generators/shared/command-executor";


test('[Unit] Generator | TypeScript | Quicktype', async () => {
  await generateTypeScriptCode()
})

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
  --no-combine-classes
  `);
}
