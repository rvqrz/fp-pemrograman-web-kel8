async function getProducts() {

    const response = await fetch(
        'http://localhost:3000/api/products'
    );

    const data = await response.json();

    const productSelect =
        document.getElementById('product_id');

    data.forEach(product => {

        productSelect.innerHTML += `
            <option value="${product.product_id}">
                ${product.name}
            </option>
        `;

    });

}

async function getWarehouses() {

    const response = await fetch(
        'http://localhost:3000/api/warehouses'
    );

    const data = await response.json();

    const warehouseSelect =
        document.getElementById('warehouse_id');

    data.forEach(warehouse => {

        warehouseSelect.innerHTML += `
            <option value="${warehouse.warehouse_id}">
                ${warehouse.name}
            </option>
        `;

    });

}

async function getSuppliers() {

    const response = await fetch(
        'http://localhost:3000/api/suppliers'
    );

    const data = await response.json();

    const supplierSelect =
        document.getElementById('supplier_id');

    data.forEach(supplier => {

        supplierSelect.innerHTML += `
            <option value="${supplier.supplier_id}">
                ${supplier.name}
            </option>
        `;

    });

}

const form =
    document.getElementById('stockInForm');

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const product_id =
        document.getElementById('product_id').value;

    const warehouse_id =
        document.getElementById('warehouse_id').value;

    const supplier_id =
        document.getElementById('supplier_id').value;

    const quantity =
        document.getElementById('quantity').value;

    // sementara hardcode user login
    const user_id = 1;

    const response = await fetch(
        'http://localhost:3000/api/stocks/in',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_id,
                warehouse_id,
                quantity,
                supplier_id,
                user_id
            })
        }
    );

    const data = await response.json();

    alert(data.message);

    location.reload();

});

window.onload = () => {

    getProducts();
    getWarehouses();
    getSuppliers();

};