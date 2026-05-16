const db = require('../config/db');

exports.getCategories = (req, res) => {

    const query = `
        SELECT * FROM categories
    `;

    db.query(query, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};