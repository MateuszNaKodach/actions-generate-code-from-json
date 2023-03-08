import {expect, test} from '@jest/globals'
import { generateCSharpCode } from "../../../../src/generators/csharp/csharp-modelina-generator";

test('[Unit] Generator | CSharp | Modelina (AsyncAPI)', async () => {
  await generateCSharpCode()
})
