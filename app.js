var App = angular.module('drag-and-drop', ['ngDragDrop', 'ui.bootstrap']);

App.controller('oneCtrl', function($scope, $q, $modal) {
  
  $scope.projectsList = [
    { 'id': 0, 
      'isEdit': false,
      'name': 'My Project 1', 
      'description': 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.', 
      'membersList': []
    }
  ];

  $scope.membersList = [
    { 'rating': 4, 'firstName': 'Sejal', 'lastName': 'Panchal', 'drag': true },
    { 'rating': 2, 'firstName': 'Kajal', 'lastName': 'Panchal', 'drag': true },
    { 'rating': 6,  'firstName': 'John', 'lastName': 'Doe', 'drag': true },
    { 'rating': 5,  'firstName': 'Kevin', 'lastName': 'Gray', 'drag': true },
    { 'rating': 1,  'firstName': 'Manan', 'lastName': 'Shah', 'drag': true }
  ];

  $scope.beforeDrop = function() {
      
    var modalInstance = $modal.open({
      templateUrl: 'ConfirmationModel.html',
      controller: 'ConfirmationModelCtrl',
      size: 'sm',
      resolve: {
        data: function () {
          return { 
            'message': 'Are you sure to move this Member?',
           };
        }
      }
    });

    return modalInstance.result;
  };

  $scope.addNewProject = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'AddNewProject.html',
      controller: 'AddNewProjectCtrl',
      size: size,
      resolve: {
        project: function () {
          return {  'id': $scope.projectsList.length,
                    'isEdit': false,
                    'name': '',
                    'description': '',
                    'membersList': []
                 };
        }
      }
    });

    modalInstance.result.then(function (project) {
      $scope.projectsList.push(project);
    }, function () {
      console.log('Add project model dismissed at: ' + new Date());
    });
  };

  $scope.addMember = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'AddMember.html',
      controller: 'AddMemberCtrl',
      size: size,
      resolve: {
        member: function () {
          return {  'id': $scope.membersList.length,  
                    'firstName': '',
                    'lastName': '',
                    'rating':0,
                    'drag': true
                 };
        }
      }
    });

    modalInstance.result.then(function (member) {
      $scope.membersList.push(member);
    }, function () {
      console.log('Add member model dismissed at: ' + new Date());
    });
  };
  
  $scope.deleteProject = function(project) {
    
    var modalInstance = $modal.open({
      templateUrl: 'ConfirmationModel.html',
      controller: 'ConfirmationModelCtrl',
      size: 'sm',
      resolve: {
        data: function () {
          return { 
            'message': 'Are you sure to delete Project?',
            'project': project
           };
        }
      }
    });
    
    modalInstance.result.then(function (data) {
      var newProjectList = [];
      $scope.projectsList.forEach(function(project){
          if(project.id != data.project.id ){
            newProjectList.push(project);
          }else
            console.log('Deleted project id: '+project.id+' name: '+project.name)
      });
      $scope.projectsList = newProjectList;
    }, function () {
      console.log('Delete project model dismissed at: ' + new Date());
    });
  };

}).controller('ConfirmationModelCtrl', function ($scope, $modalInstance,data) {
  
  $scope.data = data;
  $scope.ok = function () {
    $modalInstance.close($scope.data);
  };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}).controller('AddNewProjectCtrl', function ($scope, $modalInstance, project) {
 
  $scope.project = project;
  $scope.error = false;
  
  $scope.ok = function () {
    
    if ($scope.project.name != '' && $scope.project.description != '' ) {
        $scope.error = false;
        $modalInstance.close($scope.project);
    }else{
        $scope.error = true;
    }
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}).controller('AddMemberCtrl', function ($scope, $modalInstance, member) {
 
  $scope.member = member;
  $scope.error = false;
  
  $scope.ok = function () {
    
    if ($scope.member.firstName != '' && $scope.member.lastName != '' && $scope.member.rating > 0) {
        $scope.error = false;
        $modalInstance.close($scope.member);
    }else{
        $scope.error = true;
    }
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});