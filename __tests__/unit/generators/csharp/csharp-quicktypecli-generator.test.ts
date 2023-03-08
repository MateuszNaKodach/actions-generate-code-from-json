import {expect, test} from '@jest/globals'
import { generateCSharpCode } from "../../../../src/generators/csharp/csharp-quicktypecli-generator";

test('[Unit] Generator | CSharp | QuickType', async () => {
  await generateCSharpCode()
})
