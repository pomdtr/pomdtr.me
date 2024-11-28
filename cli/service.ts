import { Command } from "./pkg/mod.ts"

const cmd = new Command("service")

cmd.add("install", {
    description: "Install Service",
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

cmd.add("uninstall", {
    description: "Uninstall Service",
    flags: {}
}, (c) => {
    return c.text(`Uninstalling service`)
})

export default cmd
