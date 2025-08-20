/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    return await knex.schema.createTable("tariffs_box", (table) => {
        table.increments("id").primary();
        table.date("date").notNullable();
        table.string("geo_name").notNullable();
        table.string("warehouse_name").notNullable();

        table.float("box_delivery_and_storage_expr").defaultTo(0);
        table.float("box_delivery_base").defaultTo(0);
        table.float("box_delivery_coef_expr").defaultTo(0);
        table.float("box_delivery_liter").defaultTo(0);

        table.string("box_delivery_marketplace_base").nullable();
        table.string("box_delivery_marketplace_coef_expr").nullable();
        table.string("box_delivery_marketplace_liter").nullable();

        table.float("box_storage_base").defaultTo(0);
        table.float("box_storage_coef_expr").defaultTo(0);
        table.float("box_storage_liter").defaultTo(0);

        table.unique(["date", "warehouse_name"]);
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return await knex.schema.dropTableIfExists("tariffs_box");
}
