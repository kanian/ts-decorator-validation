import { Schema } from "joi"

export function schema(schema: Schema) {
    return function logClass(target: any) {
      // save a reference to the original constructor
      var original = target
      // the new constructor behaviour
      var f: any = function(...args) {
        const instance = new original(...args)
        const { error, value } = schema.validate(instance)
        return instance
      }
      // copy prototype so intanceof operator still works
      f.prototype = original.prototype
      // return new constructor (will override original)
      return f
    }
  }