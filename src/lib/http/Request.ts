import { Context } from "koa"
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

    public getJsonBody(): any {
        return JSON.parse(this.body)
    }

    public setHeader(key: string, content: string): Request {
        this.headers.set(key, content)
        return this
    }

    public setManyHeaders(headers: Map<string, string>): this {
        this.headers = headers
        return this
    }

    public getHeader(key: string): string | undefined {
        return this.headers.get(key)
    }

    public getHeadersAll(): Map<string, string> {
        return this.headers
    }

    public static fromKoaContext(context: Context): Request {
        return new Request()
            .setMethod(context.request.method as HttpMethod)
            .setPath(context.request.url)
            .setBody(JSON.stringify(context.request.body))
            .setManyHeaders(Request.headersFromKoaHeaders(context.request.header))
    }

    private static camelToKebabCase(name: string) {
        return name.split('').map((letter: string, index: number) => {
            if(index === 0) return letter.toUpperCase()
            else {
                if(letter === letter.toUpperCase()) return `-${letter}`
                else return letter
            }
        }).join('')
    }

    private static headersFromKoaHeaders(headers: any): Map<string, string> {
        const map = new Map<string,string>()
        for(const prop in headers)
            map.set(Request.camelToKebabCase(prop), headers[prop])
        return map
    }
}