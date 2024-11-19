# Serve

This websites allows you to serve vals using deno serve:

```sh
deno serve https://val-town-serve.pomdtr.me/v/<author>/<val>
```

## Why use this?

`deno serve` expects http servers to be defined this way:

```ts
export default {
    fetch: (req: Request) => {
        // ...
    },
}
```

While [Val Town](https://val.town) http servers are defined this way:

```ts
export default function fetch(req: Request) {
    // ...
}
```

This website converts the Val Town http server to a deno serve http server.

## Serving private vals

You can use the `DENO_AUTH_TOKENS` env var, and pass your api token:

```sh
DENO_AUTH_TOKENS="<token>@esm.town" deno serve https://val-town-serve.pomdtr.me/v/<author>/<val>
```

The token will not be sent when fetching modules from esm.town.

## Source

[View Source](https://val-town-serve.pomdtr.me/_src/main.ts)
