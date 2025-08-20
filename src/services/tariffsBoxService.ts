import env from "#config/env/env.js";
import knex from "#postgres/knex.js";
import { TariffBox } from "#types/tariffBox.js";
import { parseNumber } from "#utils/parseNUmber.js";
import fetch from "node-fetch";

export async function fetchTariffs(date?: string): Promise<TariffBox[]> {
    const queryDate = date || new Date().toISOString().slice(0, 10);
    const url = `${env.WB_BOX_TARIFFS_URL}?date=${queryDate}`;

    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${env.WB_API_TOKEN}` },
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Failed to fetch WB tariffs: ${res.status} ${res.statusText} - ${body}`);
    }

    const data = await res.json();
    const warehouseList = data?.response?.data?.warehouseList || [];

    return warehouseList.map((item: any) => ({
        boxDeliveryAndStorageExpr: parseNumber(item.boxDeliveryAndStorageExpr),
        boxDeliveryBase: parseNumber(item.boxDeliveryBase),
        boxDeliveryCoefExpr: parseNumber(item.boxDeliveryCoefExpr),
        boxDeliveryLiter: parseNumber(item.boxDeliveryLiter),
        boxDeliveryMarketplaceBase: item.boxDeliveryMarketplaceBase,
        boxDeliveryMarketplaceCoefExpr: item.boxDeliveryMarketplaceCoefExpr,
        boxDeliveryMarketplaceLiter: item.boxDeliveryMarketplaceLiter,
        boxStorageBase: parseNumber(item.boxStorageBase),
        boxStorageCoefExpr: parseNumber(item.boxStorageCoefExpr),
        boxStorageLiter: parseNumber(item.boxStorageLiter),
        geoName: item.geoName,
        warehouseName: item.warehouseName,
    }));
}

export async function saveTariffs(tariffs: TariffBox[], date?: string): Promise<number> {
    const today = date || new Date().toISOString().slice(0, 10);

    for (const t of tariffs) {
        await knex("tariffs_box")
            .insert({
                date: today,
                box_delivery_and_storage_expr: t.boxDeliveryAndStorageExpr,
                box_delivery_base: t.boxDeliveryBase,
                box_delivery_coef_expr: t.boxDeliveryCoefExpr,
                box_delivery_liter: t.boxDeliveryLiter,
                box_delivery_marketplace_base: t.boxDeliveryMarketplaceBase,
                box_delivery_marketplace_coef_expr: t.boxDeliveryMarketplaceCoefExpr,
                box_delivery_marketplace_liter: t.boxDeliveryMarketplaceLiter,
                box_storage_base: t.boxStorageBase,
                box_storage_coef_expr: t.boxStorageCoefExpr,
                box_storage_liter: t.boxStorageLiter,
                geo_name: t.geoName,
                warehouse_name: t.warehouseName,
            })
            .onConflict(["date", "warehouse_name"]) // merge per warehouse per day
            .merge();
    }

    return tariffs.length;
}
