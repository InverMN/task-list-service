export class Protector<I> {
    private validation: (input: I) => boolean

    public getValidation(): (input: I) => boolean {
        return this.validation
    }

    public runValidation(input: I): boolean {
        return this.validation(input)
    }

    constructor(validation: (input: I) => boolean) {
        this.validation = validation
    }
}