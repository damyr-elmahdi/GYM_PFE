-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 09, 2025 at 02:34 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gymproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel_cache_subscription_plans', 'a:3:{s:5:\"basic\";a:3:{s:4:\"name\";s:10:\"Basic Plan\";s:5:\"price\";d:29.99;s:8:\"features\";a:2:{i:0;s:18:\"Smart workout plan\";i:1;s:16:\"At home workouts\";}}s:6:\"weekly\";a:3:{s:4:\"name\";s:11:\"Weekly Plan\";s:5:\"price\";d:49.99;s:8:\"features\";a:3:{i:0;s:8:\"PRO Gyms\";i:1;s:18:\"Smart workout plan\";i:2;s:16:\"At home workouts\";}}s:7:\"monthly\";a:3:{s:4:\"name\";s:12:\"Monthly Plan\";s:5:\"price\";d:99.99;s:8:\"features\";a:5:{i:0;s:20:\"ELITE Gyms & Classes\";i:1;s:8:\"PRO Gyms\";i:2;s:18:\"Smart workout plan\";i:3;s:16:\"At home workouts\";i:4;s:17:\"Personal Training\";}}}', 1744209912);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `user_id`, `product_id`, `quantity`, `created_at`, `updated_at`) VALUES
(4, 6, 7, 1, '2025-04-08 10:37:12', '2025-04-08 10:37:12'),
(5, 6, 6, 2, '2025-04-08 10:37:14', '2025-04-08 10:37:16');

-- --------------------------------------------------------

--
-- Table structure for table `exercises`
--

CREATE TABLE `exercises` (
  `idExercice` bigint UNSIGNED NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `urlVido` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `niveauDifficult` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `partieCorps` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `partieCorpsPic` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `exercises`
--

INSERT INTO `exercises` (`idExercice`, `nom`, `description`, `image`, `urlVido`, `niveauDifficult`, `partieCorps`, `partieCorpsPic`, `created_at`, `updated_at`) VALUES
(2, 'Pull-Ups', 'A bodyweight exercise that strengthens the upper back, biceps, and shoulders while improving grip strength.', 'exercise_images/Y4X37if402z5lgZGCvYz1KNUjfsDXY6SKpOHcx1W.gif', 'https://www.youtube.com/watch?v=eGo4IYlbE5g', 'Intermediate', 'Back', 'body_part_images/yoVBUGsPachUPwWJ7JfCDcTuyq3ZtYGo6WfkzSEL.jpg', '2025-04-08 11:35:07', '2025-04-08 11:35:07'),
(3, 'Deadlifts', 'A compound weightlifting exercise that engages multiple muscle groups, including the lower back, hamstrings, and glutes.', 'exercise_images/xpoGPOliluCeYSM3Cbc2OwBKyIbESCyqVqbja2SO.gif', 'https://www.youtube.com/watch?v=op9kVnSso6Q', 'Beginner', 'Legs', 'body_part_images/6SqCIRQnndwEuqaxHPgyw3sawD7v7pYPDrA4s2i0.jpg', '2025-04-08 11:36:00', '2025-04-08 11:36:00'),
(4, 'Lunges', 'A lower-body exercise that strengthens the quadriceps, hamstrings, and glutes while improving balance and coordination.', 'exercise_images/FK8SQoCHoCC1fI8enJuue8g8tyf0afB5zKer1zVE.gif', 'https://www.youtube.com/watch?v=QOVaHwm-Q6U', 'Beginner', 'Legs', 'body_part_images/bPFkzgCLPGT0T8G8wsf5LaFxyjIganNr4EIFzYgk.jpg', '2025-04-08 11:36:48', '2025-04-08 11:36:48'),
(5, 'Plank', 'A core-strengthening exercise that engages the abs, back, and shoulders while improving stability and endurance.', 'exercise_images/7YVOSA4N1bHPSoP17SKRgVf5nLEGLyyty2OYW9L3.jpg', 'https://www.youtube.com/watch?v=pSHjTRCQxIw', 'Advanced', 'Core', 'body_part_images/8xnLY1grMJnFqcOz1RXpEP8SnGjAjQXbdHZOYejp.png', '2025-04-08 11:37:43', '2025-04-08 11:37:43'),
(6, 'Dips', 'A bodyweight exercise that targets the triceps, chest, and shoulders, helping build upper body strength.', 'exercise_images/t4hEiVfe0FB2k8TNvVXI0CQThh5qU8ydQo5lFEb5.gif', 'https://www.youtube.com/watch?v=2z8JmcrW-As', 'Beginner', 'Chest', 'body_part_images/FpUshjRZ52w9ucGOqLIWylQYBHReXWEOKzvHmjZG.jpg', '2025-04-08 11:38:44', '2025-04-08 11:38:44'),
(7, 'Bench Press', 'A compound strength training exercise that primarily targets the chest, triceps, and shoulders. It can be performed with a barbell or dumbbells.', 'exercise_images/mCATKGcWfBASb0irjsuxH87uNt5ViPIXO40k5XRs.gif', 'https://www.youtube.com/watch?v=rT7DgCr-3pg', 'Advanced', 'Chest', 'body_part_images/fDMTh7BGMgsff4tvtIMyNI0zrBwnoaSKqKJnQy1V.jpg', '2025-04-08 11:39:45', '2025-04-08 11:39:45'),
(8, 'Push-Ups', 'A bodyweight exercise that strengthens the chest, shoulders, and triceps while engaging the core.', 'exercise_images/bTHWV0nrWVCq3HrKTDiOo1Q56W0saInNwcRRiW7E.gif', 'https://www.youtube.com/watch?v=IODxDxX7oi4', 'Beginner', 'Shoulders', 'body_part_images/R3jpHT21xoQxhpHFO9eoWSeFG5OM67vQG8znmAH8.png', '2025-04-08 11:41:36', '2025-04-08 11:41:36'),
(9, 'Squats', 'A foundational lower-body movement that strengthens the quads, hamstrings, and glutes.', 'exercise_images/GoYl34tZWGSdGTGJoCM17W7CS1PQoEK2SZLkt7fV.gif', 'https://www.youtube.com/watch?v=8iPEnn-ltC8', 'Intermediate', 'Legs', 'body_part_images/BYDn2joUpl3ODJfXyGPg0AsYTgpPoRu0QV8RESxN.jpg', '2025-04-08 11:43:33', '2025-04-08 11:43:33'),
(10, 'Yoga Stretches (Downward Dog, Cobra Pose)', 'Improves flexibility, posture, and relaxation.', 'exercise_images/8u75hKovnD1wGZwCFRxOn3krFZKwrHctsPA9WAng.gif', 'https://www.youtube.com/watch?v=Yzm3fA2HhkQ', 'Beginner', 'Full Body', 'body_part_images/z5nLZwJaFrhtgT7exyIQJ5orTOj0dVUjkav9KCNY.png', '2025-04-08 11:45:18', '2025-04-08 11:45:18'),
(11, 'Jumping Jacks', 'A classic full-body cardio exercise that increases heart rate, improves coordination, and warms up the body. Often used in warm-ups or as part of a HIIT workout.', 'exercise_images/D1c9aqvAt3OoKxRZEvyz79reKiH3OuAUuiVq4KuG.gif', 'https://www.youtube.com/watch?v=c4DAnQ6DtF8', 'Beginner', 'Arms', 'body_part_images/BnhCtTtC3hVgsa0dowAqpFFemObDWUoOqwhoL9BL.png', '2025-04-08 11:47:12', '2025-04-08 11:47:12'),
(12, 'Burpees', 'A powerful full-body exercise that combines a squat, push-up, and jump for maximum calorie burn and cardiovascular endurance.', 'exercise_images/2MejjmYAtIsvUy1epVyFf0YC3No5no4wF5htMVYw.gif', 'https://www.youtube.com/watch?v=TU8QYVW0gDU', 'Beginner', 'Full Body', 'body_part_images/phZYZBnUIeDddZjUPECUAiW2XTFcBCeHY7SmeGiz.jpg', '2025-04-08 11:51:15', '2025-04-08 11:51:15'),
(13, 'Foam Rolling', 'A self-myofascial release technique that uses a foam roller to relieve muscle tension, improve mobility, and promote recovery.', 'exercise_images/H4vCgaE9yA3pQRXklGLjprmgKrkMFTTThS6iortn.jpg', 'https://www.youtube.com/watch?v=8caF1Keg2XU', 'Beginner', 'Back', NULL, '2025-04-08 11:52:24', '2025-04-08 11:52:24'),
(14, 'Hip Flexor Stretch', 'A mobility/stretching exercise that loosens tight hip flexors, which is common in people who sit a lot or have poor posture.', 'exercise_images/PRBd1q3K6hHX2Y4AVkxy33XD0fvzr9Ui3bsk5ckL.gif', 'https://www.youtube.com/watch?v=sq2tWkRrL3c', 'Beginner', 'Legs', 'body_part_images/kHQ93oorxdTZh46QX1AqKrY4P1kELYd86rHDflyP.jpg', '2025-04-08 11:53:14', '2025-04-08 11:53:14'),
(15, 'Kettlebell Swing', 'A dynamic full-body movement using a kettlebell that builds explosive hip power, core stability, and cardiovascular endurance.', 'exercise_images/sNmzqm7ZQTuEuhzwtaGFRlV78uLt63Fs1Gq3LsJY.gif', 'https://www.youtube.com/watch?v=YSx5ZJ6UK0c', 'Intermediate', 'Back', 'body_part_images/2nVxJlAH0TYNbhOZrn1mpRKC05WFy7mBMsUSvFIF.jpg', '2025-04-08 11:54:25', '2025-04-08 11:54:25');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `favorite_exercises`
--

CREATE TABLE `favorite_exercises` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `exercise_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `favorite_exercises`
--

INSERT INTO `favorite_exercises` (`id`, `user_id`, `exercise_id`, `created_at`, `updated_at`) VALUES
(2, 7, 5, '2025-04-08 16:18:18', '2025-04-08 16:18:18'),
(3, 7, 9, '2025-04-08 18:59:38', '2025-04-08 18:59:38');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_03_11_144356_create_personal_access_tokens_table', 1),
(5, '2025_03_17_063357_add_role_to_users_table', 1),
(6, '2025_03_18_063936_create_exercises_table', 1),
(7, '2025_03_18_064146_avorite_exercises', 1),
(8, '2025_03_19_155733_create_products_table', 1),
(9, '2025_03_19_173856_create_cart_items_table', 1),
(10, '2025_03_19_180650_create_orders_table', 1),
(11, '2025_03_19_180710_create_order_items_table', 1),
(12, '2025_03_28_135538_create_subscriptions_table', 1),
(13, '2025_04_02_164623_create_plan_details_table', 1),
(14, '2025_04_03_181034_create_user_profiles_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_method` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `delivery_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total_price`, `status`, `address`, `payment_method`, `delivery_status`, `created_at`, `updated_at`) VALUES
(1, 6, '465.00', 'pending', 'LOT YOUSSFI, OUJDA, OUJDA 89000, MA', 'credit_card', 'pending', '2025-04-08 10:36:53', '2025-04-08 10:36:53'),
(2, 7, '234.00', 'pending', 'nfnnf, fdfsdf, sfsdfs 789778, MA', 'credit_card', 'pending', '2025-04-08 15:36:03', '2025-04-08 15:36:03'),
(3, 7, '49.00', 'pending', 'LOT 03, TIZNIT, OUJDA 85000, MA', 'credit_card', 'pending', '2025-04-08 16:19:23', '2025-04-08 16:19:23'),
(4, 7, '65.00', 'pending', 'IFRAN , TIZNIT, SOUSS 85000, MA', 'credit_card', 'pending', '2025-04-08 19:00:51', '2025-04-08 19:00:51');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint UNSIGNED NOT NULL,
  `order_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 1, '234.00', '2025-04-08 10:36:53', '2025-04-08 10:36:53'),
(2, 1, 5, 1, '123.00', '2025-04-08 10:36:53', '2025-04-08 10:36:53'),
(3, 1, 9, 2, '54.00', '2025-04-08 10:36:53', '2025-04-08 10:36:53'),
(4, 2, 2, 1, '234.00', '2025-04-08 15:36:03', '2025-04-08 15:36:03'),
(5, 3, 12, 1, '49.00', '2025-04-08 16:19:23', '2025-04-08 16:19:23'),
(6, 4, 11, 1, '65.00', '2025-04-08 19:00:51', '2025-04-08 19:00:51');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(23, 'App\\Models\\User', 2, 'Elmahdi Damyr', 'e56b94546670f4daf7a47fa87aadeb72360b782814f66336c1dd400937d7b63e', '[\"*\"]', '2025-04-08 21:50:38', NULL, '2025-04-08 21:44:25', '2025-04-08 21:50:38'),
(24, 'App\\Models\\User', 3, 'Kamal Alamiii', 'a2167cc2eba8a59fbfa189b465d4ac45edbb325e78fec4f7836d85b6eade75a3', '[\"*\"]', '2025-04-09 12:57:23', NULL, '2025-04-09 12:45:56', '2025-04-09 12:57:23'),
(25, 'App\\Models\\User', 3, 'Kamal Alamiii', '4481067ca29b630caae3791923b65d3aaa9f9c6412d2cbcd46a8e28da671429f', '[\"*\"]', '2025-04-09 13:10:15', NULL, '2025-04-09 13:08:34', '2025-04-09 13:10:15');

-- --------------------------------------------------------

--
-- Table structure for table `plan_details`
--

CREATE TABLE `plan_details` (
  `id` bigint UNSIGNED NOT NULL,
  `plan_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `features` json NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `plan_details`
--

INSERT INTO `plan_details` (`id`, `plan_type`, `name`, `price`, `features`, `created_at`, `updated_at`) VALUES
(1, 'basic', 'Basic Plan', '29.99', '[\"Smart workout plan\", \"At home workouts\"]', '2025-04-03 10:39:18', '2025-04-08 19:02:38');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint UNSIGNED NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prix` decimal(10,2) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categorie` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `nom`, `prix`, `description`, `image`, `categorie`, `stock`, `created_at`, `updated_at`) VALUES
(2, 'DumbbellsHIOUI', '234.00', 'Dumbbells are versatile free weights used for resistance training, muscle building, and toning. They come in different weights, materials (rubber, iron, or neoprene-coated), and adjustable or fixed designs.', 'products/R9tE5n1Vhqc5kI8pJWcSAVzf86F6qvSWcM9cDzkG.jpg', 'Strength Training', 43, '2025-04-08 10:26:48', '2025-04-08 16:24:50'),
(3, 'Treadmill', '133.00', 'A treadmill is a fitness machine designed for indoor running or walking. It comes with various speed settings, incline adjustments, and tracking features for heart rate, calories burned, and distance covered.', 'products/PHXiPR0lMnla3yubxEvLJIzc4m2jaWdndeOpbf0z.jpg', 'Cardio Equipment', 33, '2025-04-08 10:27:58', '2025-04-08 10:27:58'),
(4, 'Resistance Bands', '219.99', 'Elastic resistance bands are used for strength training, rehabilitation, and flexibility exercises. They come in different resistance levels, from light to heavy, making them ideal for all fitness levels.', 'products/oNMF8jA57ICyPoxeJ90uWj7239GGwJZwhf1hMw79.jpg', 'Functional Training', 34, '2025-04-08 10:29:01', '2025-04-08 10:29:01'),
(5, 'Kettlebells', '123.00', 'Kettlebells are weighted balls with handles that allow dynamic movements for strength, endurance, and coordination training. They are commonly used for exercises like swings, squats, and presses.', 'products/bya0RvNUhQ0tWczLf4Fm006u00bLVDsmGiXcOmpx.jpg', 'Strength Training', 23, '2025-04-08 10:29:39', '2025-04-08 10:29:39'),
(6, 'Protein Powder', '54.00', 'A dietary supplement used to support muscle growth, recovery, and nutrition. Available in different types like whey, plant-based, and casein, it is commonly used as a post-workout shake.', 'products/8ZGa4VO6c68W06RHRKkvQrzOHSFc7CB51Jd68tNB.jpg', 'Supplements', 234, '2025-04-08 10:30:24', '2025-04-08 10:30:24'),
(7, 'Yoga Mat', '43.00', 'A cushioned mat designed for yoga, stretching, and bodyweight exercises. It provides comfort and grip, preventing slips and injuries during workouts.', 'products/Eupkpc4yyiuw3sSSpXkhKsFVppJewnHD5A08zQJV.jpg', 'Yoga & Recovery', 42, '2025-04-08 10:31:13', '2025-04-08 10:31:13'),
(8, 'Foam Roller', '34.00', 'A cylindrical tool used for self-massage and muscle recovery. It helps in reducing soreness, improving flexibility, and enhancing circulation by releasing muscle tension.', 'products/JmmZqFBHNaVkLiDtM3fHFe5XWmdBnpaBZUewmA4B.jpg', 'Recovery & Mobility', 44, '2025-04-08 10:31:49', '2025-04-08 10:31:49'),
(9, 'Jump Rope', '54.00', 'A simple yet effective tool for cardiovascular workouts, endurance training, and agility improvement. It’s portable and widely used for HIIT workouts and warm-ups.', 'products/u57OXDyXt0BPy26cRwLcdbTYie5wSeQM6q77gwY5.jpg', 'Cardio & Agility', 33, '2025-04-08 10:32:55', '2025-04-08 10:32:55'),
(10, 'Weightlifting Belt', '662.00', 'A supportive belt worn around the waist to stabilize the lower back and core during heavy weightlifting, reducing the risk of injury.', 'products/If1gGxyNn4RJS8F8RP3gK5kZeYIDL6bUKf6NsZCt.jpg', 'Strength Training Accessories', 37, '2025-04-08 10:33:34', '2025-04-08 10:33:34'),
(11, 'Battle Ropes', '65.00', 'Heavy ropes used for high-intensity interval training (HIIT), endurance, and strength workouts. They engage multiple muscle groups and improve cardiovascular fitness.', 'products/NV3gGOxCYJ0kuAJkyi0Z5QH9wEvHyUnYCLAqCKHO.jpg', 'Functional Training', 87, '2025-04-08 10:35:00', '2025-04-08 10:35:00'),
(12, 'Whey, 30 Servings', '49.00', 'Our Signature 100% Whey Protein delivers a powerful combination of three high-quality protein sources—6 grams of whey protein concentrate, 13 grams of whey protein isolate, and 6 grams of hydrolyzed whey protein—giving you clean, fast-digesting protein in every scoop. With just enough whey concentrate to add a creamy flavor and smooth texture, this blend is designed to promote muscle growth, counteract muscle breakdown, and accelerate recovery after workouts.*', 'products/pU3HEweHibkx8gWaCpT47FrBnhcfdSzQufIYyZLm.png', 'Supplements', 23, '2025-04-08 12:58:41', '2025-04-08 12:58:41'),
(13, 'Whey, 30 Servings', '49.00', 'Our Signature 100% Whey Protein delivers a powerful combination of three high-quality protein sources—6 grams of whey protein concentrate, 13 grams of whey protein isolate, and 6 grams of hydrolyzed whey protein—giving you clean, fast-digesting protein in every scoop. With just enough whey concentrate to add a creamy flavor and smooth texture, this blend is designed to promote muscle growth, counteract muscle breakdown, and accelerate recovery after workouts.*', 'products/DoJMFfu7Ozf0iwswFc9gtGKApFa3VWVmd2HESowC.png', 'Supplements', 23, '2025-04-08 12:59:18', '2025-04-08 12:59:18'),
(14, 'Multivitamin', '33.00', 'Designed for the dedicated athlete or fitness enthusiast, our comprehensive Signature multivitamin and mineral formula supports the body’s essential needs from A to Z. It’s crafted to fuel lean muscle growth, speed recovery, and elevate overall health, particularly for those leading active, high-performance lifestyles. With an array of vital vitamins, minerals, and botanicals—including vitamin A, C, D, E, K, all essential B vitamins, magnesium, zinc, selenium, and more—this multivitamin is the ultimate partner in achieving your fitness and wellness goals. It also contains 500mg of Ashwagandha to help with stress management and enhance performance*', 'products/UmfNVNwKZT0wjkJQJk3jc97XsG9pVONvgbRMdohs.png', 'Supplements', 67, '2025-04-08 13:01:11', '2025-04-08 13:01:11'),
(15, 'Monohydrate', '35.00', 'Our Signature Creatine Monohydrate is 5 grams of pure creatine monohydrate refined to a micronized powder to maximize absorption and support muscle strength, power output, and brain function.* With a fine 200-mesh rating, it also dissolves easily in your favorite beverage.', 'products/ToeSKMnCem724VIsuPIt2XJZq2FUf2xnXfoaS2pt.png', 'Supplements', 22, '2025-04-08 13:02:04', '2025-04-08 13:02:04');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `plan_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('active','expired','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `price` decimal(8,2) NOT NULL,
  `features` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`id`, `user_id`, `plan_type`, `start_date`, `end_date`, `status`, `price`, `features`, `created_at`, `updated_at`) VALUES
(1, 3, 'basic', '2025-04-03', '2025-05-03', 'active', '19.99', '[\"Smart workout plan\", \"At home workouts\"]', '2025-04-03 10:38:12', '2025-04-03 10:38:12'),
(2, 5, 'weekly', '2025-04-08', '2025-05-08', 'active', '49.99', '[\"PRO Gyms\", \"Smart workout plan\", \"At home workouts\"]', '2025-04-08 10:13:52', '2025-04-08 10:13:52'),
(3, 4, 'monthly', '2025-04-08', '2025-05-08', 'active', '99.99', '[\"ELITE Gyms & Classes\", \"PRO Gyms\", \"Smart workout plan\", \"At home workouts\", \"Personal Training\"]', '2025-04-08 10:16:40', '2025-04-08 10:16:40'),
(4, 6, 'basic', '2025-04-08', '2025-04-08', 'cancelled', '29.99', '[\"Smart workout plan\", \"At home workouts\"]', '2025-04-08 10:20:27', '2025-04-08 19:01:46'),
(5, 7, 'basic', '2025-04-08', '2025-04-08', 'cancelled', '29.99', '[\"Smart workout plan\", \"At home workouts\"]', '2025-04-08 14:49:03', '2025-04-08 16:24:07');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'client',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `height` double DEFAULT NULL COMMENT 'in cm',
  `weight` double DEFAULT NULL COMMENT 'in kg',
  `fitness_goal` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `medical_conditions` text COLLATE utf8mb4_unicode_ci,
  `date_of_birth` date DEFAULT NULL,
  `gender` enum('male','female','other') COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`, `phone`, `address`, `height`, `weight`, `fitness_goal`, `medical_conditions`, `date_of_birth`, `gender`) VALUES
(1, 'Mohammed Elmahdi', 'MohmmedElmahdi@gmail.com', NULL, '$2y$12$xamTMJtvljN4DGqVNx8QluRv1VUKV0P6geI108ngjFipGxQDhCOSO', 'admin', NULL, '2025-04-03 09:15:52', '2025-04-08 07:42:12', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'Elmahdi Damyr', 'ElmahdiDamyr@gmail.com', NULL, '$2y$12$DrNJap8kf60yYvJEpEgaa.do4I4H5AMfcourbrqM1nmMFt4r5NrAu', 'admin', NULL, '2025-04-03 09:15:52', '2025-04-08 07:42:12', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'Kamal Alamiii', 'Kamal1@gmail.com', NULL, '$2y$12$TP4/vBTmk9GaPNngAa.HyOLrNjM5sqCbZeVwSv5RgkBCM4bDO44Ra', 'client', NULL, '2025-04-03 09:19:29', '2025-04-08 07:52:37', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'Ahmed aali', 'Ahmed@gmail.com', NULL, '$2y$12$j06yAqiPGjW5StFlZaSvzef0q3fK3dJ.w4fhRCLrIpX8kRT..iDYK', 'client', NULL, '2025-04-08 10:11:11', '2025-04-08 10:18:27', '0612121212', 'OUJDA', 176, 67, 'muscle_gain', 'Hypertension\n\nEssential hypertension\nSecondary hypertension due to kidney disease', '1997-06-04', NULL),
(5, 'Sami Kadir', 'Sami@gmail.com', NULL, '$2y$12$dABhLTW0YiD4uikQ5.72d.zJyLALzQ3KvHkCsuKeP/Tey5Mqk7veu', 'client', NULL, '2025-04-08 10:12:39', '2025-04-08 10:14:49', NULL, 'JADIDA', 187, 87, 'general', 'none', NULL, 'male'),
(6, 'Ali hamidi', 'Ali@gmail.com', NULL, '$2y$12$iIzQlCKFrmgDpm2VdwhXu.I1eyXleYdt3ASGKQXlgm3cJ0/G4G7mC', 'client', NULL, '2025-04-08 10:19:12', '2025-04-08 10:19:12', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'marwan', 'marwan@gmail.com', NULL, '$2y$12$c13mfxm.QekdwljcRsgJNOGkfI.8CcRu.uQRxMIByUsMRyoFZ5SKS', 'client', NULL, '2025-04-08 14:48:32', '2025-04-08 14:48:32', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'ELMAHDI', 'Elmahdi@gmail.com', NULL, '$2y$12$X/yEz1V/umA1F3QHB4Lf2eANZ803/YcO/8MmB3KY2H8VgMxLcgWRS', 'client', NULL, '2025-04-08 19:39:16', '2025-04-08 19:39:16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

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
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_items_user_id_foreign` (`user_id`),
  ADD KEY `cart_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `exercises`
--
ALTER TABLE `exercises`
  ADD PRIMARY KEY (`idExercice`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `favorite_exercises`
--
ALTER TABLE `favorite_exercises`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `favorite_exercises_user_id_exercise_id_unique` (`user_id`,`exercise_id`),
  ADD KEY `favorite_exercises_exercise_id_foreign` (`exercise_id`);

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
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_user_id_foreign` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `plan_details`
--
ALTER TABLE `plan_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `plan_details_plan_type_unique` (`plan_type`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subscriptions_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `exercises`
--
ALTER TABLE `exercises`
  MODIFY `idExercice` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `favorite_exercises`
--
ALTER TABLE `favorite_exercises`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `plan_details`
--
ALTER TABLE `plan_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `subscriptions`
--
ALTER TABLE `subscriptions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `favorite_exercises`
--
ALTER TABLE `favorite_exercises`
  ADD CONSTRAINT `favorite_exercises_exercise_id_foreign` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`idExercice`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorite_exercises_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `subscriptions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
