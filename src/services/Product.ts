import { getCurrencyRates } from "../utils/Api";
import productRepository from "../repositories/Product";
import { MESSAGES } from "../utils/Constant";
import { InternalServerError, NotFoundError } from "../utils/Error";

class ProductService {
  getProducts = async (id: string, currency: string) => {
    const productId = Number(id);
    if (isNaN(productId)) {
      throw new InternalServerError(MESSAGES.INVALID_PRODUCT_ID);
    }

    const product = await productRepository.getProductById(productId);

    if (!product) {
      throw new NotFoundError(MESSAGES.PRODUCT_NOT_FOUND);
    }

    let currencyData;
    let price = product.price;

    if (currency) {
      try {
        currencyData = await getCurrencyRates();
        const conversionRate = currencyData?.quotes[`USD${currency}`];

        if (conversionRate) {
          price = price * conversionRate;
        }
      } catch (error) {
        throw new Error(MESSAGES.CURRENCY_API_ERROR);
      }
    }

    let productViewedCount = product.productViewed + 1;
    await productRepository.updateProductViewedCount(productId, productViewedCount);

    return {
      id: product.id,
      name: product.name,
      price,
      description: product.description,
      productViewed: productViewedCount,
    };
  };

  getMostViewedProduct = async () => {
    const products = await productRepository.getMostViewedProducts();
    //@ts-ignore
    if (!products.length) {
      throw new NotFoundError(MESSAGES.PRODUCT_NOT_FOUND);
    }
    //@ts-ignore
    return products.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      productViewed: product.productViewed,
    }));
  };
}

export default new ProductService();