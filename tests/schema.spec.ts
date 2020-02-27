import { PersonWithClassSchema } from './fixtures/PersonWithClassSchema'
import { PersonWithParamSchema } from './fixtures/PersonWithParamSchema'
import { PersonWithSchemaAndParamSchema } from './fixtures/PersonWithSchemaAndParamSchema'
import { PersonWithClassSchemaAndValidateParams } from './fixtures/PersonWithClassSchemaAndValidateParams'

describe('schema :', () => {
  it('Will allow the creation of instance when given correct arguments', () => {
    const p = new PersonWithClassSchema('Jake', 50)
    expect(p.name === 'Jake' && p.age === 50).toBe(true)
  })
  it('Will make object creation throw an error when given unvalid arguments', () => {
    expect(() => {
      new PersonWithClassSchema('Jake', 0)
    }).toThrow()
    expect(() => {
      new PersonWithClassSchema('J', 50)
    }).toThrow()
  })

  describe('validateConstructorParams: ', () => {
    it('Allows instance creation when validateParams is not set', () => {
      const p = new PersonWithClassSchema('Jake', 50)
      expect(p.name === 'Jake' && p.age === 50).toBe(true)
    })
    it('Allows instance creation when validateParams is set, and no parameter has a schema', () => {
      const p = new PersonWithClassSchemaAndValidateParams('Jake', 50)
      expect(p.name === 'Jake' && p.age === 50).toBe(true)
    })
    it('Allows instance creation when parameters have a schema and valid arguments are given', () => {
      const p = new PersonWithParamSchema('Jake', 50)
      expect(p.name === 'Jake' && p.age === 50).toBe(true)
    })
    it('Throws an error when validateParms is set, params have schemas, and given arguments is invalid', () => {
      expect(() => new PersonWithSchemaAndParamSchema('Jake', 0)).toThrow()
    })
  })
})
