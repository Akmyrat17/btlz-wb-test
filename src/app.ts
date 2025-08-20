import { migrate } from "#postgres/knex.js";
import { writeTariffsToSheets } from "#services/googleSheetsService.js";
import { fetchTariffs, saveTariffs } from "#services/tariffsBoxService.js";
import cron from "node-cron";

// Schedule the hourly data fetch and save
cron.schedule("0 * * * *", async () => {
    try {
        console.log("Running hourly tariff data sync...");
        const tariffs = await fetchTariffs();
        await saveTariffs(tariffs);
        console.log("Hourly sync completed.");
    } catch (error) {
        console.error("Hourly sync failed:", error);
    }
});

// Schedule the daily data update to Google Sheets
cron.schedule("0 0 * * *", async () => {
    try {
        console.log("Running daily Google Sheets update...");
        await writeTariffsToSheets();
        console.log("Daily Sheets update completed.");
    } catch (error) {
        console.error("Daily Sheets update failed:", error);
    }
});

// Main application logic (optional, but good practice)
async function main() {
    console.log("Application started. Cron jobs are scheduled.");
    // You could also run an initial fetch on startup
    try {
        await migrate.latest();
        const tariffs = await fetchTariffs();
        await saveTariffs(tariffs);
        await writeTariffsToSheets(tariffs);
    } catch (error) {
        console.error("Initial data fetch failed:", error);
    }
}

main();
