import { NonFunctionKeys } from "utility-types"


export type PartialOfProperties<T extends object> = Partial<{ [P in NonFunctionKeys<T>]: T[P] }>
export function setProps<T extends object>(
    o: T,
    values: PartialOfProperties<T>
  ): { values: PartialOfProperties<T>; errors: Error[] } {
    let errors = []
    for (let prop in values) {
      try {
          values[prop] !== undefined ? o[prop] = values[prop] : undefined
      } catch (error) {
        errors.push(error)
        continue
      }
    }
    return { values, errors }
  }