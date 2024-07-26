const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

async function appendValues(data) {
    const spreadsheetId = `${process.env.GOOGLE_SPREADSHEET_ID}`;
    const range = 'Sheet1!A:C';
    const valueInputOption = 'RAW';

    // // Path to your service account key file
    // const keyFilePath = path.join(__dirname, 'google-sheet-credentials.json');

    // // Load service account credentials from JSON file
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);

    // Initialize GoogleAuth with the loaded credentials
    const auth = new GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Authenticate and create the Sheets API client
    const authClient = await auth.getClient();
    const service = google.sheets({ version: 'v4', auth: authClient });

    const resource = {
        values: data,
    };

    try {
        const result = await service.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption,
            resource,
        });
        console.log(`${result.data.updates.updatedCells} cells appended.`);
        return result;
    } catch (err) {
        console.error('Error appending data to sheet:', err);
        throw err;
    }
}

module.exports = appendValues;
