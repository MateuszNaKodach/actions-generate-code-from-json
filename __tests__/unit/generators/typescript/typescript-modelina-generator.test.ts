import {expect, test} from '@jest/globals'
import { generateTypeScriptCode } from "../../../../src/generators/typescript/typescript-modelina-generator";


test('sample', async () => {
  await generateTypeScriptCode()
})

