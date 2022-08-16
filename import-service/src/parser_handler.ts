import { S3CreateEvent } from "aws-lambda";
import csv from "csv-parser";
import { S3 } from "aws-sdk";
import SQS, { SendMessageRequest } from "aws-sdk/clients/sqs";
const s3Client = new S3({ region: "us-east-1" });
const sqs = new SQS({ region: "us-east-1" });

export const importFileParser = async (event: S3CreateEvent) => {
  for (const record of event.Records) {
    const { object, bucket } = record.s3;
    const params = {
      Bucket: bucket.name,
      Key: object.key,
    };

    const s3Stream = s3Client.getObject(params).createReadStream();

    const parsedResults: any = await parseStreamByCSVParser(s3Stream);
    console.log("parsedResults", parsedResults);

    for (const productParsedItem of parsedResults) {
      try {
        const sqsRequest: SendMessageRequest = {
          QueueUrl: process.env.SQS_URL || "",
          MessageBody: JSON.stringify(productParsedItem),
        };
        await sqs.sendMessage(sqsRequest).promise();
      } catch (error: any) {
        console.log('SQS Error: ', error.message);
        throw error;
      }
    }

    const success = await copyFileToParsedDir(bucket, object);
    if (success) {
      await clearUploadedFile(bucket, object);
    }
  }
};

async function clearUploadedFile(
  bucket: { name: string },
  object: { key: string }
) {
  try {
    const deleteRequest = {
      Bucket: bucket.name,
      Key: object.key,
    };
    await s3Client.deleteObject(deleteRequest).promise();
  } catch (e) {
    console.log("delete parsed error", e);
  }
}

async function copyFileToParsedDir(
  bucket: { name: string },
  object: { key: string }
) {
  try {
    const copyObjectRequest = {
      Bucket: bucket.name,
      CopySource: `${bucket.name}/${object.key}`,
      Key: object.key.replace("uploaded/", "parsed/"),
    };

    const result = await s3Client.copyObject(copyObjectRequest).promise();

    return !!result;
  } catch (e) {
    console.log("copy to parsed error", e);
  }
}

async function parseStreamByCSVParser(s3stream: any) {
  const parsedData = await new Promise((resolve, reject) => {
    const results: any[] = [];
    s3stream
      .pipe(csv())
      .on("data", (data: any) => {
        results.push(data);
      })
      .on("error", (error: any) => {
        reject(error);
        console.log("parse error", error);
      })
      .on("end", () => {
        resolve(results);
      });
  });

  return parsedData;
}
