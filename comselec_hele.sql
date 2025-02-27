-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 30, 2025 at 11:32 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `comselec_hele`
--

-- --------------------------------------------------------

--
-- Table structure for table `officers`
--

CREATE TABLE `officers` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `officer_code` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `officers`
--

INSERT INTO `officers` (`id`, `username`, `password`, `officer_code`) VALUES
(1, 'BON', '$2y$10$ejT/mnTv7YLVD2yw.KWKneYQxScxZG/02Gx8H3FQQri5gt7lM2SVa', '11110000');

-- --------------------------------------------------------

--
-- Table structure for table `senators`
--

CREATE TABLE `senators` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `course` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL,
  `year_level` varchar(50) NOT NULL,
  `image_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `senators`
--

INSERT INTO `senators` (`id`, `name`, `course`, `department`, `year_level`, `image_path`) VALUES
(1, 'BONI', 'BSCPE', 'COE', '1st', 'IMAGES/chrysler.jpg'),
(2, 'Chrysler Vaughn Biboso Calimpong', 'BSCPE', 'COE', '1st', 'IMAGES/chrysler.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tally`
--

CREATE TABLE `tally` (
  `id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  `position` varchar(100) NOT NULL,
  `votes` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tally`
--

INSERT INTO `tally` (`id`, `candidate_id`, `position`, `votes`) VALUES
(1, 1, 'usg_president', 3),
(2, 1, 'usg_vice_president', 3),
(3, 1, 'senators', 3),
(4, 2, 'senators', 3),
(5, 2, 'usg_president', 2),
(6, 2, 'usg_vice_president', 2);

-- --------------------------------------------------------

--
-- Table structure for table `usg_president`
--

CREATE TABLE `usg_president` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `course` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL,
  `year_level` varchar(50) NOT NULL,
  `image_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usg_president`
--

INSERT INTO `usg_president` (`id`, `name`, `course`, `department`, `year_level`, `image_path`) VALUES
(1, 'BONI', 'BSCPE', 'COE', '1st', 'IMAGES/chrysler.jpg'),
(2, 'Chrysler Vaughn Biboso Calimpong', 'BSCPE', 'COE', '1st', 'IMAGES/chrysler.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `usg_vice_president`
--

CREATE TABLE `usg_vice_president` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `course` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL,
  `year_level` varchar(50) NOT NULL,
  `image_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usg_vice_president`
--

INSERT INTO `usg_vice_president` (`id`, `name`, `course`, `department`, `year_level`, `image_path`) VALUES
(1, 'Chrysler Vaughn Biboso Calimpong', 'BSCPE', 'COE', '1st', 'IMAGES/chrysler.jpg'),
(2, 'BONI', 'BSCPE', 'COE', '1st', 'IMAGES/chrysler.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `id` int(11) NOT NULL,
  `tupv_id` varchar(50) NOT NULL,
  `course` varchar(100) NOT NULL,
  `department` varchar(100) NOT NULL,
  `year_level` varchar(50) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `time` time NOT NULL DEFAULT current_timestamp(),
  `usg_president_id` int(11) NOT NULL,
  `usg_vice_president_id` int(11) NOT NULL,
  `senator_ids` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `votes`
--

INSERT INTO `votes` (`id`, `tupv_id`, `course`, `department`, `year_level`, `date`, `time`, `usg_president_id`, `usg_vice_president_id`, `senator_ids`) VALUES
(1, '1', '1', '231', '2', '2025-01-30', '05:54:44', 1, 1, '1,2,0,0,0'),
(2, '2', '1', '231', '2', '2025-01-30', '05:54:57', 2, 2, '0,0,0,0,0'),
(3, '3', '1', '231', '2', '2025-01-30', '05:55:07', 1, 1, '1,0,0,0,0'),
(4, '4', '1', '231', '2', '2025-01-30', '05:55:21', 2, 2, '2,0,0,0,0'),
(5, '5', '1', '231', '2', '2025-01-30', '06:21:27', 1, 1, '1,2,0,0,0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `officers`
--
ALTER TABLE `officers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `senators`
--
ALTER TABLE `senators`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tally`
--
ALTER TABLE `tally`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_candidate_position` (`candidate_id`,`position`);

--
-- Indexes for table `usg_president`
--
ALTER TABLE `usg_president`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usg_vice_president`
--
ALTER TABLE `usg_vice_president`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `officers`
--
ALTER TABLE `officers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `senators`
--
ALTER TABLE `senators`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tally`
--
ALTER TABLE `tally`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `usg_president`
--
ALTER TABLE `usg_president`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `usg_vice_president`
--
ALTER TABLE `usg_vice_president`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `votes`
--
ALTER TABLE `votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
