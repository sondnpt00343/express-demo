const db = require("@/configs/db");
const { buildInsertQuery, buildUpdateQuery } = require("@/utils/queryBuilder");

exports.findAll = async (page, limit) => {
    const offset = (page - 1) * limit;
    const [users] = await db.query(
        `select id, name, avatar, created_at from users where name is not null order by created_at desc limit ? offset ?`,
        [limit, offset]
    );
    return users;
};

exports.count = async () => {
    const [[{ total }]] = await db.query(`select count(*) as total from users`);
    return total;
};

exports.findById = async (id) => {
    const [users] = await db.query(
        `select * from users where id = ? or username = ?`,
        [id, id]
    );
    return users[0] ?? null;
};

exports.findByEmailAndPassword = async (email, password) => {
    const [users] = await db.query(
        `select * from users where email = ? and password = ?`,
        [email, password]
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
