import { S3CreateEvent } from "aws-lambda";
import csv from "csv-parser";
import { S3 } from "aws-sdk";
const s3Client = new S3({ region: "us-east-1" });

const BUCKET = process.env.BUCKET || "";

export const importFileParser = async (event: S3CreateEvent) => {
  event.Records.forEach((record) => {
    const s3Stream = s3Client
      .getObject({
        Bucket: BUCKET,
        Key: record.s3.object.key,
      })
      .createReadStream();

    s3Stream
      .pipe(csv())
      .on("data", (data) => {
        console.log(data);
      })
      .on("end", async () => {
        console.log(`Copy from ${BUCKET}/${record.s3.object.key}`);

        await s3Client
          .copyObject({
            Bucket: BUCKET,
            CopySource: `${BUCKET}/${record.s3.object.key}`,
            Key: record.s3.object.key.replace("uploaded", "parsed"),
          })
          .promise();

        console.log(`Processed into ${BUCKET}/${record.s3.object.key.replace("uploaded","parsed")}`
        );
      });
  });
};
