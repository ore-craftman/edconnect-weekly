const User = require("../models/user");
const helper = require("../models/mongo_helper");

/* Creates new user */
const create = async ({
  firstname,
  lastname,
  email,
  password,
  matricNumber,
  program,
  graduationYear,
}) => {
  // populate users with data from file.
  // const users = new Users();
  // users.data = getFileAsJson(usersFile).data;

  try {
    const user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.program = program;
    user.matricNumber = matricNumber;
    user.graduationYear = graduationYear;
    user.setPassword(password);

    if (await user.save()) {
      return [true, user];
    }
  } catch (err) {
    return [false, helper.translateError(err)];
  }
};

/* Authenticate a user */
const authenticate = async (email, password) => {

  const user = new User();
  user.email = email;
  user.password = password;
  const result = await User.findOne({ email });
  if (result && user.validPassword(result, user.password)) {
    return [true, result];
  } else {
    return [false, ["Invalid email/password"]];
  }
};

/* Return user with specified id */
const getById = async (id) => {
  return await User.findOne({_id: id})
};

/* Return all users */
const getAll = async () => {
  return await User.find()
};

module.exports = {
  create,
  authenticate,
  getById,
  getAll,
};
