import request from "supertest";
import express from "express";
import ProductConstructor from "../controllers/Product";
import productService from "../services/Product";

jest.mock("../services/Product");

const app = express();
app.use(express.json());

const productController = new ProductConstructor();
app.get("/product/:id", productController.getProducts);
app.get("/products/most-viewed", productController.getMostViewedProduct);

describe("ProductController", () => {
  describe("getProducts", () => {
    it("should return product data with 200 status", async () => {
      const mockProduct = {
        id: 1,
        name: "Test Product",
        price: 100,
        description: "A test product",
        productViewed: 10,
      };
      (productService.getProducts as jest.Mock).mockResolvedValue(mockProduct);

      const response = await request(app).get("/product/1").query({ currency: "USD" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        data: mockProduct,
      });
    });
  });

  describe("getMostViewedProduct", () => {
    it("should return most viewed products with 200 status", async () => {
      const mockProducts = [
        {
          id: 1,
          name: "Test Product 1",
          price: 100,
          description: "A test product",
          productViewed: 10,
        },
        {
          id: 2,
          name: "Test Product 2",
          price: 200,
          description: "Another test product",
          productViewed: 20,
        },
      ];
      (productService.getMostViewedProduct as jest.Mock).mockResolvedValue(mockProducts);

      const response = await request(app).get("/products/most-viewed");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        data: mockProducts,
      });
    });

  });
});