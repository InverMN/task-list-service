import { Protector } from './index'

describe('Protector', () => {
    it('has constructor', () => {
        expect(Protector).toBeDefined()
    })

    it('has validation method', () => {
        const validation = (input: number) => input === 2
        const protector = new Protector(validation)
        expect(protector.getValidation()).toBe(validation)
    })

    it('has method to invoke validation', () => {
        const validation = (input: number) => input === 2
        const protector = new Protector(validation)
        expect(protector.runValidation(2)).toEqual(true)
    })
})