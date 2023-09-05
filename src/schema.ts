import "reflect-metadata";

import { Schema } from "joi";

import {
  ConstrainedParameterMap,
  parameterSchemaMetadataKey
} from "./paramSchema";

/**
 * Decorator to validate a class against a schema
 * @param schema Schema to validate the class against
 * @param validateParams Whether to validate the constructor parameters against the schema
 * @returns (target: any) => any
 */
export function schema(schema: Schema, validateParams: boolean = false) {
  return function validateArgs(target: any) {
    // save a reference to the original constructor
    var original = target;
    // wrap orginal constructor with validation behaviour
    var f: any = function(...args: any[]) {
      if (validateParams) {
        validateConstructorParams(target, args);
      }
      const instance = new original(...args);
      const { error } = schema.validate(instance);
      if (error instanceof Error) {
        throw error;
      }

      return instance;
    };
    // set f's prototype to orginal's prototype so f keeps original's type
    f.prototype = original.prototype;
    return f;
  };
}

/**
 * Validates the constructor parameters against the schema
 * @param target
 * @param args
 */
export function validateConstructorParams(target: any, args: any[]) {
  // get the existing constrained parameters
  let existingConstrainedParameters: ConstrainedParameterMap = Reflect.getOwnMetadata(
    parameterSchemaMetadataKey,
    target,
    "constructor"
  );
  if (existingConstrainedParameters) {
    // validate the parameters
    const parameterIndexes = Object.keys(existingConstrainedParameters);
    for (let parameterIndex of parameterIndexes) {
      const { error } = existingConstrainedParameters[parameterIndex].validate(
        args[Number.parseInt(parameterIndex)]
      );
      if (error instanceof Error) {
        throw error;
      }
    }
  }
}
