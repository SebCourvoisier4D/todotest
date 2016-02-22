todoApp
    .controller('connectCtrl', function($scope, $state, Tasks) {
        // checking if server is online before doing anything
        $scope.serverAviable = true;        
        $scope.connect = function() {
            Tasks.init().then(function() {
                if (Tasks.isReady) {
                    $state.go('home');
                }
            }).catch(function(e) {
                $scope.serverAviable = false;
                console.warn(e.XHR.responseText);
                alert('Unable to connect to the server - ' + e.XHR.status + ': ' + e.XHR.statusText);
            });
        }
        setTimeout(function(){
            // simulate prod latency
            $scope.connect();
        },500);
    })