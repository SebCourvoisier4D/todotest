todoApp
    .directive('tooltip', function() {
        return {
          restrict: 'A',
          link: function(scope, element, attrs) {
            $(element).attr('title', attrs.tooltip).tooltip({
              placement: "top"
            });
          }
        }
    });