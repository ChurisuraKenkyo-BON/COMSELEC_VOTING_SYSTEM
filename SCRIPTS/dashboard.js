document.addEventListener("DOMContentLoaded", function () {
    fetchCandidates();
});

function fetchCandidates() {
    fetch("../BACKENDS/get_candidates.php")
        .then(response => response.json())
        .then(data => {
            const candidatesList = document.getElementById("candidates-list");
            candidatesList.innerHTML = "";

            data.forEach(position => {
                const positionHeader = document.createElement("div");
                positionHeader.className = "position-header";
                positionHeader.innerHTML = `
                    <h3>${position.position.toUpperCase().replace(/_/g, " ")}</h3>
                    <button class="toggle-button">Show</button>
                `;
                candidatesList.appendChild(positionHeader);

                const tableContainer = document.createElement("div");
                tableContainer.className = "table-container";
                tableContainer.style.display = "none"; 

                const table = document.createElement("table");
                table.innerHTML = `
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Course</th>
                            <th>Department</th>
                            <th>Year Level</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${position.candidates.map(candidate => `
                            <tr>
                                <td>${candidate.name}</td>
                                <td>${candidate.course}</td>
                                <td>${candidate.department}</td>
                                <td>${candidate.year_level}</td>
                                <td><img src="../${candidate.image_path}" alt="${candidate.name}" width="100"></td>
                                <td>
                                    <button class="delete-button" data-id="${candidate.id}" data-position="${position.position}">Delete</button>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                `;
                tableContainer.appendChild(table);
                candidatesList.appendChild(tableContainer);
                const toggleButton = positionHeader.querySelector(".toggle-button");
                toggleButton.addEventListener("click", () => {
                    if (tableContainer.style.display === "none") {
                        tableContainer.style.display = "block";
                        toggleButton.textContent = "Hide";
                    } else {
                        tableContainer.style.display = "none";
                        toggleButton.textContent = "Show";
                    }
                });
                const deleteButtons = tableContainer.querySelectorAll(".delete-button");
                deleteButtons.forEach(button => {
                    button.addEventListener("click", () => {
                        const candidateId = button.getAttribute("data-id");
                        const positionTable = button.getAttribute("data-position");
                        deleteCandidate(candidateId, positionTable);
                    });
                });
            });
        })
        .catch(error => console.error("Error fetching candidates:", error));
}

function deleteCandidate(candidateId, positionTable) {
    if (confirm("Are you sure you want to delete this candidate?")) {
        fetch(`../BACKENDS/delete_candidate.php?id=${candidateId}&table=${positionTable}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Candidate deleted successfully!");
                    fetchCandidates(); 
                } else {
                    alert("Error deleting candidate.");
                }
            })
            .catch(error => console.error("Error deleting candidate:", error));
    }
}