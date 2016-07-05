export function routerConfig ($routeProvider) {
  $routeProvider
    .when('/euro-jackpot', {
      templateUrl: 'app/euro-jackpot/euro-jackpot.html',
      controller: 'EuroJackpotController',
      resolve: {
        jackpot: function($http) {
          return $http.get('/api/drawings/euroJackpot');
        }
      }
    })
    .otherwise({
      redirectTo: '/euro-jackpot'
    });
}
