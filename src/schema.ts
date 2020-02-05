import { Schema } from 'joi'

export function schema(schema: Schema) {
  return function validateArgs(target: any) {
    // save a reference to the original constructor
    var original = target
    // wrap orginal constructor with validation behaviour
    var f: any = function(...args) {
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
