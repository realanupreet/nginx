const appName = process.env.APP_NAME || "unknown-app";

const getDate = () => new Date().toLocaleString().split(",")[1];

const server = Bun.serve({
    routes: {
        "/": (req) => {
            console.log(`[${appName}][${getDate()}] Handling request to /`);
            return new Response(Bun.file("./public/index.html"));
        },
        "/api/health": (req) => {
            console.log(`[${appName}][${getDate()}] Handling request to /api/health`);
            return new Response("OK");
        },
        "/favicon.png": Bun.file("./public/favicon.png"),
    },
    fetch(req) {
        console.log(`[${appName}] 404 - ${getDate()} - ${new URL(req.url).pathname}`);
        return new Response("Not Found", { status: 404 });
    },
});

console.log(`Server [${appName}] [${getDate()}] running at ${server.url}`);