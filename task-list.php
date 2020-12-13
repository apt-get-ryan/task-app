<?php
	include('database.php');
	$query = "SELECT * FROM tasks";
	$result = mysqli_query($connection, $query);
	if(!$result){
		die('Query failed.');
	}

	$json = array();
	while ($row = mysqli_fetch_array($result)) {
		$json[] = array(
			id => $row['id'],
			name => $row['name'],
			description => $row['description']
		);
	}
	$jsonstring = json_encode($json);
	echo $jsonstring;
?>