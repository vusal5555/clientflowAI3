import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import db from "@/db";
import { files } from "@/drizzle/schema";

const s3Client = new S3Client({
  region: process.env.NEXT_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY!,
  },
});

const bucketName = process.env.NEXT_AWS_S3_BUCKET_NAME;

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  // Check if S3 is properly configured
  if (
    !bucketName ||
    !process.env.NEXT_AWS_S3_REGION ||
    !process.env.NEXT_AWS_S3_ACCESS_KEY_ID ||
    !process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY
  ) {
    return NextResponse.json(
      {
        message:
          "S3 configuration is missing. Please check your environment variables.",
      },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const projectId = formData.get("projectId") as string;
  const file = formData.get("file") as File;

  if (!file || !projectId) {
    return NextResponse.json(
      { message: "File and projectId are required" },
      { status: 400 }
    );
  }

  const fileData = await file.arrayBuffer();

  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: file.name,
      Body: Buffer.from(fileData),
      ContentType: file.type,
    });

    const response = await s3Client.send(command);

    const url = `https://${bucketName}.s3.${process.env.NEXT_AWS_S3_REGION}.amazonaws.com/${file.name}`;

    if (response.$metadata.httpStatusCode === 200) {
      await db.insert(files).values({
        fileName: file.name,
        url: url,
        projectId: Number(projectId),
        uploadedBy: session?.user.id ? Number(session.user.id) : 0,
      });

      return NextResponse.json({
        message: "File uploaded successfully",
        response,
      });
    } else {
      return NextResponse.json(
        { message: "Failed to upload file" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("S3 upload error:", error);
    return NextResponse.json(
      {
        message: "Failed to upload file to S3",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Hello, world!" });
}
