
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const Bucket = process.env.AWS_BUCKET_NAME;
export const getAwsUrl = async (key: string) => {
  console.log("key in aws", key);
  if (!key) {
    throw new Error("Missing key");
  }
  try {
    const command = new GetObjectCommand({ Bucket, Key: key });
    const src = await getSignedUrl(s3Client, command);
    return { src };
  } catch (err: any) {
    throw new Error(err.message);
  }
}