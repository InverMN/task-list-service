import { HttpMethod } from "./types"

export class Request {
    private method: HttpMethod = 'GET'
    private path = '/'
    private body = ''
    private headers: Map<string,string> = new Map()

    public setMethod(method: HttpMethod): Request {
        this.method = method
        return this
    }

    public getMethod(): HttpMethod {
        return this.method
    }

    public setPath(path: string): Request {
        this.path = path
        return this
    }

    public getPath(): string {
        return this.path
    }

    public setBody(body: string): Request {
        this.body = body
        return this
    }

    public getBody(): string {
        return this.body
    }

    public setHeader(key: string, content: string): Request {
        this.headers.set(key, content)
        return this
    }

    public getHeader(key: string): string | undefined {
        return this.headers.get(key)
    }

    public getHeadersAll(): Map<string, string> {
        return this.headers
    }
}