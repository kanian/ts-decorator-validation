import { paramSchema, schema } from '../../src'
import { schemas } from './schemas'

@schema(schemas.personSchema,true)
export class PersonWithSchemaAndParamSchema {
  age: number
  name: string
  constructor(
    @paramSchema(schemas.personNameSchema) name: string,
    @paramSchema(schemas.personAgeSchema) age: number
  ) {
    this.age = age
    this.name = name
  }
}