app.service('ViewTaskService', function($http) {
  this.ViewAllTasks=function(mytoken)
  {
    return $http({
      method: 'GET',
      url: 'http://'+ipAddress+'/view_all_task',
      headers: {
        'Content-Type': "application/json",
        'access_token':mytoken
        }
    });
  }
  this.ChangeTaskStatus=function(mytoken,taskid)
  {
    return $http({
      method: 'GET',
      url: 'http://'+ipAddress+'/task_status',
      headers: {
        'Content-Type': "application/json",
        'access_token':mytoken,
        'task_id':taskid
      }
    });
  }
  this.UpdateTask=function(mytoken,taskid,taskname)
  {
      return $http({
        method: 'POST',
        url: 'http://'+ipAddress+'/edit_task',
        headers: {
          'Content-Type': "application/json",
          'access_token':mytoken,
          'task_id':taskid
          },
        data: { task:taskname}
      });
  }
  this.DeleteTask=function(mytoken,taskid)
  {
    return $http({
      method: 'DELETE',
      url: 'http://'+ipAddress+'/delete',
      headers: {
        'Content-Type': "application/json",
        'access_token':mytoken,
        'task_id':taskid
        }
    });
  }
});
