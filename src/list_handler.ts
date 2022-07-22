import { APIGatewayEvent } from "aws-lambda";
import { generateResponse } from "./utils";
import { getDbPool } from "../DB/connection";
import { getProductListQuery } from "../DB/queries";

export const getProductsList = async (event: APIGatewayEvent) => {
  let pool;
  try {
    console.log(event);
    pool = getDbPool();
    if (pool) {
      const { rows: products } = await pool.query(getProductListQuery());
      return generateResponse(200, {
        message: "Successfull",
        products,
      });
    } else
       throw new Error("Pool is not available");
  } catch (error: any) {
    return generateResponse(500, { message: "Error", error: error.message });
  } finally {
    pool?.end();
  }
};
