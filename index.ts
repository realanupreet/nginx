import home from './public/index.html'

const server = Bun.serve({
    routes: {
        "/": home,
        "/api/health": new Response("OK"),
        "/favicon.ico": Bun.file("./favicon.ico"),
    },
    fetch(req) {
        return new Response("Not Found", { status: 404 });
    },
});

console.log(`Server running at ${server.url}`);