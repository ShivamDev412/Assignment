import express from "express";
import { ENDPOINT } from "../utils/Constant";
import ProductConstructor from "../controllers/Product";

const routes = express.Router();
const { PRODUCT, MOST_VIEWED_PRODUCT } = ENDPOINT;
const productConstructor = new ProductConstructor();

routes.get(PRODUCT, productConstructor.getProducts);
routes.get(MOST_VIEWED_PRODUCT, productConstructor.getMostViewedProduct);

export default routes;
