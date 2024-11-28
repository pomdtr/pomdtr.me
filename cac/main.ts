// examples/basic-usage.js

import { defineCommand, runMain } from "npm:citty@0.1.6"

const main = defineCommand({
    meta: {
        name: "hello",
        version: "1.0.0",
        description: "My Awesome CLI App",
    },
    subCommands: {},
    args: {
        name: {
            type: "positional",
            description: "Your name",
            required: true,
        },
        friendly: {
            type: "boolean",
            alias: ["f"],
            description: "Use friendly greeting",
        },
    },
    run({ args }) {
        console.log(`${args.friendly ? "Hi" : "Greetings"} ${args.name}!`);
    },
});

export default {
    run(args: string[]) {
        runMain(main, { rawArgs: args })
    }
}
