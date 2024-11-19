/** @jsxImportSource npm:preact */

import { serveFile } from "jsr:@std/http/file-server";

type Event = {
    date: string;
    title: string;
};

export default {
    fetch(req: Request) {
        const { pathname } = new URL(req.url);

        if (pathname === "/new") {
            return serveFile(req, "form.html");
        }

        return serveFile(req, "index.html");
    },
};
