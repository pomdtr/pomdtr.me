export default {
    fetch: (req: Request) => {
        const domain = Deno.env.get("SMALLWEB_DOMAIN")
        const url = new URL(req.url)
        if (url.pathname !== "/") {
            return Response.redirect(`https://github.com/pomdtr/${domain}tree/main${url.pathname}`)
        }

        return Response.redirect(`https://github.com/pomdtr/${domain}`)
    },
}
