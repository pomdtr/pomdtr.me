import { Hono } from "jsr:@hono/hono@4.4.7";
import { serveStatic } from "jsr:@hono/hono@4.4.7/deno";
import { CSS, render } from "jsr:@deno/gfm@0.8.2";

import "npm:prismjs@1.29.0/components/prism-bash.js";
import "npm:prismjs@1.29.0/components/prism-javascript.js";

const app = new Hono();

const html = (body: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      main {
        max-width: 800px;
        margin: 0 auto;
      }
      ${CSS}
    </style>
  </head>
  <body data-color-mode="auto" data-light-theme="light" data-dark-theme="dark" class="markdown-body">
    <main>
      ${body}
    </main>
  </body>
</html>
`;

app.get("/v/:author/:name", (c) => {
  const { author, name } = c.req.param();
  let moduleUrl = `https://esm.town/v/${author}/${name}`;
  const version = c.req.query("v");
  if (version) {
    moduleUrl += `?v=${version}`;
  }

  return c.text(
    `import handle from "${moduleUrl}"

export default { fetch: handle }`,
    {
      headers: {
        "Content-Type": "text/tsx",
      },
    },
  );
});

app.use(
  "/_src/*",
  serveStatic({
    root: "./",
    rewriteRequestPath: (path) => path.replace(/^\/_src/, ""),
    mimes: {
      ts: "text/typescript",
    },
  }),
);

app.get("/", async (c) => {
  const readme = await Deno.readTextFile("./README.md");
  return c.html(
    html(render(readme)),
    {
      headers: {
        "Content-Type": "text/html",
      },
    },
  );
});

export default app;
