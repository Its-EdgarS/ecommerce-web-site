-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: inventory-management.cpmqqgusk2j7.us-east-1.rds.amazonaws.com    Database: inventory_management
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `category_id` int DEFAULT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `gender` enum('Male','Female','Unisex') NOT NULL,
  `description` text,
  `featured` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`),
  KEY `idx_products_category` (`category_id`),
  KEY `idx_products_featured` (`featured`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  CONSTRAINT `price_positive` CHECK ((`price` > 0)),
  CONSTRAINT `stock_non_negative` CHECK ((`stock` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Egbuka_Jersey_Scarlet',1,20,145.00,'https://beckeye-central-images.s3.us-east-1.amazonaws.com/Egbuka_Jersey_Scarlet.webp','Unisex','Ohio State Buckeyes Nike #2 Emeka Egbuka Student Athlete Scarlet Football Jersey',1,'2024-11-02 23:00:25','2024-11-04 02:37:40'),(2,'Judkins_Jersey_Gray',1,50,145.00,'https://beckeye-central-images.s3.us-east-1.amazonaws.com/Judkins_Jersey_Gray.webp','Unisex','Ohio State Buckeyes Nike #1 Quinshon Judkins Student Athlete Gray Football Jersey',1,'2024-11-02 23:00:25','2024-11-04 02:37:40'),(3,'Smith_Jersey_White',1,100,145.00,'https://beckeye-central-images.s3.us-east-1.amazonaws.com/Smith_Jersey_White.webp','Unisex','Ohio State Buckeyes Nike #4 Jeremiah Smith Student Athlete White Football Jersey',1,'2024-11-02 23:00:25','2024-11-02 23:00:25'),(4,'ohiostate_red_tshirt',2,100,34.99,'https://beckeye-central-images.s3.us-east-1.amazonaws.com/ohiostate_scarlet_tshirt.avif','Male','Ohio State Buckeyes Scarlet T-Shirt',0,'2024-11-02 23:00:25','2024-11-02 23:00:25'),(5,'ohiostate_black_football_tshirt',2,80,34.99,'https://beckeye-central-images.s3.us-east-1.amazonaws.com/ohiostate_black_football_tshirt.webp','Male','Ohio State Buckeyes Black Football T-Shirt',0,'2024-11-02 23:00:25','2024-11-02 23:00:25'),(6,'ohiostate_buckeyes_black_tshirt',2,75,44.99,'https://beckeye-central-images.s3.us-east-1.amazonaws.com/ohiostate_buckeyes_black_tshirt.jpeg','Male','Ohio State Buckeyes Black And Scarlet T-Shirt',0,'2024-11-02 23:00:25','2024-11-02 23:00:25'),(7,'ohiostate_buckeyes_university_scarlet_tshirt',2,90,44.99,'https://beckeye-central-images.s3.us-east-1.amazonaws.com/ohiostate_buckeyes_university_scarlet_tshirt.webp','Male','Ohio State Buckeyes University Scarlet T-Shirt',0,'2024-11-02 23:00:25','2024-11-02 23:00:25'),(8,'ohiostate_scarlet_basketball_tshirt',2,85,34.99,'https://beckeye-central-images.s3.us-east-1.amazonaws.com/ohiostate_scarlet_basketball_tshirt.webp','Male','Ohio State Buckeyes Scarlet Basketball T-Shirt',0,'2024-11-02 23:00:25','2024-11-02 23:00:25');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-03 21:57:10
