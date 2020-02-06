import { propertySchema } from '../src/propertySchema'
import { schemas } from './fixtures/schemas'

describe('propertySchema: ', () => {
  it('Allows property to be set to valid value', () => {
    class Person {
      @propertySchema(schemas.personAgeSchema)
      age: number
      @propertySchema(schemas.personNameSchema)
      name: string
      constructor(name: string, age: number) {
        this.age = age
        this.name = name
      }
    }
    const p = new Person('Jake',50)
    expect(p.age === 50 && p.name === 'Jake').toBe(true)
  })
  it('Throws an error when property is set to invalid value', () => {
    class Person {
      @propertySchema(schemas.personAgeSchema)
      age: number
      @propertySchema(schemas.personNameSchema)
      name: string
      constructor(name: string, age: number) {
        this.age = age
        this.name = name
      }
    }
    const p = new Person('Jake',50)
    expect(() => {
        p.age = 0
    }).toThrow()
    expect(() => {
        p.name = 'J'
    }).toThrow()
  })
})
