exports.buildInsertQuery = (data) => {
    const fields = Object.keys(data);
    const columns = fields.map((field) => `\`${field}\``).join(", ");
    const placeholders = fields.map(() => "?").join(", ");
    const values = fields.map((field) => data[field]);

    return { columns, placeholders, values };
};

exports.buildUpdateQuery = (data) => {
    const fields = Object.keys(data);
    const setClause = fields.map((field) => `\`${field}\` = ?`).join(", ");
    const values = fields.map((field) => data[field]);

    return { setClause, values };
};
