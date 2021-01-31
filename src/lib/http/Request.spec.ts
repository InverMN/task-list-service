import { Request } from './index'

describe('Request', () => {
    it('has constructor', () => {
        expect(new Request()).toBeDefined()
    })

    it('has http method property', () => {
        const request = new Request()
            .setMethod('POST')
        expect(request.getMethod()).toEqual('POST')
    })

    it('by default http method is GET', () => {
        expect(new Request().getMethod()).toEqual('GET')
    })

    it('has request path', () => {
        const request = new Request()
            .setPath('/ping')
        expect(request.getPath()).toEqual('/ping')
    })

    it('by default path is /', () => {
        expect(new Request().getPath()).toEqual('/')
    })

    it('contains body property', () => {
        const request = new Request()
        request.setBody('Hello World!')
        expect(request.getBody()).toEqual('Hello World!')  
    })

    it('contains headers', () => {
        const request = new Request()
        request.setHeader('Host', 'localhost:8080')
        request.setHeader('Connection', 'keep-alive')

        expect(request.getHeader('Host')).toEqual('localhost:8080')
        expect(Array.from(request.getHeadersAll().keys())).toEqual(['Host', 'Connection'])
        expect(Array.from(request.getHeadersAll().values())).toEqual(['localhost:8080', 'keep-alive'])
    })
})