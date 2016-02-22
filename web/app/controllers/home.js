todoApp
    .controller('homeCtrl', function($scope, $wakanda, $filter, Tasks, searchFilter) {
        $scope.filterTask = searchFilter.value;  
        $scope.pageCountArray = [];
        $scope.itemsPerPage = 5;
        $scope.currentPage = 0;
        $scope.tasks = [];
        $scope.type = (typeof($scope.type) != "undefined") ? $scope.type : "todo";
        Tasks.init().then(function() {
            $scope.load();
        }).catch(function(e) {
            console.warn(e);
        });
        $scope.load = function() {
            Tasks.load().then(function(res) {
              $scope.tasks = $.map(Tasks.getAll(), function(value, index) {
                return [value];
              });
              $scope.tasks.reverse();
              $scope.refreshPagination();
            });
        };
        $scope.add = function(newTask) {
            if (newTask) {
              $scope.type = "todo";
              Tasks.add(newTask.description).then(function(res) {
                $scope.newTask.description = "";
                $scope.load();
              });
            }
        };
        $scope.delete = function(taskId) {
            Tasks.remove(taskId);
            $scope.load();
        };
        $scope.getTaskType = function(task) {
            return (task.deleted) ? "task-deleted" : (task.completed ? "task-done" : "task-todo");
        };
        $scope.getTasksByType = function(task) {
            switch ($scope.type) {
              case 'deleted':
                return task.deleted;
              case 'all':
                return true;
              case 'done':
                return task.completed && !task.deleted;
              case 'todo':
                return !task.completed && !task.deleted;
            }
        };
        $scope.edit = function(task) {
            $scope.editedTask = angular.copy(task);
        };
        $scope.save = function(task, newname) {
            task.description = newname;
            Tasks.save(task.ID).then(function(e) {
              $scope.editedTask = null;
            });
        };
        $scope.done = function(taskId) {
            var task = Tasks.getOneById(taskId);
            task.completed = true;
            Tasks.save(taskId);
            $scope.refreshPagination();
        };
        $scope.undone = function(taskId) {
            var task = Tasks.getOneById(taskId);
            task.completed = false;
            Tasks.save(taskId);
            $scope.refreshPagination();
        };
        $scope.remove = function(taskId) {
            var task = Tasks.getOneById(taskId);
            task.deleted = true;
            Tasks.save(taskId);
            $scope.refreshPagination();
        };
        $scope.restore = function(taskId) {
            var task = Tasks.getOneById(taskId);
            task.deleted = false;
            Tasks.save(taskId);
            $scope.refreshPagination();
        };
        $scope.addAttachment = function(input) {
            var taskId = angular.element(input).attr('data-task');
            var file = angular.element(input)[0].files[0];
            Tasks.addAttachment(file.name, file, taskId).then(function(res) {
                // attachment added
            }).catch(function(err) {
              console.warn(err);
            })
        };
        $scope.removeAttachment = function(taskId) {
            var attachments = Tasks.getOneById(taskId).attachments;
            if (attachments.length > 0) {
              for (var i = 0; i < attachments.length; i++) {
                Tasks.removeAttachment(i, taskId).then(function(res) {
                  $scope.load();
                }).catch(function(err) {
                  console.warn(err);
                });
              }
            }
        };
        $scope.pageCount = function() {
            var length = Math.ceil($filter('filter')($filter('filter')($scope.tasks, $scope.filterTask), $scope.getTasksByType).length / $scope.itemsPerPage);
            return length === -1 ? 0 : length;
        };
        $scope.refreshPagination = function() {
            $scope.pageCountArray = Array.apply(null, Array($scope.pageCount())).map(function(x, i) {
              return i;
            });
        };
        $scope.prevPage = function() {
            if ($scope.currentPage > 0) {
              $scope.currentPage--;
            }
        };
        $scope.nextPage = function() {
            if ($scope.currentPage < $scope.pageCount() - 1) {
              $scope.currentPage++;
            }
        };
        $scope.goToPage = function(page) {
            $scope.currentPage = page;
        };
        $scope.$watch("type", function(newValue) {
            $scope.currentPage = 0;
            $scope.type = newValue;
            $scope.refreshPagination();
        });
    })