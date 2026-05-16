const db = require('../config/db');

exports.getProducts = (req, res) => {

    const query = `
        SELECT 
            products.product_id,
            products.name,
            products.category_id,
            categories.name AS category,
            products.unit
        FROM products
        JOIN categories
        ON products.category_id = categories.category_id
    `;

    db.query(query, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

exports.addProduct = (req, res) => {

    const {
        name,
        category_id,
        unit
    } = req.body;

    const query = `
        INSERT INTO products
        (name, category_id, unit)
        VALUES (?, ?, ?)
    `;

    db.query(
        query,
        [name, category_id, unit],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Product added successfully'
            });

        }
    );

};

exports.updateProduct = (req, res) => {

    const { id } = req.params;

    const {
        name,
        category_id,
        unit
    } = req.body;

    const query = `
        UPDATE products
        SET
            name = ?,
            category_id = ?,
            unit = ?
        WHERE product_id = ?
    `;

    db.query(
        query,
        [name, category_id, unit, id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Product updated successfully'
            });

        }
    );

};

exports.deleteProduct = (req, res) => {

    const { id } = req.params;

    const query = `
        DELETE FROM products
        WHERE product_id = ?
    `;

    db.query(query, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: 'Product deleted successfully'
        });

    });

};