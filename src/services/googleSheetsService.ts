import { google } from "googleapis";
import knex from "#postgres/knex.js";
import env from "#config/env/env.js";
import dateFormatter from "#utils/dateFormatter.js";
export async function writeTariffsToSheets(tariffs?: any[]) {
    // 1. Get data from DB
    if (!tariffs || tariffs.length === 0) tariffs = await knex("tariffs_box").select("*").orderBy("box_delivery_coef_expr", "asc"); // sort by coefficient

    if (!tariffs.length) return console.log("No tariffs to write.");

    // 2. Auth with Google Sheets
    const auth = new google.auth.GoogleAuth({
        keyFile: env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const sheetIds = env.GOOGLE_SHEET_IDS.split(",");

    // 3. Prepare rows for writing
    const rows = tariffs.map((t) => [
        t.warehouse_name,
        t.geo_name,
        t.box_id,
        t.box_delivery_coef_expr,
        t.box_delivery_and_storage_expr,
        t.box_storage_coef_expr,
        t.box_delivery_liter,
        t.box_storage_liter,
        dateFormatter.format(new Date()),
    ]);

    // 4. Write to each sheet
    for (const id of sheetIds) {
        await sheets.spreadsheets.values.update({
            spreadsheetId: id,
            range: `${env.GOOGLE_SHEET_TAB}!A1`,
            valueInputOption: "RAW",
            requestBody: {
                values: [
                    ["Warehouse", "Geo", "Box ID", "Delivery Coef", "Delivery+Storage Expr", "Storage Coef", "Delivery Liter", "Storage Liter", "Date"],
                    ...rows,
                ],
            },
        });
        console.log(`Written ${rows.length} rows to sheet ${id}`);
    }
}
