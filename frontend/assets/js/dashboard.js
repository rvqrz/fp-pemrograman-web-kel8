const ctx = document.getElementById('warehouseChart');

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Transactions',
            data: [120, 190, 300, 250, 180, 400],
        }]
    }
});