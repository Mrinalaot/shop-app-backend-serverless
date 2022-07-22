import { APIGatewayEvent } from "aws-lambda";
import { generateResponse, productBodySchema } from "./utils";
import { getDbClient } from "../DB/connection";
import { insertProductQuery, insertStoreQuery } from "../DB/queries";

export const createProduct = async (event: APIGatewayEvent) => {
  let client;
  try {
    console.log(event);
    const body = JSON.parse(event.body || "{}");
    // joi validation for body
    productBodySchema.validate(body);
    // const result = Joi.validate(dataToValidate, schema); 
    const { title, description, price, count } = body;

    client = await getDbClient();

    if (client) {
      await client.query("BEGIN");

      const { id: productId } = (
        await client.query(insertProductQuery(), [title, description, price])
      ).rows[0];

      const product = (await client.query(insertStoreQuery(), [
        productId,
        count,
      ])).rows[0];

      await client.query("COMMIT");

      return generateResponse(200, {
        message: "Successfull",
        data: "Product created",
        product,
      });
    } else 
        throw new Error("Client is not available");
  } catch (error: any) {
    await client?.query("ROLLBACK");
    return generateResponse(500, { message: "Error", error: error.message });
  } finally {
    client?.release();
  }
};
