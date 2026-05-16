async function getProducts() {
    let editProductId = null;

    const response = await fetch(
        'http://localhost:3000/api/products'
    );

    const data = await response.json();

    const table =
        document.getElementById('productTable');

    table.innerHTML = '';

    data.forEach(product => {

        table.innerHTML += `
            <tr class="border-b border-slate-800">

                <td class="p-4">
                    ${product.product_id}
                </td>

                <td class="p-4">
                    ${product.name}
                </td>

                <td class="p-4">
                    ${product.category}
                </td>

                <td class="p-4">
                    ${product.unit}
                </td>

                <td class="p-4">

    <button
        onclick="editProduct(${product.product_id})"
        class="bg-yellow-500 px-4 py-2 rounded-xl">

        Edit

    </button>

    <button
    onclick="deleteProduct(${product.product_id})"
    class="bg-red-500 px-4 py-2 rounded-xl ml-2">

    Delete

</button>

</td>
            </tr>
        `;

    });

}

async function getCategories() {

    const response = await fetch(
        'http://localhost:3000/api/categories'
    );

    const data = await response.json();

    const categorySelect =
        document.getElementById('category_id');

    categorySelect.innerHTML = `
        <option value="">
            Pilih Kategori
        </option>
    `;

    data.forEach(category => {

        categorySelect.innerHTML += `
            <option value="${category.category_id}">
                ${category.name}
            </option>
        `;

    });

}

const form = document.getElementById('productForm');

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const name =
        document.getElementById('name').value;

    const category_id =
        document.getElementById('category_id').value;

    const unit =
        document.getElementById('unit').value;

    let url =
        'http://localhost:3000/api/products';

    let method = 'POST';

    if (editProductId) {

        url =
            `http://localhost:3000/api/products/${editProductId}`;

        method = 'PUT';

    }

    const response = await fetch(
        url,
        {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                category_id,
                unit
            })
        }
    );

    const data = await response.json();

    alert(data.message);

    location.reload();

});

async function editProduct(id) {

    editProductId = id;

    const response = await fetch(
        `http://localhost:3000/api/products`
    );

    const data = await response.json();

    const product =
        data.find(item => item.product_id == id);

    document.getElementById('name').value =
        product.name;

    document.getElementById('category_id').value =
        product.category_id;

    document.getElementById('unit').value =
        product.unit;

}

async function deleteProduct(id) {

    if (!confirm('Yakin mau hapus barang ini?')) {
        return;
    }

    const response = await fetch(
        `http://localhost:3000/api/products/${id}`,
        {
            method: 'DELETE'
        }
    );

    const data = await response.json();

    alert(data.message);

    location.reload();

}

window.onload = () => {

    getProducts();
    getCategories();

};