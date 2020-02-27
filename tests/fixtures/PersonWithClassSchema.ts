import { propertySchema, schema } from '../../src'

import { schemas } from './schemas'
@schema(schemas.personSchema)
    class PersonWithClassSchema {
      age: number
      name: string
      constructor(name: string, age: number) {
        this.age = age
        this.name = name
      }
    }

export { PersonWithClassSchema }
