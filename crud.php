<?php
// Database connection
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "dbname";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Handle CRUD operations for HouseCall table
if ($_SERVER["REQUEST_METHOD"] == "GET") {
  if ($_GET["action"] == "readHouseCall") {
    $sql = "SELECT * FROM HouseCall";
    $result = $conn->query($sql);
    $houseCalls = array();

    if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        $houseCalls[] = $row;
      }
    }

    header('Content-Type: application/json');
    echo json_encode($houseCalls);
  }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $action = $_POST["action"];

  if ($action == "addHouseCall") {
    $dateOfRun = $_POST["dateOfRun"];
    $vehicleID = $_POST["vehicleID"];
    $missionID = $_POST["missionID"];
    $destinationLocations = $_POST["destinationLocations"];
    $sql = "INSERT INTO HouseCall (dateOfRun, vehicleID, missionID, destinationLocations) 
            VALUES ('$dateOfRun', '$vehicleID', '$missionID', '$destinationLocations')";

    if ($conn->query($sql) === TRUE) {
      echo "House call added successfully";
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
  }

  if ($action == "deleteHouseCall") {
    $houseCallID = $_POST["houseCallID"];
    $sql = "DELETE FROM HouseCall WHERE houseCallID = $houseCallID";

    if ($conn->query($sql) === TRUE) {
      echo "House call deleted successfully";
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }
  }
}

$conn->close();
?>
