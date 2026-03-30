import axios from "axios";
import fs from "fs";

export async function sendRequest({ url, method, header, data }) {
  const headers = {};

  if (header) {
    header.forEach((h) => {
      const [key, value] = h.split(":");
      headers[key.trim()] = value.trim();
    });
  }

  let parsedData;

  try {
    if (data) {
      // ファイル指定対応（@data.json）
      if (data.startsWith("@")) {
        const filePath = data.slice(1);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        parsedData = JSON.parse(fileContent);
      } else {
        parsedData = JSON.parse(data);
      }
    }
  } catch (e) {
    console.error("\nInvalid JSON format in --data");
    console.error("受け取った値:", data);
    process.exit(1);
  }

  const config = {
    url,
    method,
    headers,
    data: parsedData,
    validateStatus: () => true,
  };

  const start = Date.now();
  const response = await axios(config);
  const duration = Date.now() - start;

  return { ...response, duration };
}
