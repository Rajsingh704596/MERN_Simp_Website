//here schema is signup schema
const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body); // .parseAsync method check user fill register data is match with schema(zod signup Schema) or not
    req.body = parseBody; // so now req.body will equal to parseBody
    next();
  } catch (err) {
    // console.log(err)
    // const message = err.errors[0].message;
    // res.status(400).json({ msg: message });         // here error pass directly to the client

    const status = 422;
    const message = "fill the input properly";
    const extraDetails = err.errors[0].message;
    const error = {
      status,
      message,
      extraDetails,
    };
    next(error); // error pass to error-middleware
  }
};

module.exports = validate; // it's use to import in router
