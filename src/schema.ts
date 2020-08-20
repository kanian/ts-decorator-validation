import 'reflect-metadata'

import { Schema } from 'joi'

import {
  ConstrainedParameterMap,
  parameterSchemaMetadataKey
} from './paramSchema'

export function schema(schema: Schema, validateParams: boolean = false) {
  return function validateArgs(target: any) {
    // save a reference to the original constructor
    var original = target
    // wrap orginal constructor with validation behaviour
    var f: any = function(...args) {
      if (validateParams) {
        validateConstructorParams(target, args)
      }
      const instance = new original(...args)
      const { error } = schema.validate(instance)
      if (error instanceof Error) {
        throw error
      }

      return instance
    }
    // set f's prototype to orginal's prototype so f keeps original's type
    f.prototype = original.prototype
    return f
  }
}

export function validateConstructorParams(target: any, args: any[]) {
  let existingConstrainedParameters: ConstrainedParameterMap = Reflect.getOwnMetadata(
    parameterSchemaMetadataKey,
    target,
    'constructor'
  )
  if (existingConstrainedParameters) {
    const parameterIndexes = Object.keys(existingConstrainedParameters)
    for (let parameterIndex of parameterIndexes) {
      const { error } = existingConstrainedParameters[parameterIndex].validate(
        args[Number.parseInt(parameterIndex)]
      )
      if (error instanceof Error) {
        throw error
      }
    }
  }
}
