const queueModel = require("@/models/queue.model");

async function dispatch(type, payload) {
    const newQueue = {
        type,
        payload: JSON.stringify(payload),
    };
    await queueModel.create(newQueue);
}

module.exports = {
    dispatch,
};
