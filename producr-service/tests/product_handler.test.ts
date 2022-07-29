import { APIGatewayEvent } from "aws-lambda";
import { expect } from "chai";
import { getProductsById } from "../src/product_handler";

describe("getProductsById lambda function", () => {
  it("should work as expected", async () => {
    const res = await getProductsById({
      pathParameters: { productId: "7567ec4b-b10c-48c5-9345-fc73c48a80aa" },
    } as unknown as APIGatewayEvent);
    expect(res).to.be.an("object");
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.include("Successful");
  });
});
