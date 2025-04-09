//! Zod Validation for registration

const z = require("zod");

//creating an object schema
const signupSchema = z.object({
  username: z
    .string({ required_error: "name is required" })
    .trim()
    .min(3, { message: "Name must be at least of 3 character" })
    .max(255, { message: "Name must not be more than 255 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 character" })
    .max(255, { message: "Email must be more than 255 character" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(7, { message: "Phone must be at least of 10 character" })
    .max(20, { message: "Phone must not be more than 20 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(7, { message: "Password must be at least of 7 character" })
    .max(1024, { message: "Password can't be more than 1024 characters" }),
});

module.exports = signupSchema; // it's use to import in router
