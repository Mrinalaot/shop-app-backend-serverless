import { APIGatewayEvent } from "aws-lambda";
import { generateResponse } from "./utils";
import { S3 } from 'aws-sdk';
const s3Client = new S3({ region: 'us-east-1' });

export const importProductsFile = async (event: APIGatewayEvent) => {
    try {
      const fileName = event?.queryStringParameters?.name;
      const s3FilePath = `uploaded/${fileName}.csv`;

      const params = {
        Bucket: process.env.BUCKET,
        Key: s3FilePath,
        Expires: 120,
        ContentType: "text/csv",
      };

      const url = await s3Client.getSignedUrlPromise("putObject", params);

      return generateResponse(200, {message: 'Successful', url});
    } catch (error: any) {
      return generateResponse(500, {message: 'Error', error: error.message});
    }
  };
