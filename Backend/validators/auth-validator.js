//! Zod Validation for registration  (Note - here it's check only form validation , given value is valid or not , e.g if email already exist so that is not part of zod validation , it's part of backend)

const z = require("zod");

//^ creating an object zod schema for Login form
const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 character" })
    .max(255, { message: "Email must be more than 255 character" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(7, { message: "Password must be at least of 7 character" })
    .max(1024, { message: "Password can't be more than 1024 characters" }),
});

//^ creating an object zod schema for Registration form         //LoginSchema.extend use that means email and password validation also include in signupSchema(Registration form) , so it's help not repeat again code rest validation add only
const signupSchema = LoginSchema.extend({
  username: z
    .string({ required_error: "name is required" })
    .trim()
    .min(3, { message: "Name must be at least of 3 character" })
    .max(255, { message: "Name must not be more than 255 characters" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(7, { message: "Phone must be at least of 10 character" })
    .max(20, { message: "Phone must not be more than 20 characters" }),
});

module.exports = { signupSchema, LoginSchema }; // it's use to import in router
