import { ApplicationServer, Controller, Endpoint, Request, Response } from './lib/http/index'
import { ServiceTask, Protector, Result } from './lib/service/index'

const app = new ApplicationServer()
const controller = new Controller()
app.setRootController(controller)

const action = ({ name, surname }: { name: string, surname: string }) => {
  console.log('Running task')
  return `${name} ${surname}`
}
const task = new ServiceTask(action)
  .addProtector(new Protector(({ name }) => name.length > 3))
  .createProtector(({ surname }) => surname.length > 5)
  .createProtector(() => {
    console.log('Running protector!')
    return true
  })

const mapRequest = (request: Request) => {
  const { name, surname } = request.getJsonBody()
  console.log('Mapping request')
  if(!name || !surname) throw new Error()
  return { name, surname }
}
const mapResponse = (result: Result<string | undefined>) => {
  console.log('Mapping response')
  const response = new Response()
  if(result.isOk()) {
    console.log(`result: ${JSON.stringify(result)}`)
    response.setBody(result.unwrap() as string)
    response.setStatusCode(200)
    response.setStatusMessage('OK')
  } else
    response.setStatusCode(401)
    
  return response
}

const endpoint = new Endpoint().useService(task, mapRequest, mapResponse).setMethod('POST').setPath('/name')
controller.link(endpoint)

const hello = new Endpoint().setCallback((ctx) => ctx.response.body = "Hello There!")
controller.link(hello)

app.start(8080)