const koaContext: any = {
    request: {
        method: "GET",
        url: "/",
        header: {
            host: "localhost:8080",
            connection: "keep-alive",
            cacheControl: "max-age=0",
            upgradeInsecureRequests: "1",
            userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36",
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            secGpc: "1",
            secFetchSite: "none",
            secFetchMode: "navigate",
            secFetchUser: "?1",
            secFetchDest: "document",
            acceptEncoding: "gzip, deflate, br",
            acceptLanguage: "en-US,en;q=0.9",
            cookie: "PGADMIN_LANGUAGE=en; pga4_session=39039857-3817-482d-917a-44408862d840!3SYYuvhK1so+MXTHdl+3tLLaKB4=",
        },
        body: {
            username: "Inver",
            password: "qwerty",
        },
    },
    response: {
        status: 404,
        message: "Not Found",
        header: {},
    },
    app: {
        subdomainOffset: 2,
        proxy: false,
        env: "development",
    },
    originalUrl: "/",
    req: "",
    res: "",
    socket: "",
}

export default koaContext