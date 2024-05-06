document.addEventListener('DOMContentLoaded', function() {
    // Fetch existing missions when the page loads
    fetchMissions();

    // Add event listener for form submission
    document.getElementById('addMissionForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        const missionType = document.getElementById('missionType').value;

        // Validate input
        if (missionType.trim() === '') {
            alert('Mission Type cannot be empty.');
            return;
        }

        // Send data to server
        addMission(missionType);
    });
});

// Function to fetch existing missions from the server
function fetchMissions() {
    fetch('crud.php?action=fetch')
    .then(response => response.json())
    .then(data => {
        const missionsTableBody = document.getElementById('missionsTableBody');
        missionsTableBody.innerHTML = ''; // Clear existing rows
        data.forEach(mission => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${mission.missionID}</td>
                <td>${mission.missionType}</td>
                <td>
                    <button onclick="deleteMission(${mission.missionID})">Delete</button>
                </td>
            `;
            missionsTableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching missions:', error));
}

// Function to add a new mission
function addMission(missionType) {
    const formData = new FormData();
    formData.append('action', 'add');
    formData.append('missionType', missionType);

    fetch('crud.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        fetchMissions(); // Refresh mission list
    })
    .catch(error => console.error('Error adding mission:', error));
}

// Function to delete a mission
function deleteMission(missionID) {
    fetch(`crud.php?action=delete&missionID=${missionID}`)
    .then(response => response.text())
    .then(message => {
        alert(message);
        fetchMissions(); // Refresh mission list
    })
    .catch(error => console.error('Error deleting mission:', error));
}
