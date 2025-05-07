const fs = require("fs").promises;

const DB_PATH = "./db.json";

exports.writeDb = async (resource, data) => {
    let db = {};
    try {
        const jsonDb = await fs.readFile(DB_PATH, "utf-8");
        db = JSON.parse(jsonDb);
    } catch (error) {}

    db[resource] = data;

    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
};

exports.readDb = async (resource) => {
    try {
        const jsonDb = await fs.readFile(DB_PATH, "utf-8");
        const db = JSON.parse(jsonDb) ?? {};
        return db[resource] ?? [];
    } catch (error) {
        return [];
    }
};
