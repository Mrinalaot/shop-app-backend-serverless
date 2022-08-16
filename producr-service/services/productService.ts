import { string } from "joi";
import format from "pg-format";
import { getDbPool } from "../DB/connection";
import { productBodySchema } from "../src/utils";

export const createProducts = async (products: any) => {
    products.forEach((product: any) => {
      const { error } = productBodySchema.validate(product);
  
      if (error) {
        throw error;
      }
    });
  
    const client = await getDbPool();
    await client.connect();
  
    try {
      client.query("BEGIN");
  
      const formattedProducts = products.map(({ title, description, price } : any) => [
        title,
        description,
        price,
      ]);
  
      const createProductsQuery = format(
        "insert into products (title, description, price) values %L returning id",
        formattedProducts
      );
      const { rows } = await client.query(createProductsQuery);
      const newProductIds = rows.map(({ id }) => id);
  
      const formattedCount = products.map(({ count }: any, index: any) => [
        newProductIds[index],
        count,
      ]);
      const createProductStock = format(
        "insert into stocks (product_id, count) values %L",
        formattedCount
      );
      await client.query(createProductStock);
  
      await client.query("COMMIT");
  
      return newProductIds;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      await client.end();
    }
  };