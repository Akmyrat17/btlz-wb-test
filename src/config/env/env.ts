import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.union([z.undefined(), z.enum(["development", "production"])]),
    POSTGRES_HOST: z.union([z.undefined(), z.string()]),
    POSTGRES_PORT: z
        .string()
        .regex(/^[0-9]+$/)
        .transform((value) => parseInt(value)),
    POSTGRES_DB: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    APP_PORT: z.union([
        z.undefined(),
        z
            .string()
            .regex(/^[0-9]+$/)
            .transform((value) => parseInt(value)),
    ]),
    POSTGRES_PORT_EXPOSED: z
        .string()
        .regex(/^[0-9]+$/)
        .transform((value) => parseInt(value)),
    WB_API_TOKEN: z.string(),
    WB_BOX_TARIFFS_URL: z.string(),
    GOOGLE_SERVICE_ACCOUNT_CREDENTIALS: z.string(),
    GOOGLE_SHEET_TAB: z.string(),
    GOOGLE_SHEET_IDS: z.string(),
});

const env = envSchema.parse({
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    NODE_ENV: process.env.NODE_ENV,
    APP_PORT: process.env.APP_PORT,
    POSTGRES_PORT_EXPOSED: process.env.POSTGRES_PORT_EXPOSED,
    WB_API_TOKEN: process.env.WB_API_TOKEN,
    WB_BOX_TARIFFS_URL: process.env.WB_BOX_TARIFFS_URL,
    GOOGLE_SERVICE_ACCOUNT_CREDENTIALS: process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS,
    GOOGLE_SHEET_TAB: process.env.GOOGLE_SHEET_TAB,
    GOOGLE_SHEET_IDS: process.env.GOOGLE_SHEET_IDS,
});

export default env;
