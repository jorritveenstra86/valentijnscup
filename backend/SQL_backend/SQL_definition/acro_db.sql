-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 16, 2020 at 03:30 PM
-- Server version: 5.7.25
-- PHP Version: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `acro_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
                        `team_id` bigint(20) UNSIGNED NOT NULL,
                        `teamnummer` smallint(6) NOT NULL,
                        `lijn` tinytext NOT NULL,
                        `naam1` tinytext NOT NULL,
                        `naam2` tinytext NOT NULL,
                        `naam3` tinytext NOT NULL,
                        `club` tinytext NOT NULL,
                        `niveau` tinytext NOT NULL,
                        `categorie` tinytext NOT NULL,
                        `technisch_balans` decimal(2,2) NOT NULL,
                        `artistiek_balans` decimal(2,2) NOT NULL,
                        `moeilijkheid_balans` decimal(2,2) NOT NULL,
                        `aftrekken_balans` decimal(2,2) NOT NULL,
                        `score_balans` decimal(2,2) NOT NULL,
                        `technisch_tempo` decimal(2,2) NOT NULL,
                        `artistiek_tempo` decimal(2,2) NOT NULL,
                        `moeilijkheid_tempo` decimal(2,2) NOT NULL,
                        `aftrekken_tempo` decimal(2,2) NOT NULL,
                        `score_tempo` decimal(2,2) NOT NULL,
                        `technisch_combi` decimal(2,2) NOT NULL,
                        `artistiek_combi` decimal(2,2) NOT NULL,
                        `moeilijkheid_combi` decimal(2,2) NOT NULL,
                        `aftrekken_combi` decimal(2,2) NOT NULL,
                        `score_combi` decimal(2,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`team_id`, `teamnummer`, `lijn`, `naam1`, `naam2`, `naam3`, `club`, `niveau`, `categorie`, `technisch_balans`, `artistiek_balans`, `moeilijkheid_balans`, `aftrekken_balans`, `score_balans`, `technisch_tempo`, `artistiek_tempo`, `moeilijkheid_tempo`, `aftrekken_tempo`, `score_tempo`, `technisch_combi`, `artistiek_combi`, `moeilijkheid_combi`, `aftrekken_combi`, `score_combi`) VALUES
(1, 1, 'elijn', 'Roel Noorman', 'Jorrit Veenstra', 'Peter Doornbos', 'Acro DUO', 'E-Senioren', 'Herentrio', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `team`
--
ALTER TABLE `team`
    ADD PRIMARY KEY (`team_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
    MODIFY `team_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
