import { ImageResponse } from "@vercel/og";
import React from "react";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

const ogData = {
  name: "John Doe",
  role: "Software Engineer",
  baseURL: "example.com",
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const title = "Your Portfolio Title";

const generateOgImage = async () => {
  const fontPath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "fonts",
    "Inter.ttf",
  );
  const imagePath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "images",
    "avatar.jpg",
  );

  // Convert the image to base64
  const imageData = readFileSync(imagePath);
  const base64Image = `data:image/jpeg;base64,${imageData.toString("base64")}`;

  const fontData = await readFile(fontPath);

  const image = new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "8rem",
          background: "#151515",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "4rem",
            fontFamily: "Inter",
            fontStyle: "normal",
            color: "white",
          }}
        >
          <span
            style={{
              fontSize: "8rem",
              lineHeight: "8rem",
              letterSpacing: "-0.05em",
              whiteSpace: "pre-wrap",
              textWrap: "balance",
            }}
          >
            {title}
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5rem",
            }}
          >
            <img
              src={base64Image} // Using base64 encoded image
              style={{
                width: "12rem",
                height: "12rem",
                objectFit: "cover",
                borderRadius: "100%",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  fontSize: "4.5rem",
                  lineHeight: "4.5rem",
                  whiteSpace: "pre-wrap",
                  textWrap: "balance",
                }}
              >
                {ogData.name}
              </span>
              <span
                style={{
                  fontSize: "2.5rem",
                  lineHeight: "2.5rem",
                  whiteSpace: "pre-wrap",
                  textWrap: "balance",
                  opacity: "0.6",
                }}
              >
                {ogData.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
        },
      ],
    },
  );

  const buffer = Buffer.from(await image.arrayBuffer());
  const filePath = path.join(process.cwd(), "public", "og-image.png");
  await writeFile(filePath, buffer);

  console.log("✅ OG image saved at:", filePath);
};

generateOgImage().catch(console.error);
