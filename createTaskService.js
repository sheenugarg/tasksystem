app.service('CreateTaskService', function($http) {
  this.AddTask=function(task,mydate,mytoken)
  {
    return $http({
      method: 'POST',
      url: 'http://'+ipAddress+'/add_task',
      headers: {
        'Content-Type': "application/json",
        'access_token':mytoken
        },
      data: { task: task,date:mydate}
    });
  }
});
