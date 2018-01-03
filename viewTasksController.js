app.controller("ViewTaskCtrl", function($scope,ViewTaskService) {
  $scope.alltasks=[];
  var mytoken=localStorage.getItem("user_token");
  $scope.editDiv=false;
  $scope.TaskToBeDeleted="";
  $scope.ViewAllTasks=function()
  {
    if(mytoken==null || mytoken==undefined)
    {
      alert("Please Login First To Access Other services");
      return;
    }
    var response=ViewTaskService.ViewAllTasks(mytoken);
    response.then(function(success){
      if(success.data.error==0)
      {
        $scope.alltasks=success.data.data;
      }
      else {
        alert("Error Occurred While Fetching Data");
      }
    },function(error){
      alert("Error Occurred While Inserting Record in Database..........Please Try again Later");
    });
  }
  $scope.ViewAllTasks();
  $scope.ChangeTaskStatus=function(taskid)
  {
    if(mytoken==null || mytoken==undefined)
    {
      alert("Please Login First To Access Other services");
      return;
    }
    var response=ViewTaskService.ChangeTaskStatus(mytoken,taskid);
    response.then(function(success){
      if(success.data.error==0)
      {
        //alert(success.data.message);
        $scope.AllConfirmationMessage=success.data.message;
        $scope.ViewAllTasks();
      }
      else {
        alert("Error occurred while updating task status");
      }
    },function(error){
        alert("Error occurred while updating task status..........Please Try again later");
    });
    RemoveConfirmationMessages();
    setTimeout(function()
    {
      uncheckCheckedCheckBoxes();
    },2000);
  }
  function uncheckCheckedCheckBoxes()
  {
    var uncheck=document.getElementsByTagName('input');
    for(var i=0;i<uncheck.length;i++)
    {
     if(uncheck[i].type=='checkbox')
     {
      uncheck[i].checked=false;
     }
    }
  }
  $scope.EditTask=function(taskid,taskName)
  {
      $scope.editDiv=true;
      $scope.EditTaskId=taskid;
      $scope.EditTaskName=taskName;
  }
  $scope.UpdateTask=function()
  {
    if($scope.EditTaskNewName==null || $scope.EditTaskNewName==undefined|| $scope.EditTaskNewName=="")
    {
      $scope.ValidateEditTask=true;
      return;
    }
    var response=ViewTaskService.UpdateTask(mytoken,$scope.EditTaskId,$scope.EditTaskNewName);
    response.then(function(success){
      if(success.data.error==0)
      {
        $scope.EditConfirmationMessage=success.data.message;
        $scope.ViewAllTasks();
      }
      else {
          alert("Error Occurred While Updating Task");
      }
    },function(error){
      alert("Error Occurred..........Pleae Try Again Later");
    });
    setTimeout(function(){
      ClearEditDivFields();
    },2000);
  }
  $scope.CancelTask=function()
  {
    ClearEditDivFields();
  }
  $scope.DeleteTask=function(taskid)
  {
    if(mytoken==null || mytoken==undefined)
    {
      alert("Please Login First To Access Other services");
      return;
    }
    $scope.TaskToBeDeleted=taskid;
    /*
    var response=ViewTaskService.DeleteTask(mytoken,taskid);
    response.then(function(success){
      if(success.data.error==0)
      {
        alert("Task Removed Successfully");
        $scope.ViewAllTasks();
      }
      else {
        alert("Error Occurred While Deleting Record");
      }
    },function(error){
      alert("Error Occurred....Please Try Again Later");
    });
    */
  }
  function ClearEditDivFields()
  {
    $scope.editDiv=false;
    $scope.EditTaskId="";
    $scope.EditTaskName="";
    $scope.EditTaskNewName="";
    $scope.EditConfirmationMessage="";
  }
  $scope.getTaskStatus=function(taskDate,taskStatus)
  {
    var today=new Date();
    taskDate=new Date(taskDate);
    if(taskStatus==true)
    {
      return "complete";
    }
    else if(today>taskDate)
    {
      return "overdue";
    }
    else {
      return "normal";
    }
  }
  $scope.ConfirmDeletion=function()
  {
    var response=ViewTaskService.DeleteTask(mytoken,$scope.TaskToBeDeleted);
    response.then(function(success){
      if(success.data.error==0)
      {
        //alert("Task Removed Successfully");
        $scope.AllConfirmationMessage="Task Removed Successfully";
        $scope.ViewAllTasks();
      }
      else {
        alert("Error Occurred While Deleting Record");
      }
    },function(error){
      alert("Error Occurred....Please Try Again Later");
    });
    RemoveConfirmationMessages();
  }
  $scope.CancelDeletion=function()
  {
    $scope.TaskToBeDeleted="";
  }
  function RemoveConfirmationMessages()
  {
    setTimeout(function(){
      $scope.AllConfirmationMessage="";
      $scope.$apply();
    },2000);
  }
});
