const db = require("@/configs/db");
const { buildInsertQuery, buildUpdateQuery } = require("@/utils/queryBuilder");

exports.findAll = async () => {
    const [rows] = await db.query(`select * from queues`);
    return rows;
};

exports.findPendingJobs = async () => {
    const [rows] = await db.query(
        `select * from queues where status = "pending"`
    );
    return rows;
};

exports.count = async () => {
    const [[{ total }]] = await db.query(
        `select count(*) as total from queues`
    );
    return total;
};

exports.findById = async (id) => {
    const [rows] = await db.query(`select * from queues where id = ?`, [id]);
    return rows[0] ?? null;
};

exports.create = async (data) => {
    const { columns, placeholders, values } = buildInsertQuery(data);

    const query = `INSERT INTO queues (${columns}) VALUES (${placeholders});`;
    const [{ insertId }] = await db.query(query, values);

    return {
        id: insertId,
        ...data,
    };
};

exports.update = async (id, data) => {
    const { setClause, values } = buildUpdateQuery(data);

    values.push(id);

    const query = `UPDATE queues SET ${setClause} WHERE id = ?;`;
    await db.query(query, values);

    return {
        id,
        ...data,
    };
};

exports.remove = async (id) => {
    const [{ affectedRows }] = await db.query(
        `delete from queues where id = ?`,
        [id]
    );
    return affectedRows > 0;
};
