todoApp
    .controller('loginCtrl', function($scope, $state, Tasks) {
        $scope.user = {
          username: 'test@test.com',
          password: 'test'
        };
        $scope.login = function(user) {
          Tasks.login(user.username, user.password).then(function(loginResult) {
              $state.go('home');
          }).catch(function(err){
              $('.alert-invalidLogin').show();
          });
        };
    })