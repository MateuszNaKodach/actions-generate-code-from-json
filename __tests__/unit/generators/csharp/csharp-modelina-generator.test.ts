import {expect, test} from '@jest/globals'
import { generateCSharpCodeUsingModelina } from "../../../../src/generators/csharp/csharp-modelina-generator";

test('[Unit] Generator | CSharp | Modelina (AsyncAPI)', async () => {
  await generateCSharpCodeUsingModelina()
})
