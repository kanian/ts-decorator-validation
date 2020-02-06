import 'reflect-metadata'
import { Schema } from 'joi'
export const parameterSchemaMetadataKey = Symbol('parameterSchema')
export type ConstrainedParameterMap = { [id: string]: Schema }
export function paramSchema(schema: Schema) {
  return function setParamSchemaMetadata(
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    propertyKey = typeof propertyKey === 'undefined' ? 'constructor' : propertyKey
    let existingConstrainedParameters: { [id: string]: Schema } =
      Reflect.getOwnMetadata(parameterSchemaMetadataKey, target, propertyKey) ||
      []
    existingConstrainedParameters[parameterIndex] = schema
    Reflect.defineMetadata(
      parameterSchemaMetadataKey,
      existingConstrainedParameters,
      target,
      propertyKey
    )
  }
}
