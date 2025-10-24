import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phoneNumber, ticket } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phoneNumber || !ticket) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Set up Google Sheets API credentials
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

    if (!serviceAccountKey) {
      throw new Error("Google Service Account Key not configured");
    }

    const credentials = JSON.parse(serviceAccountKey);

    const auth = new google.auth.GoogleAuth({
      credentials: credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    if (!spreadsheetId) {
      throw new Error("Google Spreadsheet ID not configured");
    }

    // Check if the sheet has headers
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "Sheet1!A1:E1",
    });

    const headers = ["First Name", "Last Name", "Email", "Phone Number", "Ticket"];

    // If no headers exist, add them
    if (!response.data.values || response.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: "Sheet1!A1:E1",
        valueInputOption: "RAW",
        requestBody: {
          values: [headers],
        },
      });
    }

    // Append the new row
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:E",
      valueInputOption: "RAW",
      requestBody: {
        values: [[firstName, lastName, email, phoneNumber, ticket]],
      },
    });

    return NextResponse.json(
      { message: "Successfully added to waiting list" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return NextResponse.json(
      { error: "Failed to submit to waiting list" },
      { status: 500 }
    );
  }
}
