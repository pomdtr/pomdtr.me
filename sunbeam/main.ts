import { serveDir, serveFile } from "jsr:@std/http@1.0.11"

export default {
    fetch: async (req: Request) => {
        const resp = await serveDir(req, {
            fsRoot: "static",
        })

        if (resp.status === 404) {
            return serveFile(req, "static/404.html")
        }

        return resp
    },
}
