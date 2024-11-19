/// <reference types="./smallweb.d.ts" />

import { Hono } from "npm:hono";
import { DB } from "jsr:@pomdtr/sqlite";

export type ValTownOptions = {
    blobRootDir: string;
    dbPath: string;
};

function createValTownAPI(options: ValTownOptions): Smallweb.App {
    const db = new DB(options.dbPath);
    const app = new Hono();

    app.post("/v1/execute", async (c) => {
        const { sql, args } = await c.req.json();
        const query = db.prepareQuery(sql);
        const rows = query.all(args);
        return Response.json({
            columns: query.columns(),
            rows,
            rowAffected: db.changes,
            lastInsertRowId: db.lastInsertRowId,
        });
    });

    app.post("/v1/sqlite/batch", async (c) => {});

    app.get("/v1/blob");

    app.get("/v1/blob/:key", async (c) => {});

    app.post("/v1/blob/:key", async (c) => {});

    return {
        fetch: app.fetch,
    };
}

export default createValTownAPI({
    blobRootDir: "blobs",
    dbPath: "val-town.db",
});
