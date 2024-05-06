<?php
// Consolidated PHP script for CRUD operations

// Function to establish a connection to the MySQL database
function connectToDatabase() {
    $host = 'bukd4iomk13wlvwir9ps-mysql.services.clever-cloud.com'; // MySQL server hostname
    $username = 'ud5eesb5lq8h0wcb'; // MySQL username
    $password = 'x9VTgtHA6T2HvbBbAJJU'; // MySQL password
    $database = 'bukd4iomk13wlvwir9ps'; // MySQL database name

    $mysqli = new mysqli($host, $username, $password, $database);
    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }
    return $mysqli;
}

// Function to add a new mission to the database
function addMission($missionType) {
    $mysqli = connectToDatabase();

    $stmt = $mysqli->prepare("INSERT INTO Mission (missionType) VALUES (?)");
    $stmt->bind_param("s", $missionType);

    if ($stmt->execute() === TRUE) {
        return true;
    } else {
        return false;
    }

    $stmt->close();
    $mysqli->close();
}

// Function to fetch existing missions from the database
function fetchMissions() {
    $mysqli = connectToDatabase();

    $sql = "SELECT * FROM Mission";
    $result = $mysqli->query($sql);

    if ($result->num_rows > 0) {
        $missions = [];
        while ($row = $result->fetch_assoc()) {
            $missions[] = $row;
        }
        return $missions;
    } else {
        return [];
    }

    $mysqli->close();
}

// Function to delete a mission from the database
function deleteMission($missionID) {
    $mysqli = connectToDatabase();

    $stmt = $mysqli->prepare("DELETE FROM Mission WHERE missionID = ?");
    $stmt->bind_param("i", $missionID);

    if ($stmt->execute() === TRUE) {
        return true;
    } else {
        return false;
    }

    $stmt->close();
    $mysqli->close();
}

// Handle requests from JavaScript
$action = $_POST['action'] ?? $_GET['action'] ?? '';

switch ($action) {
    case 'add':
        $missionType = $_POST['missionType'] ?? '';
        if (!empty($missionType)) {
            echo addMission($missionType) ? 'Mission added successfully' : 'Failed to add mission';
        } else {
            echo 'Mission type cannot be empty';
        }
        break;
    
    case 'fetch':
        $missions = fetchMissions();
        echo json_encode($missions);
        break;

    case 'delete':
        $missionID = $_GET['missionID'] ?? '';
        if (!empty($missionID)) {
            echo deleteMission($missionID) ? 'Mission deleted successfully' : 'Failed to delete mission';
        } else {
            echo 'Mission ID cannot be empty';
        }
        break;

    default:
        echo 'Invalid action';
}
?>
