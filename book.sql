-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 27, 2019 at 12:32 PM
-- Server version: 8.0.16
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `book`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
CREATE TABLE IF NOT EXISTS `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `description` text NOT NULL,
  `catelog` int(11) NOT NULL,
  `isbn` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `book_image` varchar(50) NOT NULL,
  `status` int(1) NOT NULL DEFAULT '1',
  `created_by` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `description`, `catelog`, `isbn`, `book_image`, `status`, `created_by`, `created_at`, `updated_at`) VALUES
(1, 'Satyayoddha Kalki: Eye of Brahma', 'After a defeat at the hands of Lord Kali, Kalki Hari must journey towards the Mahendragiri mountains with his companions to finally become the avatar he is destined to be. But the road ahead is not without peril . . .  Not only is he trapped by the cannibalistic armies of the Pisach, he is also embroiled in the civil war of the Vanars. And in midst of all this, he meets a face from the legends.  Meanwhile, Manasa, the sister of the late Vasuki, plots to overthrow Lord Kali by bringing a massive war to his kingdom. But Naagpuri, her homeland, has been infiltrated by their sworn enemy, the Suparns. Not only does she need to protect her kingdom from the Suparns, she must also protect her close ones from the league of conspirators at her own home. Who can she really trust? And will she be able to put an end to Lord Kali’s rule?  As the plot thickens and Lord Kali sees his ambition crushed right before his eyes, he comes to know about his race and its history that threatens to destroy the very fabric of this world’s reality. Kalyug has begun.  Can Kalki become the avatar in time before it finally unfolds?  Will Manasa fight through the internal politics to bring an invasion against Lord Kali?  Can the secret that changes everything change Lord Kali as a person too?', 1, 'B07SFVJNM4', 'photo-1574054360524.jpg', 1, 1, '2019-09-12 11:06:17', '2019-09-12 11:06:17'),
(2, 'Raavan: Enemy of Aryavarta', 'INDIA, 3400 BCE.  A land in tumult, poverty and chaos. Most people suffer quietly. A few rebel. Some fight for a better world. Some for themselves. Some don’t give a damn. Raavan. Fathered by one of the most illustrious sages of the time. Blessed by the Gods with talents beyond all. Cursed by fate to be tested to the extremes.  A formidable teenage pirate, he is filled with equal parts courage, cruelty and fearsome resolve. A resolve to be a giant among men, to conquer, plunder, and seize the greatness that he thinks is his right.  A man of contrasts, of brutal violence and scholarly knowledge. A man who will love without reward and kill without remorse.  This exhilarating third book of the Ram Chandra series sheds light on Raavan, the king of Lanka. And the light shines on darkness of the darkest kind. Is he the greatest villain in history or just a man in a dark place, all the time?', 1, '978-9388754088', 'photo-1574059040530.jpg', 1, 1, '2019-09-12 11:07:10', '2019-09-12 11:07:10'),
(3, 'Book', 'test description tst', 1, 'BK12150454', 'photo-1574059717905.jpg', 1, 1, '2019-11-18 12:29:43', '2019-11-18 12:29:43');

-- --------------------------------------------------------

--
-- Table structure for table `book_likes`
--

DROP TABLE IF EXISTS `book_likes`;
CREATE TABLE IF NOT EXISTS `book_likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `book_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `catelogs`
--

DROP TABLE IF EXISTS `catelogs`;
CREATE TABLE IF NOT EXISTS `catelogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `status` int(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `catelogs`
--

INSERT INTO `catelogs` (`id`, `title`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Action and adventure', 1, '2019-09-12 11:02:17', '2019-09-12 11:02:17'),
(2, 'Crime', 1, '2019-09-12 11:04:17', '2019-09-12 11:04:17');

-- --------------------------------------------------------

--
-- Table structure for table `cms_users`
--

DROP TABLE IF EXISTS `cms_users`;
CREATE TABLE IF NOT EXISTS `cms_users` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile_number` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_reference` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `id_cms_privileges` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cms_users`
--

INSERT INTO `cms_users` (`id`, `name`, `photo`, `email`, `mobile_number`, `customer_reference`, `password`, `customer_id`, `id_cms_privileges`, `updated_at`, `status`) VALUES
(1, 'rajesh', 'rajesh.pmptec1.png', 'admin@admin.com', '95660190131', NULL, '$2y$10$zx91XiNrWNQb9E4WcVxba.AcVbGZSa6vz6ChdwkIPm9MGDGq8Nt9K', NULL, NULL, NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
