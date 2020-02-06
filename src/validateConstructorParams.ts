import 'reflect-metadata'
import {
  parameterSchemaMetadataKey,
  ConstrainedParameterMap
} from './paramSchema'

export function validateConstructorParams(
  target: any,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<Function>
) {
  let method = descriptor.value
  descriptor.value = function() {
    let existingConstrainedParameters: ConstrainedParameterMap = Reflect.getOwnMetadata(
      parameterSchemaMetadataKey,
      target,
      propertyName
    )
    if (existingConstrainedParameters) {
      const parameterIndexes = Object.keys(existingConstrainedParameters)
      for (let parameterIndex of parameterIndexes) {
          console.log('chekcing')
        // if (
        //   parameterIndex >= arguments.length ||
        //   arguments[parameterIndex] === undefined
        // ) {
        //   throw new Error('Missing required argument.')
        // }
      }
    }

    return method.apply(this, arguments)
  }
}
