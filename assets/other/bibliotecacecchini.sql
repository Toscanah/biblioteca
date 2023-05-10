-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 10, 2023 at 11:47 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bibliotecacecchini`
--

-- --------------------------------------------------------

--
-- Table structure for table `taddetto`
--

CREATE TABLE `taddetto` (
  `id` int(11) NOT NULL,
  `nome` text DEFAULT NULL,
  `cognome` text DEFAULT NULL,
  `cf` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `idBiblioteca` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tarmadio`
--

CREATE TABLE `tarmadio` (
  `id` int(11) NOT NULL,
  `armadio` int(11) DEFAULT NULL,
  `idStanza` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tarmadio`
--

INSERT INTO `tarmadio` (`id`, `armadio`, `idStanza`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tautore`
--

CREATE TABLE `tautore` (
  `id` int(11) NOT NULL,
  `nome` text DEFAULT NULL,
  `cognome` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tautore`
--

INSERT INTO `tautore` (`id`, `nome`, `cognome`) VALUES
(1, 'J.R.R.', 'Tolkien'),
(2, 'Emile', 'Zola');

-- --------------------------------------------------------

--
-- Table structure for table `tbiblioteca`
--

CREATE TABLE `tbiblioteca` (
  `id` int(11) NOT NULL,
  `nome` text DEFAULT NULL,
  `via` text DEFAULT NULL,
  `citta` text DEFAULT NULL,
  `civico` text DEFAULT NULL,
  `cap` int(11) DEFAULT NULL,
  `longitudine` float DEFAULT NULL,
  `latitudine` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbiblioteca`
--

INSERT INTO `tbiblioteca` (`id`, `nome`, `via`, `citta`, `civico`, `cap`, `longitudine`, `latitudine`) VALUES
(1, 'Biblioteca Comunale', 'Via Roma', 'Milano', '12', 20121, 13.7809, 45.6569),
(2, 'Biblioteca Civica', 'Via Dante', 'Roma', '23', 30684, 41.9002, 12.4922),
(3, 'Biblioteca Nazionale', 'Via XX Settembre', 'Firenze', '45', 50129, 43.7793, 11.2474),
(4, 'Biblioteca Universitaria', 'Via Archimede', 'Napoli', '34', 80125, 40.8309, 14.2535),
(5, 'Biblioteca di Stato', 'Via dei Servi', 'Bologna', '24', 40121, 44.4968, 11.342);

-- --------------------------------------------------------

--
-- Table structure for table `tcartageopolitica`
--

CREATE TABLE `tcartageopolitica` (
  `id` int(11) NOT NULL,
  `titolo` text DEFAULT NULL,
  `descrizione` text DEFAULT NULL,
  `annoPubblicazione` year(4) DEFAULT NULL,
  `annoRiferimento` year(4) DEFAULT NULL,
  `idElemento` int(11) NOT NULL,
  `idFoto` int(11) NOT NULL,
  `idCasaEditrice` int(11) DEFAULT NULL,
  `idScaffale` int(11) DEFAULT NULL,
  `numeroScaffale` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tcartageopolitica`
--

INSERT INTO `tcartageopolitica` (`id`, `titolo`, `descrizione`, `annoPubblicazione`, `annoRiferimento`, `idElemento`, `idFoto`, `idCasaEditrice`, `idScaffale`, `numeroScaffale`) VALUES
(1, 'Titolo 1', NULL, 2000, 1990, 11, 1, 1, 1, 11),
(2, 'Titolo 2', NULL, 2005, 2000, 12, 1, 1, 1, 12),
(3, 'Titolo 3', NULL, 2010, 2005, 13, 1, 1, 1, 13),
(4, 'Titolo 4', NULL, 2015, 2010, 14, 1, 1, 1, 14),
(5, 'Titolo 5', NULL, 2020, 2015, 15, 1, 1, 1, 15);

-- --------------------------------------------------------

--
-- Table structure for table `tcasaeditrice`
--

CREATE TABLE `tcasaeditrice` (
  `id` int(11) NOT NULL,
  `nome` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tcasaeditrice`
--

INSERT INTO `tcasaeditrice` (`id`, `nome`) VALUES
(1, 'Mondadori');

-- --------------------------------------------------------

--
-- Table structure for table `telemento`
--

CREATE TABLE `telemento` (
  `id` int(11) NOT NULL,
  `isbn` text NOT NULL,
  `tipo` enum('libro','enciclopedia','carta geopolitica') NOT NULL,
  `stato` enum('disponibile','prenotato','prestato') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `telemento`
--

INSERT INTO `telemento` (`id`, `isbn`, `tipo`, `stato`) VALUES
(1, '9788806220703', 'libro', 'prenotato'),
(2, '9788806237534', 'libro', 'disponibile'),
(3, '9788817106104', 'libro', 'disponibile'),
(4, '9788815240115', 'libro', 'disponibile'),
(5, '9788817106128', 'libro', 'disponibile'),
(6, '9788861905365', 'enciclopedia', 'disponibile'),
(7, '9788861905389', 'enciclopedia', 'disponibile'),
(8, '9788817100096', 'enciclopedia', 'disponibile'),
(9, '9788817100126', 'enciclopedia', 'disponibile'),
(10, '9788828200419', 'enciclopedia', 'disponibile'),
(11, '9788836542422', 'carta geopolitica', 'disponibile'),
(12, '9788898436064', 'carta geopolitica', 'disponibile'),
(13, '9788879143811', 'carta geopolitica', 'disponibile'),
(14, '9788839208265', 'carta geopolitica', 'disponibile'),
(15, '9788898436033', 'carta geopolitica', 'disponibile');

-- --------------------------------------------------------

--
-- Table structure for table `tfoto`
--

CREATE TABLE `tfoto` (
  `id` int(11) NOT NULL,
  `foto` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tfoto`
--

INSERT INTO `tfoto` (`id`, `foto`) VALUES
(1, 'eragon.jpg'),
(2, 'eldest.jpg'),
(3, 'inheritance.jpg'),
(4, 'brisingr.jpg'),
(5, 'signore_anelli.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tlibro`
--

CREATE TABLE `tlibro` (
  `id` int(11) NOT NULL,
  `titolo` text DEFAULT NULL,
  `descrizione` text DEFAULT NULL,
  `annoPubblicazione` year(4) DEFAULT NULL,
  `idElemento` int(11) NOT NULL,
  `idFoto` int(11) NOT NULL,
  `idCasaEditrice` int(11) DEFAULT NULL,
  `idScaffale` int(11) DEFAULT NULL,
  `numeroScaffale` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tlibro`
--

INSERT INTO `tlibro` (`id`, `titolo`, `descrizione`, `annoPubblicazione`, `idElemento`, `idFoto`, `idCasaEditrice`, `idScaffale`, `numeroScaffale`) VALUES
(1, 'Eragon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2002, 1, 1, 1, 1, 1),
(2, 'Eldest', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2005, 2, 2, 1, 1, 2),
(3, 'Inheritance', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2011, 4, 3, 1, 1, 4),
(4, 'Brisingr', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2008, 3, 4, 1, 1, 3),
(5, 'Il signore degli anelli', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1954, 5, 5, 1, 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `tprenotazione`
--

CREATE TABLE `tprenotazione` (
  `id` int(11) NOT NULL,
  `idElemento` int(11) DEFAULT NULL,
  `dataPrenotazione` date DEFAULT NULL,
  `stato` enum('da confermare','in prestito','terminata') NOT NULL,
  `idUtente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tprenotazione`
--

INSERT INTO `tprenotazione` (`id`, `idElemento`, `dataPrenotazione`, `stato`, `idUtente`) VALUES
(7, 11, '2023-05-08', 'da confermare', 1),
(9, 11, '2023-05-08', 'da confermare', 1),
(24, 11, '2023-05-08', 'da confermare', 1),
(25, 11, '2023-05-08', 'da confermare', 1),
(26, 11, '2023-05-08', 'da confermare', 1),
(27, 11, '2023-05-08', 'da confermare', 1),
(28, 11, '2023-05-08', 'da confermare', 1),
(29, 11, '2023-05-08', 'da confermare', 1),
(30, 11, '2023-05-08', 'da confermare', 1),
(31, 11, '2023-05-08', 'da confermare', 1),
(32, 11, '2023-05-08', 'da confermare', 1),
(33, 11, '2023-05-08', 'da confermare', 1),
(34, 11, '2023-05-08', 'da confermare', 1),
(35, 11, '2023-05-08', 'da confermare', 1),
(36, 11, '2023-05-08', 'da confermare', 1),
(37, 11, '2023-05-08', 'da confermare', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tprestito`
--

CREATE TABLE `tprestito` (
  `id` int(11) NOT NULL,
  `dataPrestito` date DEFAULT NULL,
  `idPrenotazione` int(11) DEFAULT NULL,
  `idAddetto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tproduzione`
--

CREATE TABLE `tproduzione` (
  `id` int(11) NOT NULL,
  `idAutore` int(11) DEFAULT NULL,
  `idElemento` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tproduzione`
--

INSERT INTO `tproduzione` (`id`, `idAutore`, `idElemento`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 1, 2),
(4, 1, 3),
(5, 1, 4),
(6, 1, 5),
(7, 1, 6),
(8, 1, 7),
(9, 1, 8),
(10, 1, 9),
(11, 1, 10),
(12, 1, 11),
(13, 1, 12),
(14, 1, 13),
(15, 1, 14),
(16, 1, 15);

-- --------------------------------------------------------

--
-- Table structure for table `tritiro`
--

CREATE TABLE `tritiro` (
  `id` int(11) NOT NULL,
  `dataRitiro` date DEFAULT NULL,
  `idPrenotazione` int(11) DEFAULT NULL,
  `idAddetto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tscaffale`
--

CREATE TABLE `tscaffale` (
  `id` int(11) NOT NULL,
  `scaffale` int(11) DEFAULT NULL,
  `idArmadio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tscaffale`
--

INSERT INTO `tscaffale` (`id`, `scaffale`, `idArmadio`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tstanza`
--

CREATE TABLE `tstanza` (
  `id` int(11) NOT NULL,
  `stanza` int(11) DEFAULT NULL,
  `idBiblioteca` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tstanza`
--

INSERT INTO `tstanza` (`id`, `stanza`, `idBiblioteca`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ttelefono`
--

CREATE TABLE `ttelefono` (
  `id` int(11) NOT NULL,
  `telefono` text DEFAULT NULL,
  `idUtente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tutente`
--

CREATE TABLE `tutente` (
  `id` int(11) NOT NULL,
  `nome` text DEFAULT NULL,
  `cognome` text DEFAULT NULL,
  `cf` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `password` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tutente`
--

INSERT INTO `tutente` (`id`, `nome`, `cognome`, `cf`, `email`, `password`) VALUES
(1, 'Alessandro', 'Cecchini', 'ggg423g4', 'a@a.a', '123');

-- --------------------------------------------------------

--
-- Table structure for table `tvolume`
--

CREATE TABLE `tvolume` (
  `id` int(11) NOT NULL,
  `titolo` text DEFAULT NULL,
  `descrizione` text DEFAULT NULL,
  `annoPubblicazione` year(4) DEFAULT NULL,
  `volume` int(11) DEFAULT NULL,
  `idElemento` int(11) NOT NULL,
  `idFoto` int(11) NOT NULL,
  `idCasaEditrice` int(11) DEFAULT NULL,
  `idScaffale` int(11) DEFAULT NULL,
  `numeroScaffale` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tvolume`
--

INSERT INTO `tvolume` (`id`, `titolo`, `descrizione`, `annoPubblicazione`, `volume`, `idElemento`, `idFoto`, `idCasaEditrice`, `idScaffale`, `numeroScaffale`) VALUES
(1, 'Enciclopedia della musica', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2006, 1, 6, 1, 1, 1, 6),
(2, 'Enciclopedia della musica', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2006, 2, 7, 1, 1, 1, 7),
(3, 'Enciclopedia delle scienze', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2015, 1, 8, 1, 1, 1, 8),
(4, 'Enciclopedia degli scienze', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2015, 2, 9, 1, 1, 1, 9),
(5, 'Enciclopedia degli scienze', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2015, 3, 10, 1, 1, 1, 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `taddetto`
--
ALTER TABLE `taddetto`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tarmadio`
--
ALTER TABLE `tarmadio`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tautore`
--
ALTER TABLE `tautore`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbiblioteca`
--
ALTER TABLE `tbiblioteca`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tcartageopolitica`
--
ALTER TABLE `tcartageopolitica`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCasaEditrice` (`idCasaEditrice`),
  ADD KEY `idScaffale` (`idScaffale`),
  ADD KEY `idCasaEditrice_2` (`idCasaEditrice`),
  ADD KEY `idScaffale_2` (`idScaffale`);

--
-- Indexes for table `tcasaeditrice`
--
ALTER TABLE `tcasaeditrice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `telemento`
--
ALTER TABLE `telemento`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tfoto`
--
ALTER TABLE `tfoto`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tlibro`
--
ALTER TABLE `tlibro`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tprenotazione`
--
ALTER TABLE `tprenotazione`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tprestito`
--
ALTER TABLE `tprestito`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tproduzione`
--
ALTER TABLE `tproduzione`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tritiro`
--
ALTER TABLE `tritiro`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tscaffale`
--
ALTER TABLE `tscaffale`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tstanza`
--
ALTER TABLE `tstanza`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ttelefono`
--
ALTER TABLE `ttelefono`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tutente`
--
ALTER TABLE `tutente`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tvolume`
--
ALTER TABLE `tvolume`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `taddetto`
--
ALTER TABLE `taddetto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tarmadio`
--
ALTER TABLE `tarmadio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tautore`
--
ALTER TABLE `tautore`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbiblioteca`
--
ALTER TABLE `tbiblioteca`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tcartageopolitica`
--
ALTER TABLE `tcartageopolitica`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tcasaeditrice`
--
ALTER TABLE `tcasaeditrice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `telemento`
--
ALTER TABLE `telemento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `tfoto`
--
ALTER TABLE `tfoto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tlibro`
--
ALTER TABLE `tlibro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `tprenotazione`
--
ALTER TABLE `tprenotazione`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `tprestito`
--
ALTER TABLE `tprestito`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tproduzione`
--
ALTER TABLE `tproduzione`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tritiro`
--
ALTER TABLE `tritiro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tscaffale`
--
ALTER TABLE `tscaffale`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tstanza`
--
ALTER TABLE `tstanza`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ttelefono`
--
ALTER TABLE `ttelefono`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tutente`
--
ALTER TABLE `tutente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tvolume`
--
ALTER TABLE `tvolume`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tcartageopolitica`
--
ALTER TABLE `tcartageopolitica`
  ADD CONSTRAINT `tcartageopolitica_ibfk_1` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`id`),
  ADD CONSTRAINT `tcartageopolitica_ibfk_10` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`id`),
  ADD CONSTRAINT `tcartageopolitica_ibfk_11` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`id`),
  ADD CONSTRAINT `tcartageopolitica_ibfk_12` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`id`),
  ADD CONSTRAINT `tcartageopolitica_ibfk_13` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`id`),
  ADD CONSTRAINT `tcartageopolitica_ibfk_14` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`id`),
  ADD CONSTRAINT `tcartageopolitica_ibfk_2` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`id`),
  ADD CONSTRAINT `tcartageopolitica_ibfk_3` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`id`),
  ADD CONSTRAINT `tcartageopolitica_ibfk_4` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`id`),
  ADD CONSTRAINT `tcartageopolitica_ibfk_5` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`id`),
  ADD CONSTRAINT `tcartageopolitica_ibfk_6` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`id`),
  ADD CONSTRAINT `tcartageopolitica_ibfk_7` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`id`),
  ADD CONSTRAINT `tcartageopolitica_ibfk_8` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`id`),
  ADD CONSTRAINT `tcartageopolitica_ibfk_9` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`id`);

--
-- Constraints for table `tlibro`
--
ALTER TABLE `tlibro`
  ADD CONSTRAINT `tlibro_ibfk_1` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`id`),
  ADD CONSTRAINT `tlibro_ibfk_10` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`id`),
  ADD CONSTRAINT `tlibro_ibfk_11` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`id`),
  ADD CONSTRAINT `tlibro_ibfk_12` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`id`),
  ADD CONSTRAINT `tlibro_ibfk_13` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`id`),
  ADD CONSTRAINT `tlibro_ibfk_14` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`id`),
  ADD CONSTRAINT `tlibro_ibfk_2` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`id`),
  ADD CONSTRAINT `tlibro_ibfk_3` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`id`),
  ADD CONSTRAINT `tlibro_ibfk_4` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`id`),
  ADD CONSTRAINT `tlibro_ibfk_5` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`id`),
  ADD CONSTRAINT `tlibro_ibfk_6` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`id`),
  ADD CONSTRAINT `tlibro_ibfk_7` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`id`),
  ADD CONSTRAINT `tlibro_ibfk_8` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`id`),
  ADD CONSTRAINT `tlibro_ibfk_9` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`id`);

--
-- Constraints for table `tvolume`
--
ALTER TABLE `tvolume`
  ADD CONSTRAINT `tvolume_ibfk_1` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`id`),
  ADD CONSTRAINT `tvolume_ibfk_10` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`id`),
  ADD CONSTRAINT `tvolume_ibfk_11` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`id`),
  ADD CONSTRAINT `tvolume_ibfk_12` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`id`),
  ADD CONSTRAINT `tvolume_ibfk_13` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`id`),
  ADD CONSTRAINT `tvolume_ibfk_14` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`id`),
  ADD CONSTRAINT `tvolume_ibfk_2` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`id`),
  ADD CONSTRAINT `tvolume_ibfk_3` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`id`),
  ADD CONSTRAINT `tvolume_ibfk_4` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`id`),
  ADD CONSTRAINT `tvolume_ibfk_5` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`id`),
  ADD CONSTRAINT `tvolume_ibfk_6` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`id`),
  ADD CONSTRAINT `tvolume_ibfk_7` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`id`),
  ADD CONSTRAINT `tvolume_ibfk_8` FOREIGN KEY (`idScaffale`) REFERENCES `tscaffale` (`id`),
  ADD CONSTRAINT `tvolume_ibfk_9` FOREIGN KEY (`idCasaEditrice`) REFERENCES `tcasaeditrice` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
