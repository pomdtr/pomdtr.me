import { Command } from "./pkg/mod.ts";
import appCmd from "./app.ts"
import serviceCmd from "./service.ts"

const cmd = new Command("smallweb");

cmd.add(appCmd);
cmd.add(serviceCmd);

await cmd.run(Deno.args);
