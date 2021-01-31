import { ServiceTask, Protector } from "./index"

describe('Service Task', () => {
    it('has constructor', () => {
        expect(ServiceTask).toBeDefined()
    })

    it('is higher order function but class', () => {
        const action = () => null
        const task = new ServiceTask(action)
        expect(task.getAction()).toBe(action)
    })

    it('has method to invoke action', () => {
        let counter = 0
        const action = () => counter += 1
        const task = new ServiceTask(action)
        task.runAction(undefined)
        expect(counter).toEqual(1)
    })

    it('has action with generic type arguments', () => {
        interface ActionArgumentObject {
            username: string
            password: string
        }
        const action = (_args: ActionArgumentObject) => null
        const task = new ServiceTask(action)
        expect(task.runAction({ username: "inver", password: 'qwerty' })).toBeNull()
    })

    it('has action with generic return type', () => {
        const action = () => 'hello there'
        const task = new ServiceTask(action)
        expect(task.runAction(undefined)).toEqual('hello there')
    })

    it('has protector', () => {
        const action = ({ input }: { input: number }) => input * 2
        const validation = ({ input }: { input: number }) => input > 0
        const MoreThanZero = new Protector(validation)
        const task = new ServiceTask(action)
            .addProtector(MoreThanZero)
        expect(task.getProtectors()).toContain(MoreThanZero)
    })

    it('performs whole task so invokes protector and returns result', () => {
        const action = ({ input }: { input: number }) => input * 2
        const task = new ServiceTask(action)
        expect(task.perform({ input: 10 }).unwrap()).toEqual(20)
    })

    it('service can be protected with multiple protectors', () => {
        const action = ({ name, surname }: { name: string, surname: string }) => `${name} ${surname}`
        const task = new ServiceTask(action)
            .addProtector(new Protector(({ name }) => name.length > 3))
            .createProtector(({ surname }) => surname.length > 5)
        expect(task.perform({ name: 'Paul', surname: 'Johnovsky' }).isOk()).toEqual(true)
        expect(task.perform({ name: 'V', surname: 'Unknown' }).isErr()).toEqual(true)
    })
})