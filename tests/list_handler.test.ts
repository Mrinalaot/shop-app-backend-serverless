import { APIGatewayEvent } from 'aws-lambda';
import { expect } from 'chai';
import { getProductsList } from '../src/list_handler';

describe('getProductsList lambda function', () => {
  it('should work as expected', async () => {
    const res = await getProductsList({} as APIGatewayEvent);
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.include('products');
  });
});