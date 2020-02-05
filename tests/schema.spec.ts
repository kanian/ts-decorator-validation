import { schema } from "../src/schema"

import { schemas } from "./fixtures/schemas"

describe('schema :', () => {
  it('Will allow the creation of instance when given correct arguments', () => {
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
  it('Will make object creation throw an error when given unvalid arguments', () => {
    @schema(schemas.personSchema)
    class Person {
      age: number
      name: string
      constructor(name: string, age: number) {
        this.age = age
        this.name = name
      }
    }
    expect(() => { new Person('Jake',0)}).toThrow()
    expect(() => { new Person('J',50)}).toThrow()

  })
})
