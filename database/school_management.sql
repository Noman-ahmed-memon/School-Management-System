-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 07, 2026 at 08:05 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `academic_sessions`
--

CREATE TABLE `academic_sessions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `campus_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `is_current` tinyint(1) NOT NULL DEFAULT 0,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `academic_sessions`
--

INSERT INTO `academic_sessions` (`id`, `campus_id`, `name`, `start_date`, `end_date`, `is_current`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, '2025-2026', '2025-04-01', '2026-03-31', 1, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(2, 2, '2025-2026', '2025-04-01', '2026-03-31', 1, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(3, 3, '2025-2026', '2025-04-01', '2026-03-31', 1, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(4, 4, '2025-2026', '2025-04-01', '2026-03-31', 1, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55');

-- --------------------------------------------------------

--
-- Table structure for table `assets`
--

CREATE TABLE `assets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `campus_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `asset_code` varchar(255) NOT NULL,
  `category` enum('computers','projectors','desks','chairs','acs','printers') NOT NULL,
  `model` varchar(255) DEFAULT NULL,
  `serial_number` varchar(255) DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `purchase_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `warranty_expiry` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `assigned_to` bigint(20) UNSIGNED DEFAULT NULL,
  `condition` enum('excellent','good','fair','poor') NOT NULL DEFAULT 'good',
  `status` enum('active','in_maintenance','retired') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `asset_maintenance`
--

CREATE TABLE `asset_maintenance` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `asset_id` bigint(20) UNSIGNED NOT NULL,
  `maintenance_date` date NOT NULL,
  `description` text NOT NULL,
  `cost` decimal(10,2) NOT NULL DEFAULT 0.00,
  `next_maintenance_date` date DEFAULT NULL,
  `performed_by` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `audit_logs`
--

CREATE TABLE `audit_logs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `module` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `campus_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `isbn` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `edition` varchar(255) DEFAULT NULL,
  `year` year(4) DEFAULT NULL,
  `total_copies` int(11) NOT NULL DEFAULT 1,
  `available_copies` int(11) NOT NULL DEFAULT 1,
  `shelf_location` varchar(255) DEFAULT NULL,
  `rack_number` varchar(255) DEFAULT NULL,
  `status` enum('available','issued','reserved') NOT NULL DEFAULT 'available',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `campus_id`, `category_id`, `title`, `isbn`, `author`, `publisher`, `edition`, `year`, `total_copies`, `available_copies`, `shelf_location`, `rack_number`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Science Book 1', 'BHS-MAIN-SCI-001', 'Author 44', 'Oxford Press', NULL, '2020', 10, 10, 'A-1', NULL, 'available', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(2, 1, 2, 'Mathematics Book 1', 'BHS-MAIN-MATH-001', 'Author 17', 'Oxford Press', NULL, '2020', 10, 10, 'A-1', NULL, 'available', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(3, 1, 3, 'Literature Book 1', 'BHS-MAIN-LIT-001', 'Author 64', 'Oxford Press', NULL, '2020', 10, 10, 'A-1', NULL, 'available', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(4, 1, 4, 'History Book 1', 'BHS-MAIN-HIST-001', 'Author 34', 'Oxford Press', NULL, '2020', 10, 10, 'A-1', NULL, 'available', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(5, 2, 5, 'Science Book 1', 'BHS-NORTH-SCI-001', 'Author 31', 'Oxford Press', NULL, '2020', 10, 10, 'A-1', NULL, 'available', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(6, 2, 6, 'Mathematics Book 1', 'BHS-NORTH-MATH-001', 'Author 48', 'Oxford Press', NULL, '2020', 10, 10, 'A-1', NULL, 'available', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(7, 2, 7, 'Literature Book 1', 'BHS-NORTH-LIT-001', 'Author 99', 'Oxford Press', NULL, '2020', 10, 10, 'A-1', NULL, 'available', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(8, 2, 8, 'History Book 1', 'BHS-NORTH-HIST-001', 'Author 23', 'Oxford Press', NULL, '2020', 10, 10, 'A-1', NULL, 'available', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(9, 3, 9, 'Science Book 1', 'GS-MAIN-SCI-001', 'Author 99', 'Oxford Press', NULL, '2020', 10, 10, 'A-1', NULL, 'available', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(10, 3, 10, 'Mathematics Book 1', 'GS-MAIN-MATH-001', 'Author 32', 'Oxford Press', NULL, '2020', 10, 10, 'A-1', NULL, 'available', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(11, 3, 11, 'Literature Book 1', 'GS-MAIN-LIT-001', 'Author 39', 'Oxford Press', NULL, '2020', 10, 10, 'A-1', NULL, 'available', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(12, 3, 12, 'History Book 1', 'GS-MAIN-HIST-001', 'Author 45', 'Oxford Press', NULL, '2020', 10, 10, 'A-1', NULL, 'available', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(13, 4, 13, 'Science Book 1', 'GS-NORTH-SCI-001', 'Author 11', 'Oxford Press', NULL, '2020', 10, 10, 'A-1', NULL, 'available', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(14, 4, 14, 'Mathematics Book 1', 'GS-NORTH-MATH-001', 'Author 100', 'Oxford Press', NULL, '2020', 10, 10, 'A-1', NULL, 'available', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(15, 4, 15, 'Literature Book 1', 'GS-NORTH-LIT-001', 'Author 33', 'Oxford Press', NULL, '2020', 10, 10, 'A-1', NULL, 'available', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(16, 4, 16, 'History Book 1', 'GS-NORTH-HIST-001', 'Author 97', 'Oxford Press', NULL, '2020', 10, 10, 'A-1', NULL, 'available', '2026-10-02 04:26:12', '2026-10-02 04:26:12');

-- --------------------------------------------------------

--
-- Table structure for table `book_categories`
--

CREATE TABLE `book_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `campus_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `book_categories`
--

INSERT INTO `book_categories` (`id`, `campus_id`, `name`, `code`, `description`, `created_at`, `updated_at`) VALUES
(1, 1, 'Science', 'BHS-MAIN-SCI', 'Science books', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(2, 1, 'Mathematics', 'BHS-MAIN-MATH', 'Mathematics books', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(3, 1, 'Literature', 'BHS-MAIN-LIT', 'Literature books', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(4, 1, 'History', 'BHS-MAIN-HIST', 'History books', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(5, 2, 'Science', 'BHS-NORTH-SCI', 'Science books', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(6, 2, 'Mathematics', 'BHS-NORTH-MATH', 'Mathematics books', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(7, 2, 'Literature', 'BHS-NORTH-LIT', 'Literature books', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(8, 2, 'History', 'BHS-NORTH-HIST', 'History books', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(9, 3, 'Science', 'GS-MAIN-SCI', 'Science books', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(10, 3, 'Mathematics', 'GS-MAIN-MATH', 'Mathematics books', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(11, 3, 'Literature', 'GS-MAIN-LIT', 'Literature books', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(12, 3, 'History', 'GS-MAIN-HIST', 'History books', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(13, 4, 'Science', 'GS-NORTH-SCI', 'Science books', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(14, 4, 'Mathematics', 'GS-NORTH-MATH', 'Mathematics books', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(15, 4, 'Literature', 'GS-NORTH-LIT', 'Literature books', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(16, 4, 'History', 'GS-NORTH-HIST', 'History books', '2026-10-02 04:26:12', '2026-10-02 04:26:12');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('bhs-main.library@school.com|127.0.0.1', 'i:1;', 1791351078),
('bhs-main.library@school.com|127.0.0.1:timer', 'i:1791351078;', 1791351078),
('spatie.permission.cache', 'a:3:{s:5:\"alias\";a:4:{s:1:\"a\";s:2:\"id\";s:1:\"b\";s:4:\"name\";s:1:\"c\";s:10:\"guard_name\";s:1:\"r\";s:5:\"roles\";}s:11:\"permissions\";a:99:{i:0;a:4:{s:1:\"a\";i:1;s:1:\"b\";s:14:\"dashboard.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:12:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:4;i:4;i:5;i:5;i:6;i:6;i:7;i:7;i:8;i:8;i:9;i:9;i:10;i:10;i:11;i:11;i:12;}}i:1;a:4:{s:1:\"a\";i:2;s:1:\"b\";s:18:\"organizations.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:2;a:4:{s:1:\"a\";i:3;s:1:\"b\";s:20:\"organizations.create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:3;a:4:{s:1:\"a\";i:4;s:1:\"b\";s:18:\"organizations.edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:4;a:4:{s:1:\"a\";i:5;s:1:\"b\";s:20:\"organizations.delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:5;a:4:{s:1:\"a\";i:6;s:1:\"b\";s:12:\"schools.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:6;a:4:{s:1:\"a\";i:7;s:1:\"b\";s:14:\"schools.create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:7;a:4:{s:1:\"a\";i:8;s:1:\"b\";s:12:\"schools.edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:8;a:4:{s:1:\"a\";i:9;s:1:\"b\";s:14:\"schools.delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:9;a:4:{s:1:\"a\";i:10;s:1:\"b\";s:13:\"campuses.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:10;a:4:{s:1:\"a\";i:11;s:1:\"b\";s:15:\"campuses.create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:11;a:4:{s:1:\"a\";i:12;s:1:\"b\";s:13:\"campuses.edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:12;a:4:{s:1:\"a\";i:13;s:1:\"b\";s:15:\"campuses.delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:13;a:4:{s:1:\"a\";i:14;s:1:\"b\";s:22:\"academic_sessions.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:14;a:4:{s:1:\"a\";i:15;s:1:\"b\";s:24:\"academic_sessions.create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:15;a:4:{s:1:\"a\";i:16;s:1:\"b\";s:22:\"academic_sessions.edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:16;a:4:{s:1:\"a\";i:17;s:1:\"b\";s:24:\"academic_sessions.delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:17;a:4:{s:1:\"a\";i:18;s:1:\"b\";s:16:\"departments.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:4:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:4;}}i:18;a:4:{s:1:\"a\";i:19;s:1:\"b\";s:18:\"departments.create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:3;}}i:19;a:4:{s:1:\"a\";i:20;s:1:\"b\";s:16:\"departments.edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:3;}}i:20;a:4:{s:1:\"a\";i:21;s:1:\"b\";s:18:\"departments.delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:3;}}i:21;a:4:{s:1:\"a\";i:22;s:1:\"b\";s:14:\"standards.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:3;}}i:22;a:4:{s:1:\"a\";i:23;s:1:\"b\";s:16:\"standards.create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:3;}}i:23;a:4:{s:1:\"a\";i:24;s:1:\"b\";s:14:\"standards.edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:3;}}i:24;a:4:{s:1:\"a\";i:25;s:1:\"b\";s:16:\"standards.delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:25;a:4:{s:1:\"a\";i:26;s:1:\"b\";s:13:\"sections.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:3;}}i:26;a:4:{s:1:\"a\";i:27;s:1:\"b\";s:15:\"sections.create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:3;}}i:27;a:4:{s:1:\"a\";i:28;s:1:\"b\";s:13:\"sections.edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:3;}}i:28;a:4:{s:1:\"a\";i:29;s:1:\"b\";s:15:\"sections.delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:29;a:4:{s:1:\"a\";i:30;s:1:\"b\";s:13:\"subjects.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:3;}}i:30;a:4:{s:1:\"a\";i:31;s:1:\"b\";s:15:\"subjects.create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:3;}}i:31;a:4:{s:1:\"a\";i:32;s:1:\"b\";s:13:\"subjects.edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:3;}}i:32;a:4:{s:1:\"a\";i:33;s:1:\"b\";s:15:\"subjects.delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:33;a:4:{s:1:\"a\";i:34;s:1:\"b\";s:13:\"students.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:10:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:5;i:4;i:6;i:5;i:7;i:6;i:8;i:7;i:9;i:8;i:11;i:9;i:12;}}i:34;a:4:{s:1:\"a\";i:35;s:1:\"b\";s:15:\"students.create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:4:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:5;}}i:35;a:4:{s:1:\"a\";i:36;s:1:\"b\";s:13:\"students.edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:4:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:5;}}i:36;a:4:{s:1:\"a\";i:37;s:1:\"b\";s:15:\"students.delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:5;}}i:37;a:4:{s:1:\"a\";i:38;s:1:\"b\";s:15:\"students.import\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:4:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:5;}}i:38;a:4:{s:1:\"a\";i:39;s:1:\"b\";s:15:\"students.export\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:4:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:5;}}i:39;a:4:{s:1:\"a\";i:40;s:1:\"b\";s:14:\"guardians.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:5:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:5;i:4;i:6;}}i:40;a:4:{s:1:\"a\";i:41;s:1:\"b\";s:16:\"guardians.create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:4:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:5;}}i:41;a:4:{s:1:\"a\";i:42;s:1:\"b\";s:14:\"guardians.edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:4:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:5;}}i:42;a:4:{s:1:\"a\";i:43;s:1:\"b\";s:16:\"guardians.delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:5;}}i:43;a:4:{s:1:\"a\";i:44;s:1:\"b\";s:13:\"teachers.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:4:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:4;}}i:44;a:4:{s:1:\"a\";i:45;s:1:\"b\";s:15:\"teachers.create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:4:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:4;}}i:45;a:4:{s:1:\"a\";i:46;s:1:\"b\";s:13:\"teachers.edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:4:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:4;}}i:46;a:4:{s:1:\"a\";i:47;s:1:\"b\";s:15:\"teachers.delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:4;}}i:47;a:4:{s:1:\"a\";i:48;s:1:\"b\";s:10:\"staff.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:5:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:4;i:4;i:10;}}i:48;a:4:{s:1:\"a\";i:49;s:1:\"b\";s:12:\"staff.create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:4;}}i:49;a:4:{s:1:\"a\";i:50;s:1:\"b\";s:10:\"staff.edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:4;}}i:50;a:4:{s:1:\"a\";i:51;s:1:\"b\";s:12:\"staff.delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:4;}}i:51;a:4:{s:1:\"a\";i:52;s:1:\"b\";s:15:\"attendance.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:7:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:5;i:4;i:6;i:5;i:11;i:6;i:12;}}i:52;a:4:{s:1:\"a\";i:53;s:1:\"b\";s:15:\"attendance.mark\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:4:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:6;}}i:53;a:4:{s:1:\"a\";i:54;s:1:\"b\";s:15:\"attendance.edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:54;a:4:{s:1:\"a\";i:55;s:1:\"b\";s:17:\"attendance.report\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:3;}}i:55;a:4:{s:1:\"a\";i:56;s:1:\"b\";s:14:\"timetable.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:7:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:5;i:4;i:6;i:5;i:11;i:6;i:12;}}i:56;a:4:{s:1:\"a\";i:57;s:1:\"b\";s:16:\"timetable.create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:3;i:2;i:5;}}i:57;a:4:{s:1:\"a\";i:58;s:1:\"b\";s:14:\"timetable.edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:3;i:2;i:5;}}i:58;a:4:{s:1:\"a\";i:59;s:1:\"b\";s:16:\"timetable.delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:3;i:2;i:5;}}i:59;a:4:{s:1:\"a\";i:60;s:1:\"b\";s:10:\"exams.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:6:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:6;i:4;i:11;i:5;i:12;}}i:60;a:4:{s:1:\"a\";i:61;s:1:\"b\";s:12:\"exams.create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:3;}}i:61;a:4:{s:1:\"a\";i:62;s:1:\"b\";s:10:\"exams.edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:2;i:2;i:3;}}i:62;a:4:{s:1:\"a\";i:63;s:1:\"b\";s:12:\"exams.delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:63;a:4:{s:1:\"a\";i:64;s:1:\"b\";s:14:\"exams.schedule\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:64;a:4:{s:1:\"a\";i:65;s:1:\"b\";s:12:\"results.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:6:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:6;i:4;i:11;i:5;i:12;}}i:65;a:4:{s:1:\"a\";i:66;s:1:\"b\";s:14:\"results.manage\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:4:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:6;}}i:66;a:4:{s:1:\"a\";i:67;s:1:\"b\";s:15:\"results.publish\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:67;a:4:{s:1:\"a\";i:68;s:1:\"b\";s:14:\"results.export\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:68;a:4:{s:1:\"a\";i:69;s:1:\"b\";s:9:\"fees.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:6:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:9;i:4;i:11;i:5;i:12;}}i:69;a:4:{s:1:\"a\";i:70;s:1:\"b\";s:12:\"fees.collect\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:9;}}i:70;a:4:{s:1:\"a\";i:71;s:1:\"b\";s:11:\"fees.refund\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:9;}}i:71;a:4:{s:1:\"a\";i:72;s:1:\"b\";s:14:\"fees.structure\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:9;}}i:72;a:4:{s:1:\"a\";i:73;s:1:\"b\";s:11:\"fees.report\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:9;}}i:73;a:4:{s:1:\"a\";i:74;s:1:\"b\";s:12:\"library.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:7:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:6;i:4;i:7;i:5;i:11;i:6;i:12;}}i:74;a:4:{s:1:\"a\";i:75;s:1:\"b\";s:14:\"library.manage\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:7;}}i:75;a:4:{s:1:\"a\";i:76;s:1:\"b\";s:13:\"library.issue\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:6;i:2;i:7;}}i:76;a:4:{s:1:\"a\";i:77;s:1:\"b\";s:14:\"library.return\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:7;}}i:77;a:4:{s:1:\"a\";i:78;s:1:\"b\";s:12:\"library.fine\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:7;}}i:78;a:4:{s:1:\"a\";i:79;s:1:\"b\";s:14:\"transport.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:8:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:5;i:4;i:6;i:5;i:8;i:6;i:11;i:7;i:12;}}i:79;a:4:{s:1:\"a\";i:80;s:1:\"b\";s:16:\"transport.manage\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:8;}}i:80;a:4:{s:1:\"a\";i:81;s:1:\"b\";s:16:\"transport.assign\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:8;}}i:81;a:4:{s:1:\"a\";i:82;s:1:\"b\";s:11:\"health.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:7:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:5;i:4;i:6;i:5;i:11;i:6;i:12;}}i:82;a:4:{s:1:\"a\";i:83;s:1:\"b\";s:13:\"health.manage\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:83;a:4:{s:1:\"a\";i:84;s:1:\"b\";s:14:\"inventory.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:84;a:4:{s:1:\"a\";i:85;s:1:\"b\";s:16:\"inventory.manage\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:85;a:4:{s:1:\"a\";i:86;s:1:\"b\";s:15:\"inventory.stock\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:86;a:4:{s:1:\"a\";i:87;s:1:\"b\";s:7:\"hr.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:3:{i:0;i:1;i:1;i:4;i:2;i:10;}}i:87;a:4:{s:1:\"a\";i:88;s:1:\"b\";s:9:\"hr.manage\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:4;}}i:88;a:4:{s:1:\"a\";i:89;s:1:\"b\";s:10:\"hr.payroll\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:4;}}i:89;a:4:{s:1:\"a\";i:90;s:1:\"b\";s:8:\"hr.leave\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:4;}}i:90;a:4:{s:1:\"a\";i:91;s:1:\"b\";s:12:\"reports.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:7:{i:0;i:1;i:1;i:2;i:2;i:3;i:3;i:4;i:4;i:7;i:5;i:8;i:6;i:9;}}i:91;a:4:{s:1:\"a\";i:92;s:1:\"b\";s:16:\"reports.generate\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:92;a:4:{s:1:\"a\";i:93;s:1:\"b\";s:13:\"settings.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:93;a:4:{s:1:\"a\";i:94;s:1:\"b\";s:13:\"settings.edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:94;a:4:{s:1:\"a\";i:95;s:1:\"b\";s:10:\"users.view\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:95;a:4:{s:1:\"a\";i:96;s:1:\"b\";s:12:\"users.create\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:96;a:4:{s:1:\"a\";i:97;s:1:\"b\";s:10:\"users.edit\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:2:{i:0;i:1;i:1;i:2;}}i:97;a:4:{s:1:\"a\";i:98;s:1:\"b\";s:12:\"users.delete\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}i:98;a:4:{s:1:\"a\";i:99;s:1:\"b\";s:11:\"users.roles\";s:1:\"c\";s:3:\"web\";s:1:\"r\";a:1:{i:0;i:1;}}}s:5:\"roles\";a:12:{i:0;a:3:{s:1:\"a\";i:1;s:1:\"b\";s:11:\"super_admin\";s:1:\"c\";s:3:\"web\";}i:1;a:3:{s:1:\"a\";i:2;s:1:\"b\";s:9:\"principal\";s:1:\"c\";s:3:\"web\";}i:2;a:3:{s:1:\"a\";i:3;s:1:\"b\";s:14:\"vice_principal\";s:1:\"c\";s:3:\"web\";}i:3;a:3:{s:1:\"a\";i:4;s:1:\"b\";s:10:\"hr_manager\";s:1:\"c\";s:3:\"web\";}i:4;a:3:{s:1:\"a\";i:5;s:1:\"b\";s:12:\"receptionist\";s:1:\"c\";s:3:\"web\";}i:5;a:3:{s:1:\"a\";i:6;s:1:\"b\";s:7:\"teacher\";s:1:\"c\";s:3:\"web\";}i:6;a:3:{s:1:\"a\";i:7;s:1:\"b\";s:9:\"librarian\";s:1:\"c\";s:3:\"web\";}i:7;a:3:{s:1:\"a\";i:8;s:1:\"b\";s:17:\"transport_manager\";s:1:\"c\";s:3:\"web\";}i:8;a:3:{s:1:\"a\";i:9;s:1:\"b\";s:10:\"accountant\";s:1:\"c\";s:3:\"web\";}i:9;a:3:{s:1:\"a\";i:10;s:1:\"b\";s:5:\"staff\";s:1:\"c\";s:3:\"web\";}i:10;a:3:{s:1:\"a\";i:11;s:1:\"b\";s:7:\"student\";s:1:\"c\";s:3:\"web\";}i:11;a:3:{s:1:\"a\";i:12;s:1:\"b\";s:8:\"guardian\";s:1:\"c\";s:3:\"web\";}}}', 1791433861);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `campuses`
--

CREATE TABLE `campuses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `school_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `vice_principal_id` bigint(20) UNSIGNED DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `campuses`
--

INSERT INTO `campuses` (`id`, `school_id`, `name`, `code`, `address`, `phone`, `vice_principal_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Beaconhouse School — Main Campus', 'BHS-MAIN', 'Johar Town, Lahore', '+92 42 111 111 111', 2, 'active', '2026-10-02 04:25:45', '2026-10-02 04:25:45'),
(2, 1, 'Beaconhouse School — North Campus', 'BHS-NORTH', 'Johar Town, Lahore', '+92 42 111 111 111', 3, 'active', '2026-10-02 04:25:45', '2026-10-02 04:25:45'),
(3, 2, 'Grammar School — Main Campus', 'GS-MAIN', 'DHA Phase 5, Lahore', '+92 42 222 222 222', 5, 'active', '2026-10-02 04:25:45', '2026-10-02 04:25:46'),
(4, 2, 'Grammar School — North Campus', 'GS-NORTH', 'DHA Phase 5, Lahore', '+92 42 222 222 222', 6, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(5, 3, 'Superior School - Main Campus', 'SRR-MAIN', NULL, '+92 100 9299211', 137, 'active', '2026-10-03 14:33:35', '2026-10-03 14:37:45');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `campus_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `head_name` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `campus_id`, `name`, `code`, `description`, `head_name`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Administration', 'ADMIN', 'Administrative and management staff', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(2, 1, 'Finance', 'FIN', 'Accounts and finance department', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(3, 1, 'Library', 'LIB', 'Library and information services', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(4, 1, 'Transport', 'TRAN', 'Transport and fleet management', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(5, 1, 'Reception', 'RECP', 'Front desk and student reception', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(6, 1, 'Support', 'SUPP', 'Support staff and services', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(7, 2, 'Administration', 'ADMIN', 'Administrative and management staff', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(8, 2, 'Finance', 'FIN', 'Accounts and finance department', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(9, 2, 'Library', 'LIB', 'Library and information services', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(10, 2, 'Transport', 'TRAN', 'Transport and fleet management', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(11, 2, 'Reception', 'RECP', 'Front desk and student reception', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(12, 2, 'Support', 'SUPP', 'Support staff and services', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(13, 3, 'Administration', 'ADMIN', 'Administrative and management staff', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(14, 3, 'Finance', 'FIN', 'Accounts and finance department', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(15, 3, 'Library', 'LIB', 'Library and information services', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(16, 3, 'Transport', 'TRAN', 'Transport and fleet management', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(17, 3, 'Reception', 'RECP', 'Front desk and student reception', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(18, 3, 'Support', 'SUPP', 'Support staff and services', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(19, 4, 'Administration', 'ADMIN', 'Administrative and management staff', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(20, 4, 'Finance', 'FIN', 'Accounts and finance department', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(21, 4, 'Library', 'LIB', 'Library and information services', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(22, 4, 'Transport', 'TRAN', 'Transport and fleet management', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(23, 4, 'Reception', 'RECP', 'Front desk and student reception', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(24, 4, 'Support', 'SUPP', 'Support staff and services', NULL, 'active', '2026-10-02 04:25:46', '2026-10-02 04:25:46');

-- --------------------------------------------------------

--
-- Table structure for table `exams`
--

CREATE TABLE `exams` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `exam_type_id` bigint(20) UNSIGNED NOT NULL,
  `academic_session_id` bigint(20) UNSIGNED NOT NULL,
  `standard_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `total_marks` int(11) NOT NULL DEFAULT 100,
  `passing_marks` int(11) NOT NULL DEFAULT 40,
  `status` enum('scheduled','ongoing','completed','cancelled') NOT NULL DEFAULT 'scheduled',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `exams`
--

INSERT INTO `exams` (`id`, `exam_type_id`, `academic_session_id`, `standard_id`, `name`, `start_date`, `end_date`, `total_marks`, `passing_marks`, `status`, `created_at`, `updated_at`) VALUES
(2, 12, 1, 3, 'Quiz Competition', '2026-10-06', '2026-10-07', 100, 40, 'scheduled', '2026-10-05 07:38:11', '2026-10-05 07:38:11');

-- --------------------------------------------------------

--
-- Table structure for table `exam_schedules`
--

CREATE TABLE `exam_schedules` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `exam_id` bigint(20) UNSIGNED NOT NULL,
  `subject_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `room` varchar(255) NOT NULL,
  `invigilators` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`invigilators`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `exam_types`
--

CREATE TABLE `exam_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `campus_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `exam_types`
--

INSERT INTO `exam_types` (`id`, `campus_id`, `name`, `code`, `description`, `created_at`, `updated_at`) VALUES
(1, 1, 'Monthly Test', 'BHS-MAIN-MON', 'Monthly Test for Beaconhouse School — Main Campus', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(2, 1, 'Midterm', 'BHS-MAIN-MID', 'Midterm for Beaconhouse School — Main Campus', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(3, 1, 'Final Term', 'BHS-MAIN-FIN', 'Final Term for Beaconhouse School — Main Campus', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(4, 1, 'Quiz', 'BHS-MAIN-QZ', 'Quiz for Beaconhouse School — Main Campus', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(5, 2, 'Monthly Test', 'BHS-NORTH-MON', 'Monthly Test for Beaconhouse School — North Campus', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(6, 2, 'Midterm', 'BHS-NORTH-MID', 'Midterm for Beaconhouse School — North Campus', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(7, 2, 'Final Term', 'BHS-NORTH-FIN', 'Final Term for Beaconhouse School — North Campus', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(8, 2, 'Quiz', 'BHS-NORTH-QZ', 'Quiz for Beaconhouse School — North Campus', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(9, 3, 'Monthly Test', 'GS-MAIN-MON', 'Monthly Test for Grammar School — Main Campus', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(10, 3, 'Midterm', 'GS-MAIN-MID', 'Midterm for Grammar School — Main Campus', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(11, 3, 'Final Term', 'GS-MAIN-FIN', 'Final Term for Grammar School — Main Campus', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(12, 3, 'Quiz', 'GS-MAIN-QZ', 'Quiz for Grammar School — Main Campus', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(13, 4, 'Monthly Test', 'GS-NORTH-MON', 'Monthly Test for Grammar School — North Campus', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(14, 4, 'Midterm', 'GS-NORTH-MID', 'Midterm for Grammar School — North Campus', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(15, 4, 'Final Term', 'GS-NORTH-FIN', 'Final Term for Grammar School — North Campus', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(16, 4, 'Quiz', 'GS-NORTH-QZ', 'Quiz for Grammar School — North Campus', '2026-10-02 04:26:12', '2026-10-02 04:26:12');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fee_invoices`
--

CREATE TABLE `fee_invoices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `academic_session_id` bigint(20) UNSIGNED NOT NULL,
  `invoice_number` varchar(255) NOT NULL,
  `issue_date` date NOT NULL,
  `due_date` date NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `discount_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount_type` enum('percentage','fixed') DEFAULT NULL,
  `discount_reason` text DEFAULT NULL,
  `late_fee_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `net_amount` decimal(10,2) NOT NULL,
  `paid_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `outstanding_amount` decimal(10,2) NOT NULL,
  `status` enum('draft','issued','partial_paid','paid','overdue','cancelled') NOT NULL DEFAULT 'draft',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fee_invoices`
--

INSERT INTO `fee_invoices` (`id`, `student_id`, `academic_session_id`, `invoice_number`, `issue_date`, `due_date`, `total_amount`, `discount_amount`, `discount_type`, `discount_reason`, `late_fee_amount`, `net_amount`, `paid_amount`, `outstanding_amount`, `status`, `created_at`, `updated_at`) VALUES
(1, 4, 1, 'INV-2026-00001', '2026-10-03', '2026-11-02', 20000.00, 0.00, NULL, NULL, 0.00, 20000.00, 20000.00, 0.00, 'paid', '2026-10-03 08:27:28', '2026-10-05 05:25:41'),
(2, 5, 1, 'INV-2026-00002', '2026-10-03', '2026-11-02', 20000.00, 0.00, NULL, NULL, 0.00, 20000.00, 0.00, 20000.00, 'issued', '2026-10-03 08:27:28', '2026-10-03 08:27:28'),
(3, 1, 1, 'INV-2026-00003', '2026-10-03', '2026-11-02', 20000.00, 0.00, NULL, NULL, 0.00, 20000.00, 20000.00, 0.00, 'paid', '2026-10-03 08:27:46', '2026-10-03 08:28:37'),
(4, 2, 1, 'INV-2026-00004', '2026-10-03', '2026-11-02', 20000.00, 0.00, NULL, NULL, 0.00, 20000.00, 20000.00, 0.00, 'paid', '2026-10-03 08:27:46', '2026-10-03 08:28:27');

-- --------------------------------------------------------

--
-- Table structure for table `fee_invoice_items`
--

CREATE TABLE `fee_invoice_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fee_invoice_id` bigint(20) UNSIGNED NOT NULL,
  `fee_type_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fee_invoice_items`
--

INSERT INTO `fee_invoice_items` (`id`, `fee_invoice_id`, `fee_type_id`, `amount`, `description`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 15000.00, 'Tuition Fee', '2026-10-03 08:27:28', '2026-10-03 08:27:28'),
(2, 1, 2, 3000.00, 'Transport Fee', '2026-10-03 08:27:28', '2026-10-03 08:27:28'),
(3, 1, 3, 1500.00, 'Exam Fee', '2026-10-03 08:27:28', '2026-10-03 08:27:28'),
(4, 1, 4, 500.00, 'Library Fee', '2026-10-03 08:27:28', '2026-10-03 08:27:28'),
(5, 2, 1, 15000.00, 'Tuition Fee', '2026-10-03 08:27:28', '2026-10-03 08:27:28'),
(6, 2, 2, 3000.00, 'Transport Fee', '2026-10-03 08:27:28', '2026-10-03 08:27:28'),
(7, 2, 3, 1500.00, 'Exam Fee', '2026-10-03 08:27:28', '2026-10-03 08:27:28'),
(8, 2, 4, 500.00, 'Library Fee', '2026-10-03 08:27:28', '2026-10-03 08:27:28'),
(9, 3, 1, 15000.00, 'Tuition Fee', '2026-10-03 08:27:46', '2026-10-03 08:27:46'),
(10, 3, 2, 3000.00, 'Transport Fee', '2026-10-03 08:27:46', '2026-10-03 08:27:46'),
(11, 3, 3, 1500.00, 'Exam Fee', '2026-10-03 08:27:46', '2026-10-03 08:27:46'),
(12, 3, 4, 500.00, 'Library Fee', '2026-10-03 08:27:46', '2026-10-03 08:27:46'),
(13, 4, 1, 15000.00, 'Tuition Fee', '2026-10-03 08:27:46', '2026-10-03 08:27:46'),
(14, 4, 2, 3000.00, 'Transport Fee', '2026-10-03 08:27:46', '2026-10-03 08:27:46'),
(15, 4, 3, 1500.00, 'Exam Fee', '2026-10-03 08:27:46', '2026-10-03 08:27:46'),
(16, 4, 4, 500.00, 'Library Fee', '2026-10-03 08:27:46', '2026-10-03 08:27:46');

-- --------------------------------------------------------

--
-- Table structure for table `fee_payments`
--

CREATE TABLE `fee_payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fee_invoice_id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `payment_number` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_date` date NOT NULL,
  `payment_method` enum('cash','bank','online','card') NOT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `bank_name` varchar(255) DEFAULT NULL,
  `cheque_number` varchar(255) DEFAULT NULL,
  `receipt_number` varchar(255) NOT NULL,
  `status` enum('pending','completed','failed','refunded') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fee_payments`
--

INSERT INTO `fee_payments` (`id`, `fee_invoice_id`, `student_id`, `payment_number`, `amount`, `payment_date`, `payment_method`, `transaction_id`, `bank_name`, `cheque_number`, `receipt_number`, `status`, `created_at`, `updated_at`) VALUES
(1, 4, 2, 'PAY-2026-00001', 20000.00, '2026-10-03', 'cash', NULL, NULL, NULL, 'RCP-2026-00001', 'completed', '2026-10-03 08:28:27', '2026-10-03 08:28:27'),
(2, 3, 1, 'PAY-2026-00002', 20000.00, '2026-10-03', 'cash', NULL, NULL, NULL, 'RCP-2026-00002', 'completed', '2026-10-03 08:28:37', '2026-10-03 08:28:37'),
(3, 1, 4, 'PAY-2026-00003', 20000.00, '2026-10-05', 'bank', '08091117890', 'Habib Bank', NULL, 'RCP-2026-00003', 'completed', '2026-10-05 05:25:41', '2026-10-05 05:25:41');

-- --------------------------------------------------------

--
-- Table structure for table `fee_structures`
--

CREATE TABLE `fee_structures` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `campus_id` bigint(20) UNSIGNED NOT NULL,
  `standard_id` bigint(20) UNSIGNED NOT NULL,
  `fee_type_id` bigint(20) UNSIGNED NOT NULL,
  `academic_session_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `is_optional` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fee_structures`
--

INSERT INTO `fee_structures` (`id`, `campus_id`, `standard_id`, `fee_type_id`, `academic_session_id`, `amount`, `is_optional`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 1, 15000.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(2, 1, 2, 1, 1, 15000.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(3, 1, 3, 1, 1, 15000.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(4, 1, 4, 1, 1, 15000.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(5, 1, 5, 1, 1, 15000.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(6, 1, 1, 2, 1, 3000.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(7, 1, 2, 2, 1, 3000.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(8, 1, 3, 2, 1, 3000.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(9, 1, 4, 2, 1, 3000.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(10, 1, 5, 2, 1, 3000.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(11, 1, 1, 3, 1, 1500.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(12, 1, 2, 3, 1, 1500.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(13, 1, 3, 3, 1, 1500.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(14, 1, 4, 3, 1, 1500.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(15, 1, 5, 3, 1, 1500.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(16, 1, 1, 4, 1, 500.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(17, 1, 2, 4, 1, 500.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(18, 1, 3, 4, 1, 500.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(19, 1, 4, 4, 1, 500.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(20, 1, 5, 4, 1, 500.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(21, 2, 6, 5, 2, 15000.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(22, 2, 7, 5, 2, 15000.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(23, 2, 8, 5, 2, 15000.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(24, 2, 9, 5, 2, 15000.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(25, 2, 10, 5, 2, 15000.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(26, 2, 6, 6, 2, 3000.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(27, 2, 7, 6, 2, 3000.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(28, 2, 8, 6, 2, 3000.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(29, 2, 9, 6, 2, 3000.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(30, 2, 10, 6, 2, 3000.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(31, 2, 6, 7, 2, 1500.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(32, 2, 7, 7, 2, 1500.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(33, 2, 8, 7, 2, 1500.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(34, 2, 9, 7, 2, 1500.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(35, 2, 10, 7, 2, 1500.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(36, 2, 6, 8, 2, 500.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(37, 2, 7, 8, 2, 500.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(38, 2, 8, 8, 2, 500.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(39, 2, 9, 8, 2, 500.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(40, 2, 10, 8, 2, 500.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(41, 3, 11, 9, 3, 15000.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(42, 3, 12, 9, 3, 15000.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(43, 3, 13, 9, 3, 15000.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(44, 3, 14, 9, 3, 15000.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(45, 3, 15, 9, 3, 15000.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(46, 3, 11, 10, 3, 3000.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(47, 3, 12, 10, 3, 3000.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(48, 3, 13, 10, 3, 3000.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(49, 3, 14, 10, 3, 3000.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(50, 3, 15, 10, 3, 3000.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(51, 3, 11, 11, 3, 1500.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(52, 3, 12, 11, 3, 1500.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(53, 3, 13, 11, 3, 1500.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(54, 3, 14, 11, 3, 1500.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(55, 3, 15, 11, 3, 1500.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(56, 3, 11, 12, 3, 500.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(57, 3, 12, 12, 3, 500.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(58, 3, 13, 12, 3, 500.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(59, 3, 14, 12, 3, 500.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(60, 3, 15, 12, 3, 500.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(61, 4, 16, 13, 4, 15000.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(62, 4, 17, 13, 4, 15000.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(63, 4, 18, 13, 4, 15000.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(64, 4, 19, 13, 4, 15000.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(65, 4, 20, 13, 4, 15000.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(66, 4, 16, 14, 4, 3000.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(67, 4, 17, 14, 4, 3000.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(68, 4, 18, 14, 4, 3000.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(69, 4, 19, 14, 4, 3000.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(70, 4, 20, 14, 4, 3000.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(71, 4, 16, 15, 4, 1500.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(72, 4, 17, 15, 4, 1500.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(73, 4, 18, 15, 4, 1500.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(74, 4, 19, 15, 4, 1500.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(75, 4, 20, 15, 4, 1500.00, 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(76, 4, 16, 16, 4, 500.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(77, 4, 17, 16, 4, 500.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(78, 4, 18, 16, 4, 500.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(79, 4, 19, 16, 4, 500.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(80, 4, 20, 16, 4, 500.00, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11');

-- --------------------------------------------------------

--
-- Table structure for table `fee_types`
--

CREATE TABLE `fee_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `campus_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `is_recurring` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fee_types`
--

INSERT INTO `fee_types` (`id`, `campus_id`, `name`, `code`, `description`, `is_recurring`, `created_at`, `updated_at`) VALUES
(1, 1, 'Tuition Fee', 'TUIT', 'Tuition Fee for Beaconhouse School — Main Campus', 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(2, 1, 'Transport Fee', 'TRAN', 'Transport Fee for Beaconhouse School — Main Campus', 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(3, 1, 'Exam Fee', 'EXAM', 'Exam Fee for Beaconhouse School — Main Campus', 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(4, 1, 'Library Fee', 'LIB', 'Library Fee for Beaconhouse School — Main Campus', 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(5, 2, 'Tuition Fee', 'TUIT', 'Tuition Fee for Beaconhouse School — North Campus', 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(6, 2, 'Transport Fee', 'TRAN', 'Transport Fee for Beaconhouse School — North Campus', 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(7, 2, 'Exam Fee', 'EXAM', 'Exam Fee for Beaconhouse School — North Campus', 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(8, 2, 'Library Fee', 'LIB', 'Library Fee for Beaconhouse School — North Campus', 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(9, 3, 'Tuition Fee', 'TUIT', 'Tuition Fee for Grammar School — Main Campus', 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(10, 3, 'Transport Fee', 'TRAN', 'Transport Fee for Grammar School — Main Campus', 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(11, 3, 'Exam Fee', 'EXAM', 'Exam Fee for Grammar School — Main Campus', 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(12, 3, 'Library Fee', 'LIB', 'Library Fee for Grammar School — Main Campus', 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(13, 4, 'Tuition Fee', 'TUIT', 'Tuition Fee for Grammar School — North Campus', 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(14, 4, 'Transport Fee', 'TRAN', 'Transport Fee for Grammar School — North Campus', 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(15, 4, 'Exam Fee', 'EXAM', 'Exam Fee for Grammar School — North Campus', 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(16, 4, 'Library Fee', 'LIB', 'Library Fee for Grammar School — North Campus', 0, '2026-10-02 04:26:11', '2026-10-02 04:26:11');

-- --------------------------------------------------------

--
-- Table structure for table `grading_systems`
--

CREATE TABLE `grading_systems` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `campus_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `grade` varchar(255) NOT NULL,
  `min_percentage` decimal(5,2) NOT NULL,
  `max_percentage` decimal(5,2) NOT NULL,
  `points` decimal(3,2) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `grading_systems`
--

INSERT INTO `grading_systems` (`id`, `campus_id`, `name`, `grade`, `min_percentage`, `max_percentage`, `points`, `description`, `created_at`, `updated_at`) VALUES
(1, 1, 'Outstanding', 'A+', 90.00, 100.00, 4.00, 'Outstanding grade', '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(2, 1, 'Excellent', 'A', 80.00, 89.99, 3.70, 'Excellent grade', '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(3, 1, 'Very Good', 'B+', 70.00, 79.99, 3.30, 'Very Good grade', '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(4, 1, 'Good', 'B', 60.00, 69.99, 3.00, 'Good grade', '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(5, 1, 'Average', 'C', 50.00, 59.99, 2.00, 'Average grade', '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(6, 1, 'Below Average', 'D', 40.00, 49.99, 1.00, 'Below Average grade', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(7, 1, 'Fail', 'F', 0.00, 39.99, 0.00, 'Fail grade', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(8, 2, 'Outstanding', 'A+', 90.00, 100.00, 4.00, 'Outstanding grade', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(9, 2, 'Excellent', 'A', 80.00, 89.99, 3.70, 'Excellent grade', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(10, 2, 'Very Good', 'B+', 70.00, 79.99, 3.30, 'Very Good grade', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(11, 2, 'Good', 'B', 60.00, 69.99, 3.00, 'Good grade', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(12, 2, 'Average', 'C', 50.00, 59.99, 2.00, 'Average grade', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(13, 2, 'Below Average', 'D', 40.00, 49.99, 1.00, 'Below Average grade', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(14, 2, 'Fail', 'F', 0.00, 39.99, 0.00, 'Fail grade', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(15, 3, 'Outstanding', 'A+', 90.00, 100.00, 4.00, 'Outstanding grade', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(16, 3, 'Excellent', 'A', 80.00, 89.99, 3.70, 'Excellent grade', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(17, 3, 'Very Good', 'B+', 70.00, 79.99, 3.30, 'Very Good grade', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(18, 3, 'Good', 'B', 60.00, 69.99, 3.00, 'Good grade', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(19, 3, 'Average', 'C', 50.00, 59.99, 2.00, 'Average grade', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(20, 3, 'Below Average', 'D', 40.00, 49.99, 1.00, 'Below Average grade', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(21, 3, 'Fail', 'F', 0.00, 39.99, 0.00, 'Fail grade', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(22, 4, 'Outstanding', 'A+', 90.00, 100.00, 4.00, 'Outstanding grade', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(23, 4, 'Excellent', 'A', 80.00, 89.99, 3.70, 'Excellent grade', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(24, 4, 'Very Good', 'B+', 70.00, 79.99, 3.30, 'Very Good grade', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(25, 4, 'Good', 'B', 60.00, 69.99, 3.00, 'Good grade', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(26, 4, 'Average', 'C', 50.00, 59.99, 2.00, 'Average grade', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(27, 4, 'Below Average', 'D', 40.00, 49.99, 1.00, 'Below Average grade', '2026-10-02 04:26:12', '2026-10-02 04:26:12'),
(28, 4, 'Fail', 'F', 0.00, 39.99, 0.00, 'Fail grade', '2026-10-02 04:26:12', '2026-10-02 04:26:12');

-- --------------------------------------------------------

--
-- Table structure for table `guardians`
--

CREATE TABLE `guardians` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `relation` enum('father','mother','guardian') NOT NULL DEFAULT 'guardian',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `guardians`
--

INSERT INTO `guardians` (`id`, `user_id`, `first_name`, `last_name`, `email`, `phone`, `address`, `occupation`, `relation`, `created_at`, `updated_at`) VALUES
(1, 48, 'Parent', 'Ali', 'bhs-main.guardian1@school.com', '+92 300 9006918', NULL, 'Business', 'father', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(2, 50, 'Parent', 'Ahmed', 'bhs-main.guardian2@school.com', '+92 300 5462589', NULL, 'Business', 'father', '2026-10-02 04:25:56', '2026-10-02 04:25:56'),
(3, 52, 'Parent', 'Raza', 'bhs-main.guardian3@school.com', '+92 300 9796273', NULL, 'Business', 'father', '2026-10-02 04:25:56', '2026-10-02 04:25:56'),
(4, 54, 'Parent', 'Raza', 'bhs-main.guardian4@school.com', '+92 300 3204259', NULL, 'Business', 'father', '2026-10-02 04:25:56', '2026-10-02 04:25:56'),
(5, 56, 'Parent', 'Ahmed', 'bhs-main.guardian5@school.com', '+92 300 9097214', NULL, 'Business', 'father', '2026-10-02 04:25:57', '2026-10-02 04:25:57'),
(6, 58, 'Parent', 'Ahmed', 'bhs-main.guardian6@school.com', '+92 300 4109725', NULL, 'Business', 'father', '2026-10-02 04:25:57', '2026-10-02 04:25:57'),
(7, 60, 'Parent', 'Shah', 'bhs-main.guardian7@school.com', '+92 300 2499570', NULL, 'Business', 'father', '2026-10-02 04:25:58', '2026-10-02 04:25:58'),
(8, 62, 'Parent', 'Ahmed', 'bhs-main.guardian8@school.com', '+92 300 8951694', NULL, 'Business', 'father', '2026-10-02 04:25:58', '2026-10-02 04:25:58'),
(9, 64, 'Parent', 'Ahmed', 'bhs-main.guardian9@school.com', '+92 300 9657987', NULL, 'Business', 'father', '2026-10-02 04:25:58', '2026-10-02 04:25:58'),
(10, 66, 'Parent', 'Ali', 'bhs-main.guardian10@school.com', '+92 300 6964069', NULL, 'Business', 'father', '2026-10-02 04:25:59', '2026-10-02 04:25:59'),
(11, 68, 'Parent', 'Khan', 'bhs-north.guardian1@school.com', '+92 300 2478720', NULL, 'Business', 'father', '2026-10-02 04:25:59', '2026-10-02 04:25:59'),
(12, 70, 'Parent', 'Shah', 'bhs-north.guardian2@school.com', '+92 300 2328004', NULL, 'Business', 'father', '2026-10-02 04:26:00', '2026-10-02 04:26:00'),
(13, 72, 'Parent', 'Raza', 'bhs-north.guardian3@school.com', '+92 300 9186921', NULL, 'Business', 'father', '2026-10-02 04:26:00', '2026-10-02 04:26:00'),
(14, 74, 'Parent', 'Raza', 'bhs-north.guardian4@school.com', '+92 300 2828854', NULL, 'Business', 'father', '2026-10-02 04:26:01', '2026-10-02 04:26:01'),
(15, 76, 'Parent', 'Raza', 'bhs-north.guardian5@school.com', '+92 300 8366990', NULL, 'Business', 'father', '2026-10-02 04:26:01', '2026-10-02 04:26:01'),
(16, 78, 'Parent', 'Ahmed', 'bhs-north.guardian6@school.com', '+92 300 4257489', NULL, 'Business', 'father', '2026-10-02 04:26:01', '2026-10-02 04:26:01'),
(17, 80, 'Parent', 'Raza', 'bhs-north.guardian7@school.com', '+92 300 3844363', NULL, 'Business', 'father', '2026-10-02 04:26:02', '2026-10-02 04:26:02'),
(18, 82, 'Parent', 'Raza', 'bhs-north.guardian8@school.com', '+92 300 7435880', NULL, 'Business', 'father', '2026-10-02 04:26:02', '2026-10-02 04:26:02'),
(19, 84, 'Parent', 'Khan', 'bhs-north.guardian9@school.com', '+92 300 6532358', NULL, 'Business', 'father', '2026-10-02 04:26:03', '2026-10-02 04:26:03'),
(20, 86, 'Parent', 'Khan', 'bhs-north.guardian10@school.com', '+92 300 8069401', NULL, 'Business', 'father', '2026-10-02 04:26:03', '2026-10-02 04:26:03'),
(21, 88, 'Parent', 'Ahmed', 'gs-main.guardian1@school.com', '+92 300 2484730', NULL, 'Business', 'father', '2026-10-02 04:26:03', '2026-10-02 04:26:03'),
(22, 90, 'Parent', 'Shah', 'gs-main.guardian2@school.com', '+92 300 7701266', NULL, 'Business', 'father', '2026-10-02 04:26:04', '2026-10-02 04:26:04'),
(23, 92, 'Parent', 'Shah', 'gs-main.guardian3@school.com', '+92 300 5822224', NULL, 'Business', 'father', '2026-10-02 04:26:04', '2026-10-02 04:26:04'),
(24, 94, 'Parent', 'Ali', 'gs-main.guardian4@school.com', '+92 300 5277727', NULL, 'Business', 'father', '2026-10-02 04:26:05', '2026-10-02 04:26:05'),
(25, 96, 'Parent', 'Raza', 'gs-main.guardian5@school.com', '+92 300 5764568', NULL, 'Business', 'father', '2026-10-02 04:26:05', '2026-10-02 04:26:05'),
(26, 98, 'Parent', 'Khan', 'gs-main.guardian6@school.com', '+92 300 6007916', NULL, 'Business', 'father', '2026-10-02 04:26:06', '2026-10-02 04:26:06'),
(27, 100, 'Parent', 'Khan', 'gs-main.guardian7@school.com', '+92 300 5385639', NULL, 'Business', 'father', '2026-10-02 04:26:06', '2026-10-02 04:26:06'),
(28, 102, 'Parent', 'Raza', 'gs-main.guardian8@school.com', '+92 300 1642044', NULL, 'Business', 'father', '2026-10-02 04:26:06', '2026-10-02 04:26:06'),
(29, 104, 'Parent', 'Raza', 'gs-main.guardian9@school.com', '+92 300 6648546', NULL, 'Business', 'father', '2026-10-02 04:26:07', '2026-10-02 04:26:07'),
(30, 106, 'Parent', 'Raza', 'gs-main.guardian10@school.com', '+92 300 9867190', NULL, 'Business', 'father', '2026-10-02 04:26:07', '2026-10-02 04:26:07'),
(31, 108, 'Parent', 'Ali', 'gs-north.guardian1@school.com', '+92 300 5140137', NULL, 'Business', 'father', '2026-10-02 04:26:08', '2026-10-02 04:26:08'),
(32, 110, 'Parent', 'Raza', 'gs-north.guardian2@school.com', '+92 300 3341293', NULL, 'Business', 'father', '2026-10-02 04:26:08', '2026-10-02 04:26:08'),
(33, 112, 'Parent', 'Shah', 'gs-north.guardian3@school.com', '+92 300 1351870', NULL, 'Business', 'father', '2026-10-02 04:26:08', '2026-10-02 04:26:08'),
(34, 114, 'Parent', 'Ahmed', 'gs-north.guardian4@school.com', '+92 300 3901743', NULL, 'Business', 'father', '2026-10-02 04:26:09', '2026-10-02 04:26:09'),
(35, 116, 'Parent', 'Raza', 'gs-north.guardian5@school.com', '+92 300 2011897', NULL, 'Business', 'father', '2026-10-02 04:26:09', '2026-10-02 04:26:09'),
(36, 118, 'Parent', 'Ahmed', 'gs-north.guardian6@school.com', '+92 300 7376232', NULL, 'Business', 'father', '2026-10-02 04:26:10', '2026-10-02 04:26:10'),
(37, 120, 'Parent', 'Khan', 'gs-north.guardian7@school.com', '+92 300 7689671', NULL, 'Business', 'father', '2026-10-02 04:26:10', '2026-10-02 04:26:10'),
(38, 122, 'Parent', 'Ali', 'gs-north.guardian8@school.com', '+92 300 4490431', NULL, 'Business', 'father', '2026-10-02 04:26:10', '2026-10-02 04:26:10'),
(39, 124, 'Parent', 'Ahmed', 'gs-north.guardian9@school.com', '+92 300 1105356', NULL, 'Business', 'father', '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(40, 126, 'Parent', 'Khan', 'gs-north.guardian10@school.com', '+92 300 3381012', NULL, 'Business', 'father', '2026-10-02 04:26:11', '2026-10-02 04:26:11');

-- --------------------------------------------------------

--
-- Table structure for table `health_checkups`
--

CREATE TABLE `health_checkups` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `checkup_date` date NOT NULL,
  `nurse_name` varchar(255) DEFAULT NULL,
  `symptoms` text DEFAULT NULL,
  `diagnosis` text DEFAULT NULL,
  `treatment` text DEFAULT NULL,
  `follow_up_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `health_records`
--

CREATE TABLE `health_records` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `height` decimal(5,2) DEFAULT NULL,
  `weight` decimal(5,2) DEFAULT NULL,
  `blood_pressure` varchar(255) DEFAULT NULL,
  `allergies` text DEFAULT NULL,
  `medical_conditions` text DEFAULT NULL,
  `medications` text DEFAULT NULL,
  `emergency_contact_name` varchar(255) DEFAULT NULL,
  `emergency_contact_phone` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `holidays`
--

CREATE TABLE `holidays` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `campus_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `type` enum('public','religious','school') NOT NULL DEFAULT 'public',
  `description` text DEFAULT NULL,
  `is_annual` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_items`
--

CREATE TABLE `inventory_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `campus_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `category` enum('stationery','uniforms','lab_equipment','sports_equipment','furniture') NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `unit` varchar(255) NOT NULL DEFAULT 'pieces',
  `purchase_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `selling_price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `supplier` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventory_transactions`
--

CREATE TABLE `inventory_transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `inventory_item_id` bigint(20) UNSIGNED NOT NULL,
  `transaction_type` enum('purchase','stock_in','stock_out','transfer','adjustment') NOT NULL,
  `quantity` int(11) NOT NULL,
  `transaction_date` date NOT NULL,
  `reference_number` varchar(255) DEFAULT NULL,
  `note` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leave_requests`
--

CREATE TABLE `leave_requests` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `staff_id` bigint(20) UNSIGNED DEFAULT NULL,
  `teacher_id` bigint(20) UNSIGNED DEFAULT NULL,
  `leave_type_id` bigint(20) UNSIGNED NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `days` int(11) NOT NULL,
  `reason` text NOT NULL,
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `approved_by` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `leave_requests`
--

INSERT INTO `leave_requests` (`id`, `staff_id`, `teacher_id`, `leave_type_id`, `start_date`, `end_date`, `days`, `reason`, `status`, `approved_by`, `created_at`, `updated_at`) VALUES
(1, NULL, 13, 1, '2026-10-01', '2026-10-10', 10, 'Out Of Town', 'approved', 7, '2026-10-05 05:57:01', '2026-10-05 05:57:08');

-- --------------------------------------------------------

--
-- Table structure for table `leave_types`
--

CREATE TABLE `leave_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `campus_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `days_per_year` int(11) NOT NULL DEFAULT 0,
  `is_paid` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `leave_types`
--

INSERT INTO `leave_types` (`id`, `campus_id`, `name`, `code`, `days_per_year`, `is_paid`, `created_at`, `updated_at`) VALUES
(1, 1, 'Annual Leave', 'ANN', 20, 1, '2026-10-05 05:55:51', '2026-10-05 05:55:51');

-- --------------------------------------------------------

--
-- Table structure for table `library_transactions`
--

CREATE TABLE `library_transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `book_id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `issued_by` bigint(20) UNSIGNED NOT NULL,
  `issue_date` date NOT NULL,
  `due_date` date NOT NULL,
  `return_date` date DEFAULT NULL,
  `status` enum('issued','returned','renewed','lost','damaged','reserved') NOT NULL DEFAULT 'issued',
  `fine_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `remark` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_02_000000_create_organizations_table', 1),
(3, '0001_01_03_000000_create_schools_table', 1),
(4, '0001_01_04_000000_create_campuses_table', 1),
(5, '0001_01_05_000000_create_academic_sessions_table', 1),
(6, '0001_01_06_000000_create_departments_table', 1),
(7, '0001_01_07_000000_create_standards_table', 1),
(8, '0001_01_08_000000_create_sections_table', 1),
(9, '0001_01_09_000000_create_subjects_table', 1),
(10, '0001_01_10_000000_create_teachers_table', 1),
(11, '0001_01_11_000000_create_students_table', 1),
(12, '0001_01_12_000000_create_guardians_table', 1),
(13, '0001_01_13_000000_create_staff_table', 1),
(14, '0001_01_14_000000_create_standard_subjects_table', 1),
(15, '0001_01_15_000000_create_student_guardians_table', 1),
(16, '0001_01_16_000000_create_student_academic_records_table', 1),
(17, '0001_01_17_000000_create_student_documents_table', 1),
(18, '0001_01_18_000000_create_staff_documents_table', 1),
(19, '0001_01_19_000000_create_student_attendances_table', 1),
(20, '0001_01_20_000000_create_teacher_attendances_table', 1),
(21, '0001_01_21_000000_create_time_slots_table', 1),
(22, '0001_01_22_000000_create_timetable_entries_table', 1),
(23, '0001_01_23_000000_create_exam_types_table', 1),
(24, '0001_01_24_000000_create_exams_table', 1),
(25, '0001_01_25_000000_create_exam_schedules_table', 1),
(26, '0001_01_26_000000_create_grading_systems_table', 1),
(27, '0001_01_27_000000_create_results_table', 1),
(28, '0001_01_28_000000_create_result_summaries_table', 1),
(29, '0001_01_29_000000_create_fee_types_table', 1),
(30, '0001_01_30_000000_create_fee_structures_table', 1),
(31, '0001_01_31_000000_create_fee_invoices_table', 1),
(32, '0001_01_32_000000_create_fee_invoice_items_table', 1),
(33, '0001_01_33_000000_create_fee_payments_table', 1),
(34, '0001_01_34_000000_create_scholarships_table', 1),
(35, '0001_01_35_000000_create_book_categories_table', 1),
(36, '0001_01_36_000000_create_books_table', 1),
(37, '0001_01_37_000000_create_library_transactions_table', 1),
(38, '0001_01_38_000000_create_vehicles_table', 1),
(39, '0001_01_39_000000_create_routes_table', 1),
(40, '0001_01_40_000000_create_route_stops_table', 1),
(41, '0001_01_41_000000_create_student_transport_table', 1),
(42, '0001_01_42_000000_create_health_records_table', 1),
(43, '0001_01_43_000000_create_health_checkups_table', 1),
(44, '0001_01_44_000000_create_vaccinations_table', 1),
(45, '0001_01_45_000000_create_inventory_items_table', 1),
(46, '0001_01_46_000000_create_inventory_transactions_table', 1),
(47, '0001_01_47_000000_create_assets_table', 1),
(48, '0001_01_48_000000_create_asset_maintenance_table', 1),
(49, '0001_01_49_000000_create_leave_types_table', 1),
(50, '0001_01_50_000000_create_leave_requests_table', 1),
(51, '0001_01_51_000000_create_payrolls_table', 1),
(52, '0001_01_52_000000_create_payslips_table', 1),
(53, '0001_01_53_000000_create_school_settings_table', 1),
(54, '0001_01_54_000000_create_holidays_table', 1),
(55, '0001_01_55_000000_create_audit_logs_table', 1),
(56, '0001_01_56_000000_create_notifications_table', 1),
(57, '0001_01_57_000000_create_cache_table', 1),
(58, '0001_01_58_000000_create_jobs_table', 1),
(59, '0001_01_59_000000_add_foreign_keys_to_users_table', 1),
(60, '2026_09_10_081433_create_permission_tables', 1),
(61, '2026_09_27_145123_add_salary_to_teachers_table', 1),
(62, '2026_09_27_145131_add_teacher_id_to_leave_requests_table', 1),
(63, '2026_09_27_145148_add_teacher_id_to_payrolls_table', 1),
(64, '2026_09_28_045031_add_school_id_to_users_table', 1),
(65, '2026_09_28_121642_drop_principal_name_from_schools_table', 1),
(66, '2026_09_28_121704_add_vice_principal_id_to_campuses_table', 1),
(67, '2026_10_02_043953_fix_departments_code_uniqueness', 1);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 127),
(2, 'App\\Models\\User', 1),
(2, 'App\\Models\\User', 4),
(2, 'App\\Models\\User', 136),
(3, 'App\\Models\\User', 2),
(3, 'App\\Models\\User', 3),
(3, 'App\\Models\\User', 5),
(3, 'App\\Models\\User', 6),
(3, 'App\\Models\\User', 137),
(4, 'App\\Models\\User', 7),
(4, 'App\\Models\\User', 17),
(4, 'App\\Models\\User', 27),
(4, 'App\\Models\\User', 37),
(5, 'App\\Models\\User', 8),
(5, 'App\\Models\\User', 18),
(5, 'App\\Models\\User', 28),
(5, 'App\\Models\\User', 38),
(6, 'App\\Models\\User', 12),
(6, 'App\\Models\\User', 13),
(6, 'App\\Models\\User', 14),
(6, 'App\\Models\\User', 15),
(6, 'App\\Models\\User', 16),
(6, 'App\\Models\\User', 22),
(6, 'App\\Models\\User', 23),
(6, 'App\\Models\\User', 24),
(6, 'App\\Models\\User', 25),
(6, 'App\\Models\\User', 26),
(6, 'App\\Models\\User', 32),
(6, 'App\\Models\\User', 33),
(6, 'App\\Models\\User', 34),
(6, 'App\\Models\\User', 35),
(6, 'App\\Models\\User', 36),
(6, 'App\\Models\\User', 42),
(6, 'App\\Models\\User', 43),
(6, 'App\\Models\\User', 44),
(6, 'App\\Models\\User', 45),
(6, 'App\\Models\\User', 46),
(6, 'App\\Models\\User', 135),
(7, 'App\\Models\\User', 9),
(7, 'App\\Models\\User', 19),
(7, 'App\\Models\\User', 29),
(7, 'App\\Models\\User', 39),
(8, 'App\\Models\\User', 10),
(8, 'App\\Models\\User', 20),
(8, 'App\\Models\\User', 30),
(8, 'App\\Models\\User', 40),
(9, 'App\\Models\\User', 11),
(9, 'App\\Models\\User', 21),
(9, 'App\\Models\\User', 31),
(9, 'App\\Models\\User', 41),
(10, 'App\\Models\\User', 9),
(10, 'App\\Models\\User', 10),
(10, 'App\\Models\\User', 11),
(10, 'App\\Models\\User', 19),
(10, 'App\\Models\\User', 20),
(10, 'App\\Models\\User', 21),
(10, 'App\\Models\\User', 29),
(10, 'App\\Models\\User', 30),
(10, 'App\\Models\\User', 31),
(10, 'App\\Models\\User', 39),
(10, 'App\\Models\\User', 40),
(10, 'App\\Models\\User', 41),
(11, 'App\\Models\\User', 47),
(11, 'App\\Models\\User', 49),
(11, 'App\\Models\\User', 51),
(11, 'App\\Models\\User', 53),
(11, 'App\\Models\\User', 55),
(11, 'App\\Models\\User', 57),
(11, 'App\\Models\\User', 59),
(11, 'App\\Models\\User', 61),
(11, 'App\\Models\\User', 63),
(11, 'App\\Models\\User', 65),
(11, 'App\\Models\\User', 67),
(11, 'App\\Models\\User', 69),
(11, 'App\\Models\\User', 71),
(11, 'App\\Models\\User', 73),
(11, 'App\\Models\\User', 75),
(11, 'App\\Models\\User', 77),
(11, 'App\\Models\\User', 79),
(11, 'App\\Models\\User', 81),
(11, 'App\\Models\\User', 83),
(11, 'App\\Models\\User', 85),
(11, 'App\\Models\\User', 87),
(11, 'App\\Models\\User', 89),
(11, 'App\\Models\\User', 91),
(11, 'App\\Models\\User', 93),
(11, 'App\\Models\\User', 95),
(11, 'App\\Models\\User', 97),
(11, 'App\\Models\\User', 99),
(11, 'App\\Models\\User', 101),
(11, 'App\\Models\\User', 103),
(11, 'App\\Models\\User', 105),
(11, 'App\\Models\\User', 107),
(11, 'App\\Models\\User', 109),
(11, 'App\\Models\\User', 111),
(11, 'App\\Models\\User', 113),
(11, 'App\\Models\\User', 115),
(11, 'App\\Models\\User', 117),
(11, 'App\\Models\\User', 119),
(11, 'App\\Models\\User', 121),
(11, 'App\\Models\\User', 123),
(11, 'App\\Models\\User', 125),
(11, 'App\\Models\\User', 128),
(11, 'App\\Models\\User', 134),
(12, 'App\\Models\\User', 48),
(12, 'App\\Models\\User', 50),
(12, 'App\\Models\\User', 52),
(12, 'App\\Models\\User', 54),
(12, 'App\\Models\\User', 56),
(12, 'App\\Models\\User', 58),
(12, 'App\\Models\\User', 60),
(12, 'App\\Models\\User', 62),
(12, 'App\\Models\\User', 64),
(12, 'App\\Models\\User', 66),
(12, 'App\\Models\\User', 68),
(12, 'App\\Models\\User', 70),
(12, 'App\\Models\\User', 72),
(12, 'App\\Models\\User', 74),
(12, 'App\\Models\\User', 76),
(12, 'App\\Models\\User', 78),
(12, 'App\\Models\\User', 80),
(12, 'App\\Models\\User', 82),
(12, 'App\\Models\\User', 84),
(12, 'App\\Models\\User', 86),
(12, 'App\\Models\\User', 88),
(12, 'App\\Models\\User', 90),
(12, 'App\\Models\\User', 92),
(12, 'App\\Models\\User', 94),
(12, 'App\\Models\\User', 96),
(12, 'App\\Models\\User', 98),
(12, 'App\\Models\\User', 100),
(12, 'App\\Models\\User', 102),
(12, 'App\\Models\\User', 104),
(12, 'App\\Models\\User', 106),
(12, 'App\\Models\\User', 108),
(12, 'App\\Models\\User', 110),
(12, 'App\\Models\\User', 112),
(12, 'App\\Models\\User', 114),
(12, 'App\\Models\\User', 116),
(12, 'App\\Models\\User', 118),
(12, 'App\\Models\\User', 120),
(12, 'App\\Models\\User', 122),
(12, 'App\\Models\\User', 124),
(12, 'App\\Models\\User', 126);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data`)),
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

CREATE TABLE `organizations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`id`, `name`, `code`, `email`, `phone`, `address`, `logo`, `website`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Demo Education Group', 'DEG', 'info@demogroup.com', '+92 300 1234567', 'Lahore, Pakistan', NULL, 'https://demogroup.com', 'active', '2026-10-02 04:25:44', '2026-10-02 04:25:44');

-- --------------------------------------------------------

--
-- Table structure for table `payrolls`
--

CREATE TABLE `payrolls` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `staff_id` bigint(20) UNSIGNED DEFAULT NULL,
  `teacher_id` bigint(20) UNSIGNED DEFAULT NULL,
  `month` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `basic_salary` decimal(10,2) NOT NULL,
  `allowances` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`allowances`)),
  `deductions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`deductions`)),
  `bonuses` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`bonuses`)),
  `total_earnings` decimal(10,2) NOT NULL,
  `total_deductions` decimal(10,2) NOT NULL,
  `net_salary` decimal(10,2) NOT NULL,
  `status` enum('draft','approved','paid') NOT NULL DEFAULT 'draft',
  `payment_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payrolls`
--

INSERT INTO `payrolls` (`id`, `staff_id`, `teacher_id`, `month`, `year`, `basic_salary`, `allowances`, `deductions`, `bonuses`, `total_earnings`, `total_deductions`, `net_salary`, `status`, `payment_date`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, 10, 2026, 45000.00, '[]', '[]', '[]', 45000.00, 0.00, 45000.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(2, 2, NULL, 10, 2026, 55000.00, '[]', '[]', '[]', 55000.00, 0.00, 55000.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(3, 3, NULL, 10, 2026, 60000.00, '[]', '[]', '[]', 60000.00, 0.00, 60000.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(4, 4, NULL, 10, 2026, 45000.00, '[]', '[]', '[]', 45000.00, 0.00, 45000.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(5, 5, NULL, 10, 2026, 55000.00, '[]', '[]', '[]', 55000.00, 0.00, 55000.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(6, 6, NULL, 10, 2026, 60000.00, '[]', '[]', '[]', 60000.00, 0.00, 60000.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(7, 7, NULL, 10, 2026, 45000.00, '[]', '[]', '[]', 45000.00, 0.00, 45000.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(8, 8, NULL, 10, 2026, 55000.00, '[]', '[]', '[]', 55000.00, 0.00, 55000.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(9, 9, NULL, 10, 2026, 60000.00, '[]', '[]', '[]', 60000.00, 0.00, 60000.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(10, 10, NULL, 10, 2026, 45000.00, '[]', '[]', '[]', 45000.00, 0.00, 45000.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(11, 11, NULL, 10, 2026, 55000.00, '[]', '[]', '[]', 55000.00, 0.00, 55000.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(12, 12, NULL, 10, 2026, 60000.00, '[]', '[]', '[]', 60000.00, 0.00, 60000.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(13, NULL, 1, 10, 2026, 41347.00, '[]', '[]', '[]', 41347.00, 0.00, 41347.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(14, NULL, 2, 10, 2026, 49056.00, '[]', '[]', '[]', 49056.00, 0.00, 49056.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(15, NULL, 3, 10, 2026, 40588.00, '[]', '[]', '[]', 40588.00, 0.00, 40588.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(16, NULL, 4, 10, 2026, 55801.00, '[]', '[]', '[]', 55801.00, 0.00, 55801.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(17, NULL, 5, 10, 2026, 59110.00, '[]', '[]', '[]', 59110.00, 0.00, 59110.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(18, NULL, 6, 10, 2026, 69623.00, '[]', '[]', '[]', 69623.00, 0.00, 69623.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(19, NULL, 7, 10, 2026, 67240.00, '[]', '[]', '[]', 67240.00, 0.00, 67240.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(20, NULL, 8, 10, 2026, 52709.00, '[]', '[]', '[]', 52709.00, 0.00, 52709.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(21, NULL, 9, 10, 2026, 43459.00, '[]', '[]', '[]', 43459.00, 0.00, 43459.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(22, NULL, 10, 10, 2026, 55609.00, '[]', '[]', '[]', 55609.00, 0.00, 55609.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(23, NULL, 11, 10, 2026, 41585.00, '[]', '[]', '[]', 41585.00, 0.00, 41585.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(24, NULL, 12, 10, 2026, 47722.00, '[]', '[]', '[]', 47722.00, 0.00, 47722.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(25, NULL, 13, 10, 2026, 41471.00, '[]', '[]', '[]', 41471.00, 0.00, 41471.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(26, NULL, 14, 10, 2026, 68248.00, '[]', '[]', '[]', 68248.00, 0.00, 68248.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(27, NULL, 15, 10, 2026, 66341.00, '[]', '[]', '[]', 66341.00, 0.00, 66341.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(28, NULL, 16, 10, 2026, 69669.00, '[]', '[]', '[]', 69669.00, 0.00, 69669.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(29, NULL, 17, 10, 2026, 52149.00, '[]', '[]', '[]', 52149.00, 0.00, 52149.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(30, NULL, 18, 10, 2026, 45439.00, '[]', '[]', '[]', 45439.00, 0.00, 45439.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(31, NULL, 19, 10, 2026, 57418.00, '[]', '[]', '[]', 57418.00, 0.00, 57418.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(32, NULL, 20, 10, 2026, 43034.00, '[]', '[]', '[]', 43034.00, 0.00, 43034.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36'),
(33, NULL, 21, 10, 2026, 100000.00, '[]', '[]', '[]', 100000.00, 0.00, 100000.00, 'draft', NULL, '2026-10-05 05:54:36', '2026-10-05 05:54:36');

-- --------------------------------------------------------

--
-- Table structure for table `payslips`
--

CREATE TABLE `payslips` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `payroll_id` bigint(20) UNSIGNED NOT NULL,
  `staff_id` bigint(20) UNSIGNED NOT NULL,
  `payslip_number` varchar(255) NOT NULL,
  `pdf_path` varchar(255) DEFAULT NULL,
  `generated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'dashboard.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(2, 'organizations.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(3, 'organizations.create', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(4, 'organizations.edit', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(5, 'organizations.delete', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(6, 'schools.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(7, 'schools.create', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(8, 'schools.edit', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(9, 'schools.delete', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(10, 'campuses.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(11, 'campuses.create', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(12, 'campuses.edit', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(13, 'campuses.delete', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(14, 'academic_sessions.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(15, 'academic_sessions.create', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(16, 'academic_sessions.edit', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(17, 'academic_sessions.delete', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(18, 'departments.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(19, 'departments.create', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(20, 'departments.edit', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(21, 'departments.delete', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(22, 'standards.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(23, 'standards.create', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(24, 'standards.edit', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(25, 'standards.delete', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(26, 'sections.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(27, 'sections.create', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(28, 'sections.edit', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(29, 'sections.delete', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(30, 'subjects.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(31, 'subjects.create', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(32, 'subjects.edit', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(33, 'subjects.delete', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(34, 'students.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(35, 'students.create', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(36, 'students.edit', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(37, 'students.delete', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(38, 'students.import', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(39, 'students.export', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(40, 'guardians.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(41, 'guardians.create', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(42, 'guardians.edit', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(43, 'guardians.delete', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(44, 'teachers.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(45, 'teachers.create', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(46, 'teachers.edit', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(47, 'teachers.delete', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(48, 'staff.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(49, 'staff.create', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(50, 'staff.edit', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(51, 'staff.delete', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(52, 'attendance.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(53, 'attendance.mark', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(54, 'attendance.edit', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(55, 'attendance.report', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(56, 'timetable.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(57, 'timetable.create', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(58, 'timetable.edit', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(59, 'timetable.delete', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(60, 'exams.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(61, 'exams.create', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(62, 'exams.edit', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(63, 'exams.delete', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(64, 'exams.schedule', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(65, 'results.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(66, 'results.manage', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(67, 'results.publish', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(68, 'results.export', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(69, 'fees.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(70, 'fees.collect', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(71, 'fees.refund', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(72, 'fees.structure', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(73, 'fees.report', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(74, 'library.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(75, 'library.manage', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(76, 'library.issue', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(77, 'library.return', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(78, 'library.fine', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(79, 'transport.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(80, 'transport.manage', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(81, 'transport.assign', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(82, 'health.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(83, 'health.manage', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(84, 'inventory.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(85, 'inventory.manage', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(86, 'inventory.stock', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(87, 'hr.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(88, 'hr.manage', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(89, 'hr.payroll', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(90, 'hr.leave', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(91, 'reports.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(92, 'reports.generate', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(93, 'settings.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(94, 'settings.edit', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(95, 'users.view', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(96, 'users.create', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(97, 'users.edit', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(98, 'users.delete', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(99, 'users.roles', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44');

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `exam_id` bigint(20) UNSIGNED NOT NULL,
  `subject_id` bigint(20) UNSIGNED NOT NULL,
  `marks_obtained` decimal(5,2) NOT NULL,
  `total_marks` decimal(5,2) NOT NULL,
  `percentage` decimal(5,2) NOT NULL,
  `grade` varchar(255) DEFAULT NULL,
  `grade_points` decimal(3,2) DEFAULT NULL,
  `is_passed` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`id`, `student_id`, `exam_id`, `subject_id`, `marks_obtained`, `total_marks`, `percentage`, `grade`, `grade_points`, `is_passed`, `created_at`, `updated_at`) VALUES
(1, 6, 2, 1, 100.00, 100.00, 100.00, 'F', 0.00, 1, '2026-10-05 07:45:31', '2026-10-05 07:45:31'),
(2, 6, 2, 2, 50.00, 100.00, 50.00, 'F', 0.00, 1, '2026-10-05 07:45:31', '2026-10-05 07:45:31'),
(3, 6, 2, 3, 100.00, 100.00, 100.00, 'F', 0.00, 1, '2026-10-05 07:45:31', '2026-10-05 07:45:31'),
(4, 6, 2, 5, 50.00, 100.00, 50.00, 'F', 0.00, 1, '2026-10-05 07:45:31', '2026-10-05 07:45:31'),
(5, 7, 2, 1, 80.00, 100.00, 80.00, 'F', 0.00, 1, '2026-10-05 07:45:31', '2026-10-05 07:45:31'),
(6, 7, 2, 2, 80.00, 100.00, 80.00, 'F', 0.00, 1, '2026-10-05 07:45:31', '2026-10-05 07:45:31'),
(7, 7, 2, 3, 50.00, 100.00, 50.00, 'F', 0.00, 1, '2026-10-05 07:45:31', '2026-10-05 07:45:31'),
(8, 7, 2, 5, 80.00, 100.00, 80.00, 'F', 0.00, 1, '2026-10-05 07:45:31', '2026-10-05 07:45:31');

-- --------------------------------------------------------

--
-- Table structure for table `result_summaries`
--

CREATE TABLE `result_summaries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `exam_id` bigint(20) UNSIGNED NOT NULL,
  `total_marks_obtained` decimal(5,2) NOT NULL,
  `total_marks` decimal(5,2) NOT NULL,
  `percentage` decimal(5,2) NOT NULL,
  `grade` varchar(255) DEFAULT NULL,
  `gpa` decimal(3,2) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `is_passed` tinyint(1) NOT NULL DEFAULT 0,
  `remark` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `result_summaries`
--

INSERT INTO `result_summaries` (`id`, `student_id`, `exam_id`, `total_marks_obtained`, `total_marks`, `percentage`, `grade`, `gpa`, `position`, `is_passed`, `remark`, `created_at`, `updated_at`) VALUES
(1, 6, 2, 300.00, 400.00, 75.00, 'F', 0.00, 1, 1, NULL, '2026-10-05 07:45:31', '2026-10-05 07:45:31'),
(2, 7, 2, 290.00, 400.00, 72.50, 'F', 0.00, 2, 1, NULL, '2026-10-05 07:45:31', '2026-10-05 07:45:31');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'super_admin', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(2, 'principal', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(3, 'vice_principal', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(4, 'hr_manager', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(5, 'receptionist', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(6, 'teacher', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(7, 'librarian', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(8, 'transport_manager', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(9, 'accountant', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(10, 'staff', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(11, 'student', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(12, 'guardian', 'web', '2026-10-02 04:25:44', '2026-10-02 04:25:44');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(1, 12),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(6, 2),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(10, 2),
(11, 1),
(11, 2),
(12, 1),
(12, 2),
(13, 1),
(14, 1),
(14, 2),
(15, 1),
(15, 2),
(16, 1),
(16, 2),
(17, 1),
(18, 1),
(18, 2),
(18, 3),
(18, 4),
(19, 1),
(19, 2),
(19, 3),
(20, 1),
(20, 2),
(20, 3),
(21, 1),
(21, 2),
(21, 3),
(22, 1),
(22, 2),
(22, 3),
(23, 1),
(23, 2),
(23, 3),
(24, 1),
(24, 2),
(24, 3),
(25, 1),
(25, 2),
(26, 1),
(26, 2),
(26, 3),
(27, 1),
(27, 2),
(27, 3),
(28, 1),
(28, 2),
(28, 3),
(29, 1),
(29, 2),
(30, 1),
(30, 2),
(30, 3),
(31, 1),
(31, 2),
(31, 3),
(32, 1),
(32, 2),
(32, 3),
(33, 1),
(33, 2),
(34, 1),
(34, 2),
(34, 3),
(34, 5),
(34, 6),
(34, 7),
(34, 8),
(34, 9),
(34, 11),
(34, 12),
(35, 1),
(35, 2),
(35, 3),
(35, 5),
(36, 1),
(36, 2),
(36, 3),
(36, 5),
(37, 1),
(37, 2),
(37, 5),
(38, 1),
(38, 2),
(38, 3),
(38, 5),
(39, 1),
(39, 2),
(39, 3),
(39, 5),
(40, 1),
(40, 2),
(40, 3),
(40, 5),
(40, 6),
(41, 1),
(41, 2),
(41, 3),
(41, 5),
(42, 1),
(42, 2),
(42, 3),
(42, 5),
(43, 1),
(43, 2),
(43, 5),
(44, 1),
(44, 2),
(44, 3),
(44, 4),
(45, 1),
(45, 2),
(45, 3),
(45, 4),
(46, 1),
(46, 2),
(46, 3),
(46, 4),
(47, 1),
(47, 2),
(47, 4),
(48, 1),
(48, 2),
(48, 3),
(48, 4),
(48, 10),
(49, 1),
(49, 2),
(49, 4),
(50, 1),
(50, 2),
(50, 4),
(51, 1),
(51, 2),
(51, 4),
(52, 1),
(52, 2),
(52, 3),
(52, 5),
(52, 6),
(52, 11),
(52, 12),
(53, 1),
(53, 2),
(53, 3),
(53, 6),
(54, 1),
(54, 2),
(55, 1),
(55, 2),
(55, 3),
(56, 1),
(56, 2),
(56, 3),
(56, 5),
(56, 6),
(56, 11),
(56, 12),
(57, 1),
(57, 3),
(57, 5),
(58, 1),
(58, 3),
(58, 5),
(59, 1),
(59, 3),
(59, 5),
(60, 1),
(60, 2),
(60, 3),
(60, 6),
(60, 11),
(60, 12),
(61, 1),
(61, 2),
(61, 3),
(62, 1),
(62, 2),
(62, 3),
(63, 1),
(64, 1),
(64, 2),
(65, 1),
(65, 2),
(65, 3),
(65, 6),
(65, 11),
(65, 12),
(66, 1),
(66, 2),
(66, 3),
(66, 6),
(67, 1),
(67, 2),
(68, 1),
(69, 1),
(69, 2),
(69, 3),
(69, 9),
(69, 11),
(69, 12),
(70, 1),
(70, 9),
(71, 1),
(71, 9),
(72, 1),
(72, 9),
(73, 1),
(73, 9),
(74, 1),
(74, 2),
(74, 3),
(74, 6),
(74, 7),
(74, 11),
(74, 12),
(75, 1),
(75, 7),
(76, 1),
(76, 6),
(76, 7),
(77, 1),
(77, 7),
(78, 1),
(78, 7),
(79, 1),
(79, 2),
(79, 3),
(79, 5),
(79, 6),
(79, 8),
(79, 11),
(79, 12),
(80, 1),
(80, 8),
(81, 1),
(81, 8),
(82, 1),
(82, 2),
(82, 3),
(82, 5),
(82, 6),
(82, 11),
(82, 12),
(83, 1),
(84, 1),
(85, 1),
(86, 1),
(87, 1),
(87, 4),
(87, 10),
(88, 1),
(88, 4),
(89, 1),
(89, 4),
(90, 1),
(90, 4),
(91, 1),
(91, 2),
(91, 3),
(91, 4),
(91, 7),
(91, 8),
(91, 9),
(92, 1),
(93, 1),
(94, 1),
(95, 1),
(95, 2),
(96, 1),
(96, 2),
(97, 1),
(97, 2),
(98, 1),
(99, 1);

-- --------------------------------------------------------

--
-- Table structure for table `routes`
--

CREATE TABLE `routes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `campus_id` bigint(20) UNSIGNED NOT NULL,
  `vehicle_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `route_stops`
--

CREATE TABLE `route_stops` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `route_id` bigint(20) UNSIGNED NOT NULL,
  `stop_name` varchar(255) NOT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `stop_order` int(11) NOT NULL,
  `arrival_time` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `scholarships`
--

CREATE TABLE `scholarships` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `type` enum('percentage','fixed') NOT NULL DEFAULT 'fixed',
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schools`
--

CREATE TABLE `schools` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `organization_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `established_year` year(4) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `schools`
--

INSERT INTO `schools` (`id`, `organization_id`, `name`, `code`, `email`, `phone`, `address`, `logo`, `website`, `established_year`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Beaconhouse School', 'BHS', 'info@beaconhouse.com', '+92 42 111 111 111', 'Johar Town, Lahore', NULL, 'https://beaconhouse.com', '2005', 'active', '2026-10-02 04:25:44', '2026-10-02 04:25:44'),
(2, 1, 'Grammar School', 'GS', 'info@grammar.com', '+92 42 222 222 222', 'DHA Phase 5, Lahore', NULL, 'https://grammar.com', '2010', 'active', '2026-10-02 04:25:45', '2026-10-02 04:25:45'),
(3, 1, 'Superior', 'SRR', 'Superior@contact.com', NULL, NULL, NULL, 'https://gemini.google.com/', '2010', 'active', '2026-10-03 14:21:43', '2026-10-03 14:21:43');

-- --------------------------------------------------------

--
-- Table structure for table `school_settings`
--

CREATE TABLE `school_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `campus_id` bigint(20) UNSIGNED NOT NULL,
  `setting_key` varchar(255) NOT NULL,
  `setting_value` text NOT NULL,
  `setting_type` enum('string','boolean','integer','json') NOT NULL DEFAULT 'string',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `standard_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `capacity` int(11) NOT NULL DEFAULT 30,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sections`
--

INSERT INTO `sections` (`id`, `standard_id`, `name`, `code`, `capacity`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Section A', 'BHS-MAIN-PG-A', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(2, 1, 'Section B', 'BHS-MAIN-PG-B', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(3, 2, 'Section A', 'BHS-MAIN-NUR-A', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(4, 2, 'Section B', 'BHS-MAIN-NUR-B', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(5, 3, 'Section A', 'BHS-MAIN-KG-A', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(6, 3, 'Section B', 'BHS-MAIN-KG-B', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(7, 4, 'Section A', 'BHS-MAIN-G1-A', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(8, 4, 'Section B', 'BHS-MAIN-G1-B', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(9, 5, 'Section A', 'BHS-MAIN-G2-A', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(10, 5, 'Section B', 'BHS-MAIN-G2-B', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(11, 6, 'Section A', 'BHS-NORTH-PG-A', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(12, 6, 'Section B', 'BHS-NORTH-PG-B', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(13, 7, 'Section A', 'BHS-NORTH-NUR-A', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(14, 7, 'Section B', 'BHS-NORTH-NUR-B', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(15, 8, 'Section A', 'BHS-NORTH-KG-A', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(16, 8, 'Section B', 'BHS-NORTH-KG-B', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(17, 9, 'Section A', 'BHS-NORTH-G1-A', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(18, 9, 'Section B', 'BHS-NORTH-G1-B', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(19, 10, 'Section A', 'BHS-NORTH-G2-A', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(20, 10, 'Section B', 'BHS-NORTH-G2-B', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(21, 11, 'Section A', 'GS-MAIN-PG-A', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(22, 11, 'Section B', 'GS-MAIN-PG-B', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(23, 12, 'Section A', 'GS-MAIN-NUR-A', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(24, 12, 'Section B', 'GS-MAIN-NUR-B', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(25, 13, 'Section A', 'GS-MAIN-KG-A', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(26, 13, 'Section B', 'GS-MAIN-KG-B', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(27, 14, 'Section A', 'GS-MAIN-G1-A', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(28, 14, 'Section B', 'GS-MAIN-G1-B', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(29, 15, 'Section A', 'GS-MAIN-G2-A', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(30, 15, 'Section B', 'GS-MAIN-G2-B', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(31, 16, 'Section A', 'GS-NORTH-PG-A', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(32, 16, 'Section B', 'GS-NORTH-PG-B', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(33, 17, 'Section A', 'GS-NORTH-NUR-A', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(34, 17, 'Section B', 'GS-NORTH-NUR-B', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(35, 18, 'Section A', 'GS-NORTH-KG-A', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(36, 18, 'Section B', 'GS-NORTH-KG-B', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(37, 19, 'Section A', 'GS-NORTH-G1-A', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(38, 19, 'Section B', 'GS-NORTH-G1-B', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(39, 20, 'Section A', 'GS-NORTH-G2-A', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(40, 20, 'Section B', 'GS-NORTH-G2-B', 30, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `employee_id` varchar(255) NOT NULL,
  `department_id` bigint(20) UNSIGNED NOT NULL,
  `designation` varchar(255) NOT NULL,
  `salary` decimal(10,2) NOT NULL DEFAULT 0.00,
  `employment_type` enum('full_time','part_time','contract','intern') NOT NULL DEFAULT 'full_time',
  `joining_date` date NOT NULL,
  `termination_date` date DEFAULT NULL,
  `status` enum('active','inactive','terminated') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `user_id`, `employee_id`, `department_id`, `designation`, `salary`, `employment_type`, `joining_date`, `termination_date`, `status`, `created_at`, `updated_at`) VALUES
(1, 9, 'BHS-MAIN-LIB-001', 3, 'Librarian', 45000.00, 'full_time', '2025-10-02', NULL, 'active', '2026-10-02 04:25:47', '2026-10-02 04:25:47'),
(2, 10, 'BHS-MAIN-TRAN-001', 4, 'Transport Manager', 55000.00, 'full_time', '2025-10-02', NULL, 'active', '2026-10-02 04:25:47', '2026-10-02 04:25:47'),
(3, 11, 'BHS-MAIN-FIN-001', 2, 'Accountant', 60000.00, 'full_time', '2025-10-02', NULL, 'active', '2026-10-02 04:25:47', '2026-10-02 04:25:47'),
(4, 19, 'BHS-NORTH-LIB-001', 9, 'Librarian', 45000.00, 'full_time', '2025-10-02', NULL, 'active', '2026-10-02 04:25:49', '2026-10-02 04:25:49'),
(5, 20, 'BHS-NORTH-TRAN-001', 10, 'Transport Manager', 55000.00, 'full_time', '2025-10-02', NULL, 'active', '2026-10-02 04:25:49', '2026-10-02 04:25:49'),
(6, 21, 'BHS-NORTH-FIN-001', 8, 'Accountant', 60000.00, 'full_time', '2025-10-02', NULL, 'active', '2026-10-02 04:25:49', '2026-10-02 04:25:49'),
(7, 29, 'GS-MAIN-LIB-001', 15, 'Librarian', 45000.00, 'full_time', '2025-10-02', NULL, 'active', '2026-10-02 04:25:51', '2026-10-02 04:25:51'),
(8, 30, 'GS-MAIN-TRAN-001', 16, 'Transport Manager', 55000.00, 'full_time', '2025-10-02', NULL, 'active', '2026-10-02 04:25:51', '2026-10-02 04:25:51'),
(9, 31, 'GS-MAIN-FIN-001', 14, 'Accountant', 60000.00, 'full_time', '2025-10-02', NULL, 'active', '2026-10-02 04:25:51', '2026-10-02 04:25:51'),
(10, 39, 'GS-NORTH-LIB-001', 21, 'Librarian', 45000.00, 'full_time', '2025-10-02', NULL, 'active', '2026-10-02 04:25:53', '2026-10-02 04:25:53'),
(11, 40, 'GS-NORTH-TRAN-001', 22, 'Transport Manager', 55000.00, 'full_time', '2025-10-02', NULL, 'active', '2026-10-02 04:25:53', '2026-10-02 04:25:53'),
(12, 41, 'GS-NORTH-FIN-001', 20, 'Accountant', 60000.00, 'full_time', '2025-10-02', NULL, 'active', '2026-10-02 04:25:53', '2026-10-02 04:25:53');

-- --------------------------------------------------------

--
-- Table structure for table `staff_documents`
--

CREATE TABLE `staff_documents` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `staff_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `type` enum('contract','resume','qualification','other') NOT NULL DEFAULT 'other',
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `standards`
--

CREATE TABLE `standards` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `campus_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `description` text DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `standards`
--

INSERT INTO `standards` (`id`, `campus_id`, `name`, `code`, `order`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Playgroup', 'BHS-MAIN-PG', 1, 'Playgroup at Beaconhouse School — Main Campus', 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(2, 1, 'Nursery', 'BHS-MAIN-NUR', 2, 'Nursery at Beaconhouse School — Main Campus', 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(3, 1, 'KG', 'BHS-MAIN-KG', 3, 'KG at Beaconhouse School — Main Campus', 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(4, 1, 'Grade 1', 'BHS-MAIN-G1', 4, 'Grade 1 at Beaconhouse School — Main Campus', 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(5, 1, 'Grade 2', 'BHS-MAIN-G2', 5, 'Grade 2 at Beaconhouse School — Main Campus', 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(6, 2, 'Playgroup', 'BHS-NORTH-PG', 1, 'Playgroup at Beaconhouse School — North Campus', 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(7, 2, 'Nursery', 'BHS-NORTH-NUR', 2, 'Nursery at Beaconhouse School — North Campus', 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(8, 2, 'KG', 'BHS-NORTH-KG', 3, 'KG at Beaconhouse School — North Campus', 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(9, 2, 'Grade 1', 'BHS-NORTH-G1', 4, 'Grade 1 at Beaconhouse School — North Campus', 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(10, 2, 'Grade 2', 'BHS-NORTH-G2', 5, 'Grade 2 at Beaconhouse School — North Campus', 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(11, 3, 'Playgroup', 'GS-MAIN-PG', 1, 'Playgroup at Grammar School — Main Campus', 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(12, 3, 'Nursery', 'GS-MAIN-NUR', 2, 'Nursery at Grammar School — Main Campus', 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(13, 3, 'KG', 'GS-MAIN-KG', 3, 'KG at Grammar School — Main Campus', 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(14, 3, 'Grade 1', 'GS-MAIN-G1', 4, 'Grade 1 at Grammar School — Main Campus', 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(15, 3, 'Grade 2', 'GS-MAIN-G2', 5, 'Grade 2 at Grammar School — Main Campus', 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(16, 4, 'Playgroup', 'GS-NORTH-PG', 1, 'Playgroup at Grammar School — North Campus', 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(17, 4, 'Nursery', 'GS-NORTH-NUR', 2, 'Nursery at Grammar School — North Campus', 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(18, 4, 'KG', 'GS-NORTH-KG', 3, 'KG at Grammar School — North Campus', 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(19, 4, 'Grade 1', 'GS-NORTH-G1', 4, 'Grade 1 at Grammar School — North Campus', 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(20, 4, 'Grade 2', 'GS-NORTH-G2', 5, 'Grade 2 at Grammar School — North Campus', 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55');

-- --------------------------------------------------------

--
-- Table structure for table `standard_subjects`
--

CREATE TABLE `standard_subjects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `standard_id` bigint(20) UNSIGNED NOT NULL,
  `subject_id` bigint(20) UNSIGNED NOT NULL,
  `teacher_id` bigint(20) UNSIGNED NOT NULL,
  `academic_session_id` bigint(20) UNSIGNED NOT NULL,
  `is_compulsory` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `standard_subjects`
--

INSERT INTO `standard_subjects` (`id`, `standard_id`, `subject_id`, `teacher_id`, `academic_session_id`, `is_compulsory`, `created_at`, `updated_at`) VALUES
(1, 3, 3, 10, 1, 1, '2026-10-05 07:25:19', '2026-10-05 07:25:19'),
(2, 3, 2, 14, 1, 1, '2026-10-05 07:25:39', '2026-10-05 07:25:39'),
(3, 3, 1, 8, 1, 1, '2026-10-05 07:25:58', '2026-10-05 07:25:58'),
(4, 3, 5, 12, 1, 1, '2026-10-05 07:26:19', '2026-10-05 07:26:19');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `campus_id` bigint(20) UNSIGNED NOT NULL,
  `admission_number` varchar(255) NOT NULL,
  `roll_number` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` enum('male','female','other') NOT NULL,
  `blood_group` enum('A+','A-','B+','B-','AB+','AB-','O+','O-') DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `religion` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `previous_school` varchar(255) DEFAULT NULL,
  `admission_date` date NOT NULL,
  `student_photo` varchar(255) DEFAULT NULL,
  `status` enum('application','admitted','enrolled','active','promoted','graduated','transferred','dropped') NOT NULL DEFAULT 'application',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `user_id`, `campus_id`, `admission_number`, `roll_number`, `first_name`, `last_name`, `date_of_birth`, `gender`, `blood_group`, `nationality`, `religion`, `address`, `phone`, `email`, `previous_school`, `admission_date`, `student_photo`, `status`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 47, 1, 'BHS-MAIN-ADM-0001', '1', 'Aisha', 'Ali', '2015-10-02', 'female', 'O+', 'Pakistani', 'Islam', 'Johar Town, Lahore', '+92 300 4057844', 'bhs-main.student1@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(2, 49, 1, 'BHS-MAIN-ADM-0002', '2', 'Ali', 'Ahmed', '2015-10-02', 'male', 'O+', 'Pakistani', 'Islam', 'Johar Town, Lahore', '+92 300 1601961', 'bhs-main.student2@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(3, 51, 1, 'BHS-MAIN-ADM-0003', '3', 'Hira', 'Raza', '2016-10-02', 'female', 'O+', 'Pakistani', 'Islam', 'Johar Town, Lahore', '+92 300 7604503', 'bhs-main.student3@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:25:56', '2026-10-02 04:25:56'),
(4, 53, 1, 'BHS-MAIN-ADM-0004', '4', 'Ali', 'Raza', '2018-10-02', 'male', 'O+', 'Pakistani', 'Islam', 'Johar Town, Lahore', '+92 300 4686130', 'bhs-main.student4@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:25:56', '2026-10-02 04:25:56'),
(5, 55, 1, 'BHS-MAIN-ADM-0005', '5', 'Fatima', 'Ahmed', '2019-10-02', 'female', 'O+', 'Pakistani', 'Islam', 'Johar Town, Lahore', '+92 300 8892744', 'bhs-main.student5@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:25:57', '2026-10-02 04:25:57'),
(6, 57, 1, 'BHS-MAIN-ADM-0006', '6', 'Hamza', 'Ahmed', '2019-10-02', 'male', 'O+', 'Pakistani', 'Islam', 'Johar Town, Lahore', '+92 300 1652248', 'bhs-main.student6@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:25:57', '2026-10-02 04:25:57'),
(7, 59, 1, 'BHS-MAIN-ADM-0007', '7', 'Maryam', 'Shah', '2018-10-02', 'female', 'O+', 'Pakistani', 'Islam', 'Johar Town, Lahore', '+92 300 2401885', 'bhs-main.student7@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:25:57', '2026-10-02 04:25:57'),
(8, 61, 1, 'BHS-MAIN-ADM-0008', '8', 'Ahmed', 'Ahmed', '2016-10-02', 'male', 'O+', 'Pakistani', 'Islam', 'Johar Town, Lahore', '+92 300 6291168', 'bhs-main.student8@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:25:58', '2026-10-02 04:25:58'),
(9, 63, 1, 'BHS-MAIN-ADM-0009', '9', 'Fatima', 'Ahmed', '2014-10-02', 'female', 'O+', 'Pakistani', 'Islam', 'Johar Town, Lahore', '+92 300 2658708', 'bhs-main.student9@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:25:58', '2026-10-02 04:25:58'),
(10, 65, 1, 'BHS-MAIN-ADM-0010', '10', 'Hamza', 'Ali', '2019-10-02', 'male', 'O+', 'Pakistani', 'Islam', 'Johar Town, Lahore', '+92 300 2108016', 'bhs-main.student10@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:25:59', '2026-10-02 04:25:59'),
(11, 67, 2, 'BHS-NORTH-ADM-0001', '1', 'Maryam', 'Khan', '2018-10-02', 'female', 'O+', 'Pakistani', 'Islam', 'Johar Town, Lahore', '+92 300 2323834', 'bhs-north.student1@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:25:59', '2026-10-02 04:25:59'),
(12, 69, 2, 'BHS-NORTH-ADM-0002', '2', 'Bilal', 'Shah', '2014-10-02', 'male', 'O+', 'Pakistani', 'Islam', 'Johar Town, Lahore', '+92 300 6855913', 'bhs-north.student2@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:00', '2026-10-02 04:26:00'),
(13, 71, 2, 'BHS-NORTH-ADM-0003', '3', 'Maryam', 'Raza', '2020-10-02', 'female', 'O+', 'Pakistani', 'Islam', 'Johar Town, Lahore', '+92 300 1327627', 'bhs-north.student3@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:00', '2026-10-02 04:26:00'),
(14, 73, 2, 'BHS-NORTH-ADM-0004', '4', 'Rehan', 'Raza', '2016-10-02', 'male', 'O+', 'Pakistani', 'Islam', 'Johar Town, Lahore', '+92 300 8838224', 'bhs-north.student4@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:00', '2026-10-02 04:26:00'),
(15, 75, 2, 'BHS-NORTH-ADM-0005', '5', 'Hira', 'Raza', '2019-10-02', 'female', 'O+', 'Pakistani', 'Islam', 'Johar Town, Lahore', '+92 300 9076981', 'bhs-north.student5@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:01', '2026-10-02 04:26:01'),
(16, 77, 2, 'BHS-NORTH-ADM-0006', '6', 'Ali', 'Ahmed', '2018-10-02', 'male', 'O+', 'Pakistani', 'Islam', 'Johar Town, Lahore', '+92 300 6383353', 'bhs-north.student6@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:01', '2026-10-02 04:26:01'),
(17, 79, 2, 'BHS-NORTH-ADM-0007', '7', 'Aisha', 'Raza', '2014-10-02', 'female', 'O+', 'Pakistani', 'Islam', 'Johar Town, Lahore', '+92 300 7499852', 'bhs-north.student7@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:02', '2026-10-02 04:26:02'),
(18, 81, 2, 'BHS-NORTH-ADM-0008', '8', 'Ahmed', 'Raza', '2016-10-02', 'male', 'O+', 'Pakistani', 'Islam', 'Johar Town, Lahore', '+92 300 9654848', 'bhs-north.student8@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:02', '2026-10-02 04:26:02'),
(19, 83, 2, 'BHS-NORTH-ADM-0009', '9', 'Fatima', 'Khan', '2016-10-02', 'female', 'O+', 'Pakistani', 'Islam', 'Johar Town, Lahore', '+92 300 5778583', 'bhs-north.student9@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:02', '2026-10-02 04:26:02'),
(20, 85, 2, 'BHS-NORTH-ADM-0010', '10', 'Rehan', 'Khan', '2020-10-02', 'male', 'O+', 'Pakistani', 'Islam', 'Johar Town, Lahore', '+92 300 5904665', 'bhs-north.student10@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:03', '2026-10-02 04:26:03'),
(21, 87, 3, 'GS-MAIN-ADM-0001', '1', 'Fatima', 'Ahmed', '2015-10-02', 'female', 'O+', 'Pakistani', 'Islam', 'DHA Phase 5, Lahore', '+92 300 5459751', 'gs-main.student1@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:03', '2026-10-02 04:26:03'),
(22, 89, 3, 'GS-MAIN-ADM-0002', '2', 'Bilal', 'Shah', '2020-10-02', 'male', 'O+', 'Pakistani', 'Islam', 'DHA Phase 5, Lahore', '+92 300 5281499', 'gs-main.student2@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:04', '2026-10-02 04:26:04'),
(23, 91, 3, 'GS-MAIN-ADM-0003', '3', 'Hira', 'Shah', '2019-10-02', 'female', 'O+', 'Pakistani', 'Islam', 'DHA Phase 5, Lahore', '+92 300 8742426', 'gs-main.student3@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:04', '2026-10-02 04:26:04'),
(24, 93, 3, 'GS-MAIN-ADM-0004', '4', 'Ali', 'Ali', '2017-10-02', 'male', 'O+', 'Pakistani', 'Islam', 'DHA Phase 5, Lahore', '+92 300 8538499', 'gs-main.student4@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:05', '2026-10-02 04:26:05'),
(25, 95, 3, 'GS-MAIN-ADM-0005', '5', 'Zainab', 'Raza', '2019-10-02', 'female', 'O+', 'Pakistani', 'Islam', 'DHA Phase 5, Lahore', '+92 300 1497882', 'gs-main.student5@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:05', '2026-10-02 04:26:05'),
(26, 97, 3, 'GS-MAIN-ADM-0006', '6', 'Hamza', 'Khan', '2018-10-02', 'male', 'O+', 'Pakistani', 'Islam', 'DHA Phase 5, Lahore', '+92 300 7163331', 'gs-main.student6@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:05', '2026-10-02 04:26:05'),
(27, 99, 3, 'GS-MAIN-ADM-0007', '7', 'Maryam', 'Khan', '2020-10-02', 'female', 'O+', 'Pakistani', 'Islam', 'DHA Phase 5, Lahore', '+92 300 9182888', 'gs-main.student7@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:06', '2026-10-02 04:26:06'),
(28, 101, 3, 'GS-MAIN-ADM-0008', '8', 'Ali', 'Raza', '2019-10-02', 'male', 'O+', 'Pakistani', 'Islam', 'DHA Phase 5, Lahore', '+92 300 3583644', 'gs-main.student8@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:06', '2026-10-02 04:26:06'),
(29, 103, 3, 'GS-MAIN-ADM-0009', '9', 'Fatima', 'Raza', '2014-10-02', 'female', 'O+', 'Pakistani', 'Islam', 'DHA Phase 5, Lahore', '+92 300 2439066', 'gs-main.student9@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:07', '2026-10-02 04:26:07'),
(30, 105, 3, 'GS-MAIN-ADM-0010', '10', 'Ali', 'Raza', '2021-10-02', 'male', 'O+', 'Pakistani', 'Islam', 'DHA Phase 5, Lahore', '+92 300 1947926', 'gs-main.student10@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:07', '2026-10-02 04:26:07'),
(31, 107, 4, 'GS-NORTH-ADM-0001', '1', 'Maryam', 'Ali', '2020-10-02', 'female', 'O+', 'Pakistani', 'Islam', 'DHA Phase 5, Lahore', '+92 300 8623503', 'gs-north.student1@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:07', '2026-10-02 04:26:07'),
(32, 109, 4, 'GS-NORTH-ADM-0002', '2', 'Bilal', 'Raza', '2017-10-02', 'male', 'O+', 'Pakistani', 'Islam', 'DHA Phase 5, Lahore', '+92 300 9161875', 'gs-north.student2@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:08', '2026-10-02 04:26:08'),
(33, 111, 4, 'GS-NORTH-ADM-0003', '3', 'Zainab', 'Shah', '2017-10-02', 'female', 'O+', 'Pakistani', 'Islam', 'DHA Phase 5, Lahore', '+92 300 4498652', 'gs-north.student3@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:08', '2026-10-02 04:26:08'),
(34, 113, 4, 'GS-NORTH-ADM-0004', '4', 'Ahmed', 'Ahmed', '2021-10-02', 'male', 'O+', 'Pakistani', 'Islam', 'DHA Phase 5, Lahore', '+92 300 5297832', 'gs-north.student4@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:09', '2026-10-02 04:26:09'),
(35, 115, 4, 'GS-NORTH-ADM-0005', '5', 'Zainab', 'Raza', '2019-10-02', 'female', 'O+', 'Pakistani', 'Islam', 'DHA Phase 5, Lahore', '+92 300 3381080', 'gs-north.student5@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:09', '2026-10-02 04:26:09'),
(36, 117, 4, 'GS-NORTH-ADM-0006', '6', 'Rehan', 'Ahmed', '2019-10-02', 'male', 'O+', 'Pakistani', 'Islam', 'DHA Phase 5, Lahore', '+92 300 1777452', 'gs-north.student6@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:09', '2026-10-02 04:26:09'),
(37, 119, 4, 'GS-NORTH-ADM-0007', '7', 'Fatima', 'Khan', '2020-10-02', 'female', 'O+', 'Pakistani', 'Islam', 'DHA Phase 5, Lahore', '+92 300 6293596', 'gs-north.student7@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:10', '2026-10-02 04:26:10'),
(38, 121, 4, 'GS-NORTH-ADM-0008', '8', 'Ahmed', 'Ali', '2021-10-02', 'male', 'O+', 'Pakistani', 'Islam', 'DHA Phase 5, Lahore', '+92 300 2810735', 'gs-north.student8@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:10', '2026-10-02 04:26:10'),
(39, 123, 4, 'GS-NORTH-ADM-0009', '9', 'Aisha', 'Ahmed', '2018-10-02', 'female', 'O+', 'Pakistani', 'Islam', 'DHA Phase 5, Lahore', '+92 300 3695993', 'gs-north.student9@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(40, 125, 4, 'GS-NORTH-ADM-0010', '10', 'Rehan', 'Khan', '2016-10-02', 'male', 'O+', 'Pakistani', 'Islam', 'DHA Phase 5, Lahore', '+92 300 7387802', 'gs-north.student10@school.com', NULL, '2025-10-02', NULL, 'enrolled', 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(41, 128, 1, 'ADM-1001', '23G280', 'Asim', 'Shah', '2011-07-21', 'male', 'B+', 'Pakistan', 'Islam', NULL, NULL, NULL, NULL, '2026-10-02', NULL, 'enrolled', 1, '2026-10-02 06:52:47', '2026-10-02 06:52:47'),
(42, 134, 2, 'ADM-0910', '10', 'Umema', 'Fahad', '2016-02-25', 'female', 'B+', NULL, NULL, NULL, NULL, NULL, NULL, '2026-10-02', NULL, 'enrolled', 1, '2026-10-02 07:03:03', '2026-10-02 07:03:03');

-- --------------------------------------------------------

--
-- Table structure for table `student_academic_records`
--

CREATE TABLE `student_academic_records` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `standard_id` bigint(20) UNSIGNED NOT NULL,
  `section_id` bigint(20) UNSIGNED NOT NULL,
  `academic_session_id` bigint(20) UNSIGNED NOT NULL,
  `enrollment_date` date NOT NULL,
  `promotion_date` date DEFAULT NULL,
  `status` enum('enrolled','promoted','graduated','transferred') NOT NULL DEFAULT 'enrolled',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `student_academic_records`
--

INSERT INTO `student_academic_records` (`id`, `student_id`, `standard_id`, `section_id`, `academic_session_id`, `enrollment_date`, `promotion_date`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 1, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(2, 2, 1, 1, 1, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(3, 3, 2, 3, 1, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:25:56', '2026-10-02 04:25:56'),
(4, 4, 5, 9, 1, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:25:56', '2026-10-02 04:25:56'),
(5, 5, 5, 9, 1, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:25:57', '2026-10-02 04:25:57'),
(6, 6, 3, 5, 1, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:25:57', '2026-10-02 04:25:57'),
(7, 7, 3, 5, 1, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:25:57', '2026-10-02 04:25:57'),
(8, 8, 4, 7, 1, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:25:58', '2026-10-02 04:25:58'),
(9, 9, 4, 7, 1, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:25:58', '2026-10-02 04:25:58'),
(10, 10, 4, 7, 1, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:25:59', '2026-10-02 04:25:59'),
(11, 11, 7, 13, 2, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:25:59', '2026-10-02 04:25:59'),
(12, 12, 7, 13, 2, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:00', '2026-10-02 04:26:00'),
(13, 13, 6, 11, 2, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:00', '2026-10-02 04:26:00'),
(14, 14, 7, 13, 2, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:00', '2026-10-02 04:26:00'),
(15, 15, 9, 17, 2, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:01', '2026-10-02 04:26:01'),
(16, 16, 10, 19, 2, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:01', '2026-10-02 04:26:01'),
(17, 17, 10, 19, 2, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:02', '2026-10-02 04:26:02'),
(18, 18, 8, 15, 2, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:02', '2026-10-02 04:26:02'),
(19, 19, 9, 17, 2, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:02', '2026-10-02 04:26:02'),
(20, 20, 10, 19, 2, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:03', '2026-10-02 04:26:03'),
(21, 21, 15, 29, 3, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:03', '2026-10-02 04:26:03'),
(22, 22, 14, 27, 3, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:04', '2026-10-02 04:26:04'),
(23, 23, 14, 27, 3, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:04', '2026-10-02 04:26:04'),
(24, 24, 12, 23, 3, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:05', '2026-10-02 04:26:05'),
(25, 25, 12, 23, 3, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:05', '2026-10-02 04:26:05'),
(26, 26, 14, 27, 3, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:05', '2026-10-02 04:26:05'),
(27, 27, 13, 25, 3, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:06', '2026-10-02 04:26:06'),
(28, 28, 15, 29, 3, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:06', '2026-10-02 04:26:06'),
(29, 29, 12, 23, 3, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:07', '2026-10-02 04:26:07'),
(30, 30, 15, 29, 3, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:07', '2026-10-02 04:26:07'),
(31, 31, 19, 37, 4, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:07', '2026-10-02 04:26:07'),
(32, 32, 17, 33, 4, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:08', '2026-10-02 04:26:08'),
(33, 33, 18, 35, 4, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:08', '2026-10-02 04:26:08'),
(34, 34, 20, 39, 4, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:09', '2026-10-02 04:26:09'),
(35, 35, 18, 35, 4, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:09', '2026-10-02 04:26:09'),
(36, 36, 20, 39, 4, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:09', '2026-10-02 04:26:09'),
(37, 37, 17, 33, 4, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:10', '2026-10-02 04:26:10'),
(38, 38, 19, 37, 4, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:10', '2026-10-02 04:26:10'),
(39, 39, 20, 39, 4, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(40, 40, 16, 31, 4, '2025-10-02', NULL, 'enrolled', '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(41, 42, 7, 14, 2, '2026-10-02', NULL, 'enrolled', '2026-10-02 07:03:37', '2026-10-02 07:03:37');

-- --------------------------------------------------------

--
-- Table structure for table `student_attendances`
--

CREATE TABLE `student_attendances` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `standard_id` bigint(20) UNSIGNED NOT NULL,
  `section_id` bigint(20) UNSIGNED NOT NULL,
  `academic_session_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `status` enum('present','absent','late','leave','half_day') NOT NULL DEFAULT 'present',
  `check_in_time` time DEFAULT NULL,
  `check_out_time` time DEFAULT NULL,
  `remark` text DEFAULT NULL,
  `marked_by` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_documents`
--

CREATE TABLE `student_documents` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `type` enum('birth_certificate','previous_school_letter','medical_report','other') NOT NULL DEFAULT 'other',
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student_guardians`
--

CREATE TABLE `student_guardians` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `guardian_id` bigint(20) UNSIGNED NOT NULL,
  `is_primary_contact` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `student_guardians`
--

INSERT INTO `student_guardians` (`id`, `student_id`, `guardian_id`, `is_primary_contact`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(2, 2, 2, 1, '2026-10-02 04:25:56', '2026-10-02 04:25:56'),
(3, 3, 3, 1, '2026-10-02 04:25:56', '2026-10-02 04:25:56'),
(4, 4, 4, 1, '2026-10-02 04:25:56', '2026-10-02 04:25:56'),
(5, 5, 5, 1, '2026-10-02 04:25:57', '2026-10-02 04:25:57'),
(6, 6, 6, 1, '2026-10-02 04:25:57', '2026-10-02 04:25:57'),
(7, 7, 7, 1, '2026-10-02 04:25:58', '2026-10-02 04:25:58'),
(8, 8, 8, 1, '2026-10-02 04:25:58', '2026-10-02 04:25:58'),
(9, 9, 9, 1, '2026-10-02 04:25:58', '2026-10-02 04:25:58'),
(10, 10, 10, 1, '2026-10-02 04:25:59', '2026-10-02 04:25:59'),
(11, 11, 11, 1, '2026-10-02 04:25:59', '2026-10-02 04:25:59'),
(12, 12, 12, 1, '2026-10-02 04:26:00', '2026-10-02 04:26:00'),
(13, 13, 13, 1, '2026-10-02 04:26:00', '2026-10-02 04:26:00'),
(14, 14, 14, 1, '2026-10-02 04:26:01', '2026-10-02 04:26:01'),
(15, 15, 15, 1, '2026-10-02 04:26:01', '2026-10-02 04:26:01'),
(16, 16, 16, 1, '2026-10-02 04:26:01', '2026-10-02 04:26:01'),
(17, 17, 17, 1, '2026-10-02 04:26:02', '2026-10-02 04:26:02'),
(18, 18, 18, 1, '2026-10-02 04:26:02', '2026-10-02 04:26:02'),
(19, 19, 19, 1, '2026-10-02 04:26:03', '2026-10-02 04:26:03'),
(20, 20, 20, 1, '2026-10-02 04:26:03', '2026-10-02 04:26:03'),
(21, 21, 21, 1, '2026-10-02 04:26:03', '2026-10-02 04:26:03'),
(22, 22, 22, 1, '2026-10-02 04:26:04', '2026-10-02 04:26:04'),
(23, 23, 23, 1, '2026-10-02 04:26:04', '2026-10-02 04:26:04'),
(24, 24, 24, 1, '2026-10-02 04:26:05', '2026-10-02 04:26:05'),
(25, 25, 25, 1, '2026-10-02 04:26:05', '2026-10-02 04:26:05'),
(26, 26, 26, 1, '2026-10-02 04:26:06', '2026-10-02 04:26:06'),
(27, 27, 27, 1, '2026-10-02 04:26:06', '2026-10-02 04:26:06'),
(28, 28, 28, 1, '2026-10-02 04:26:06', '2026-10-02 04:26:06'),
(29, 29, 29, 1, '2026-10-02 04:26:07', '2026-10-02 04:26:07'),
(30, 30, 30, 1, '2026-10-02 04:26:07', '2026-10-02 04:26:07'),
(31, 31, 31, 1, '2026-10-02 04:26:08', '2026-10-02 04:26:08'),
(32, 32, 32, 1, '2026-10-02 04:26:08', '2026-10-02 04:26:08'),
(33, 33, 33, 1, '2026-10-02 04:26:08', '2026-10-02 04:26:08'),
(34, 34, 34, 1, '2026-10-02 04:26:09', '2026-10-02 04:26:09'),
(35, 35, 35, 1, '2026-10-02 04:26:09', '2026-10-02 04:26:09'),
(36, 36, 36, 1, '2026-10-02 04:26:10', '2026-10-02 04:26:10'),
(37, 37, 37, 1, '2026-10-02 04:26:10', '2026-10-02 04:26:10'),
(38, 38, 38, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(39, 39, 39, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(40, 40, 40, 1, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(41, 42, 12, 1, '2026-10-02 07:04:06', '2026-10-02 07:04:06');

-- --------------------------------------------------------

--
-- Table structure for table `student_transport`
--

CREATE TABLE `student_transport` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `route_id` bigint(20) UNSIGNED NOT NULL,
  `pickup_stop_id` bigint(20) UNSIGNED NOT NULL,
  `dropoff_stop_id` bigint(20) UNSIGNED NOT NULL,
  `academic_session_id` bigint(20) UNSIGNED NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `campus_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `type` enum('theory','practical') NOT NULL DEFAULT 'theory',
  `is_compulsory` tinyint(1) NOT NULL DEFAULT 1,
  `credit_hours` int(11) NOT NULL DEFAULT 0,
  `description` text DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `campus_id`, `name`, `code`, `type`, `is_compulsory`, `credit_hours`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Mathematics', 'BHS-MAIN-MATH', 'theory', 1, 3, NULL, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(2, 1, 'English', 'BHS-MAIN-ENG', 'theory', 1, 3, NULL, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(3, 1, 'Science', 'BHS-MAIN-SCI', 'theory', 1, 3, NULL, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(4, 1, 'Urdu', 'BHS-MAIN-URD', 'theory', 1, 3, NULL, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(5, 1, 'Computer', 'BHS-MAIN-COMP', 'theory', 1, 3, NULL, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(6, 2, 'Mathematics', 'BHS-NORTH-MATH', 'theory', 1, 3, NULL, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(7, 2, 'English', 'BHS-NORTH-ENG', 'theory', 1, 3, NULL, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(8, 2, 'Science', 'BHS-NORTH-SCI', 'theory', 1, 3, NULL, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(9, 2, 'Urdu', 'BHS-NORTH-URD', 'theory', 1, 3, NULL, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(10, 2, 'Computer', 'BHS-NORTH-COMP', 'theory', 1, 3, NULL, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(11, 3, 'Mathematics', 'GS-MAIN-MATH', 'theory', 1, 3, NULL, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(12, 3, 'English', 'GS-MAIN-ENG', 'theory', 1, 3, NULL, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(13, 3, 'Science', 'GS-MAIN-SCI', 'theory', 1, 3, NULL, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(14, 3, 'Urdu', 'GS-MAIN-URD', 'theory', 1, 3, NULL, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(15, 3, 'Computer', 'GS-MAIN-COMP', 'theory', 1, 3, NULL, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(16, 4, 'Mathematics', 'GS-NORTH-MATH', 'theory', 1, 3, NULL, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(17, 4, 'English', 'GS-NORTH-ENG', 'theory', 1, 3, NULL, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(18, 4, 'Science', 'GS-NORTH-SCI', 'theory', 1, 3, NULL, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(19, 4, 'Urdu', 'GS-NORTH-URD', 'theory', 1, 3, NULL, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(20, 4, 'Computer', 'GS-NORTH-COMP', 'theory', 1, 3, NULL, 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `employee_id` varchar(255) NOT NULL,
  `qualification` text DEFAULT NULL,
  `experience_years` int(11) NOT NULL DEFAULT 0,
  `salary` decimal(10,2) NOT NULL DEFAULT 0.00,
  `employment_type` enum('full_time','part_time','contract','intern') NOT NULL DEFAULT 'full_time',
  `specialization` varchar(255) DEFAULT NULL,
  `joining_date` date NOT NULL,
  `status` enum('active','inactive','terminated') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `user_id`, `employee_id`, `qualification`, `experience_years`, `salary`, `employment_type`, `specialization`, `joining_date`, `status`, `created_at`, `updated_at`) VALUES
(1, 12, 'BHS-MAIN-TCH-001', 'M.Sc Mathematics', 4, 41347.00, 'full_time', 'Mathematics', '2024-10-02', 'active', '2026-10-02 04:25:47', '2026-10-02 04:25:47'),
(2, 13, 'BHS-MAIN-TCH-002', 'M.Sc English', 9, 49056.00, 'full_time', 'English', '2022-10-02', 'active', '2026-10-02 04:25:47', '2026-10-02 04:25:47'),
(3, 14, 'BHS-MAIN-TCH-003', 'M.Sc Science', 3, 40588.00, 'full_time', 'Science', '2021-10-02', 'active', '2026-10-02 04:25:48', '2026-10-02 04:25:48'),
(4, 15, 'BHS-MAIN-TCH-004', 'M.Sc Urdu', 9, 55801.00, 'full_time', 'Urdu', '2021-10-02', 'active', '2026-10-02 04:25:48', '2026-10-02 04:25:48'),
(5, 16, 'BHS-MAIN-TCH-005', 'M.Sc Computer Science', 10, 59110.00, 'full_time', 'Computer Science', '2025-10-02', 'active', '2026-10-02 04:25:48', '2026-10-02 04:25:48'),
(6, 22, 'BHS-NORTH-TCH-001', 'M.Sc Mathematics', 9, 69623.00, 'full_time', 'Mathematics', '2022-10-02', 'active', '2026-10-02 04:25:49', '2026-10-02 04:25:49'),
(7, 23, 'BHS-NORTH-TCH-002', 'M.Sc English', 8, 67240.00, 'full_time', 'English', '2023-10-02', 'active', '2026-10-02 04:25:50', '2026-10-02 04:25:50'),
(8, 24, 'BHS-NORTH-TCH-003', 'M.Sc Science', 6, 52709.00, 'full_time', 'Science', '2022-10-02', 'active', '2026-10-02 04:25:50', '2026-10-02 04:25:50'),
(9, 25, 'BHS-NORTH-TCH-004', 'M.Sc Urdu', 6, 43459.00, 'full_time', 'Urdu', '2022-10-02', 'active', '2026-10-02 04:25:50', '2026-10-02 04:25:50'),
(10, 26, 'BHS-NORTH-TCH-005', 'M.Sc Computer Science', 10, 55609.00, 'full_time', 'Computer Science', '2024-10-02', 'active', '2026-10-02 04:25:50', '2026-10-02 04:25:50'),
(11, 32, 'GS-MAIN-TCH-001', 'M.Sc Mathematics', 8, 41585.00, 'full_time', 'Mathematics', '2025-10-02', 'active', '2026-10-02 04:25:52', '2026-10-02 04:25:52'),
(12, 33, 'GS-MAIN-TCH-002', 'M.Sc English', 9, 47722.00, 'full_time', 'English', '2024-10-02', 'active', '2026-10-02 04:25:52', '2026-10-02 04:25:52'),
(13, 34, 'GS-MAIN-TCH-003', 'M.Sc Science', 5, 41471.00, 'full_time', 'Science', '2025-10-02', 'active', '2026-10-02 04:25:52', '2026-10-02 04:25:52'),
(14, 35, 'GS-MAIN-TCH-004', 'M.Sc Urdu', 10, 68248.00, 'full_time', 'Urdu', '2025-10-02', 'active', '2026-10-02 04:25:52', '2026-10-02 04:25:52'),
(15, 36, 'GS-MAIN-TCH-005', 'M.Sc Computer Science', 3, 66341.00, 'full_time', 'Computer Science', '2021-10-02', 'active', '2026-10-02 04:25:52', '2026-10-02 04:25:52'),
(16, 42, 'GS-NORTH-TCH-001', 'M.Sc Mathematics', 7, 69669.00, 'full_time', 'Mathematics', '2025-10-02', 'active', '2026-10-02 04:25:54', '2026-10-02 04:25:54'),
(17, 43, 'GS-NORTH-TCH-002', 'M.Sc English', 7, 52149.00, 'full_time', 'English', '2023-10-02', 'active', '2026-10-02 04:25:54', '2026-10-02 04:25:54'),
(18, 44, 'GS-NORTH-TCH-003', 'M.Sc Science', 8, 45439.00, 'full_time', 'Science', '2023-10-02', 'active', '2026-10-02 04:25:54', '2026-10-02 04:25:54'),
(19, 45, 'GS-NORTH-TCH-004', 'M.Sc Urdu', 9, 57418.00, 'full_time', 'Urdu', '2025-10-02', 'active', '2026-10-02 04:25:54', '2026-10-02 04:25:54'),
(20, 46, 'GS-NORTH-TCH-005', 'M.Sc Computer Science', 3, 43034.00, 'full_time', 'Computer Science', '2023-10-02', 'active', '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(21, 135, 'TCH-007', 'M.sc Physics', 2, 100000.00, 'full_time', 'Science', '2026-10-03', 'active', '2026-10-03 08:59:02', '2026-10-03 08:59:02');

-- --------------------------------------------------------

--
-- Table structure for table `teacher_attendances`
--

CREATE TABLE `teacher_attendances` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `teacher_id` bigint(20) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `check_in_time` time DEFAULT NULL,
  `check_out_time` time DEFAULT NULL,
  `status` enum('present','absent','late','leave','early_departure') NOT NULL DEFAULT 'present',
  `remark` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teacher_attendances`
--

INSERT INTO `teacher_attendances` (`id`, `teacher_id`, `date`, `check_in_time`, `check_out_time`, `status`, `remark`, `created_at`, `updated_at`) VALUES
(1, 1, '2026-10-01', NULL, NULL, 'present', NULL, '2026-10-02 04:37:55', '2026-10-02 04:37:55'),
(2, 2, '2026-10-01', NULL, NULL, 'present', NULL, '2026-10-02 04:37:55', '2026-10-02 04:37:55'),
(3, 3, '2026-10-01', NULL, NULL, 'present', NULL, '2026-10-02 04:37:55', '2026-10-02 04:37:55'),
(4, 4, '2026-10-01', NULL, NULL, 'present', NULL, '2026-10-02 04:37:55', '2026-10-02 04:37:55'),
(5, 5, '2026-10-01', NULL, NULL, 'present', NULL, '2026-10-02 04:37:55', '2026-10-02 04:37:55'),
(6, 6, '2026-10-01', NULL, NULL, 'present', NULL, '2026-10-02 04:37:55', '2026-10-02 04:37:55'),
(7, 7, '2026-10-01', NULL, NULL, 'present', NULL, '2026-10-02 04:37:55', '2026-10-02 04:37:55'),
(8, 8, '2026-10-01', NULL, NULL, 'present', NULL, '2026-10-02 04:37:55', '2026-10-02 04:37:55'),
(9, 9, '2026-10-01', NULL, NULL, 'present', NULL, '2026-10-02 04:37:55', '2026-10-02 04:37:55'),
(10, 10, '2026-10-01', NULL, NULL, 'present', NULL, '2026-10-02 04:37:55', '2026-10-02 04:37:55'),
(11, 11, '2026-10-01', NULL, NULL, 'present', NULL, '2026-10-02 04:37:55', '2026-10-02 04:37:55'),
(12, 12, '2026-10-01', NULL, NULL, 'present', NULL, '2026-10-02 04:37:55', '2026-10-02 04:37:55'),
(13, 13, '2026-10-01', NULL, NULL, 'present', NULL, '2026-10-02 04:37:55', '2026-10-02 04:37:55'),
(14, 14, '2026-10-01', NULL, NULL, 'present', NULL, '2026-10-02 04:37:55', '2026-10-02 04:37:55'),
(15, 15, '2026-10-01', NULL, NULL, 'present', NULL, '2026-10-02 04:37:55', '2026-10-02 04:37:55'),
(16, 16, '2026-10-01', NULL, NULL, 'present', NULL, '2026-10-02 04:37:55', '2026-10-02 04:37:55'),
(17, 17, '2026-10-01', NULL, NULL, 'present', NULL, '2026-10-02 04:37:55', '2026-10-02 04:37:55'),
(18, 18, '2026-10-01', NULL, NULL, 'present', NULL, '2026-10-02 04:37:55', '2026-10-02 04:37:55'),
(19, 19, '2026-10-01', NULL, NULL, 'present', NULL, '2026-10-02 04:37:55', '2026-10-02 04:37:55'),
(20, 20, '2026-10-01', NULL, NULL, 'present', NULL, '2026-10-02 04:37:55', '2026-10-02 04:37:55'),
(21, 1, '2026-10-02', NULL, NULL, 'present', NULL, '2026-10-02 04:38:31', '2026-10-02 04:38:31'),
(22, 2, '2026-10-02', NULL, NULL, 'present', NULL, '2026-10-02 04:38:31', '2026-10-02 04:38:31'),
(23, 3, '2026-10-02', NULL, NULL, 'absent', NULL, '2026-10-02 04:38:31', '2026-10-02 04:38:31'),
(24, 4, '2026-10-02', NULL, NULL, 'absent', NULL, '2026-10-02 04:38:31', '2026-10-02 04:38:31'),
(25, 5, '2026-10-02', NULL, NULL, 'present', NULL, '2026-10-02 04:38:31', '2026-10-02 04:38:31'),
(26, 6, '2026-10-02', NULL, NULL, 'present', NULL, '2026-10-02 04:38:31', '2026-10-02 04:38:31'),
(27, 7, '2026-10-02', NULL, NULL, 'absent', NULL, '2026-10-02 04:38:31', '2026-10-02 04:38:31'),
(28, 8, '2026-10-02', NULL, NULL, 'absent', NULL, '2026-10-02 04:38:31', '2026-10-02 04:38:31'),
(29, 9, '2026-10-02', NULL, NULL, 'present', NULL, '2026-10-02 04:38:31', '2026-10-02 04:38:31'),
(30, 10, '2026-10-02', NULL, NULL, 'present', NULL, '2026-10-02 04:38:31', '2026-10-02 04:38:31'),
(31, 11, '2026-10-02', NULL, NULL, 'present', NULL, '2026-10-02 04:38:31', '2026-10-02 04:38:31'),
(32, 12, '2026-10-02', NULL, NULL, 'present', NULL, '2026-10-02 04:38:31', '2026-10-02 04:38:31'),
(33, 13, '2026-10-02', NULL, NULL, 'present', NULL, '2026-10-02 04:38:31', '2026-10-02 04:38:31'),
(34, 14, '2026-10-02', NULL, NULL, 'present', NULL, '2026-10-02 04:38:31', '2026-10-02 04:38:31'),
(35, 15, '2026-10-02', NULL, NULL, 'present', NULL, '2026-10-02 04:38:31', '2026-10-02 04:38:31'),
(36, 16, '2026-10-02', NULL, NULL, 'present', NULL, '2026-10-02 04:38:31', '2026-10-02 04:38:31'),
(37, 17, '2026-10-02', NULL, NULL, 'present', NULL, '2026-10-02 04:38:31', '2026-10-02 04:38:31'),
(38, 18, '2026-10-02', NULL, NULL, 'present', NULL, '2026-10-02 04:38:31', '2026-10-02 04:38:31'),
(39, 19, '2026-10-02', NULL, NULL, 'present', NULL, '2026-10-02 04:38:31', '2026-10-02 04:38:31'),
(40, 20, '2026-10-02', NULL, NULL, 'present', NULL, '2026-10-02 04:38:31', '2026-10-02 04:38:31'),
(41, 1, '2026-10-04', NULL, NULL, 'present', NULL, '2026-10-04 09:27:33', '2026-10-04 09:27:33'),
(42, 2, '2026-10-04', NULL, NULL, 'present', NULL, '2026-10-04 09:27:33', '2026-10-04 09:27:33'),
(43, 3, '2026-10-04', NULL, NULL, 'present', NULL, '2026-10-04 09:27:33', '2026-10-04 09:27:33'),
(44, 4, '2026-10-04', NULL, NULL, 'present', NULL, '2026-10-04 09:27:33', '2026-10-04 09:27:33'),
(45, 5, '2026-10-04', NULL, NULL, 'present', NULL, '2026-10-04 09:27:33', '2026-10-04 09:27:33'),
(46, 6, '2026-10-04', NULL, NULL, 'present', NULL, '2026-10-04 09:27:33', '2026-10-04 09:27:33'),
(47, 7, '2026-10-04', NULL, NULL, 'present', NULL, '2026-10-04 09:27:33', '2026-10-04 09:27:33'),
(48, 8, '2026-10-04', NULL, NULL, 'present', NULL, '2026-10-04 09:27:33', '2026-10-04 09:27:33'),
(49, 9, '2026-10-04', NULL, NULL, 'present', NULL, '2026-10-04 09:27:33', '2026-10-04 09:27:33'),
(50, 10, '2026-10-04', NULL, NULL, 'present', NULL, '2026-10-04 09:27:33', '2026-10-04 09:27:33'),
(51, 11, '2026-10-04', NULL, NULL, 'present', NULL, '2026-10-04 09:27:33', '2026-10-04 09:27:33'),
(52, 12, '2026-10-04', NULL, NULL, 'present', NULL, '2026-10-04 09:27:33', '2026-10-04 09:27:33'),
(53, 13, '2026-10-04', NULL, NULL, 'present', NULL, '2026-10-04 09:27:33', '2026-10-04 09:27:33'),
(54, 14, '2026-10-04', NULL, NULL, 'present', NULL, '2026-10-04 09:27:33', '2026-10-04 09:27:33'),
(55, 15, '2026-10-04', NULL, NULL, 'present', NULL, '2026-10-04 09:27:33', '2026-10-04 09:27:33'),
(56, 16, '2026-10-04', NULL, NULL, 'present', NULL, '2026-10-04 09:27:33', '2026-10-04 09:27:33'),
(57, 17, '2026-10-04', NULL, NULL, 'present', NULL, '2026-10-04 09:27:33', '2026-10-04 09:27:33'),
(58, 18, '2026-10-04', NULL, NULL, 'present', NULL, '2026-10-04 09:27:33', '2026-10-04 09:27:33'),
(59, 19, '2026-10-04', NULL, NULL, 'present', NULL, '2026-10-04 09:27:33', '2026-10-04 09:27:33'),
(60, 20, '2026-10-04', NULL, NULL, 'present', NULL, '2026-10-04 09:27:33', '2026-10-04 09:27:33'),
(61, 21, '2026-10-04', NULL, NULL, 'present', NULL, '2026-10-04 09:27:33', '2026-10-04 09:27:33');

-- --------------------------------------------------------

--
-- Table structure for table `timetable_entries`
--

CREATE TABLE `timetable_entries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `standard_id` bigint(20) UNSIGNED NOT NULL,
  `section_id` bigint(20) UNSIGNED NOT NULL,
  `subject_id` bigint(20) UNSIGNED NOT NULL,
  `teacher_id` bigint(20) UNSIGNED NOT NULL,
  `time_slot_id` bigint(20) UNSIGNED NOT NULL,
  `room_number` varchar(255) NOT NULL,
  `academic_session_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `timetable_entries`
--

INSERT INTO `timetable_entries` (`id`, `standard_id`, `section_id`, `subject_id`, `teacher_id`, `time_slot_id`, `room_number`, `academic_session_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 2, 2, 1, '102, Lab Computing', 1, '2026-10-06 23:33:38', '2026-10-06 23:33:38'),
(3, 1, 1, 4, 1, 2, '100', 1, '2026-10-06 23:34:26', '2026-10-06 23:34:26'),
(4, 1, 1, 3, 4, 5, '101', 1, '2026-10-06 23:34:50', '2026-10-06 23:34:50'),
(5, 1, 1, 5, 3, 3, '104', 1, '2026-10-06 23:35:20', '2026-10-06 23:35:20');

-- --------------------------------------------------------

--
-- Table structure for table `time_slots`
--

CREATE TABLE `time_slots` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `campus_id` bigint(20) UNSIGNED NOT NULL,
  `day_of_week` enum('monday','tuesday','wednesday','thursday','friday','saturday','sunday') NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `time_slots`
--

INSERT INTO `time_slots` (`id`, `campus_id`, `day_of_week`, `start_time`, `end_time`, `created_at`, `updated_at`) VALUES
(1, 1, 'monday', '08:00:00', '09:00:00', '2026-10-06 23:32:16', '2026-10-06 23:32:16'),
(2, 1, 'tuesday', '08:00:00', '09:00:00', '2026-10-06 23:32:28', '2026-10-06 23:32:28'),
(3, 1, 'wednesday', '08:00:00', '09:00:00', '2026-10-06 23:32:36', '2026-10-06 23:32:36'),
(4, 1, 'friday', '08:00:00', '09:00:00', '2026-10-06 23:32:45', '2026-10-06 23:32:45'),
(5, 1, 'monday', '09:00:00', '10:00:00', '2026-10-06 23:33:04', '2026-10-06 23:33:04');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `role` enum('super_admin','school_admin','principal','vice_principal','teacher','accountant','librarian','receptionist','student','guardian','transport_manager','hr_manager','staff') DEFAULT NULL,
  `campus_id` bigint(20) UNSIGNED DEFAULT NULL,
  `school_id` bigint(20) UNSIGNED DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `status` enum('active','inactive','suspended') NOT NULL DEFAULT 'active',
  `last_login_at` timestamp NULL DEFAULT NULL,
  `two_factor_secret` text DEFAULT NULL,
  `two_factor_recovery_codes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `role`, `campus_id`, `school_id`, `phone`, `address`, `profile_picture`, `gender`, `date_of_birth`, `status`, `last_login_at`, `two_factor_secret`, `two_factor_recovery_codes`, `created_at`, `updated_at`) VALUES
(1, 'Beaconhouse School Principal', 'bhs.principal@school.com', NULL, '$2y$12$nIBwcti8Ji9gzAcltQHK6u/1ciw.D.SbK.1a4GWUHy4tZAZF9/hBC', NULL, 'principal', NULL, 1, '+92 300 1111111', NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:45', '2026-10-02 04:25:45'),
(2, 'Beaconhouse School — Main Campus VP', 'bhs-main.vp@school.com', NULL, '$2y$12$QkB/YuWgG19V.VVLgKe4UO6FXubmzYjvhSAMcYopyi2wQbl1cphjC', NULL, 'vice_principal', 1, 1, '+92 300 2222222', NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:45', '2026-10-02 04:25:45'),
(3, 'Beaconhouse School — North Campus VP', 'bhs-north.vp@school.com', NULL, '$2y$12$0UI308KnsHVQ03K.DZVetuj9H/byCoUvoxGceJE0lEXrOFO0PFjIu', NULL, 'vice_principal', 2, 1, '+92 300 2222222', NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:45', '2026-10-02 04:25:45'),
(4, 'Grammar School Principal', 'gs.principal@school.com', NULL, '$2y$12$Ris3cE7/cxMnqGasQ1dI7eFoWk7XNQAt0SC5DciZOtXGQKi1hjRpO', NULL, 'principal', NULL, 2, '+92 300 1111111', NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:45', '2026-10-03 14:27:57'),
(5, 'Grammar School — Main Campus VP', 'gs-main.vp@school.com', NULL, '$2y$12$qYdbJvrMP9XOl9yWS5h3K.0mMeBWn.OLG7ATA70qPztjNNwxZ.kVu', NULL, 'vice_principal', 3, 2, '+92 300 2222222', NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(6, 'Grammar School — North Campus VP', 'gs-north.vp@school.com', NULL, '$2y$12$9cQ7Q8YSW75tLr1IvCI/jeYWQVcaMikrv4J4w64hdiMGqihGDB20.', NULL, 'vice_principal', 4, 2, '+92 300 2222222', NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(7, 'Beaconhouse School — Main Campus HR Manager', 'bhs-main.hr@school.com', NULL, '$2y$12$lqyktJKEn/N7aSQGoGZi2eK8dFScHtGsPNjuIN5ecgXrwIpeL3ni2', NULL, 'hr_manager', 1, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(8, 'Beaconhouse School — Main Campus Receptionist', 'bhs-main.reception@school.com', NULL, '$2y$12$hLbxvq791Aa8rXWGZtCTFulJOnhCkrEAVMbOUCpRTE2FuBi7UOZj.', NULL, 'receptionist', 1, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:46', '2026-10-02 04:25:46'),
(9, 'Beaconhouse School — Main Campus Librarian', 'bhs-main.librarian@school.com', NULL, '$2y$12$qBb58WBGw6VrS6PB7yH3AOpBVTzYT3S1Qg4U8BNKv6X1bA5/facum', NULL, 'librarian', 1, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:47', '2026-10-02 04:25:47'),
(10, 'Beaconhouse School — Main Campus Transport Manager', 'bhs-main.transport@school.com', NULL, '$2y$12$0dyMPqu44GaN8NhX5Kn5HeDEv6vzlM7LhMdXVhdQ4TqGGjGCa5Nyq', NULL, 'transport_manager', 1, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:47', '2026-10-02 04:25:47'),
(11, 'Beaconhouse School — Main Campus Accountant', 'bhs-main.accountant@school.com', NULL, '$2y$12$i5s7FOnfas.8PXZ9Us5L6ur.L6mgRnU72BhiooUSqNuB32V8xiNey', NULL, 'accountant', 1, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:47', '2026-10-02 04:25:47'),
(12, 'Ahmed Khan', 'bhs-main.teacher1@school.com', NULL, '$2y$12$KIghyGZltK18yH1snoD5HOpsVS7rFWYQWUDvXyNCGUqef1wgK5Emq', NULL, 'teacher', 1, 1, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:47', '2026-10-02 04:25:47'),
(13, 'Sara Ali', 'bhs-main.teacher2@school.com', NULL, '$2y$12$WoGCviQLaPKU/9BAFWYrN.xI7yfJswIYfqSJGwa4dDmpWutRrdgOG', NULL, 'teacher', 1, 1, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:47', '2026-10-02 04:25:47'),
(14, 'Muhammad Salman', 'bhs-main.teacher3@school.com', NULL, '$2y$12$TWcb4OUBI49H2nssXqd8s.6WFEuRU/Nh9HdCK3tedsHPV0Vha6TDW', NULL, 'teacher', 1, 1, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:48', '2026-10-02 04:25:48'),
(15, 'Fatima Noor', 'bhs-main.teacher4@school.com', NULL, '$2y$12$NYb7dcSSaX0p0rQim5C3XOa2AvzSUOE4ek2o1WRN3/SUunPHYNMhW', NULL, 'teacher', 1, 1, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:48', '2026-10-02 04:25:48'),
(16, 'Usman Raza', 'bhs-main.teacher5@school.com', NULL, '$2y$12$iQI4tOOYF95vlmGJUkWnM.UoxNxoapHT1gCp0EUBhzYMG5z0TXIQS', NULL, 'teacher', 1, 1, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:48', '2026-10-02 04:25:48'),
(17, 'Beaconhouse School — North Campus HR Manager', 'bhs-north.hr@school.com', NULL, '$2y$12$/8OnXP.gg7vechZz42V3ZOO0jfk8we1MHTYQ/pBzUfdMSGaI3wrru', NULL, 'hr_manager', 2, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:48', '2026-10-02 04:25:48'),
(18, 'Beaconhouse School — North Campus Receptionist', 'bhs-north.reception@school.com', NULL, '$2y$12$KHfF9js0pQ237wWLAdqjseU5iTO8SkyAbeqlLh0Ac9Gdii.b/7N7e', NULL, 'receptionist', 2, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:49', '2026-10-02 04:25:49'),
(19, 'Beaconhouse School — North Campus Librarian', 'bhs-north.librarian@school.com', NULL, '$2y$12$Ua8q4k57ZBf91yCwZctLU.85lDnujKoqVOehyU3UPzwzeH1dEfY1y', NULL, 'librarian', 2, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:49', '2026-10-02 04:25:49'),
(20, 'Beaconhouse School — North Campus Transport Manager', 'bhs-north.transport@school.com', NULL, '$2y$12$EHt1i3YtOK19LdiBvc745uSZAI4TMniWQtJxwEElbknQM5Huiq18e', NULL, 'transport_manager', 2, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:49', '2026-10-02 04:25:49'),
(21, 'Beaconhouse School — North Campus Accountant', 'bhs-north.accountant@school.com', NULL, '$2y$12$aIa4kMI0mAs298bP4.gT7Od0IQQfdpEd1HTFvW6j3.j7HdY5fcJge', NULL, 'accountant', 2, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:49', '2026-10-02 04:25:49'),
(22, 'Ahmed Khan', 'bhs-north.teacher1@school.com', NULL, '$2y$12$PS9DOE0izGPnHw9Tg6cVOu5J4eWEQLN3qyQQXEEigdPBDFvktqqoS', NULL, 'teacher', 2, 1, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:49', '2026-10-02 04:25:49'),
(23, 'Sara Ali', 'bhs-north.teacher2@school.com', NULL, '$2y$12$gQl4LqDV2s3Ty4gwBpt8y.wyjx2mF4UcFch/pg.NWEqLw4.eNP1Di', NULL, 'teacher', 2, 1, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:50', '2026-10-02 04:25:50'),
(24, 'Muhammad Salman', 'bhs-north.teacher3@school.com', NULL, '$2y$12$d1CnTwVSy/VxJQTJfLMd8.cTteuNapeSLoHqfp0Lte7MBmkHhBoRm', NULL, 'teacher', 2, 1, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:50', '2026-10-02 04:25:50'),
(25, 'Fatima Noor', 'bhs-north.teacher4@school.com', NULL, '$2y$12$/Xgzqz4E.n4nlXlq7Arz4./61qgp8kOE7hD2XFctLBfc/2o5ZE6tm', NULL, 'teacher', 2, 1, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:50', '2026-10-02 04:25:50'),
(26, 'Usman Raza', 'bhs-north.teacher5@school.com', NULL, '$2y$12$QKGl3XZdfGu95KesK.aHQuArElU2eVUbOSQ1kLVUqAE9IbuBiIJXu', NULL, 'teacher', 2, 1, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:50', '2026-10-02 04:25:50'),
(27, 'Grammar School — Main Campus HR Manager', 'gs-main.hr@school.com', NULL, '$2y$12$YgXbGeWZTyBJoIGYruzSl.Nwsv8ecinO6.3OETFHjcyo1jjb/97SC', NULL, 'hr_manager', 3, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:50', '2026-10-02 04:25:50'),
(28, 'Grammar School — Main Campus Receptionist', 'gs-main.reception@school.com', NULL, '$2y$12$qKpyE0DYxLVTCmW4YrSVkOPasNO.kkMQmdFYQBmm.FfOJXUWjRn0i', NULL, 'receptionist', 3, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:51', '2026-10-02 04:25:51'),
(29, 'Grammar School — Main Campus Librarian', 'gs-main.librarian@school.com', NULL, '$2y$12$VZzKFTUhCJxfF/O.MibU9.ymW6.k/wu9cgH3zgNcH/mCSVjxOyOKm', NULL, 'librarian', 3, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:51', '2026-10-02 04:25:51'),
(30, 'Grammar School — Main Campus Transport Manager', 'gs-main.transport@school.com', NULL, '$2y$12$OVXVbTMqNctJjk9fnpNycu184UEA/SxUhNcugQ4CIzWzW7TuLqgIG', NULL, 'transport_manager', 3, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:51', '2026-10-02 04:25:51'),
(31, 'Grammar School — Main Campus Accountant', 'gs-main.accountant@school.com', NULL, '$2y$12$BifGc8TsWthVX.bxVWTP8eFSepNWRQ9jCViL.1T6ky1Iwd1kxjd0.', NULL, 'accountant', 3, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:51', '2026-10-02 04:25:51'),
(32, 'Ahmed Khan', 'gs-main.teacher1@school.com', NULL, '$2y$12$pORU91DpkbMB/eDwK1Cm8.RTJBqBRiV9g8B68ptyd/Wmz5ncV.BTK', NULL, 'teacher', 3, 2, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:51', '2026-10-02 04:25:51'),
(33, 'Sara Ali', 'gs-main.teacher2@school.com', NULL, '$2y$12$nzo8iE9O8yOT0p9yVBR8i.utsDvZAZa.Ly2Q1VRQ0mjWYUZ2nZUfS', NULL, 'teacher', 3, 2, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:52', '2026-10-02 04:25:52'),
(34, 'Muhammad Salman', 'gs-main.teacher3@school.com', NULL, '$2y$12$yrttTvOAH7ZR7xTw6pzRaOpaHJkdrPKl2uWhTgDKe5i.KIq0FeKqS', NULL, 'teacher', 3, 2, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:52', '2026-10-02 04:25:52'),
(35, 'Fatima Noor', 'gs-main.teacher4@school.com', NULL, '$2y$12$oz9bj694jni2sRRuUXY5DuvXTyfIowlICJ4jbkl5QaSHjgLs1n07m', NULL, 'teacher', 3, 2, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:52', '2026-10-02 04:25:52'),
(36, 'Usman Raza', 'gs-main.teacher5@school.com', NULL, '$2y$12$crH3.C.WvA1.V0dYmsYpuOjsbpZJywmsL6s.3JuQap0cyAjywUnxC', NULL, 'teacher', 3, 2, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:52', '2026-10-02 04:25:52'),
(37, 'Grammar School — North Campus HR Manager', 'gs-north.hr@school.com', NULL, '$2y$12$ss39U6hKDOTaKx5vVzMLsunrfg95MKF.5YFB53.l6VmU8IQ39FfYq', NULL, 'hr_manager', 4, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:53', '2026-10-02 04:25:53'),
(38, 'Grammar School — North Campus Receptionist', 'gs-north.reception@school.com', NULL, '$2y$12$HrskBya/82p7ZlvCmnnKa.sJ4lUxSFKdoZyCM1AHoPShLLdkTtU.a', NULL, 'receptionist', 4, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:53', '2026-10-02 04:25:53'),
(39, 'Grammar School — North Campus Librarian', 'gs-north.librarian@school.com', NULL, '$2y$12$p7YV49gygIGPkUlPypU3H.aShprFQB27IqFPNMRc7uJYEPwPSofcO', NULL, 'librarian', 4, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:53', '2026-10-02 04:25:53'),
(40, 'Grammar School — North Campus Transport Manager', 'gs-north.transport@school.com', NULL, '$2y$12$VCMMFzvuT4YExJ.3KkFOHulhO1iZa2O1TRZJ23nTfeTXg9TD6R0RW', NULL, 'transport_manager', 4, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:53', '2026-10-02 04:25:53'),
(41, 'Grammar School — North Campus Accountant', 'gs-north.accountant@school.com', NULL, '$2y$12$4DJCF7w6BA1ijlnSwfLYFeDpdiuJWC0SGZk7K1qK2dLZSdSuhPCtS', NULL, 'accountant', 4, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:53', '2026-10-02 04:25:53'),
(42, 'Ahmed Khan', 'gs-north.teacher1@school.com', NULL, '$2y$12$IaJCp8FMlovtfrb6yHxbZOcZsg82e3YdoKMIPNv0zvz5DgXoama.G', NULL, 'teacher', 4, 2, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:54', '2026-10-02 04:25:54'),
(43, 'Sara Ali', 'gs-north.teacher2@school.com', NULL, '$2y$12$fxoMCo.G0O.vF6IH8lMmB.vtQu3iifRl/vpdlteh8xGd1PoZOKGQ6', NULL, 'teacher', 4, 2, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:54', '2026-10-02 04:25:54'),
(44, 'Muhammad Salman', 'gs-north.teacher3@school.com', NULL, '$2y$12$grcPZViJgMXFFTlHOUOhDuXRA3Q6Xv6hhIX5in6GU./ExGzJw.KKS', NULL, 'teacher', 4, 2, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:54', '2026-10-02 04:25:54'),
(45, 'Fatima Noor', 'gs-north.teacher4@school.com', NULL, '$2y$12$E1JEGy02cavcxXlWZqVV8uJOg8wkexYrLWX86nphm5otxTiFl4eCK', NULL, 'teacher', 4, 2, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:54', '2026-10-02 04:25:54'),
(46, 'Usman Raza', 'gs-north.teacher5@school.com', NULL, '$2y$12$2GDXzFvZQuS8p.Xa5IRyA.3xB1e3CZjjdm2zueuT.JuacmVBfX7E2', NULL, 'teacher', 4, 2, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(47, 'Aisha Ali', 'bhs-main.student1@school.com', NULL, '$2y$12$aL5bZD6xHlqfxQWmur20IOvYwxxovgX5sM31OQ1EAM..4SySSNCg6', NULL, 'student', 1, 1, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(48, 'Parent of Aisha', 'bhs-main.guardian1@school.com', NULL, '$2y$12$6mW9VBXLb1fbxZrqCtk05OhexO0axgRbT22QlewS.ReWdbbQr1DI6', NULL, 'guardian', 1, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(49, 'Ali Ahmed', 'bhs-main.student2@school.com', NULL, '$2y$12$COE8i7nj0hywFSKmLrKsjuI.FKLfXVqDp/on0E6zt/zl8aLnseWfO', NULL, 'student', 1, 1, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:55', '2026-10-02 04:25:55'),
(50, 'Parent of Ali', 'bhs-main.guardian2@school.com', NULL, '$2y$12$XsjI09QBzJxDZ1Kog6jGjueMUmKht8pnijqka1K5KeQUroRaAmkIe', NULL, 'guardian', 1, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:56', '2026-10-02 04:25:56'),
(51, 'Hira Raza', 'bhs-main.student3@school.com', NULL, '$2y$12$9EWSOg7.zm80DNvL.4C2euxACODpdqzhvZhzPtFAQghnHmusiz95O', NULL, 'student', 1, 1, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:56', '2026-10-02 04:25:56'),
(52, 'Parent of Hira', 'bhs-main.guardian3@school.com', NULL, '$2y$12$ZwWCIlhtk5e71iKgb97Giesy5OqxhjAq9Q5zdVuCxopBFnE.VVJEy', NULL, 'guardian', 1, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:56', '2026-10-02 04:25:56'),
(53, 'Ali Raza', 'bhs-main.student4@school.com', NULL, '$2y$12$Zq9XUmgzlCGTSRkF27z29eywAQM3zoWEN8UvxIWcYCGt6xbVY.Biy', NULL, 'student', 1, 1, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:56', '2026-10-02 04:25:56'),
(54, 'Parent of Ali', 'bhs-main.guardian4@school.com', NULL, '$2y$12$cMvCTdu.HEzNLiBZ6oFXYePvsNvgt9jLR./J3YdtwFC/3CMkIDCyq', NULL, 'guardian', 1, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:56', '2026-10-02 04:25:56'),
(55, 'Fatima Ahmed', 'bhs-main.student5@school.com', NULL, '$2y$12$pJCCeMbEm8MqwKUZ2kESwu3xuRofMDQp4.Y/WpK5GjDUtxAurgcp6', NULL, 'student', 1, 1, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:57', '2026-10-02 04:25:57'),
(56, 'Parent of Fatima', 'bhs-main.guardian5@school.com', NULL, '$2y$12$zgjq8Fvj7o9n2ssZSDBcmOABwOG/kDuYyvT6/8qvlHb4y5Al.NYVm', NULL, 'guardian', 1, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:57', '2026-10-02 04:25:57'),
(57, 'Hamza Ahmed', 'bhs-main.student6@school.com', NULL, '$2y$12$H923ixDpiBKBOJQqjaloAOv4kcCFugksRodYxAhRjC7Ivw5Q0eLGK', NULL, 'student', 1, 1, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:57', '2026-10-02 04:25:57'),
(58, 'Parent of Hamza', 'bhs-main.guardian6@school.com', NULL, '$2y$12$k/w9KTunE5eaNJjFRg1/YObuxLzkYt4J2V.tFqihKsiq/.a5SdmlG', NULL, 'guardian', 1, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:57', '2026-10-02 04:25:57'),
(59, 'Maryam Shah', 'bhs-main.student7@school.com', NULL, '$2y$12$tVcJsQskxHjeOWNw47ZUveWCQxB9sYw6kZaB.QDWWbj3WKD/ThzgS', NULL, 'student', 1, 1, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:57', '2026-10-02 04:25:57'),
(60, 'Parent of Maryam', 'bhs-main.guardian7@school.com', NULL, '$2y$12$YddNdgKhGN.N4uJvvGrIB.DOLjZLDb8T5Y6eR.xC5uEMlL0EyVUrW', NULL, 'guardian', 1, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:58', '2026-10-02 04:25:58'),
(61, 'Ahmed Ahmed', 'bhs-main.student8@school.com', NULL, '$2y$12$8YuZ7oWyqU81QxzuMV3HW.Eo4RC2RLdZl3GFc3eA6fdyLCbAYTVmi', NULL, 'student', 1, 1, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:58', '2026-10-02 04:25:58'),
(62, 'Parent of Ahmed', 'bhs-main.guardian8@school.com', NULL, '$2y$12$WQLL7rBqaaFnsW1X4XcTfeJVzL3ejwn2Zh7qqo/jjw1KoEun3rfOu', NULL, 'guardian', 1, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:58', '2026-10-02 04:25:58'),
(63, 'Fatima Ahmed', 'bhs-main.student9@school.com', NULL, '$2y$12$/Gf0Q1d7lCdox9.Y5H/YQusSXrr0gcBbVuNMfEDO/9mR0O8f65VA6', NULL, 'student', 1, 1, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:58', '2026-10-02 04:25:58'),
(64, 'Parent of Fatima', 'bhs-main.guardian9@school.com', NULL, '$2y$12$0csgpEAITLszm9LGm2UBOOVnGijfDXpIMcx9Tvs7HxkbO1MPM3xhS', NULL, 'guardian', 1, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:58', '2026-10-02 04:25:58'),
(65, 'Hamza Ali', 'bhs-main.student10@school.com', NULL, '$2y$12$xmYdFnpxoeBAYl0JhJ21pOWoPMV6caQOVnBr.69AGnq0IjtXBhFU.', NULL, 'student', 1, 1, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:59', '2026-10-02 04:25:59'),
(66, 'Parent of Hamza', 'bhs-main.guardian10@school.com', NULL, '$2y$12$8qi2byFyG6CmS5LR99CR7eOCksiCvwJUcESseU8Ri8sLC.brfKkue', NULL, 'guardian', 1, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:59', '2026-10-02 04:25:59'),
(67, 'Maryam Khan', 'bhs-north.student1@school.com', NULL, '$2y$12$UD/vb3eNQGmDsmZI1QzrQuZt6yjBBwfaziXw0RfIZ1sShxUduvQou', NULL, 'student', 2, 1, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:59', '2026-10-02 04:25:59'),
(68, 'Parent of Maryam', 'bhs-north.guardian1@school.com', NULL, '$2y$12$d0ndkQrYwu2LSVbDAQuo8e17xmVwsXeLMe.VgFB/n5tj6/KxwdzQW', NULL, 'guardian', 2, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:25:59', '2026-10-02 04:25:59'),
(69, 'Bilal Shah', 'bhs-north.student2@school.com', NULL, '$2y$12$Tr86xunrY.Nvz2hs9.YSpOJjuXGOdCxjoCcAjUzqgkzldzP9UL8Z6', NULL, 'student', 2, 1, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:00', '2026-10-02 04:26:00'),
(70, 'Parent of Bilal', 'bhs-north.guardian2@school.com', NULL, '$2y$12$RjC5j3lEuqAE6erTzSg/DuRifEMobHaYUoMS2In882i1X5eBTrqXS', NULL, 'guardian', 2, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:00', '2026-10-02 04:26:00'),
(71, 'Maryam Raza', 'bhs-north.student3@school.com', NULL, '$2y$12$AihoqF6nmdxteYe5IvgvxOF6C..RV2hHuEiGD5vRl0oMeqfhTj3Jy', NULL, 'student', 2, 1, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:00', '2026-10-02 04:26:00'),
(72, 'Parent of Maryam', 'bhs-north.guardian3@school.com', NULL, '$2y$12$WlkWd5ndJA6cRmkYvBjiJOXSzUUxGRMv/eYaRXvIs2T2bxi5np65G', NULL, 'guardian', 2, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:00', '2026-10-02 04:26:00'),
(73, 'Rehan Raza', 'bhs-north.student4@school.com', NULL, '$2y$12$q3BxvM9VEyygfMZqTeRJGuBgmob132COnC8bwP8vymPZo6IggqjYS', NULL, 'student', 2, 1, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:00', '2026-10-02 04:26:00'),
(74, 'Parent of Rehan', 'bhs-north.guardian4@school.com', NULL, '$2y$12$YZkczOGcvuTFTRUf6Yahj.w6EkRb0N.jZGGlITLywCbde79qIdKDC', NULL, 'guardian', 2, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:01', '2026-10-02 04:26:01'),
(75, 'Hira Raza', 'bhs-north.student5@school.com', NULL, '$2y$12$eqm/E5pQjMJij3vU6hArA.NekUWwoy9R9jN4iH5IzO8JRZScRb8BS', NULL, 'student', 2, 1, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:01', '2026-10-02 04:26:01'),
(76, 'Parent of Hira', 'bhs-north.guardian5@school.com', NULL, '$2y$12$EiumD2GIbSgx9NR3H.d0Oe4JfNwEDUVd.Z8ipnvl5SL00uTMmNT9W', NULL, 'guardian', 2, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:01', '2026-10-02 04:26:01'),
(77, 'Ali Ahmed', 'bhs-north.student6@school.com', NULL, '$2y$12$sZeoX/vcQPs3xrp.hyuiHOJ5yxq4ZzyPpleje.roxzHd2Wg2NVN7G', NULL, 'student', 2, 1, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:01', '2026-10-02 04:26:01'),
(78, 'Parent of Ali', 'bhs-north.guardian6@school.com', NULL, '$2y$12$ZTkvJLpejn9kO1tosBp9muOKaYKmJflB07FWmRZ4toTXK.IFBoP6e', NULL, 'guardian', 2, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:01', '2026-10-02 04:26:01'),
(79, 'Aisha Raza', 'bhs-north.student7@school.com', NULL, '$2y$12$pFcZepSTt11xgpPf1JgZo.1vw.gQ9PqfwEvXQ9krwFYKTqcnCZR6S', NULL, 'student', 2, 1, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:02', '2026-10-02 04:26:02'),
(80, 'Parent of Aisha', 'bhs-north.guardian7@school.com', NULL, '$2y$12$HWt5TieFY8f2BkgxnkB06eRAlW7nCibkOzUoctbV4MOLm8K55Rt9i', NULL, 'guardian', 2, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:02', '2026-10-02 04:26:02'),
(81, 'Ahmed Raza', 'bhs-north.student8@school.com', NULL, '$2y$12$Cw9naknTgR5edz8X9iNrxuqyh/IJlBuKwcn7QXb5/QRNeoB5LQF/q', NULL, 'student', 2, 1, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:02', '2026-10-02 04:26:02'),
(82, 'Parent of Ahmed', 'bhs-north.guardian8@school.com', NULL, '$2y$12$PV9dR0/xc80qHn8V1meO..sO41DUAxYheLpKl4ik9rWkIDyAtkmnW', NULL, 'guardian', 2, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:02', '2026-10-02 04:26:02'),
(83, 'Fatima Khan', 'bhs-north.student9@school.com', NULL, '$2y$12$Bfg3hNlyrA80shJ0QJTxO..KBfByIGXml7KHVLyWmJn4f4thlU1Di', NULL, 'student', 2, 1, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:02', '2026-10-02 04:26:02'),
(84, 'Parent of Fatima', 'bhs-north.guardian9@school.com', NULL, '$2y$12$lKbgDl6XQH3CrkgOkjhKb.nBnLjGyzaNfZLh6x7YPGG5YziCqd1Su', NULL, 'guardian', 2, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:03', '2026-10-02 04:26:03'),
(85, 'Rehan Khan', 'bhs-north.student10@school.com', NULL, '$2y$12$pa4pqRmQtU.XdU4buhjLT.vjWyGWqXBcEv7csKrLhHZZ5bMvsGS4m', NULL, 'student', 2, 1, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:03', '2026-10-02 04:26:03'),
(86, 'Parent of Rehan', 'bhs-north.guardian10@school.com', NULL, '$2y$12$OQBan6EuHBQWgq/1TG1z5eRbG.8QYybBLfl5JXia6X48Y.GbK8rie', NULL, 'guardian', 2, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:03', '2026-10-02 04:26:03'),
(87, 'Fatima Ahmed', 'gs-main.student1@school.com', NULL, '$2y$12$27A8woEwgSOtb8R0Ie2bDuvk9L1sGB5KuStTUG8JyXTjlOQfSBV2K', NULL, 'student', 3, 2, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:03', '2026-10-02 04:26:03'),
(88, 'Parent of Fatima', 'gs-main.guardian1@school.com', NULL, '$2y$12$xJI5SqDhHKUzsSyKjDM4IO7spqKs7Y6F/uFoKrx14guiKXwG2xNHe', NULL, 'guardian', 3, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:03', '2026-10-02 04:26:03'),
(89, 'Bilal Shah', 'gs-main.student2@school.com', NULL, '$2y$12$MdmleJtQ.Pg3EA0FXyqb5Oyz2UMC3esnfkm8dPhkoRgrTh9alrIPW', NULL, 'student', 3, 2, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:04', '2026-10-02 04:26:04'),
(90, 'Parent of Bilal', 'gs-main.guardian2@school.com', NULL, '$2y$12$8XZmZErN50yeA9Q6IHEaXejX9wFh55NDw4Ig3PDN1cj434qH4k9v.', NULL, 'guardian', 3, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:04', '2026-10-02 04:26:04'),
(91, 'Hira Shah', 'gs-main.student3@school.com', NULL, '$2y$12$9QG2CCKzP.c/eNhTSsaUQOPX/G2QnzHQYKSf2IBjYfgNRSeUVhI.K', NULL, 'student', 3, 2, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:04', '2026-10-02 04:26:04'),
(92, 'Parent of Hira', 'gs-main.guardian3@school.com', NULL, '$2y$12$oa6i2.pHUJORpsgTusUxY.A2b4j2nAHCk8DR2gJa3lWYJVf05FsDG', NULL, 'guardian', 3, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:04', '2026-10-02 04:26:04'),
(93, 'Ali Ali', 'gs-main.student4@school.com', NULL, '$2y$12$6GxUOV7wlizlJUIGaTJe8.B8OYhx4/14ht9sRAoM53JVZFCYUrMMu', NULL, 'student', 3, 2, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:05', '2026-10-02 04:26:05'),
(94, 'Parent of Ali', 'gs-main.guardian4@school.com', NULL, '$2y$12$SUxnpkfQP6V7BOk0cjRjP.ejPikvR2nx9UCCDWOwbqjVk8OQUeGsq', NULL, 'guardian', 3, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:05', '2026-10-02 04:26:05'),
(95, 'Zainab Raza', 'gs-main.student5@school.com', NULL, '$2y$12$HaiVoRYFlEiWkzl9jd.bme3lXKHXTHVgZyl.dbeWjye/LqILIRlSu', NULL, 'student', 3, 2, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:05', '2026-10-02 04:26:05'),
(96, 'Parent of Zainab', 'gs-main.guardian5@school.com', NULL, '$2y$12$qQTOp8KbTKUVE6TNAj1lEOYqbCISUrDE74kSmIKGHUCvcs1MRzT.S', NULL, 'guardian', 3, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:05', '2026-10-02 04:26:05'),
(97, 'Hamza Khan', 'gs-main.student6@school.com', NULL, '$2y$12$49PLVHiI65uGygx.tTcR9uAlDEnBk6b4Z9j49jFn3vJfJmX8Bj.2y', NULL, 'student', 3, 2, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:05', '2026-10-02 04:26:05'),
(98, 'Parent of Hamza', 'gs-main.guardian6@school.com', NULL, '$2y$12$d0IxAQUBFSgZ1GlrUWIU3OECiOd26Zn2HhOC/mOm3kGR8suKipENq', NULL, 'guardian', 3, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:06', '2026-10-02 04:26:06'),
(99, 'Maryam Khan', 'gs-main.student7@school.com', NULL, '$2y$12$bT5ejQJlfSeD2pRZQz/vVOKUe1QMabbnVVsipYN.qXkwvgJdEdzDa', NULL, 'student', 3, 2, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:06', '2026-10-02 04:26:06'),
(100, 'Parent of Maryam', 'gs-main.guardian7@school.com', NULL, '$2y$12$3PCfXuAVK13p0GT0PGmAi.rCvrCe9py44kVtAalERepsluDWLxzO.', NULL, 'guardian', 3, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:06', '2026-10-02 04:26:06'),
(101, 'Ali Raza', 'gs-main.student8@school.com', NULL, '$2y$12$1gN0dX0ElZxoVmqIWKlN2OFq/lg4MZl3X7ttRbdURq3TPnGMDNk0O', NULL, 'student', 3, 2, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:06', '2026-10-02 04:26:06'),
(102, 'Parent of Ali', 'gs-main.guardian8@school.com', NULL, '$2y$12$L8cQl1MAJ2V8sA7v/MGMdeRSuBm3zIK6NBJ98/Lx9FxBbZCGdQmtu', NULL, 'guardian', 3, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:06', '2026-10-02 04:26:06'),
(103, 'Fatima Raza', 'gs-main.student9@school.com', NULL, '$2y$12$8JY9Fa6yio0kG7XQA4xCe.U09KcC2O0XNgwFhYRfzE6aTdVSSU2Wy', NULL, 'student', 3, 2, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:07', '2026-10-02 04:26:07'),
(104, 'Parent of Fatima', 'gs-main.guardian9@school.com', NULL, '$2y$12$C2e9wCBF/8.5UCxB.cLM3O5.3soY7vJ2HaaJa7pFLgRJavX7buKU6', NULL, 'guardian', 3, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:07', '2026-10-02 04:26:07'),
(105, 'Ali Raza', 'gs-main.student10@school.com', NULL, '$2y$12$pkOgng/cHxK4.B04fDVHIOhPPsQnHSurMsFK9a5j.5QWA9yG4p5Ve', NULL, 'student', 3, 2, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:07', '2026-10-02 04:26:07'),
(106, 'Parent of Ali', 'gs-main.guardian10@school.com', NULL, '$2y$12$I1ZJnRYr6jnV2IsT8x7lc.dLWjD44xG6NYLIiDkAjZ8LuRkQruajW', NULL, 'guardian', 3, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:07', '2026-10-02 04:26:07'),
(107, 'Maryam Ali', 'gs-north.student1@school.com', NULL, '$2y$12$0Ro5JME3oa5megS4dFrFHuOrcY4X640msxaGKtMsbMgF/KefIQQe6', NULL, 'student', 4, 2, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:07', '2026-10-02 04:26:07'),
(108, 'Parent of Maryam', 'gs-north.guardian1@school.com', NULL, '$2y$12$XGWzdx8rc/BwvJjSlCm6EeysA5JKEH2KjIoyi32M0vK0LrEk3sEGG', NULL, 'guardian', 4, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:08', '2026-10-02 04:26:08'),
(109, 'Bilal Raza', 'gs-north.student2@school.com', NULL, '$2y$12$t9cdOmZZIlMYzkaSdaAQhe37IJAgbt4SzOuBplNJ2yJ8ThTKU8Pp.', NULL, 'student', 4, 2, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:08', '2026-10-02 04:26:08'),
(110, 'Parent of Bilal', 'gs-north.guardian2@school.com', NULL, '$2y$12$Wx11PUF.LbOWniL6Ae63AeCShVz3yruIyieJRtR5BLP2oAhRo2Vhy', NULL, 'guardian', 4, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:08', '2026-10-02 04:26:08'),
(111, 'Zainab Shah', 'gs-north.student3@school.com', NULL, '$2y$12$i1cUNtUNyFj4WIk6fjX5deJALMjS0elSVkixIM7Hp.iIiaUMeIO1e', NULL, 'student', 4, 2, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:08', '2026-10-02 04:26:08'),
(112, 'Parent of Zainab', 'gs-north.guardian3@school.com', NULL, '$2y$12$4axlWq80cEXKehVFFzVY1uarXkqO5s9NDEAxx7FzuAkMqqlXkOFpq', NULL, 'guardian', 4, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:08', '2026-10-02 04:26:08'),
(113, 'Ahmed Ahmed', 'gs-north.student4@school.com', NULL, '$2y$12$m0wk9HfKjlFvN9mDMv3e0.JVeXkfs0LQxt.Z20VG8ga/uENoKp6GW', NULL, 'student', 4, 2, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:09', '2026-10-02 04:26:09'),
(114, 'Parent of Ahmed', 'gs-north.guardian4@school.com', NULL, '$2y$12$cAGpOPnB9/wgPmZWTswzyezTRG0VZZixFs6Ku6nRtdPeKCeMH16ya', NULL, 'guardian', 4, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:09', '2026-10-02 04:26:09'),
(115, 'Zainab Raza', 'gs-north.student5@school.com', NULL, '$2y$12$6y11zF6IgJjJFHhq/L1g.eUXWJO9/B7lAxm.ypMox0r9XXo4i3.EG', NULL, 'student', 4, 2, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:09', '2026-10-02 04:26:09'),
(116, 'Parent of Zainab', 'gs-north.guardian5@school.com', NULL, '$2y$12$yKcukkhkO/OZILn2d0GPb.7gdDN4Wxdjj2/AgUTjR4.aq6tj7Yqra', NULL, 'guardian', 4, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:09', '2026-10-02 04:26:09'),
(117, 'Rehan Ahmed', 'gs-north.student6@school.com', NULL, '$2y$12$c4pniW9TDZCQ0xgPaMBPvectw55aiRWp.nNWdmUttXlSAtJ849e0u', NULL, 'student', 4, 2, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:09', '2026-10-02 04:26:09'),
(118, 'Parent of Rehan', 'gs-north.guardian6@school.com', NULL, '$2y$12$c7O7kmoy2E7BN2Ik8wBANuVnMcekBSNUo8Ltmr0P8Z/eyVPv.0fb2', NULL, 'guardian', 4, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:10', '2026-10-02 04:26:10'),
(119, 'Fatima Khan', 'gs-north.student7@school.com', NULL, '$2y$12$npFDwN14RAOJmxdBGVcsyOE6qeg15XhBIkHL.JnqsAiek5BK7GxQC', NULL, 'student', 4, 2, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:10', '2026-10-02 04:26:10'),
(120, 'Parent of Fatima', 'gs-north.guardian7@school.com', NULL, '$2y$12$KyC9EetsLBl.CwLa35frEuKFrkGbIpK4.56cAT0FZ575DUgfaeiSe', NULL, 'guardian', 4, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:10', '2026-10-02 04:26:10'),
(121, 'Ahmed Ali', 'gs-north.student8@school.com', NULL, '$2y$12$sQWkJR.qtg0Xi.uAU0hkwudx6mmsHGVjpkumUacmQSUzl99Xi3Neq', NULL, 'student', 4, 2, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:10', '2026-10-02 04:26:10'),
(122, 'Parent of Ahmed', 'gs-north.guardian8@school.com', NULL, '$2y$12$i2ry5AQnWK4.czQB6zhrm.wod8AJthuFJKtQ2URHdb64SyMlpLTue', NULL, 'guardian', 4, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:10', '2026-10-02 04:26:10'),
(123, 'Aisha Ahmed', 'gs-north.student9@school.com', NULL, '$2y$12$P6MH2As3hfGNQYAye4fdPOTpjihIRlHDQ9N5oAhXFgC43coYVf.0.', NULL, 'student', 4, 2, NULL, NULL, NULL, 'female', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(124, 'Parent of Aisha', 'gs-north.guardian9@school.com', NULL, '$2y$12$8dkJABHJd94pocm2zvUyOeM.bDfvJeKc8fQCR8S.kwqXmR90dioQW', NULL, 'guardian', 4, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(125, 'Rehan Khan', 'gs-north.student10@school.com', NULL, '$2y$12$fuI7CaRQ4aob.pJHNNvhTO2hjyJHP108M3AF0wt1gOksHZ0.Sjq5G', NULL, 'student', 4, 2, NULL, NULL, NULL, 'male', NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(126, 'Parent of Rehan', 'gs-north.guardian10@school.com', NULL, '$2y$12$lNvFJsCt2vdz4aNYycZ/LOOr/LU5eYY/Xpm5hmS91ZwmwmRNRlvWq', NULL, 'guardian', 4, 2, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:26:11', '2026-10-02 04:26:11'),
(127, 'Super Admin', 'superadmin@school.com', NULL, '$2y$12$.y0Thm1C22zp3oGlO4rbSOfA1WeU6NxGeiR6mU4AP3kU6ZJPpxW6q', NULL, 'super_admin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 04:48:53', '2026-10-02 04:48:53'),
(128, 'Asim Shah', 'ADM-1001@student.local', NULL, '$2y$12$yJYbiZlraQteeKcrZ0roTO6h7OVdprJLDODPSLh5xsO4qRHynXL36', NULL, 'student', 1, NULL, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 06:52:47', '2026-10-02 06:52:47'),
(134, 'Umema Fahad', 'ADM-0910@student.local', NULL, '$2y$12$7aaXAPU/8lGhJxkQAKpYjOMeNGZlKrVx7yKD5f/4JRvUkc7JeaBxG', NULL, 'student', 2, 1, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-02 07:03:02', '2026-10-02 07:03:02'),
(135, 'Azam Ali', 'Azam@teacher.com', NULL, '$2y$12$nfTjjkZf/h6CqOcl9bogO.QNank.M8I8TBCfsyZxIjkJAU.ciEMLW', NULL, 'teacher', 1, 1, NULL, NULL, NULL, 'male', '2012-06-27', 'active', NULL, NULL, NULL, '2026-10-03 08:59:02', '2026-10-03 08:59:02'),
(136, 'Mir Hassan', 'srr-principal@school.com', NULL, '$2y$12$FJcZT7cYLhBFOic0xcvn6eAxllkrVmqPRY1TaWLoKiY4dww0XZrpK', NULL, 'principal', NULL, 3, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-03 14:21:43', '2026-10-03 14:21:43'),
(137, 'Ms. Fatima Ali', 'srr-vp@school.com', NULL, '$2y$12$5/69FxK6U87s4yfRhLr20eqsnZG4XqXK/ieAz2CIchIo51ealLYR2', NULL, 'vice_principal', 5, 3, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-03 14:33:35', '2026-10-03 14:33:35'),
(138, 'ali', 'ali@school.com', NULL, '$2y$12$7eyYKw1HqWfHSXQ0fLF5MeE4nBTkAjqhRSMv1pQBg1ennf4ZGqqIe', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'active', NULL, NULL, NULL, '2026-10-04 09:48:48', '2026-10-04 09:48:48');

-- --------------------------------------------------------

--
-- Table structure for table `vaccinations`
--

CREATE TABLE `vaccinations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `vaccine_name` varchar(255) NOT NULL,
  `dose_number` int(11) NOT NULL,
  `date_administered` date NOT NULL,
  `next_dose_date` date DEFAULT NULL,
  `administered_by` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `campus_id` bigint(20) UNSIGNED NOT NULL,
  `registration_number` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `capacity` int(11) NOT NULL,
  `driver_name` varchar(255) NOT NULL,
  `driver_phone` varchar(255) NOT NULL,
  `driver_license` varchar(255) DEFAULT NULL,
  `insurance_details` text DEFAULT NULL,
  `maintenance_date` date DEFAULT NULL,
  `status` enum('active','inactive','maintenance') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `academic_sessions`
--
ALTER TABLE `academic_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `academic_sessions_campus_id_foreign` (`campus_id`);

--
-- Indexes for table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `assets_asset_code_unique` (`asset_code`),
  ADD KEY `assets_campus_id_foreign` (`campus_id`),
  ADD KEY `assets_assigned_to_foreign` (`assigned_to`);

--
-- Indexes for table `asset_maintenance`
--
ALTER TABLE `asset_maintenance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `asset_maintenance_asset_id_foreign` (`asset_id`);

--
-- Indexes for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `audit_logs_user_id_foreign` (`user_id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `books_isbn_unique` (`isbn`),
  ADD KEY `books_campus_id_foreign` (`campus_id`),
  ADD KEY `books_category_id_foreign` (`category_id`);

--
-- Indexes for table `book_categories`
--
ALTER TABLE `book_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `book_categories_campus_id_foreign` (`campus_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `campuses`
--
ALTER TABLE `campuses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `campuses_code_unique` (`code`),
  ADD KEY `campuses_school_id_foreign` (`school_id`),
  ADD KEY `campuses_vice_principal_id_foreign` (`vice_principal_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `departments_campus_id_code_unique` (`campus_id`,`code`);

--
-- Indexes for table `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exams_exam_type_id_foreign` (`exam_type_id`),
  ADD KEY `exams_academic_session_id_foreign` (`academic_session_id`),
  ADD KEY `exams_standard_id_foreign` (`standard_id`);

--
-- Indexes for table `exam_schedules`
--
ALTER TABLE `exam_schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exam_schedules_exam_id_foreign` (`exam_id`),
  ADD KEY `exam_schedules_subject_id_foreign` (`subject_id`);

--
-- Indexes for table `exam_types`
--
ALTER TABLE `exam_types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exam_types_campus_id_foreign` (`campus_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `fee_invoices`
--
ALTER TABLE `fee_invoices`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `fee_invoices_invoice_number_unique` (`invoice_number`),
  ADD KEY `fee_invoices_student_id_foreign` (`student_id`),
  ADD KEY `fee_invoices_academic_session_id_foreign` (`academic_session_id`);

--
-- Indexes for table `fee_invoice_items`
--
ALTER TABLE `fee_invoice_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fee_invoice_items_fee_invoice_id_foreign` (`fee_invoice_id`),
  ADD KEY `fee_invoice_items_fee_type_id_foreign` (`fee_type_id`);

--
-- Indexes for table `fee_payments`
--
ALTER TABLE `fee_payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `fee_payments_payment_number_unique` (`payment_number`),
  ADD UNIQUE KEY `fee_payments_receipt_number_unique` (`receipt_number`),
  ADD KEY `fee_payments_fee_invoice_id_foreign` (`fee_invoice_id`),
  ADD KEY `fee_payments_student_id_foreign` (`student_id`);

--
-- Indexes for table `fee_structures`
--
ALTER TABLE `fee_structures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fee_structures_campus_id_foreign` (`campus_id`),
  ADD KEY `fee_structures_standard_id_foreign` (`standard_id`),
  ADD KEY `fee_structures_fee_type_id_foreign` (`fee_type_id`),
  ADD KEY `fee_structures_academic_session_id_foreign` (`academic_session_id`);

--
-- Indexes for table `fee_types`
--
ALTER TABLE `fee_types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fee_types_campus_id_foreign` (`campus_id`);

--
-- Indexes for table `grading_systems`
--
ALTER TABLE `grading_systems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `grading_systems_campus_id_foreign` (`campus_id`);

--
-- Indexes for table `guardians`
--
ALTER TABLE `guardians`
  ADD PRIMARY KEY (`id`),
  ADD KEY `guardians_user_id_foreign` (`user_id`);

--
-- Indexes for table `health_checkups`
--
ALTER TABLE `health_checkups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `health_checkups_student_id_foreign` (`student_id`);

--
-- Indexes for table `health_records`
--
ALTER TABLE `health_records`
  ADD PRIMARY KEY (`id`),
  ADD KEY `health_records_student_id_foreign` (`student_id`);

--
-- Indexes for table `holidays`
--
ALTER TABLE `holidays`
  ADD PRIMARY KEY (`id`),
  ADD KEY `holidays_campus_id_foreign` (`campus_id`);

--
-- Indexes for table `inventory_items`
--
ALTER TABLE `inventory_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `inventory_items_code_unique` (`code`),
  ADD KEY `inventory_items_campus_id_foreign` (`campus_id`);

--
-- Indexes for table `inventory_transactions`
--
ALTER TABLE `inventory_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inventory_transactions_inventory_item_id_foreign` (`inventory_item_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leave_requests`
--
ALTER TABLE `leave_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `leave_requests_staff_id_foreign` (`staff_id`),
  ADD KEY `leave_requests_leave_type_id_foreign` (`leave_type_id`),
  ADD KEY `leave_requests_approved_by_foreign` (`approved_by`),
  ADD KEY `leave_requests_teacher_id_foreign` (`teacher_id`);

--
-- Indexes for table `leave_types`
--
ALTER TABLE `leave_types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `leave_types_campus_id_foreign` (`campus_id`);

--
-- Indexes for table `library_transactions`
--
ALTER TABLE `library_transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `library_transactions_book_id_foreign` (`book_id`),
  ADD KEY `library_transactions_student_id_foreign` (`student_id`),
  ADD KEY `library_transactions_issued_by_foreign` (`issued_by`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_user_id_foreign` (`user_id`);

--
-- Indexes for table `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `organizations_code_unique` (`code`);

--
-- Indexes for table `payrolls`
--
ALTER TABLE `payrolls`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payrolls_staff_id_foreign` (`staff_id`),
  ADD KEY `payrolls_teacher_id_foreign` (`teacher_id`);

--
-- Indexes for table `payslips`
--
ALTER TABLE `payslips`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `payslips_payslip_number_unique` (`payslip_number`),
  ADD KEY `payslips_payroll_id_foreign` (`payroll_id`),
  ADD KEY `payslips_staff_id_foreign` (`staff_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `results_student_id_exam_id_subject_id_unique` (`student_id`,`exam_id`,`subject_id`),
  ADD KEY `results_exam_id_foreign` (`exam_id`),
  ADD KEY `results_subject_id_foreign` (`subject_id`);

--
-- Indexes for table `result_summaries`
--
ALTER TABLE `result_summaries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `result_summaries_student_id_exam_id_unique` (`student_id`,`exam_id`),
  ADD KEY `result_summaries_exam_id_foreign` (`exam_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `routes_campus_id_foreign` (`campus_id`),
  ADD KEY `routes_vehicle_id_foreign` (`vehicle_id`);

--
-- Indexes for table `route_stops`
--
ALTER TABLE `route_stops`
  ADD PRIMARY KEY (`id`),
  ADD KEY `route_stops_route_id_foreign` (`route_id`);

--
-- Indexes for table `scholarships`
--
ALTER TABLE `scholarships`
  ADD PRIMARY KEY (`id`),
  ADD KEY `scholarships_student_id_foreign` (`student_id`);

--
-- Indexes for table `schools`
--
ALTER TABLE `schools`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `schools_code_unique` (`code`),
  ADD KEY `schools_organization_id_foreign` (`organization_id`);

--
-- Indexes for table `school_settings`
--
ALTER TABLE `school_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `school_settings_campus_id_setting_key_unique` (`campus_id`,`setting_key`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sections_standard_id_foreign` (`standard_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `staff_employee_id_unique` (`employee_id`),
  ADD KEY `staff_user_id_foreign` (`user_id`),
  ADD KEY `staff_department_id_foreign` (`department_id`);

--
-- Indexes for table `staff_documents`
--
ALTER TABLE `staff_documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `staff_documents_staff_id_foreign` (`staff_id`);

--
-- Indexes for table `standards`
--
ALTER TABLE `standards`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `standards_code_unique` (`code`),
  ADD KEY `standards_campus_id_foreign` (`campus_id`);

--
-- Indexes for table `standard_subjects`
--
ALTER TABLE `standard_subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `standard_subjects_standard_id_foreign` (`standard_id`),
  ADD KEY `standard_subjects_subject_id_foreign` (`subject_id`),
  ADD KEY `standard_subjects_teacher_id_foreign` (`teacher_id`),
  ADD KEY `standard_subjects_academic_session_id_foreign` (`academic_session_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `students_admission_number_unique` (`admission_number`),
  ADD KEY `students_user_id_foreign` (`user_id`),
  ADD KEY `students_campus_id_foreign` (`campus_id`);

--
-- Indexes for table `student_academic_records`
--
ALTER TABLE `student_academic_records`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_academic_records_student_id_foreign` (`student_id`),
  ADD KEY `student_academic_records_standard_id_foreign` (`standard_id`),
  ADD KEY `student_academic_records_section_id_foreign` (`section_id`),
  ADD KEY `student_academic_records_academic_session_id_foreign` (`academic_session_id`);

--
-- Indexes for table `student_attendances`
--
ALTER TABLE `student_attendances`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `student_attendances_student_id_date_unique` (`student_id`,`date`),
  ADD KEY `student_attendances_standard_id_foreign` (`standard_id`),
  ADD KEY `student_attendances_section_id_foreign` (`section_id`),
  ADD KEY `student_attendances_academic_session_id_foreign` (`academic_session_id`),
  ADD KEY `student_attendances_marked_by_foreign` (`marked_by`);

--
-- Indexes for table `student_documents`
--
ALTER TABLE `student_documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_documents_student_id_foreign` (`student_id`);

--
-- Indexes for table `student_guardians`
--
ALTER TABLE `student_guardians`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_guardians_student_id_foreign` (`student_id`),
  ADD KEY `student_guardians_guardian_id_foreign` (`guardian_id`);

--
-- Indexes for table `student_transport`
--
ALTER TABLE `student_transport`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_transport_student_id_foreign` (`student_id`),
  ADD KEY `student_transport_route_id_foreign` (`route_id`),
  ADD KEY `student_transport_pickup_stop_id_foreign` (`pickup_stop_id`),
  ADD KEY `student_transport_dropoff_stop_id_foreign` (`dropoff_stop_id`),
  ADD KEY `student_transport_academic_session_id_foreign` (`academic_session_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `subjects_code_unique` (`code`),
  ADD KEY `subjects_campus_id_foreign` (`campus_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `teachers_employee_id_unique` (`employee_id`),
  ADD KEY `teachers_user_id_foreign` (`user_id`);

--
-- Indexes for table `teacher_attendances`
--
ALTER TABLE `teacher_attendances`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `teacher_attendances_teacher_id_date_unique` (`teacher_id`,`date`);

--
-- Indexes for table `timetable_entries`
--
ALTER TABLE `timetable_entries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_timetable_standard_section_time` (`standard_id`,`section_id`,`time_slot_id`),
  ADD UNIQUE KEY `unique_timetable_teacher_time` (`teacher_id`,`time_slot_id`),
  ADD UNIQUE KEY `unique_timetable_room_time` (`room_number`,`time_slot_id`),
  ADD KEY `timetable_entries_section_id_foreign` (`section_id`),
  ADD KEY `timetable_entries_subject_id_foreign` (`subject_id`),
  ADD KEY `timetable_entries_time_slot_id_foreign` (`time_slot_id`),
  ADD KEY `timetable_entries_academic_session_id_foreign` (`academic_session_id`);

--
-- Indexes for table `time_slots`
--
ALTER TABLE `time_slots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `time_slots_campus_id_foreign` (`campus_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_campus_id_index` (`campus_id`),
  ADD KEY `users_school_id_foreign` (`school_id`);

--
-- Indexes for table `vaccinations`
--
ALTER TABLE `vaccinations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vaccinations_student_id_foreign` (`student_id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vehicles_registration_number_unique` (`registration_number`),
  ADD KEY `vehicles_campus_id_foreign` (`campus_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `academic_sessions`
--
ALTER TABLE `academic_sessions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `assets`
--
ALTER TABLE `assets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `asset_maintenance`
--
ALTER TABLE `asset_maintenance`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `audit_logs`
--
ALTER TABLE `audit_logs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `book_categories`
--
ALTER TABLE `book_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `campuses`
--
ALTER TABLE `campuses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `exams`
--
ALTER TABLE `exams`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `exam_schedules`
--
ALTER TABLE `exam_schedules`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `exam_types`
--
ALTER TABLE `exam_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fee_invoices`
--
ALTER TABLE `fee_invoices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `fee_invoice_items`
--
ALTER TABLE `fee_invoice_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `fee_payments`
--
ALTER TABLE `fee_payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `fee_structures`
--
ALTER TABLE `fee_structures`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `fee_types`
--
ALTER TABLE `fee_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `grading_systems`
--
ALTER TABLE `grading_systems`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `guardians`
--
ALTER TABLE `guardians`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `health_checkups`
--
ALTER TABLE `health_checkups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `health_records`
--
ALTER TABLE `health_records`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `holidays`
--
ALTER TABLE `holidays`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory_items`
--
ALTER TABLE `inventory_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventory_transactions`
--
ALTER TABLE `inventory_transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leave_requests`
--
ALTER TABLE `leave_requests`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `leave_types`
--
ALTER TABLE `leave_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `library_transactions`
--
ALTER TABLE `library_transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payrolls`
--
ALTER TABLE `payrolls`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `payslips`
--
ALTER TABLE `payslips`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `results`
--
ALTER TABLE `results`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `result_summaries`
--
ALTER TABLE `result_summaries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `routes`
--
ALTER TABLE `routes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `route_stops`
--
ALTER TABLE `route_stops`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `scholarships`
--
ALTER TABLE `scholarships`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `schools`
--
ALTER TABLE `schools`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `school_settings`
--
ALTER TABLE `school_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sections`
--
ALTER TABLE `sections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `staff_documents`
--
ALTER TABLE `staff_documents`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `standards`
--
ALTER TABLE `standards`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `standard_subjects`
--
ALTER TABLE `standard_subjects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `student_academic_records`
--
ALTER TABLE `student_academic_records`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `student_attendances`
--
ALTER TABLE `student_attendances`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student_documents`
--
ALTER TABLE `student_documents`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student_guardians`
--
ALTER TABLE `student_guardians`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `student_transport`
--
ALTER TABLE `student_transport`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `teacher_attendances`
--
ALTER TABLE `teacher_attendances`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `timetable_entries`
--
ALTER TABLE `timetable_entries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `time_slots`
--
ALTER TABLE `time_slots`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT for table `vaccinations`
--
ALTER TABLE `vaccinations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `academic_sessions`
--
ALTER TABLE `academic_sessions`
  ADD CONSTRAINT `academic_sessions_campus_id_foreign` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `assets`
--
ALTER TABLE `assets`
  ADD CONSTRAINT `assets_assigned_to_foreign` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `assets_campus_id_foreign` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `asset_maintenance`
--
ALTER TABLE `asset_maintenance`
  ADD CONSTRAINT `asset_maintenance_asset_id_foreign` FOREIGN KEY (`asset_id`) REFERENCES `assets` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `audit_logs`
--
ALTER TABLE `audit_logs`
  ADD CONSTRAINT `audit_logs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_campus_id_foreign` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `books_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `book_categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `book_categories`
--
ALTER TABLE `book_categories`
  ADD CONSTRAINT `book_categories_campus_id_foreign` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `campuses`
--
ALTER TABLE `campuses`
  ADD CONSTRAINT `campuses_school_id_foreign` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `campuses_vice_principal_id_foreign` FOREIGN KEY (`vice_principal_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `departments`
--
ALTER TABLE `departments`
  ADD CONSTRAINT `departments_campus_id_foreign` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `exams`
--
ALTER TABLE `exams`
  ADD CONSTRAINT `exams_academic_session_id_foreign` FOREIGN KEY (`academic_session_id`) REFERENCES `academic_sessions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `exams_exam_type_id_foreign` FOREIGN KEY (`exam_type_id`) REFERENCES `exam_types` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `exams_standard_id_foreign` FOREIGN KEY (`standard_id`) REFERENCES `standards` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `exam_schedules`
--
ALTER TABLE `exam_schedules`
  ADD CONSTRAINT `exam_schedules_exam_id_foreign` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `exam_schedules_subject_id_foreign` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `exam_types`
--
ALTER TABLE `exam_types`
  ADD CONSTRAINT `exam_types_campus_id_foreign` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `fee_invoices`
--
ALTER TABLE `fee_invoices`
  ADD CONSTRAINT `fee_invoices_academic_session_id_foreign` FOREIGN KEY (`academic_session_id`) REFERENCES `academic_sessions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fee_invoices_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `fee_invoice_items`
--
ALTER TABLE `fee_invoice_items`
  ADD CONSTRAINT `fee_invoice_items_fee_invoice_id_foreign` FOREIGN KEY (`fee_invoice_id`) REFERENCES `fee_invoices` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fee_invoice_items_fee_type_id_foreign` FOREIGN KEY (`fee_type_id`) REFERENCES `fee_types` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `fee_payments`
--
ALTER TABLE `fee_payments`
  ADD CONSTRAINT `fee_payments_fee_invoice_id_foreign` FOREIGN KEY (`fee_invoice_id`) REFERENCES `fee_invoices` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fee_payments_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `fee_structures`
--
ALTER TABLE `fee_structures`
  ADD CONSTRAINT `fee_structures_academic_session_id_foreign` FOREIGN KEY (`academic_session_id`) REFERENCES `academic_sessions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fee_structures_campus_id_foreign` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fee_structures_fee_type_id_foreign` FOREIGN KEY (`fee_type_id`) REFERENCES `fee_types` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fee_structures_standard_id_foreign` FOREIGN KEY (`standard_id`) REFERENCES `standards` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `fee_types`
--
ALTER TABLE `fee_types`
  ADD CONSTRAINT `fee_types_campus_id_foreign` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `grading_systems`
--
ALTER TABLE `grading_systems`
  ADD CONSTRAINT `grading_systems_campus_id_foreign` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `guardians`
--
ALTER TABLE `guardians`
  ADD CONSTRAINT `guardians_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `health_checkups`
--
ALTER TABLE `health_checkups`
  ADD CONSTRAINT `health_checkups_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `health_records`
--
ALTER TABLE `health_records`
  ADD CONSTRAINT `health_records_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `holidays`
--
ALTER TABLE `holidays`
  ADD CONSTRAINT `holidays_campus_id_foreign` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `inventory_items`
--
ALTER TABLE `inventory_items`
  ADD CONSTRAINT `inventory_items_campus_id_foreign` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `inventory_transactions`
--
ALTER TABLE `inventory_transactions`
  ADD CONSTRAINT `inventory_transactions_inventory_item_id_foreign` FOREIGN KEY (`inventory_item_id`) REFERENCES `inventory_items` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `leave_requests`
--
ALTER TABLE `leave_requests`
  ADD CONSTRAINT `leave_requests_approved_by_foreign` FOREIGN KEY (`approved_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `leave_requests_leave_type_id_foreign` FOREIGN KEY (`leave_type_id`) REFERENCES `leave_types` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `leave_requests_staff_id_foreign` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `leave_requests_teacher_id_foreign` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `leave_types`
--
ALTER TABLE `leave_types`
  ADD CONSTRAINT `leave_types_campus_id_foreign` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `library_transactions`
--
ALTER TABLE `library_transactions`
  ADD CONSTRAINT `library_transactions_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `library_transactions_issued_by_foreign` FOREIGN KEY (`issued_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `library_transactions_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payrolls`
--
ALTER TABLE `payrolls`
  ADD CONSTRAINT `payrolls_staff_id_foreign` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `payrolls_teacher_id_foreign` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `payslips`
--
ALTER TABLE `payslips`
  ADD CONSTRAINT `payslips_payroll_id_foreign` FOREIGN KEY (`payroll_id`) REFERENCES `payrolls` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `payslips_staff_id_foreign` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `results`
--
ALTER TABLE `results`
  ADD CONSTRAINT `results_exam_id_foreign` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `results_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `results_subject_id_foreign` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `result_summaries`
--
ALTER TABLE `result_summaries`
  ADD CONSTRAINT `result_summaries_exam_id_foreign` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `result_summaries_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `routes`
--
ALTER TABLE `routes`
  ADD CONSTRAINT `routes_campus_id_foreign` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `routes_vehicle_id_foreign` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `route_stops`
--
ALTER TABLE `route_stops`
  ADD CONSTRAINT `route_stops_route_id_foreign` FOREIGN KEY (`route_id`) REFERENCES `routes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `scholarships`
--
ALTER TABLE `scholarships`
  ADD CONSTRAINT `scholarships_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `schools`
--
ALTER TABLE `schools`
  ADD CONSTRAINT `schools_organization_id_foreign` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `school_settings`
--
ALTER TABLE `school_settings`
  ADD CONSTRAINT `school_settings_campus_id_foreign` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sections`
--
ALTER TABLE `sections`
  ADD CONSTRAINT `sections_standard_id_foreign` FOREIGN KEY (`standard_id`) REFERENCES `standards` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `staff_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `staff_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `staff_documents`
--
ALTER TABLE `staff_documents`
  ADD CONSTRAINT `staff_documents_staff_id_foreign` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `standards`
--
ALTER TABLE `standards`
  ADD CONSTRAINT `standards_campus_id_foreign` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `standard_subjects`
--
ALTER TABLE `standard_subjects`
  ADD CONSTRAINT `standard_subjects_academic_session_id_foreign` FOREIGN KEY (`academic_session_id`) REFERENCES `academic_sessions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `standard_subjects_standard_id_foreign` FOREIGN KEY (`standard_id`) REFERENCES `standards` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `standard_subjects_subject_id_foreign` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `standard_subjects_teacher_id_foreign` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_campus_id_foreign` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `students_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `student_academic_records`
--
ALTER TABLE `student_academic_records`
  ADD CONSTRAINT `student_academic_records_academic_session_id_foreign` FOREIGN KEY (`academic_session_id`) REFERENCES `academic_sessions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_academic_records_section_id_foreign` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_academic_records_standard_id_foreign` FOREIGN KEY (`standard_id`) REFERENCES `standards` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_academic_records_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `student_attendances`
--
ALTER TABLE `student_attendances`
  ADD CONSTRAINT `student_attendances_academic_session_id_foreign` FOREIGN KEY (`academic_session_id`) REFERENCES `academic_sessions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_attendances_marked_by_foreign` FOREIGN KEY (`marked_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_attendances_section_id_foreign` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_attendances_standard_id_foreign` FOREIGN KEY (`standard_id`) REFERENCES `standards` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_attendances_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `student_documents`
--
ALTER TABLE `student_documents`
  ADD CONSTRAINT `student_documents_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `student_guardians`
--
ALTER TABLE `student_guardians`
  ADD CONSTRAINT `student_guardians_guardian_id_foreign` FOREIGN KEY (`guardian_id`) REFERENCES `guardians` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_guardians_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `student_transport`
--
ALTER TABLE `student_transport`
  ADD CONSTRAINT `student_transport_academic_session_id_foreign` FOREIGN KEY (`academic_session_id`) REFERENCES `academic_sessions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_transport_dropoff_stop_id_foreign` FOREIGN KEY (`dropoff_stop_id`) REFERENCES `route_stops` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_transport_pickup_stop_id_foreign` FOREIGN KEY (`pickup_stop_id`) REFERENCES `route_stops` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_transport_route_id_foreign` FOREIGN KEY (`route_id`) REFERENCES `routes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_transport_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `subjects_campus_id_foreign` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `teachers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `teacher_attendances`
--
ALTER TABLE `teacher_attendances`
  ADD CONSTRAINT `teacher_attendances_teacher_id_foreign` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `timetable_entries`
--
ALTER TABLE `timetable_entries`
  ADD CONSTRAINT `timetable_entries_academic_session_id_foreign` FOREIGN KEY (`academic_session_id`) REFERENCES `academic_sessions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `timetable_entries_section_id_foreign` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `timetable_entries_standard_id_foreign` FOREIGN KEY (`standard_id`) REFERENCES `standards` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `timetable_entries_subject_id_foreign` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `timetable_entries_teacher_id_foreign` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `timetable_entries_time_slot_id_foreign` FOREIGN KEY (`time_slot_id`) REFERENCES `time_slots` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `time_slots`
--
ALTER TABLE `time_slots`
  ADD CONSTRAINT `time_slots_campus_id_foreign` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_campus_id_foreign` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `users_school_id_foreign` FOREIGN KEY (`school_id`) REFERENCES `schools` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `vaccinations`
--
ALTER TABLE `vaccinations`
  ADD CONSTRAINT `vaccinations_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_campus_id_foreign` FOREIGN KEY (`campus_id`) REFERENCES `campuses` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
