todoApp
    .controller('menuCtrl', function($scope, $state, Tasks, searchFilter) { 
        $scope.filterTask = searchFilter.value;        
        Tasks.init().then(function() {
            $scope.user = Tasks.getCurrentUser();
        }).catch(function(e) {
            console.warn(e);
        });
    })