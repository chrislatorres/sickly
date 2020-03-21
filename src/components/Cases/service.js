import feathers from '@feathersjs/client'


const service = async (dsl) => {
  var app = feathers();
  var restClient = feathers.rest('https://api.zabo.site')
  app.configure(restClient.fetch(window.fetch))

  const service = app.service('service')
  return service.create(dsl, {})
}

export default service
