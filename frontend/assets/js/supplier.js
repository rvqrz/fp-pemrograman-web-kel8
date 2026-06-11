async function getSuppliers() {

    const response = await fetch(
        'http://localhost:3000/api/suppliers'
    );

    const data = await response.json();

    const table =
        document.getElementById('supplierTable');

    table.innerHTML = '';

    data.forEach(supplier => {

        table.innerHTML += `
            <tr class="border-b border-slate-800">

                <td class="p-4">
                    ${supplier.supplier_id}
                </td>

                <td class="p-4">
                    ${supplier.name}
                </td>

                <td class="p-4">
                    ${supplier.phone}
                </td>

            </tr>
        `;

    });

}

const form =
document.getElementById('supplierForm');

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const name =
    document.getElementById('name').value;

    const phone =
    document.getElementById('phone').value;

    const response = await fetch(
        'http://localhost:3000/api/suppliers',
        {
            method: 'POST',
            headers: {
                'Content-Type':
                'application/json'
            },
            body: JSON.stringify({
                name,
                phone
            })
        }
    );

    const data =
    await response.json();

    alert(data.message);

    location.reload();

});

window.onload = () => {

    getSuppliers();

};