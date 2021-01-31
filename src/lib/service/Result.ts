export class Result<T> {
  constructor(private payload?: T, private error?: Error) {}

  public isOk(): boolean {
    return this.error === undefined && this.payload !== undefined
  }

  public isErr(): boolean {
    return this.payload === undefined || this.error !== undefined
  }

  public unwrap(): T {
    if (this.isOk()) return this.payload as T
    else throw this.error
  }

  public extract(): T | undefined {
    return this.payload
  }

  public report(): void {
    if(this.isErr()) throw this.error
  }
}

export function Ok<T>(payload: T): Result<T> {
  return new Result(payload)
}

export function Err(error: Error): Result<undefined> {
  return new Result(undefined, error)
}
