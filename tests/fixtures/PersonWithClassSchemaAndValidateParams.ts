import { propertySchema, schema } from '../../src'

import { schemas } from './schemas'
@schema(schemas.personSchema)
    class PersonWithClassSchemaAndValidateParams {
      age: number
      name: string
      constructor(name: string, age: number) {
        this.age = age
        this.name = name
      }
    }

export { PersonWithClassSchemaAndValidateParams }
