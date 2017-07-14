var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api') 
};

module.exports = function(app) {

  // Keystone Views
  //app.get('/test', routes.views.test);
  
  // Plugin API Route
  app.get('/api/portcontrol/list', keystone.middleware.api, routes.api.portcontrol.list);
  app.all('/api/portcontrol/create', keystone.middleware.api, routes.api.portcontrol.create);
  app.all('/api/portcontrol/:id/update', keystone.middleware.api, routes.api.portcontrol.update);
	app.get('/api/portcontrol/:id/remove', keystone.middleware.api, routes.api.portcontrol.remove);
  
  // NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
  //app.get('/loggedinuser', middleware.requireUser, routes.views.loggedinuser);
}