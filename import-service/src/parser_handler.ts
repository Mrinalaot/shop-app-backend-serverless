import { APIGatewayEvent } from "aws-lambda";
import { generateResponse } from "./utils";

export const importProductsFile = async (event: APIGatewayEvent) => {
  let pool;
  try {
    console.log(event);
    return generateResponse(200, {
      message: "Successfull",
      data: [],
    });
  } catch (error: any) {
    return generateResponse(500, { message: "Error", error: error.message });
  }
};