import { createProducts } from "../services/productService";
import { sendNewProductsNotification } from "../services/notificationService";
import { SQSEvent } from "aws-lambda";

const catalogBatchProcess = async (event: SQSEvent) => {
  const products = event.Records.map(({ body }) => JSON.parse(body));

  try {
    await createProducts(products);
    await sendNewProductsNotification(products)
  } catch (error) {
    console.log(error);
  }
};

export default catalogBatchProcess;