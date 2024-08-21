import { google } from "googleapis";

export function initSheets() {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      client_id: process.env.GOOGLE_CLIENT_ID,
    },
  });

  const sheets = google.sheets({ version: "v4", auth });

  return sheets;
}
