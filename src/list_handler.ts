import { APIGatewayEvent } from "aws-lambda";
import { generateResponse } from "./utils";
import productList from "../mocks/productList.json";
import { Product } from "../types/product";

export const getProductsList = async (event: APIGatewayEvent) => {
  try {
    const products : Product[] = productList as Product[];
    return generateResponse(200, { message: "Successfull", products });
  } catch (error: any) {
    return generateResponse(500, { message: "Error", error: error.message });
  }
};
