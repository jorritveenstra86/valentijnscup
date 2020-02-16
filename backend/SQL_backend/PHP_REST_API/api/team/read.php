<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once '../objects/team.php';

// instantiate database and product object
$database = new Database();
$db = $database->getConnection();

// initialize object
$team = new Team($db);

// query products
$stmt = $team->read();
$num = $stmt->rowCount();

// check if more than 0 record found
if($num>0){

  // products array
  $teams_arr=array();
  $teams_arr["teams"]=array();

  // retrieve our table contents
  // fetch() is faster than fetchAll()
  // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
  while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    // extract row
    // this will make $row['name'] to
    // just $name only
    extract($row);

    $team_item=array(
      "team_id" => $team_id,
      "teamnummer" => $teamnummer,
      "lijn" => $lijn,
      "naam1" => $naam1,
      "naam2" => $naam2,
      "naam3" => $naam3,
      "club" => $club,
      "niveau" => $niveau,
      "technisch_balans" => $technisch_balans,
      "artistiek_balans" => $artistiek_balans,
      "moeilijkheid_balans" => $moeilijkheid_balans,
      "aftrekken_balans" => $aftrekken_balans,
      "score_balans" => $score_balans,
      "technisch_tempo" => $technisch_tempo,
      "artistiek_tempo" => $artistiek_tempo,
      "moeilijkheid_tempo" => $moeilijkheid_tempo,
      "aftrekken_tempo" => $aftrekken_tempo,
      "score_tempo" => $score_tempo,
      "technisch_combi" => $technisch_combi,
      "artistiek_combi" => $artistiek_combi,
      "moeilijkheid_combi" => $moeilijkheid_combi,
      "aftrekken_combi" => $aftrekken_combi,
      "score_combi" => $score_combi

    );

    array_push($teams_arr["teams"], $team_item);
  }

  // set response code - 200 OK
  http_response_code(200);

  // show products data in json format
  echo json_encode($teams_arr);
}

else{

  // set response code - 404 Not found
  http_response_code(404);

  // tell the user no products found
  echo json_encode(
    array("message" => "No teams found.")
  );
}
