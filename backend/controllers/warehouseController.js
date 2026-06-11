const db = require('../config/db');

exports.getWarehouses = (req, res) => {

    const query = `
        SELECT *
        FROM warehouses
        ORDER BY warehouse_id DESC
    `;

    db.query(query, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

exports.createWarehouse = (req, res) => {

    const {
        name,
        location
    } = req.body;

    const query = `
        INSERT INTO warehouses
        (name, location)
        VALUES (?, ?)
    `;

    db.query(
        query,
        [name, location],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message:
                'Warehouse created successfully'
            });

        }
    );

};