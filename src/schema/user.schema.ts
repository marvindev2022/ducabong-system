import joi from 'joi';


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const signupSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().regex(emailRegex).required(),
  password: joi.string().min(6).required(),
  confirm: joi.string().min(6).required().valid(joi.ref('password'))
    .messages({ 'any.only': 'As senhas devem ser iguais' }),
});

export const loginSchema = joi.object({
  email: joi.string().regex(emailRegex).required(),
  password: joi.string().required(),
});

export const EditUserSchema = joi.object({
  email: joi.string().regex(emailRegex).required(),
  password: joi.string().required(),
  name: joi.string().required(),
  cpf: joi.string().optional(),
  phone: joi.string().required(),
  birthDate: joi.date().optional(),
  photo: joi.string().optional(),
});
