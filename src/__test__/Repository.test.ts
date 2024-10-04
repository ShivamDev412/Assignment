import ProductRepository from "../repositories/Product";
import pool from "../config/db";

jest.mock("../config/db", () => ({
  query: jest.fn(),
}));

describe("ProductRepository", () => {
  describe("getProductById", () => {
    it("should return a product when found", async () => {
      const mockProduct = [{ id: 1, name: "Test Product", price: 100, isDeleted: 0 }];
      
      (pool.query as jest.Mock).mockResolvedValue([mockProduct]);

      const product = await ProductRepository.getProductById(1);

      expect(product).toEqual(mockProduct[0]);
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM product WHERE id = ? AND isDeleted = 0",
        [1]
      );
    });

    it("should throw an error if the query fails", async () => {
      (pool.query as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(ProductRepository.getProductById(1)).rejects.toThrow(
        "Unable to fetch product by ID"
      );
    });
  });

  describe("getMostViewedProducts", () => {
    it("should return most viewed products", async () => {
      const mockProducts = [
        { id: 1, name: "Test Product 1", price: 100, productViewed: 10 },
        { id: 2, name: "Test Product 2", price: 200, productViewed: 20 },
      ];

      (pool.query as jest.Mock).mockResolvedValue([mockProducts]);

      const products = await ProductRepository.getMostViewedProducts(5);

      expect(products).toEqual(mockProducts);
      expect(pool.query).toHaveBeenCalledWith(
        `SELECT * FROM product WHERE isDeleted = 0 AND productViewed > 0 
         ORDER BY productViewed DESC LIMIT ?`,
        [5]
      );
    });

    it("should throw an error if the query fails", async () => {
      (pool.query as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(ProductRepository.getMostViewedProducts(5)).rejects.toThrow(
        "Unable to fetch most viewed products"
      );
    });
  });

  describe("updateProductViewedCount", () => {
    it("should update the product view count", async () => {
      (pool.query as jest.Mock).mockResolvedValue([{ affectedRows: 1 }]);

      await expect(
        ProductRepository.updateProductViewedCount(1, 10)
      ).resolves.toBeUndefined();

      expect(pool.query).toHaveBeenCalledWith(
        "UPDATE product SET productViewed = ? WHERE id = ?",
        [10, 1]
      );
    });

    it("should throw an error if the update fails", async () => {
      (pool.query as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(ProductRepository.updateProductViewedCount(1, 10)).rejects.toThrow(
        "Unable to update product view count"
      );
    });
  });
});