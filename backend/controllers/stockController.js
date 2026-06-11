const db = require('../config/db');

exports.stockIn = (req, res) => {

    const {
        product_id,
        warehouse_id,
        quantity,
        supplier_id,
        user_id
    } = req.body;

    // 1. INSERT TRANSACTION

    const transactionQuery = `
        INSERT INTO transactions
        (transaction_type, date, supplier_id, user_id)
        VALUES ('IN', NOW(), ?, ?)
    `;

    db.query(
        transactionQuery,
        [supplier_id, user_id],
        (err, transactionResult) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            const transaction_id =
                transactionResult.insertId;

            // 2. INSERT TRANSACTION DETAIL

            const detailQuery = `
                INSERT INTO transaction_details
                (transaction_id, product_id, warehouse_id, quantity)
                VALUES (?, ?, ?, ?)
            `;

            db.query(
                detailQuery,
                [
                    transaction_id,
                    product_id,
                    warehouse_id,
                    quantity
                ],
                (err, detailResult) => {

                    if (err) {
                        console.log(err);
                        return res.status(500).json(err);
                    }

                    // 3. CHECK STOCK

                    const checkStockQuery = `
                        SELECT *
                        FROM stocks
                        WHERE product_id = ?
                        AND warehouse_id = ?
                    `;

                    db.query(
                        checkStockQuery,
                        [product_id, warehouse_id],
                        (err, stockResult) => {

                            if (err) {
                                console.log(err);
                                return res.status(500).json(err);
                            }

                            // STOCK EXISTS

                            if (stockResult.length > 0) {

                                const updateStockQuery = `
                                    UPDATE stocks
                                    SET quantity = quantity + ?
                                    WHERE product_id = ?
                                    AND warehouse_id = ?
                                `;

                                db.query(
                                    updateStockQuery,
                                    [
                                        quantity,
                                        product_id,
                                        warehouse_id
                                    ],
                                    (err, updateResult) => {

                                        if (err) {
                                            console.log(err);
                                            return res.status(500).json(err);
                                        }

                                        res.json({
                                            message:
                                            'Stock added successfully'
                                        });

                                    }
                                );

                            }

                            // STOCK NOT EXISTS

                            else {

                                const insertStockQuery = `
                                    INSERT INTO stocks
                                    (product_id, warehouse_id, quantity)
                                    VALUES (?, ?, ?)
                                `;

                                db.query(
                                    insertStockQuery,
                                    [
                                        product_id,
                                        warehouse_id,
                                        quantity
                                    ],
                                    (err, insertResult) => {

                                        if (err) {
                                            console.log(err);
                                            return res.status(500).json(err);
                                        }

                                        res.json({
                                            message:
                                            'New stock created successfully'
                                        });

                                    }
                                );

                            }

                        }
                    );

                }
            );

        }
    );

};