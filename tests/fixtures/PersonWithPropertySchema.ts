import { propertySchema } from '../../src'
import { schemas } from './schemas'

export class PersonWithPropertySchema {
  @propertySchema(schemas.personAgeSchema)
  age: number
  @propertySchema(schemas.personNameSchema)
  name: string
  constructor(name: string, age: number) {
    this.age = age
    this.name = name
  }
}
