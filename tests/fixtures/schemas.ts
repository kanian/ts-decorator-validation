const Joi = require('@hapi/joi')

const personNameSchema = Joi.string().min(3)
const personAgeSchema = Joi.number().min(1)
const personGroupName = Joi.string().min(3)

const personSchema = Joi.object({
  name: personNameSchema,
  age: personAgeSchema
})

const personsSchema = Joi.object({
    person1: personSchema,
    person2: personSchema
})

const groupPersonSchema = Joi.object({
  group: personGroupName,
  person: personSchema
})

export const schemas = {
  personNameSchema,
  personAgeSchema,
  personGroupName,
  personSchema,
  personsSchema,
  groupPersonSchema
}
