import { APIGatewayEvent } from "aws-lambda";
import { generateResponse } from "./utils";
import productList from "../mocks/productList.json";
import { Product } from "../types/product";

export const getProductsById = async (event: APIGatewayEvent) => {
  try {
    const productId = event.pathParameters && event.pathParameters.productId;
    const product : Product = productList.find((product) => product.id === productId) as Product;
    if(!product) throw new Error("Product not found"); 

    return generateResponse(200, { message: "Successfull", product });
  } catch (error: any) {
    return generateResponse(500, { message: "Error", error: error.message });
  }
};
