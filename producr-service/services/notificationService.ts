import { SNS } from "aws-sdk";

const CHEAP_PRODUCT_THRESHOLD_PRICE = 200;

export const sendNewProductsNotification = async (newProducts: any) => {
  const sns = new SNS({ region: process.env.REGION });

  const expensiveNewProducts: any = [];
  const nonExpensiveNewProducts: any = [];

  newProducts.forEach((product: any) => {
    if (product.price >= CHEAP_PRODUCT_THRESHOLD_PRICE) {
      expensiveNewProducts.push(product);
    } else {
      nonExpensiveNewProducts.push(product);
    }
  });

  const sendNotification = async (products: any, isExpensiveProducts: any) => {
    try {
      const result = await sns
        .publish({
          Subject: `New ${
            isExpensiveProducts ? "expensive" : ""
          } products are created!`,
          Message: JSON.stringify(products),
          TopicArn: process.env.SNS_ARN,
          MessageAttributes: {
            IsExpensive: {
              DataType: "String",
              StringValue: isExpensiveProducts.toString(),
            },
          },
        })
        .promise();

      console.log("Send notification for ", products, " with result ", result);
    } catch (error) {
      console.log("Send notification for ", products, "with error ", error);
    }
  };

  const promises = [];

  expensiveNewProducts.length > 0 &&
    promises.push(sendNotification(expensiveNewProducts, true));
  nonExpensiveNewProducts.length > 0 &&
    promises.push(sendNotification(nonExpensiveNewProducts, false));

  await Promise.all(promises);
};