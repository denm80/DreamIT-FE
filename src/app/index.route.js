export function routerConfig ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main',
      resolve: {
        jackpot: function($http) {
          return $http.get('/api/drawings/euroJackpot');
        }
      }
    })
    .otherwise({
      redirectTo: '/'
    });
}
