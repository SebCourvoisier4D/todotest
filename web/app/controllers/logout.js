todoApp
    .controller('logoutCtrl', function($scope, $state, Tasks) {
        $scope.serverAviable = true;        
        // logout button clicked
        $scope.logout = function() {
            Tasks.logout().then(function() {
                $state.go('login');
            }).catch(function(e){
                $scope.serverAviable = false;
                console.warn(e.XHR.responseText);
                alert('Unable to connect to the server - ' + e.XHR.status + ': ' + e.XHR.statusText);
            });
        };
        setTimeout(function(){
            // simulate prod latency
            $scope.logout();
        },500);
    })