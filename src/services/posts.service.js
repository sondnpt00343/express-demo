const fs = require("fs").promises;

const DB_PATH = "./db.json";
const RESOURCE = "posts";

// 1. Service layer
// 2. Xử lý lỗi chung
// 3. Chuẩn hóa response: success, error
// 4. 1-N

// Write DB
const writeDb = async (resource, data) => {
    let db = {};
    try {
        const jsonDb = await fs.readFile(DB_PATH, "utf-8");
        db = JSON.parse(jsonDb);
    } catch (error) {}

    db[resource] = data;

    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
};

// Read DB
const readDb = async (resource) => {
    try {
        const jsonDb = await fs.readFile(DB_PATH, "utf-8");
        const db = JSON.parse(jsonDb) ?? {};
        return db[resource] ?? [];
    } catch (error) {
        return [];
    }
};

const getAllPosts = async () => {
    const posts = await readDb(RESOURCE);
    return posts;
};

const getPostById = async (id) => {
    const posts = await readDb(RESOURCE);
    const post = posts.find((post) => post.id === +id);

    return post;
};

const createPost = async (data) => {
    const posts = await readDb(RESOURCE);
    const nextId = (posts.at(-1)?.id ?? 0) + 1;
    const post = {
        ...data,
        id: nextId,
    };

    posts.push(post);

    await writeDb(RESOURCE, posts);

    return post;
};

const updatePost = async (id, data) => {
    const posts = await readDb(RESOURCE);
    const post = await getPostById(id);

    if (!post) return;

    Object.assign(post, data);

    await writeDb(RESOURCE, posts);

    return post;
};

const deletePost = async (id) => {
    const posts = await readDb(RESOURCE);
    const postIndex = posts.findIndex((post) => post.id === +id);

    if (postIndex === -1) return;

    posts.splice(postIndex, 1);

    await writeDb(RESOURCE, posts);

    return true;
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};
