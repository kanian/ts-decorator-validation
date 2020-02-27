import { paramSchema } from '../../src'
import { schemas } from './schemas'

export class PersonWithParamSchema {
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