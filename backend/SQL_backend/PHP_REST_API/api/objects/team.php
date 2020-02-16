<?php
class Team{

  // database connection and table name
  private $conn;
  private $table_name = "team";

  // object properties
  public $team_id;
  public $teamnummer;
  public $lijn;
  public $naam1;
  public $naam2;
  public $naam3;
  public $club;
  public $niveau;
  public $categorie;
  public $technisch_balans;
  public $artistiek_balans;
  public $moeilijkheid_balans;
  public $aftrekken_balans;
  public $score_balans;
  public $technisch_tempo;
  public $artistiek_tempo;
  public $moeilijkheid_tempo;
  public $aftrekken_tempo;
  public $score_tempo;
  public $technisch_combi;
  public $artistiek_combi;
  public $moeilijkheid_combi;
  public $aftrekken_combi;
  public $score_combi;

  // constructor with $db as database connection
  public function __construct($db){
    $this->conn = $db;
  }

  // read teams
  function read(){

    // select all query
    $query = "SELECT
                *
            FROM
                " . $this->table_name . " p
            ORDER BY
                p.teamnummer DESC";

    // prepare query statement
    $stmt = $this->conn->prepare($query);

    // execute query
    $stmt->execute();

    return $stmt;
  }
}
?>
