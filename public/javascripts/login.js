angular
    .module("application", ["ui.router", "ngResource"])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider.state("login", {
                url: "/login.html",
                views: {
                    main: {
                        templateUrl: "pages/userlogin.html"
                    },
                    jumboText: {
                        templateUrl: "pages/jumboTextExistingUsers.html"
                    }
                }
            })
            .state(
                "register", {
                    url: "/login.html",
                    views: {
                        main: {
                            templateUrl: "pages/register.html"
                        },
                        jumboText: {
                            templateUrl: "pages/jumboTextNewUsers.html"
                        }
                    }
                }
            )
        $locationProvider.html5Mode(true);
    })
    .controller("loginViewController", function ($scope, $http) {
        var formHolder = document.getElementById("formHolder");
        var textNode = document.createTextNode(" ");
        formHolder.appendChild(textNode);
        $http.get("login/").then(function callback(data) {
            if (data.data.code == "200") {
                formHolder.style.display = "none";
                var body = document.getElementById("body");
                var bigText = document.createElement("h3");
                var text = document.createTextNode("You're Already Logged In, " + data.data.uname + ".");
                bigText.appendChild(text);
                body.appendChild(bigText);
                setTimeout(function () {
                        window.location = 'index.html'
                    }, 1000);
            } else if (data.data.code == "100") {

            }
        })
        $scope.submit = function () {
            document.getElementById("submitButton").disabled = true;
            $http.post("login/authenticate", {
                uname: $scope.user.uname,
                psswd: $scope.user.password
            }).then(function callback(data) {
                if (data.data.code == "202") {
                    formHolder.style.display = "none";
                    var body = document.getElementById("body");
                    var bigText = document.createElement("h3");
                    var text = document.createTextNode("Welcome Back " + data.data.uname + ", Good to see you again.");
                    bigText.appendChild(text);
                    body.appendChild(bigText);
                    setTimeout(function () {
                        window.location = 'index.html'
                    }, 1000);
                } else {
                    textNode.nodeValue = data.data.description;
                    document.getElementById("submitButton").disabled = false;
                }
            })
        }
        $scope.registerNewUser = function () {
            document.getElementById("registerButton").disabled = true;
            $http.post("login/add", {
                uname: $scope.regUser.uname,
                password: $scope.regUser.password,
                address: $scope.regUser.address,
                phone: $scope.regUser.phone,
                name: $scope.regUser.name,
                email: $scope.regUser.email
            }).then(function callback(data) {
                if (data.data.code == "201") {
                    formHolder.style.display = "none";
                    var body = document.getElementById("body");
                    var bigText = document.createElement("h3");
                    var text = document.createTextNode("Hello " + data.data.uname + " ( A.K.A: " + data.data.name + "), Thanks for joining us.");
                    bigText.appendChild(text);
                    body.appendChild(bigText);
                    setTimeout(function () {
                        window.location = 'index.html'
                    }, 1000);
                } else {
                    textNode.nodeValue = data.data.description;
                    document.getElementById("registerButton").disabled = false;
                }
            });
        }
    })
    .controller("navBarController", function ($scope, $http) {
        $http.get('/login/').then(function callBack(response) {
            if (response.data.uname) {
                $scope.currentUser = response.data.uname;
            }
            if ($scope.currentUser == "null") {
                $scope.currentUser = "Sign In";
            }
        });
    });