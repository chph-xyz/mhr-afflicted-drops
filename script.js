document.getElementById('filter-btn').addEventListener('click', filterData);

let csvData = [];

// Fetch and parse CSV
fetch('afflictedDrops.csv')
    .then(response => response.text())
    .then(data => {
        csvData = data.split('\n').slice(1).map(row => {
            const [materialDrop, monsterName, levelRange] = row.split(',');
            return { materialDrop, monsterName, levelRange };
        });
    });

function filterData() {
    const materialDropInput = document.getElementById('material-drop').value.toLowerCase();
    const monsterNameInput = document.getElementById('monster-name').value.toLowerCase();
    const levelRangeInput = document.getElementById('level-range').value.toLowerCase();
    
    const filtered = csvData.filter(item => {
        return (
            (!materialDropInput || item.materialDrop.toLowerCase().includes(materialDropInput)) &&
            (!monsterNameInput || item.monsterName.toLowerCase().includes(monsterNameInput)) &&
            (!levelRangeInput || item.levelRange.toLowerCase().includes(levelRangeInput))
        );
    });

    displayResults(filtered);
}

function displayResults(data) {
    const results = document.getElementById('results');
    results.innerHTML = ''; // Clear previous results

    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.materialDrop}</td>
            <td>${row.monsterName}</td>
            <td>${row.levelRange}</td>
        `;
        results.appendChild(tr);
    });
}
