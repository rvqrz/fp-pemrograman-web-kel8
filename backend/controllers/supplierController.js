const db = require('../config/db');

exports.getSuppliers = (req, res) => {

    const query = `
        SELECT *
        FROM suppliers
        ORDER BY supplier_id DESC
    `;

    db.query(query, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

exports.createSupplier = (req, res) => {

    const {
        name,
        phone
    } = req.body;

    const query = `
        INSERT INTO suppliers
        (name, phone)
        VALUES (?, ?)
    `;

    db.query(
        query,
        [name, phone],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message:
                'Supplier berhasil ditambahkan'
            });

        }
    );

};