import {expect, test} from '@jest/globals'
import { generateTypeScriptCode } from "../../../../src/generators/typescript/typescript-modelina-generator";


test('[Unit] Generator | TypeScript | Modelina (AsyncAPI)', async () => {
  await generateTypeScriptCode()
})

