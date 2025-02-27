document.addEventListener("DOMContentLoaded", function () {
    fetchCandidates();
    const form = document.getElementById("student-info-form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault(); 
            showReceipt(); 
        });
    } else {
        console.error("Form not found!");
    }
    const closePopupButton = document.getElementById("close-popup");
    if (closePopupButton) {
        closePopupButton.addEventListener("click", function () {
            document.getElementById("receipt-popup").style.display = "none";
        });
    } else {
        console.error("Close pop-up button not found!");
    }
    const confirmVoteButton = document.getElementById("confirm-vote");
    if (confirmVoteButton) {
        confirmVoteButton.addEventListener("click", function () {
            submitVote();
        });
    } else {
        console.error("Confirm vote button not found!");
    }
});

let candidatesData = {}; 

function fetchCandidates() {
    fetch("../BACKENDS/get_candidates.php")
        .then(response => response.json())
        .then(data => {
            const candidatesList = document.getElementById("candidates-list");
            candidatesList.innerHTML = "";

            data.forEach(position => {
                candidatesData[position.position] = position.candidates; 
                const positionHeader = document.createElement("div");
                positionHeader.className = "position-header";
                positionHeader.innerHTML = `
                    <h3>${position.position.toUpperCase().replace(/_/g, " ")}</h3>
                `;
                candidatesList.appendChild(positionHeader);
                const table = document.createElement("table");
                table.innerHTML = `
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Name</th>
                            <th>Course</th>
                            <th>Department</th>
                            <th>Year Level</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${position.candidates.map(candidate => `
                            <tr>
                                <td>
                                    ${position.position === "senators" ?
                                        `<input type="checkbox" name="${position.position}" value="${candidate.id}">` :
                                        `<input type="radio" name="${position.position}" value="${candidate.id}">`
                                    }
                                </td>
                                <td>${candidate.name}</td>
                                <td>${candidate.course}</td>
                                <td>${candidate.department}</td>
                                <td>${candidate.year_level}</td>
                                <td><img src="../${candidate.image_path}" alt="${candidate.name}" width="100"></td>
                            </tr>
                        `).join("")}
                        ${position.position === "senators" || position.position === "usg_vice_president" || position.position === "usg_president" ? `
                            <tr>
                                <td>
                                    ${position.position === "senators" ?
                                        `<input type="checkbox" name="${position.position}" value="0">` :
                                        `<input type="radio" name="${position.position}" value="0">`
                                    }
                                </td>
                                <td colspan="5">Abstain</td>
                            </tr>
                        ` : ''}
                    </tbody>
                `;
                candidatesList.appendChild(table);
            });
        })
        .catch(error => console.error("Error fetching candidates:", error));
}

function showReceipt() {
    const studentInfo = {
        tupvId: document.getElementById("tupv-id").value,
        course: document.getElementById("course").value,
        department: document.getElementById("department").value,
        yearLevel: document.getElementById("year-level").value,
    };

    const votes = {};
    const positions = [
        "usg_president",
        "usg_vice_president",
        "senators"
    ];

    positions.forEach(position => {
        if (position === "senators") {
            const selected = document.querySelectorAll(`input[name="${position}"]:checked`);
            votes[position] = Array.from(selected).map(input => input.value);
        } else {
            const selected = document.querySelector(`input[name="${position}"]:checked`);
            votes[position] = selected ? selected.value : "0"; 
        }
    });

    if (votes["senators"] && votes["senators"].length > 5) {
        alert("You can vote for a maximum of 5 Senators.");
        return;
    }

    const voteDetails = positions.map(position => {
        if (position === "senators") {
            const selectedIds = votes[position];
            if (selectedIds.includes("0")) {
                return {
                    position: position,
                    name: "Abstain",
                };
            } else {
                const selectedCandidates = selectedIds.map(id => {
                    const candidate = candidatesData[position].find(c => c.id == id);
                    return candidate ? candidate.name : "Unknown";
                });
                return {
                    position: position,
                    name: selectedCandidates.join(", "),
                };
            }
        } else {
            const candidateId = votes[position];
            if (candidateId === "0") {
                return {
                    position: position,
                    name: "Abstain",
                };
            } else {
                const candidate = candidatesData[position].find(c => c.id == candidateId);
                return {
                    position: position,
                    name: candidate ? candidate.name : "Unknown",
                };
            }
        }
    });
    const receiptContent = document.getElementById("receipt-content");
    receiptContent.innerHTML = `
        <h2>Voting Receipt</h2>
        <p><strong>TUPV-ID-NUMBER:</strong> ${studentInfo.tupvId}</p>
        <p><strong>COURSE:</strong> ${studentInfo.course}</p>
        <p><strong>DEPARTMENT:</strong> ${studentInfo.department}</p>
        <p><strong>Year-Level:</strong> ${studentInfo.yearLevel}</p>
        <h3>Your Votes:</h3>
        <ul>
            ${voteDetails.map(vote => `
                <li>
                    <strong>${vote.position.toUpperCase().replace(/_/g, " ")}:</strong>
                    ${vote.name}
                </li>
            `).join("")}
        </ul>
    `;

    document.getElementById("receipt-popup").style.display = "flex";
}

function submitVote() {
    const studentInfo = {
        tupvId: document.getElementById("tupv-id").value,
        course: document.getElementById("course").value,
        department: document.getElementById("department").value,
        yearLevel: document.getElementById("year-level").value,
    };

    const votes = {};
    const positions = [
        "usg_president",
        "usg_vice_president",
        "senators"
    ];

    positions.forEach(position => {
        if (position === "senators") {
            const selected = document.querySelectorAll(`input[name="${position}"]:checked`);
            votes[position] = Array.from(selected).map(input => input.value);
        } else {
            const selected = document.querySelector(`input[name="${position}"]:checked`);
            votes[position] = selected ? selected.value : "0"; 
        }
    });
    if (votes["senators"] && votes["senators"].length > 5) {
        alert("You can vote for a maximum of 5 Senators.");
        return;
    }

    const voteData = {
        ...studentInfo,
        votes,
        date: new Date().toISOString().split("T")[0], 
        time: new Date().toLocaleTimeString(), 
    };
    fetch("../BACKENDS/submit_vote.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(voteData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert("Vote submitted successfully!");
                window.location.href = "../VIEWS/index.html"; 
            } else {
                alert("Error submitting vote: " + (data.error || "Unknown error"));
            }
        })
        .catch(error => {
            console.error("Error submitting vote:", error);
            alert("Error submitting vote. Please check the console for details.");
        });
}

document.addEventListener("DOMContentLoaded", function () {
    const backButton = document.getElementById("back-button");
    backButton.addEventListener("click", function () {
        window.location.href = "../VIEWS/index.html";
    });
});
