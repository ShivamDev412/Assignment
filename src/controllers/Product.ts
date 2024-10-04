import { Request, Response, NextFunction } from "express";
import productService from "../services/Product";

class ProductConstructor {
  getProducts = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { currency } = req.query as { currency: string };

    try {
      const product = await productService.getProducts(id, currency);
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };
  getMostViewedProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const product = await productService.getMostViewedProduct();
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductConstructor;
