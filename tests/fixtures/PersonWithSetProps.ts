import { propertySchema } from '../../src'

import { schemas } from './schemas'
import { PartialOfProperties, setProps } from '../../src/utils/setProps'

class PersonWithSetProps  {
  @propertySchema(schemas.personAgeSchema)
  age: number
  @propertySchema(schemas.personNameSchema)
  name: string
  constructor(name: string, age: number) {
    this.age = age
    this.name = name
  }
  setProps(values: PartialOfProperties<PersonWithSetProps>) {
    return setProps<PersonWithSetProps>(this, values)
  }
}

export { PersonWithSetProps }
