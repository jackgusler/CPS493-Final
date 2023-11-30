/**
 * @typedef {Object} User
 * @property {number} id - The unique identifier of the user.
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} username - The username of the user.
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 * @property {boolean} admin - Whether the user is an admin or not.
 * @property {number[]} workoutsByIds - The ids of the workouts associated with the user.
 */

/**
 * @typedef {Object} Users
 * @property {User[]} users - The list of users.
 */

/**
 * @type { {users: User[]} }
 */
const { ObjectId, connect } = require("./mongo");

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const COLLECTION_NAME = "Users";
async function getCollection() {
  const db = await connect();
  return db.collection(COLLECTION_NAME);
}

/**
 * @returns {Promise<User[]>} An array of users.
 */
async function getAll() {
  const col = await getCollection();
  return col.find({}).toArray();
}

/**
 * @param {number} id - The users ID.
 */
async function get(id) {
  const col = await getCollection();
  return await col.findOne({ id: id });
}

async function search(query) {
  const col = await getCollection();
  const users = await col
    .find({
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    })
    .toArray();

  return users;
}

/**
 * @param {BaseUser} values - The user to create.
 * @returns {User} The created user.
 */
async function create(values) {
  const users = await getAll();
  const newUser = {
    id: users.length,
    ...values,
  };
  const col = await getCollection();
  const result = await col.insertOne(newUser);
  newUser._id = result.insertedId;
  return newUser;
}

/**
 * @param {BaseUser} values - The user to create.
 * @returns {User} The created user.
 */
async function register(values) {
  // register is like create but with validation
  // and some extra logic
  const col = await getCollection();
  const exists = await col.findOne({ username: values.username });
  if (exists) {
    throw new Error("Username already exists");
  }

  if (values.password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  // TODO: Make sure user is create with least privileges
  const newUser = {
    id: data.users.length + 1,
    ...values,
  };
  const result = await col.insertOne(newUser);
  newUser._id = result.insertedId;

  return newUser;
}

/**
 * @param {string} email
 * @param {string} password
 * @returns {User} The created user.
 */
async function login(email, password) {
  const col = await getCollection();
  const item = await col.findOne({ email: email });
  if (!item) {
    throw new Error("User not found");
  }
  if (item.password !== password) {
    throw new Error("Incorrect password");
  }
  const user = { ...item, password: undefined };
  const token = await generateJWT(user);
  return { user, token };
}

/**
 * @param {User} newValues - The user's new data.
 * @returns {User} The updated user.
 */
async function update(newValues) {
  const col = await getCollection();
  const result = await col.findOneAndUpdate(
    { id: newValues.id },
    {
      $set: {
        firstName: newValues.firstName,
        lastName: newValues.lastName,
        username: newValues.username,
        email: newValues.email,
        password: newValues.password,
        admin: newValues.admin,
        workoutsByIds: newValues.workoutsByIds,
      },
    },
    { returnDocument: "after" }
  );

  return result;
}

/**
 * @param {number} id - The user's ID.
 */
async function remove(id) {
  const col = await getCollection();
  const result = await col.deleteOne({ id: id });
  if (result.deletedCount === 0) {
    throw new Error("User not found");
  }
}

function generateJWT(user) {
  return new Promise((resolve, reject) => {
    jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

function verifyJWT(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}

module.exports = {
  getAll,
  get,
  search,
  create,
  register,
  login,
  update,
  remove,
  generateJWT,
  verifyJWT,
};
