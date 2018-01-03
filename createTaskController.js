app.controller("CreateTaskCtrl", function($scope,CreateTaskService) {
  $scope.ValidateTask=false;
  $scope.ValidateDate=false;
  $scope.AddTask=function()
  {
    if($scope.mytask==null || $scope.mytask==undefined || $scope.mytask=="")
    {
      $scope.ValidateTask=true;
      return;
    }
    if($scope.mytaskdate==null || $scope.mytaskdate==undefined || $scope.mytaskdate=="")
    {
      $scope.ValidateDate=true;
      return;
    }
    var mytoken=localStorage.getItem("user_token");
    if(mytoken==null || mytoken==undefined)
    {
      alert("Please Login To Continue With adding Task");
      return;
    }
    var response=CreateTaskService.AddTask($scope.mytask,$scope.mytaskdate,mytoken);
    response.then(function(success){
      if(success.data.error==0)
      {
        $scope.CreateTaskMessage=success.data.message;
      }
      else {
        $scope.CreateTaskMessage="error occurred while inserting Task";
      }
    },function(error){
      $scope.CreateTaskMessage="error occurred while inserting Task.....Please Try Again Later";
    });
    AddTaskFields();
  }
  function AddTaskFields()
  {
    $scope.mytask="";
    $scope.mytaskdate="";
    ClearCreateTaskMessage();
  }
  $scope.ElementsInFocus=function(pageelement)
  {
    switch(pageelement)
    {
      case 'taskName':$scope.ValidateTask=false;
      case 'taskDate':$scope.ValidateDate=false;
    }
  }
  function ClearCreateTaskMessage()
  {
    setTimeout(function(){
      $scope.CreateTaskMessage="";
      $scope.$apply();
    },2000);
  }
});
