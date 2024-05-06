document.addEventListener('DOMContentLoaded', function() {
    loadMissions();
    loadGroundAmbulances();
    loadVehicles();
    loadAirAmbulances();
    loadHouseCalls();
  
    document.getElementById('mission-form').addEventListener('submit', function(event) {
      event.preventDefault();
      addMission();
    });
  
    document.getElementById('ground-ambulance-form').addEventListener('submit', function(event) {
      event.preventDefault();
      addGroundAmbulance();
    });
  
    document.getElementById('vehicle-form').addEventListener('submit', function(event) {
      event.preventDefault();
      addVehicle();
    });
  
    document.getElementById('air-ambulance-form').addEventListener('submit', function(event) {
      event.preventDefault();
      addAirAmbulance();
    });
  
    document.getElementById('house-call-form').addEventListener('submit', function(event) {
      event.preventDefault();
      addHouseCall();
    });
  });
  
  function loadHouseCalls() {
    fetch('backend.php?action=readHouseCall')
      .then(response => response.json())
      .then(data => {
        const houseCallList = document.getElementById('house-call-list');
        houseCallList.innerHTML = '';
  
        data.forEach(houseCall => {
          const houseCallItem = document.createElement('div');
          houseCallItem.innerHTML = `
            <p><strong>Date of Run:</strong> ${houseCall.dateOfRun}</p>
            <p><strong>Vehicle ID:</strong> ${houseCall.vehicleID}</p>
            <p><strong>Mission ID:</strong> ${houseCall.missionID}</p>
            <p><strong>Destination Locations:</strong> ${houseCall.destinationLocations}</p>
            <button onclick="deleteHouseCall(${houseCall.houseCallID})">Delete</button>
          `;
          houseCallList.appendChild(houseCallItem);
        });
      });
  }
  
  function addHouseCall() {
    const dateOfRun = document.getElementById('dateOfRunHC').value;
    const vehicleID = document.getElementById('vehicleIDHC').value;
    const missionID = document.getElementById('missionIDHC').value;
    const destinationLocations = document.getElementById('destinationLocations').value;
  
    fetch('backend.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'addHouseCall',
        dateOfRun: dateOfRun,
        vehicleID: vehicleID,
        missionID: missionID,
        destinationLocations: destinationLocations,
      }),
    })
    .then(response => response.text())
    .then(data => {
      alert(data);
      loadHouseCalls();
    });
  }
  
  function deleteHouseCall(houseCallID) {
    if (confirm('Are you sure you want to delete this house call?')) {
      fetch('backend.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'deleteHouseCall',
          houseCallID: houseCallID,
        }),
      })
      .then(response => response.text())
      .then(data => {
        alert(data);
        loadHouseCalls();
      });
    }
  }
  