import { test } from "@jest/globals";
import { generate } from "../../src/process";

test("process csharp", async () => {
  await generate({
    in: {
      dir: "./__tests__/assets"
    },
    out: {
      dir: "./__tests__/out/message-schema/generated/csharp/process",
      language: "csharp",
      file: { mode: "one-file-per-schema" },
      mode: "just-files"
    }
  });
});

test("process typescript", async () => {
  await generate({
    in: {
      dir: "./__tests__/assets"
    },
    out: {
      dir: "./__tests__/out/message-schema/generated/typescript/process",
      language: "typescript",
      file: { mode: "one-file-per-schema" },
      mode: "just-files"
    }
  });
});
