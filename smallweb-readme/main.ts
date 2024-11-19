export default {
    fetch: (req: Request) => {
        const url = new URL(req.url);
        url.hostname = "www.smallweb.run";
        return Response.redirect(url, 301);
    },
};
