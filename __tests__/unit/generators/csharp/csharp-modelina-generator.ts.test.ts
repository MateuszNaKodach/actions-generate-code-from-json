import {expect, test} from '@jest/globals'
import { generateCSharpCode } from "../../../../src/generators/csharp/csharp-modelina-generator";

test('sample2', async () => {
  await generateCSharpCode()
})
