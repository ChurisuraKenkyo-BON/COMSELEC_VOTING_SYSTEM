document.addEventListener("DOMContentLoaded", function () {
    fetchTallyResults();
    fetchTotalVoters();
});

function fetchTallyResults() {
    fetch("../BACKENDS/get_tally.php")
        .then(response => response.json())
        .then(data => {
            const tallyResults = document.getElementById("tally-results");
            tallyResults.innerHTML = "";

            data.forEach(position => {
                const positionHeader = document.createElement("h3");
                positionHeader.textContent = position.position.toUpperCase().replace(/_/g, " ");
                tallyResults.appendChild(positionHeader);

                position.candidates.forEach(candidate => {
                    const candidateCard = document.createElement("div");
                    candidateCard.className = "candidate-card";

                    candidateCard.innerHTML = `
                        <img src="../${candidate.image_path}" alt="${candidate.name}">
                        <div class="candidate-info">
                            <h3>${candidate.name}</h3>
                            <p><strong>Votes Received:</strong> ${candidate.votes}</p>
                        </div>
                    `;
                    tallyResults.appendChild(candidateCard);
                });
            });
        })
        .catch(error => console.error("Error fetching tally results:", error));
}

function fetchTotalVoters() {
    fetch("../BACKENDS/get_total_voters.php")
        .then(response => response.json())
        .then(data => {
            document.getElementById("total-voters-count").textContent = data.totalVoters;
        })
        .catch(error => console.error("Error fetching total voters:", error));
}