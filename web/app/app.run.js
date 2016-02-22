todoApp
    .run(function($rootScope, $state, Tasks) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
            if (toState.name != 'connect') {
                if (!Tasks.isReady) {
                    event.preventDefault();
                    $state.go('connect');
                } else if (toState.data.requireLogin && !Tasks.isLoggedIn) {
                    event.preventDefault();
                    $state.go('login');
                }
            }
        });
    });