const { readDb, writeDb } = require("@/utils/jsonDb");

const RESOURCE = "comments";

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
