import { APIGatewayEvent } from "aws-lambda";
import { generateResponse } from "./utils";
import { getDbPool } from "../DB/connection";
import { getProductListQuery } from "../DB/queries";

export const getProductsById = async (event: APIGatewayEvent) => {
  let pool;
  try {
    console.log(event);
    const { productId } = event.pathParameters || {};
    if (!productId) throw new Error("ProductId is required");

    pool = getDbPool();
    if (pool) {
      const { rows: availableProducts } = await pool.query(
        getProductListQuery(productId)
      );

      if (!availableProducts.length) throw new Error("Product not found");

      return generateResponse(200, {
        message: "Successfull",
        products: availableProducts,
      });
    } else throw new Error("Pool is not available");
  } catch (error: any) {
    return generateResponse(500, { message: "Error", error: error.message });
  }
};
