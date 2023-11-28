/**
 * @typedef {Object} Post
 * @property {string} id - The unique identifier of the post.
 * @property {number} userId - The unique identifier of the user who made the post.
 * @property {number} workoutId - The unique identifier of the workout associated with the post.
 * @property {string} picture - The picture URL of the post.
 * @property {string} description - The description of the post.
 * @property {string} date - The date when the post was made.
 */

/**
 * @typedef {Object} Posts
 * @property {Post[]} posts - The list of posts.
 */

const { ObjectId, connect } = require("./mongo");
const data = require("../data/posts.json");

const COLLECTION_NAME = "Posts";
async function getCollection() {
  const db = await connect();
  return db.collection(COLLECTION_NAME);
}

/**
 * @returns {Promise<post[]>} An array of posts.
 */
async function getAll() {
  const col = await getCollection();
  return col.find({}).toArray();
}

/**
 * @param {string} id - The posts ID.
 */
async function get(id) {
  const col = await getCollection();
  return await col.findOne({ _id: ObjectId(id) });
}

async function search(query) {
  const col = await getCollection();
  const posts = await col
    .find({
      $or: [
        { workoutId: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    })
    .toArray();

  return posts;
}

/**
 * @param {Post} post - The post to create.
 * @returns {Promise<post>} The created post.
 */
async function create(post) {
  const col = await getCollection();
  const result = await col.insertOne(post);
  return result;
}

/**
 * @param {Post} post - The post's data.
 * @returns {post} The updated post.
 */
async function update(post) {
  const col = await getCollection();
  const result = await col.findOneAndUpdate(
    { _id: ObjectId(post.id) },
    { $set: post },
    { returnDocument: "after" }
  );
  return result;
}

/**
 * @param {string} id - The post's ID.
 */
async function remove(id) {
  const col = await getCollection();
  const result = await col.deleteOne({ _id: ObjectId(id) });
  if (result.deletedCount === 0) {
    throw new Error("post not found");
  }
}

async function seed() {
  const col = await getCollection();

  await col.insertMany(data.posts);
}

module.exports = {
  getAll,
  get,
  search,
  create,
  update,
  remove,
  getCollection,
  COLLECTION_NAME,
  seed,
};
