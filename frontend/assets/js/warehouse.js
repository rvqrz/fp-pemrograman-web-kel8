async function getWarehouses() {

    const response = await fetch(
        'http://localhost:3000/api/warehouses'
    );

    const data = await response.json();

    const table =
        document.getElementById('warehouseTable');

    table.innerHTML = '';

    data.forEach(warehouse => {

        table.innerHTML += `
            <tr class="border-b border-slate-800">

                <td class="p-4">
                    ${warehouse.warehouse_id}
                </td>

                <td class="p-4">
                    ${warehouse.name}
                </td>

                <td class="p-4">
                    ${warehouse.location}
                </td>

            </tr>
        `;

    });

}

const form =
    document.getElementById('warehouseForm');

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const name =
        document.getElementById('name').value;

    const location =
        document.getElementById('location').value;

    const response = await fetch(
        'http://localhost:3000/api/warehouses',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                location
            })
        }
    );

    const data =
        await response.json();

    alert(data.message);

    location.reload();

});

window.onload = () => {

    getWarehouses();

};