const { readDb, writeDb } = require("@/utils/jsonDb");

const RESOURCE = "posts";

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
