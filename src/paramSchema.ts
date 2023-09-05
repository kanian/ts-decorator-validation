import "reflect-metadata";
import { Schema } from "joi";
export const parameterSchemaMetadataKey = Symbol("parameterSchema");
export type ConstrainedParameterMap = { [id: string]: Schema };

/**
 * Decorator to directly validate a constructor parameter against a schema
 * @param schema Schema to validate the parameter against
 * @returns (target: Object, propertyKey: string | symbol, parameterIndex: number) => void
 */
export function paramSchema(schema: Schema) {
  return function setParamSchemaMetadata(
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    // get the existing constrained parameters
    propertyKey =
      typeof propertyKey === "undefined" ? "constructor" : propertyKey;
    let existingConstrainedParameters: { [id: string]: Schema } =
      Reflect.getOwnMetadata(parameterSchemaMetadataKey, target, propertyKey) ||
      [];
    existingConstrainedParameters[parameterIndex] = schema;
    Reflect.defineMetadata(
      parameterSchemaMetadataKey,
      existingConstrainedParameters,
      target,
      propertyKey
    );
  };
}
