angular
    .module("application", ["ngResource"])
    .controller("checkoutController",function ($scope,$http){
        $http.get("/login/").then(function callBack(resp){
            $scope.userName = resp.data.uname;
            $scope.orderNumber = resp.data.uuid;
        })
        setTimeout(function () {
                        window.location = 'index.html'
        }, 10000);
    })
    .controller("navBarController", function ($scope, $http) {
        $http.get('/login/').then(function callBack(response) {
            if (response.data.uname) {
                $scope.currentUser = response.data.uname;
                $scope.signOutStatus = "Sign Out";
            } 
            if($scope.currentUser == "null")
            {
                $scope.currentUser = "Sign In";
                $scope.signOutStatus = "";
            }
        });

        $scope.signOutIfPossible = function()
        {
            $http.get("login/logout").then(function callBack(data){
                if(data.data.code == 200)
                {
                    setTimeout(function () {
                        window.location = 'index.html'
                    }, 0);
                }
            });
        }

    });