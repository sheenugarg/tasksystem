app.service('registerService', function($http) {
  this.login=function(email,password)
  {
    return $http
    ({
      method: 'POST',
      url: 'http://'+ipAddress+'/login',
      headers: {
        'Content-Type': "application/json"
        },
      data: { email: email,password:password}
    });

  }
  this.signup=function(email,password,confirm_password){
    return $http({
      method: 'POST',
      url: 'http://'+ipAddress+'/register',
      headers: {
        'Content-Type': "application/json"
        },
      data: { email: email, password: password, con_password: confirm_password }
});
  }
});
