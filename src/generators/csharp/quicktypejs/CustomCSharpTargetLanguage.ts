import {
  quicktype,
  InputData,
  JSONSchemaInput,
  CSharpTargetLanguage,
  cSharpOptions,
  CSharpRenderer,
  RenderContext,
  getOptionValues,
  Sourcelike,
  ClassType,
  Type,
  TypeAttributeKind,
  JSONSchema,
  Ref,
  JSONSchemaType,
  JSONSchemaAttributes,
  ClassProperty,
  Name
} from "quicktype-core";

export class CustomCSharpTargetLanguage extends CSharpTargetLanguage
{

  // "makeRenderer" instantiates our "GameCSharpRenderer".  "cSharpOptions" are the
  // values for the customization options for C#, and "getOptionValues" translates the
  // untyped string values to the typed values that the renderer likes.
  protected makeRenderer(renderContext: RenderContext, untypedOptionValues: { [name: string]: any }): CSharpRenderer {
    return new CustomCSharpRenderer(this, renderContext, getOptionValues(cSharpOptions, untypedOptionValues));
  }
}

class CustomCSharpRenderer extends CSharpRenderer {
}
