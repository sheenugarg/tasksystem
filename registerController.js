app.controller("RegisterCtrl", function($scope,registerService) {
  $scope.error_email=false;
  $scope.error_password=false;
  $scope.error_confirm_password=false;
  $scope.Register_msg=false;
  $scope.login_msg=false;
  $scope.login=function()
  {
    var email_valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if($scope.login_email==undefined || $scope.login_email==null || email_valid.test($scope.login_email.toLowerCase())==false)
    {
      $scope.login_msg=true;
      $scope.login_error_description="please provide valid email";
      return;
    }
    if($scope.login_password==null || $scope.login_password==undefined)
    {
      $scope.login_msg=true;
      $scope.login_error_description="please provide login password";
      return;
    }
    var response=registerService.login($scope.login_email,$scope.login_password);
    response.then(function(success){
      if(success.data.error==0)
      {
        //successfull
        $scope.login_msg=true;
        $scope.login_error_description="Successfull Logged In";
        localStorage.setItem("user_token",success.data.token);
        location.assign("home.html");
      }
      if(success.data.error==1)
      {
        //invalid
        $scope.login_msg=true;
        $scope.login_error_description=success.data.message;
      }
    },function(err){
      alert("error occurred");
    });
    clearLoginFields();
  }
  $scope.signup=function()
  {
    var email_valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if($scope.user_email==undefined || $scope.user_email==null || email_valid.test($scope.user_email.toLowerCase())==false)
    {
      $scope.error_email=true;
      return;
    }
    if($scope.user_password==null || $scope.user_password==undefined)
    {
      $scope.error_password=true;
      return;
    }
    if($scope.user_confirm_password==null || $scope.user_confirm_password==undefined)
    {
      $scope.error_confirm_password=true;
      return;
    }
    if($scope.user_password!=$scope.user_confirm_password)
    {
      $scope.error_confirm_password=true;
      return;
    }
    var response=registerService.signup($scope.user_email,$scope.user_password,$scope.user_confirm_password);
    response.then(function(success){
      $scope.Register_msg=true;
      $scope.register_message=success.data.message;
      clearRegisterationFields();
      setTimeout(function()
      {
        clearRegistrationMessage();
      },2000);
    },function(err){
      $scope.Register_msg=true;
      $scope.register_message=err.data.message;
      clearRegisterationFields();
      setTimeout(function()
      {
        clearRegistrationMessage();
      },2000);
    });
  }
  $scope.ElementsInFocus=function(element)
  {
    switch(element)
    {
      case 'register_email':$scope.error_email=false;break;
      case 'register_password':$scope.error_password=false;break;
      case 'register_confirm_password':$scope.error_confirm_password=false;break;
      case 'login_email':$scope.login_msg=false;$scope.login_error_description="";break;
      case 'login_password':$scope.login_msg=false;$scope.login_error_description="";break;
    }
  }
  function clearRegisterationFields()
  {
    $scope.user_email="";
    $scope.user_password="";
    $scope.user_confirm_password="";
  }
  function clearRegistrationMessage()
  {
    $scope.register_message = '';
    $scope.Register_msg=false;
    $scope.$apply();
  }
  function clearLoginFields()
  {
    $scope.login_email="";
    $scope.login_password="";
  }
});
