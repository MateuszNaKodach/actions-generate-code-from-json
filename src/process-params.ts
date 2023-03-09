export type GeneratorParams = Readonly<{
  in: InProps
  out: OutProps
}>
export type InProps = Readonly<{
  dir: string
}>
export type OutProps = Readonly<
  {
    dir: string
    file:
      | {mode: 'one-file-per-schema'}
      | {mode: 'one-file-for-all-schemas'; name: string}
  } & (
    | {
        language: 'csharp'
        mode:
          | {type: 'just-files'}
          | {type: 'package'; name: string; version: string}
      }
    | {
        language: 'typescript'
        mode:
          | {type: 'just-files'}
          | {type: 'package'; name: string; version: string}
      }
  )
>
