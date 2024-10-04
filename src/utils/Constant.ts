const STATUS_CODE = {
  SUCCESS: 200,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
};
const MESSAGES = {
  PRODUCT_NOT_FOUND: "Product not found",
    UNAUTHORIZED: "Unauthorized",
    BAD_REQUEST: "Bad Request",
    NOT_FOUND: "Not Found",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    INVALID_PRODUCT_ID: "Invalid product ID",
    CURRENCY_API_ERROR: "Error fetching currency rates",
    UNABLE_TO_FETCH_PRODUCT: "Unable to fetch product",
};
const ENV = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
  TEST: "test",
}
const ENDPOINT = {
  PRODUCT: "/product/:id",
  MOST_VIEWED_PRODUCT: "/products/most-viewed",
}
export { STATUS_CODE, MESSAGES, ENV, ENDPOINT };