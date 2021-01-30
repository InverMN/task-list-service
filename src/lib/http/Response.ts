export class Response {
    private statusCode = 400
    private statusMessage = 'Bad Request'
    private body = '' 
    private headers: Map<string,string> = new Map()

    public setStatusCode(status: number): Response {
        this.statusCode = status
        return this
    }

    public getStatusCode(): number {
        return this.statusCode
    }

    public setStatusMessage(statusMessage: string): Response {
        this.statusMessage = statusMessage
        return this
    }

    public getStatusMessage(): string {
        return this.statusMessage
    }

    public setBody(body: string): this {
        this.body = body
        return this
    }

    public getBody(): string {
        return this.body
    }

    public setHeader(key: string, content: string): Response {
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