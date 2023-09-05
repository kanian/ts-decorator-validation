import { Schema } from "joi";

/**
 * Decorator to validate a class property against a schema
 * @param schema Schema to validate the property against
 * @returns (target: Object, key: string | symbol) => void
 */
export function propertySchema(schema: Schema) {
  return function(target: Object, key: string | symbol): void {
    let val = target[key];
    let propertyName = String(key);

    // property getter
    const getter = () => {
      return val;
    };
    // property setter
    const setter = value => {
      // validate the property
      const { error } = schema.validate(value);
      if (error instanceof Error) {
        error.message = error.message.replace('"value"', `"${propertyName}"`);
        throw error;
      }
      val = value;
    };

    // redefine the property on the target
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  };
}
