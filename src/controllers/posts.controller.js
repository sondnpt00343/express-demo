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

exports.getAllPosts = async (req, res) => {
    const posts = await readDb(RESOURCE);
    res.json({
        status: "success",
        data: posts,
    });
};

exports.getPostById = async (req, res) => {
    const posts = await readDb(RESOURCE);
    const post = posts.find((post) => post.id === +req.params.id);

    if (!post) {
        res.status(404).json({
            status: "error",
            message: "Resource notfound.",
        });
        return;
    }

    res.json({
        status: "success",
        data: post,
    });
};

exports.createPost = async (req, res) => {
    const posts = await readDb(RESOURCE);
    const nextId = (posts.at(-1)?.id ?? 0) + 1;
    const post = {
        ...req.body,
        id: nextId,
    };

    posts.push(post);

    await writeDb(RESOURCE, posts);

    res.status(201).json({
        status: "success",
        data: post,
    });
};

exports.updatePost = async (req, res) => {
    const posts = await readDb(RESOURCE);
    const post = posts.find((post) => post.id === +req.params.id);

    if (!post) {
        res.status(404).json({
            status: "error",
            message: "Resource notfound.",
        });
        return;
    }

    Object.assign(post, req.body);

    await writeDb(RESOURCE, posts);

    res.json({
        status: "success",
        data: post,
    });
};

exports.deletePost = async (req, res) => {
    const posts = await readDb(RESOURCE);
    const postIndex = posts.findIndex((post) => post.id === +req.params.id);

    if (postIndex === -1) {
        res.status(404).json({
            status: "error",
            message: "Resource notfound.",
        });
        return;
    }

    posts.splice(postIndex, 1);

    await writeDb(RESOURCE, posts);

    res.status(204).send();
};
