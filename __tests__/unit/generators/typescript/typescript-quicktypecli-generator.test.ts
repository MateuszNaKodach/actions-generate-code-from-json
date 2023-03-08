import {expect, test} from '@jest/globals'
import { generateTypeScriptCode } from "../../../../src/generators/typescript/typescript-quicktypecli-generator";


test('[Unit] Generator | TypeScript | Quicktype', async () => {
  await generateTypeScriptCode()
})
