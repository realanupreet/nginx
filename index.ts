const appName = process.env.APP_NAME || "unknown-app";

const getDate = () => new Date().toLocaleString().split(",")[1];

const server = Bun.serve({
    routes: {
        "/": async (req) => {
            await new Promise(r => setTimeout(r, 5000));
            console.log(`[${appName}][${getDate()}] Handling request to /`);
            return new Response(Bun.file("./public/index.html"), {
                headers: { "X-App-Name": appName },
            });
        },
        "/api/health": (req) => {
            console.log(`[${appName}][${getDate()}] Handling request to /api/health`);
            return new Response("OK", {
                headers: { "X-App-Name": appName },
            });
        },
        "/favicon.png": Bun.file("./public/favicon.png"),
    },
    fetch(req) {
        console.log(`[${appName}] 404 - ${getDate()} - ${new URL(req.url).pathname}`);
        return new Response("Not Found", { status: 404 });
    },
});

console.log(`Server [${appName}] [${getDate()}] running at ${server.url}`);