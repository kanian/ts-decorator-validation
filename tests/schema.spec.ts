import { paramSchema } from '../src/paramSchema'
import { schema } from '../src/schema'
import { schemas } from './fixtures/schemas'

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
    const p = new Person('Jake', 50)
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
    expect(() => {
      new Person('Jake', 0)
    }).toThrow()
    expect(() => {
      new Person('J', 50)
    }).toThrow()
  })

  describe('validateConstructorParams: ', () => {
    it('Allows instance creation when validateParams is not set', () => {
      @schema(schemas.personSchema, false)
      class Person {
        age: number
        name: string
        constructor(name: string, age: number) {
          ;(this.age = age), (this.name = name)
        }
      }
      const p = new Person('Jake', 50)
      expect(p.name === 'Jake' && p.age === 50).toBe(true)
    })
    it('Allows instance creation when validateParams is set, and no parameter has a schema', () => {
      @schema(schemas.personSchema, true)
      class Person {
        age: number
        name: string
        constructor(name: string, age: number) {
          ;(this.age = age), (this.name = name)
        }
      }
      const p = new Person('Jake', 50)
      expect(p.name === 'Jake' && p.age === 50).toBe(true)
    })
    it('Allows instance creation when parameters have a schema and valid arguments are given', () => {
      @schema(schemas.personSchema, true)
      class Person {
        age: number
        name: string
        constructor(
          @paramSchema(schemas.personNameSchema) name: string,
          @paramSchema(schemas.personAgeSchema) age: number
        ) {
          ;(this.age = age), (this.name = name)
        }
      }
      const p = new Person('Jake', 50)
      expect(p.name === 'Jake' && p.age === 50).toBe(true)
    })
    it('Throws an error when validateParms is set, params have schemas, and given arguments is invalid', () => {
      @schema(schemas.personSchema, true)
      class Person {
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
      expect(() => new Person('Jake', 0)).toThrow()
    })
  })
})
