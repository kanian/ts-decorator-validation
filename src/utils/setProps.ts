import { NonFunctionKeys } from "utility-types";

export type PartialOfProperties<T extends object> = Partial<
  { [P in NonFunctionKeys<T>]: T[P] }
>;
/**
 * Bulk-sets the properties on an object
 * @param o The object to set the properties on
 * @param values The values to set on the object
 * @returns {values: PartialOfProperties<T>, errors: Error[]}
 */
export function setProps<T extends object>(
  o: T,
  values: PartialOfProperties<T>
): { values: PartialOfProperties<T>; errors: Error[] } {
  let errors = [];
  for (let prop in values) {
    try {
      if (values[prop] !== undefined) {
        o[prop] = values[prop];
      }
    } catch (error) {
      errors.push(error);
      continue;
    }
  }
  return { values, errors };
}
