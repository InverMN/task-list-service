import {
  ApplicationServer,
  Controller,
  Endpoint,
} from './lib/http/index'

const application = new ApplicationServer()
const rootController = new Controller()
application.setRootController(rootController)

const homepageEndpoint = new Endpoint().setCallback(
  (context) => (context.body = 'HOMEPAGE!'),
)
rootController.link(homepageEndpoint)

const restApiController = new Controller()
const usersController = new Controller()
const getUsersEndpoint = new Endpoint(
  'GET',
  '/',
  (context) => (context.body = []),
)
usersController.link(getUsersEndpoint)
restApiController.merge('/users', usersController)

rootController.merge('/api/v1', restApiController)
application.start(3000)
