//here schema is signup schema
const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body); // .parseAsync method check user fill register data is match with schema(zod signup Schema) or not
    req.body = parseBody; // so now req.body will equal to parseBody
    next();
  } catch (error) {
    // console.log(error)
    const message = error.errors[0].message;
    res.status(400).json({ msg: message });
  }
};

module.exports = validate; // it's use to import in router
