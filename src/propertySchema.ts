import { Schema } from "joi";

export function propertySchema(schema: Schema) {
  return function(target: Object, key: string | symbol): void {
    let val = target[key]
    let propertyName = String(key)

    const getter = () => {
      return val
    }
    const setter = value => {
      const { error } = schema.validate(value)
      if (error instanceof Error) {
        error.message = error.message.replace('"value"', `"${propertyName}"`)
        throw error
      }
      val = value
    }

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    })
  }
}
