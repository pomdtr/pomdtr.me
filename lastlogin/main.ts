import { lastlogin } from "jsr:@pomdtr/lastlogin@0.5.12";

export default {
    fetch: lastlogin((req: Request) => {
        const email = req.headers.get("X-Lastlogin-Email");
        return new Response(`Hello, ${email}!`);
    })
};
