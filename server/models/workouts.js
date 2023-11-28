/**
 * @typedef {Object} Workout
 * @property {number} id - The unique identifier of the workout.
 * @property {string} name - The name of the workout.
 * @property {string} description - The description of the workout.
 * @property {string} image - The image URL of the workout.
 * @property {string} category - The category of the workout.
 * @property {string} intensity - The intensity level of the workout.
 * @property {number} duration - The duration of the workout in minutes.
 */

/**
 * @typedef {Object} Workouts
 * @property {Workout[]} workouts - The list of workouts.
 */

const { ObjectId, connect } = require('./mongo');
const data = require("../data/workouts.json");

const COLLECTION_NAME = 'Workouts';
async function getCollection() {
  const db = await connect();
  return db.collection(COLLECTION_NAME);
}


/**
 * @returns {Promise<workout[]>} An array of workouts.
 */
async function getAll() {
  const col = await getCollection();
  return col.find({}).toArray();
}

/**
 * @param {string} id - The workout's ID.
 */
async function get(id) {
  const col = await getCollection();
  return await col.findOne({ _id: ObjectId(id) });
}

async function getByCategory(category) {
  const col = await getCollection();
  return await col.findOne({ category });

}

async function search(query) {
  const col = await getCollection();
  const workouts = await col.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
    ],
  }).toArray();

  return workouts;
}

/**
 * @param {Workout} workout - The workout to create.
 * @returns {Promise<workout>} The created workout.
 */
async function create(workout) {
  const newWorkout = {
    id: data.workouts.length + 1,
    ...workout,
  };
  const col = await getCollection();
  const result = await col.insertOne(newWorkout);
  newWorkout._id = result.insertedId;

  return newWorkout;
}

/**
 * @param {Workout} workout - The workout's data.
 * @returns {workout} The updated workout.
 */
async function update(workout) {

  const col = await getCollection();
  const result = await col.findOneAndUpdate(
    { _id: ObjectId(workout.id) },
    { $set: workout },
    { returnDocument: 'after' },
  );
  return result;
}

/**
 * @param {string} id - The workout's ID.
 */
async function remove(id) {
  const col = await getCollection();
  const result = await col.deleteOne({ _id: ObjectId(id) });
  if(result.deletedCount === 0) {
    throw new Error('Workout not found');
  }
}

async function seed() {
  const col = await getCollection();

  await col.insertMany(data.workouts);
}


module.exports = {
  getAll, get, getByCategory, search, create, update, remove, getCollection, COLLECTION_NAME, seed
};