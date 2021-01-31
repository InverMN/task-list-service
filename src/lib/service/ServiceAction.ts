import { Protector, Result, Err, Ok } from "./index"

export class ServiceTask<I,O> {
    private action: (args: I) => O
    private protectors: Protector<Extract<I, any>>[] = []

    public getAction(): (args: I) => O {
        return this.action
    }

    public runAction(args: I): O {
        return this.action(args)
    }

    public addProtector(protector: Protector<Extract<I, any>>): this {
        this.protectors.push(protector)
        return this
    }

    public createProtector(validation: (input: Extract<I, any>) => boolean): this {
        this.protectors.push(new Protector(validation))
        return this
    }

    public getProtectors(): Protector<Extract<I, any>>[] {
        return this.protectors
    }

    constructor(action: (args: I) => O) {
        this.action = action
    }

    public perform(input: I): Result<O | undefined> {
        try {
            if(this.validateWithAllProtectors(input)) return Ok(this.runAction(input))
            else throw new Error()  
        } catch (error) {
            return Err(error)
        } 
    }

    private validateWithAllProtectors(input: I): boolean {
        return this.protectors.every(singleProtector => singleProtector.runValidation(input))
    }
}