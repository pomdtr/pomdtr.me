import { Command } from "./pkg/mod.ts"

const cmd = new Command("app")

cmd.add("ls", {
    description: "List Apps",
    flags: {
        json: { type: Boolean, alias: "j" }
    }
}, (c) => {
    const apps = [
        { name: "app1" },
        { name: "app2" },
    ]

    if (c.cmd.flag("json")) {
        return c.json(apps)
    }

    return c.table(apps)
})

cmd.add("create <name>", {
    description: "Create App",
    flags: {
    }
}, (c) => {
    const name = c.cmd.arg("name")

    return c.text(`Creating app ${name}`)
})

export default cmd
