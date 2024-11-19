import { join } from "jsr:@std/path";
import { Excalidraw } from "jsr:@smallweb/excalidraw@0.3.9";

const excalidraw = new Excalidraw({
    async read(key) {
        try {
            return await Deno.readFile(join("blobs", key));
        } catch (_e) {
            return null;
        }
    },
    async write(key, value) {
        return await Deno.writeFile(join("blobs", key), value);
    },
});

export default excalidraw;
