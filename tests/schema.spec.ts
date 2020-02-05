import { schema } from "../src/schema"

import { schemas } from "./fixtures/schemas"

describe('schema :', () => {
  it('Will allow the creation of instance when given correct partameters', () => {
    @schema(schemas.personSchema)
    class Person {
      age: number
      name: string
      constructor(name: string, age: number) {
        this.age = age
        this.name = name
      }
    }
    const p = new Person('Jake',50)
    expect(p.name === 'Jake' && p.age === 50).toBe(true)
  })
})
