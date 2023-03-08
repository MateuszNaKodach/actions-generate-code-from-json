import {expect, test} from '@jest/globals'
import { generateTypeScriptCode } from "../../../../src/generators/typescript/typescript-quicktypecli-generator";


test('sample', async () => {
  await generateTypeScriptCode()
})
