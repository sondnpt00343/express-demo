const db = require("@/configs/db");
const { buildInsertQuery, buildUpdateQuery } = require("@/utils/queryBuilder");

exports.findAll = async () => {
    const [users] = await db.query("select * from users");
    return users;
};

exports.findById = async (id) => {
    const [users] = await db.query(
        `select * from users where id = ? or username = ?`,
        [id, id]
    );
    return users[0];
};

exports.create = async (data) => {
    const { columns, placeholders, values } = buildInsertQuery(data);

    const query = `INSERT INTO users (${columns}) VALUES (${placeholders});`;
    const [{ insertId }] = await db.query(query, values);

    return {
        id: insertId,
        ...data,
    };
};

exports.update = async (id, data) => {
    const { setClause, values } = buildUpdateQuery(data);

    values.push(id);

    const query = `UPDATE users SET ${setClause} WHERE id = ?;`;
    await db.query(query, values);

    return {
        id,
        ...data,
    };
};

exports.remove = async (id) => {
    const [{ affectedRows }] = await db.query(
        `delete from users where id = ?`,
        [id]
    );
    return affectedRows > 0;
};
