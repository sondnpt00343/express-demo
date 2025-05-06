const fs = require("fs").promises;

const DB_PATH = "./db.json";
const RESOURCE = "comments";

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

const getCommentsByPostId = async (postId) => {
    const comments = await readDb(RESOURCE);
    return comments.filter((comment) => comment.post_id === +postId);
};

const createComment = async (data) => {
    const comments = await readDb(RESOURCE);
    const nextId = (comments.at(-1)?.id ?? 0) + 1;
    const newComment = {
        ...data,
        id: nextId,
    };

    comments.push(newComment);

    await writeDb(RESOURCE, comments);

    return newComment;
};

module.exports = {
    getCommentsByPostId,
    createComment,
};
