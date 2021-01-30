import { Response } from './index'

describe('Response', () => {
    it('has constructor', () => {
        expect(Response).toBeDefined()
    })

    it('contains status code property', () => {
        const response = new Response()
        response.setStatusCode(403)
        expect(response.getStatusCode()).toEqual(403)
    })

    it('contains status message property', () => {
        const response = new Response()
        response.setStatusMessage('Bad Request')
        expect(response.getStatusMessage()).toEqual('Bad Request')
    })

    it('contains body property', () => {
        const response = new Response()
        response.setBody('Hello World!')
        expect(response.getBody()).toEqual('Hello World!')  
    })

    it('contains headers', () => {
        const response = new Response()
        response.setHeader('Server', 'Apache/2.2.14')
        response.setHeader('Content-Length', '88')

        expect(response.getHeader('Server')).toEqual('Apache/2.2.14')
        expect(Array.from(response.getHeadersAll().keys())).toEqual(['Server', 'Content-Length'])
        expect(Array.from(response.getHeadersAll().values())).toEqual(['Apache/2.2.14', '88'])
    })
})