todoApp
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise(function($injector, $location){
          var $state = $injector.get("$state");
          $state.go('home');
        });
        $stateProvider.state('connect', {
            url: '/connect',
            views: {
              'main': {
                templateUrl: 'views/connect.html',
                controller: 'connectCtrl'
              }
            },
            data: {
                requireLogin: false
            }
        }).state('login', {
            url: '/login',
            views: {
              'main': {
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
              }
            },
            data: {
                requireLogin: false
            }
        }).state('logout', {
            url: '/logout',
            views: {
              'main': {
                templateUrl: 'views/connect.html',
                controller: 'logoutCtrl'
              }
            },
            data: {
                requireLogin: true
            }
        }).state('home', {
            url: '/',
            views: {
              'main': {
                templateUrl: 'views/home.html',
                controller: 'homeCtrl'
              },
              'nav': {
                templateUrl: 'partials/menu.html',
                controller: 'menuCtrl'
              }
            },
            data: {
                requireLogin: true
            }
        });
    })