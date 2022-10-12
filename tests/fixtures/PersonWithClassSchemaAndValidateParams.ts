import { propertySchema, schema } from '../../src'

import { schemas } from './schemas'
@schema(schemas.personSchema, true)
    class PersonWithClassSchemaAndValidateParams {
      age: number
      name: string
      constructor(name: string, age: number) {
        this.age = age
        this.name = name
      }
    }

export { PersonWithClassSchemaAndValidateParams }
