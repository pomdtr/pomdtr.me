import { type Flags as BaseFlags } from "npm:type-flag"

export type Flags = BaseFlags<{

    /**
    Description to be used in help output

    @example
    ```
    description: 'Unit of output (metric, imperial)',
    ```
    */
    description?: string;

    /**
    Placeholder label to be used in help output

    @example Required value
    ```
    placeholder: '<locale>'
    ```
    */
    placeholder?: string;
}>;

type CommandOptions = {
    description?: string;
    flags?: Flags;
}

class Cmd {
    flag(): Record<string, string | boolean>
    flag(key: string): string | boolean
    flag(key?: string) {
        return key ? true : {}
    }

    arg(): Record<string, string | boolean>
    arg(key: string): string | boolean
    arg(key?: string) {
        return key ? true : {}
    }
}


type Context = {
    cmd: Cmd
    text(message: string, options?: {}): void
    json(payload: unknown, options?: {
        output?: "stdout" | "stderr"
        code?: number
    }): void
    table(data: unknown[]): void
}

type Handler = (c: Context) => void | Promise<void>;


export class Command {
    private subcommands: Command[] = []
    private usage: string
    private options: CommandOptions
    private handler: Handler | undefined

    constructor(usage: string)
    constructor(usage: string, handler: Handler)
    constructor(usage: string, options: CommandOptions)
    constructor(usage: string, options: CommandOptions, handler: Handler)
    constructor(usage: string, arg1?: CommandOptions | Handler, arg2?: Handler) {
        this.usage = usage;
        if (!arg1) {
            this.options = {}
            this.handler = undefined;
            return
        }
        if (typeof arg1 === "function") {
            this.options = {}
            this.handler = arg1;
            return;
        }

        this.options = arg1;
        this.handler = arg2;

    }

    add(command: Command): void | Promise<void>
    add(usage: string): void | Promise<void>
    add(usage: string, handler: Handler): void | Promise<void>
    add(usage: string, options: CommandOptions): void | Promise<void>
    add(usage: string, options: CommandOptions, handler: Handler): void | Promise<void>
    add(arg1: Command | string, arg2?: Handler | CommandOptions, arg3?: Handler) {
        if (arg1 instanceof Command) {
            this.subcommands.push(arg1);
            return;
        }

        if (typeof arg2 === "undefined") {
            this.subcommands.push(new Command(arg1));
            return
        }

        if (typeof arg2 === "function") {
            this.subcommands.push(new Command(arg1, arg2));
            return;
        }

        if (typeof arg3 === "function") {
            this.subcommands.push(new Command(arg1, arg2, arg3));
            return;
        }

        this.subcommands.push(new Command(arg1, arg2));
        return
    }

    help() {
        console.log("Usage: ", this.usage)
        console.log("Options: ", this.options)
        console.log("Subcommands: ", this.subcommands)
    }

    run: (args: string[]) => void | Promise<void> = async (args) => {
        if (!this.handler) {
            this.help()
            return
        }

        const ctx = {} as Context
        await this.handler(ctx)
    }
}
