document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const tableBody = document.querySelector("#dataTable tbody");
  
    // Fetch the CSV file and process it manually
    fetch("afflictedDrops.csv")
      .then((response) => response.text())
      .then((csvText) => {
        const data = parseCSV(csvText); // Convert CSV text to a 2D array
        populateTable(data); // Populate the table with data
  
        // Add event listener for the search input
        searchInput.addEventListener("input", () => {
          const searchTerm = searchInput.value.toLowerCase();
          const filteredData = data.filter((row) =>
            row.some((cell) =>
              cell.toLowerCase().includes(searchTerm)
            )
          );
          populateTable(filteredData); // Re-populate table with filtered data
        });
      });
  
    // Function to manually parse CSV text into a 2D array
    function parseCSV(csvText) {
      return csvText
        .trim() // Remove extra whitespace
        .split("\n") // Split rows by newline
        .map((row) => row.split(",")); // Split cells by commas
    }
  
    // Function to populate the table
    function populateTable(data) {
      tableBody.innerHTML = ""; // Clear existing rows
      data.forEach((row) => {
        const tableRow = document.createElement("tr");
        row.forEach((cell) => {
          const cellElement = document.createElement("td");
          cellElement.textContent = cell;
          tableRow.appendChild(cellElement);
        });
        tableBody.appendChild(tableRow);
      });
    }
  });
  