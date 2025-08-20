// Tariff fields from WB box API
export interface TariffBox {
    boxDeliveryAndStorageExpr: number;
    boxDeliveryBase: number;
    boxDeliveryCoefExpr: number;
    boxDeliveryLiter: number;
    boxDeliveryMarketplaceBase?: string;
    boxDeliveryMarketplaceCoefExpr?: string;
    boxDeliveryMarketplaceLiter?: string;
    boxStorageBase: number;
    boxStorageCoefExpr: number;
    boxStorageLiter: number;
    geoName: string;
    warehouseName: string;
}
