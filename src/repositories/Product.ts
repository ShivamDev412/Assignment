import pool from "../config/db"; 
import { MESSAGES } from "../utils/Constant";
import { InternalServerError, NotFoundError } from "../utils/Error";

class ProductRepository {
  getProductById = async (id: number) => {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM product WHERE id = ? AND isDeleted = 0",
        [id]
      );
      //@ts-ignore
      return rows[0]; 
    } catch (error) {
      throw new InternalServerError("Unable to fetch product by ID");
    }
  };

  getMostViewedProducts = async (limit: number = 5) => {
    try {
      const [rows] = await pool.query(
        `SELECT * FROM product WHERE isDeleted = 0 AND productViewed > 0 
         ORDER BY productViewed DESC LIMIT ?`,
        [limit]
      );

      //@ts-ignore
      if (rows.length === 0) {
        throw new Error("No products found with views greater than 0");
      }

      return rows; 
    } catch (error) {
      throw new Error("Unable to fetch most viewed products");
    }
  };

  updateProductViewedCount = async (id: number, productViewedCount: number) => {
    try {
      await pool.query(
        "UPDATE product SET productViewed = ? WHERE id = ?",
        [productViewedCount, id]
      );
    } catch (error) {
      throw new Error("Unable to update product view count");
    }
  };
}

export default new ProductRepository();
