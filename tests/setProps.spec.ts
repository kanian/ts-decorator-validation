import { PersonWithSetProps } from "./fixtures/PersonWithSetProps"

describe('multiplePropsValidation:', () => {
    it('Sets correct properties on object when supplied valid values', () => {
        let p = new PersonWithSetProps('John',50)
        let {values,errors} = p.setProps({name:'Pattern',age: 49})
        expect({name:'Pattern', age:49}).toEqual(values)
        expect(errors.length).toEqual(0)
    })
    it('Sets correct properties on object when supplied partially complete set of values', () => {
        let p = new PersonWithSetProps('John',50)
        let {values,errors} = p.setProps({age: 49})
        expect({ age:49}).toEqual(values)
        expect(errors.length).toEqual(0)
    })
    it('Returns an Error array of errors if some suplied values are invalid ', () => {
        let p = new PersonWithSetProps('John',50)
        let {errors}= p.setProps({name:'P',age: 0})
        expect((errors as Error[]).length > 0).toBe(true)
    })
})