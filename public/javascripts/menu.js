angular
    .module("application", ["ui.router","ngResource"])
    .controller("startersViewController", function ($scope, $resource) {
        var request = $resource('/menu/starters');
        request.query(function (items) {
            var images = [];
            $scope.items = items;
        });
        $scope.addToCart = function (item, quantity) {
            var $scope = angular.element(document.getElementById('cart')).scope();
            var quantity = 0;
            var theItem;
            var pos;
            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.items[i].name == item.name) {
                    theItem = $scope.items[i];
                    pos = i;
                    break;
                }
            }
            if (theItem) {
                quantity = theItem.quant;
                quantity++;
            }
            if (quantity < 1) {
                quantity = 1;
            }

            if (quantity > 10) {
                quantity = 10;
            }
            var num = +subString(item.cost, 1, item.cost.length);
            var totPrice = (+num * quantity);
            $scope.totalPrice += totPrice;
            var newItem = {
                name: item.name,
                quant: quantity,
                price: item.cost,
                totalPrice: totPrice
            };
            if (theItem) {
                $scope.items[pos] = newItem;
            } else {
                $scope.items.push(newItem);
            }

            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
            }

        }
    })

    .controller("mainCourseViewController", function ($scope, $resource) {
        var request = $resource('/menu/maincourse');
        request.query(function (items) {
            $scope.items = items;
        });
        $scope.addToCart = function (item, quantity) {
            var $scope = angular.element(document.getElementById('cart')).scope();
            var quantity = 0;
            var theItem;
            var pos;
            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.items[i].name == item.name) {
                    theItem = $scope.items[i];
                    pos = i;
                    break;
                }
            }
            if (theItem) {
                quantity = theItem.quant;
                quantity++;
            }
            if (quantity < 1) {
                quantity = 1;
            }

            if (quantity > 10) {
                quantity = 10;
            }
            var num = +subString(item.cost, 1, item.cost.length);
            var totPrice = +num * quantity;
            var newItem = {
                name: item.name,
                quant: quantity,
                price: item.cost,
                totalPrice: totPrice
            };
            if (theItem) {
                $scope.items[pos] = newItem;
            } else {
                $scope.items.push(newItem);
            }
            $scope.totalPrice += totPrice;
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
            }

        }
    })

    .controller("drinksViewController", function ($scope, $resource) {
        var request = $resource('/menu/drinks');
        request.query(function (items) {
            $scope.items = items;
        });
        $scope.addToCart = function (item, quantity) {
            var $scope = angular.element(document.getElementById('cart')).scope();
            var quantity = 0;
            var theItem;
            var pos;
            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.items[i].name == item.name) {
                    theItem = $scope.items[i];
                    pos = i;
                    break;
                }
            }
            if (theItem) {
                quantity = theItem.quant;
                quantity++;
            }
            if (quantity < 1) {
                quantity = 1;
            }

            if (quantity > 10) {
                quantity = 10;
            }
            var num = +subString(item.cost, 1, item.cost.length);
            var totPrice = +num * quantity;
            var newItem = {
                name: item.name,
                quant: quantity,
                price: item.cost,
                totalPrice: totPrice
            };
            if (theItem) {
                $scope.items[pos] = newItem;
            } else {
                $scope.items.push(newItem);
            }
            $scope.totalPrice += totPrice;
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
            }

        }
    })

    .controller("dessertsViewController", function ($scope, $resource) {
        var request = $resource('/menu/desserts');
        request.query(function (items) {
            $scope.items = items;
        });
        $scope.addToCart = function (item, quantity) {
            var $scope = angular.element(document.getElementById('cart')).scope();
            var quantity = 0;
            var theItem;
            var pos;
            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.items[i].name == item.name) {
                    theItem = $scope.items[i];
                    pos = i;
                    break;
                }
            }
            if (theItem) {
                quantity = theItem.quant;
                quantity++;
            }
            if (quantity < 1) {
                quantity = 1;
            }

            if (quantity > 10) {
                quantity = 10;
            }
            var num = +subString(item.cost, 1, item.cost.length);
            var totPrice = +num * quantity;
            var newItem = {
                name: item.name,
                quant: quantity,
                price: item.cost,
                totalPrice: totPrice
            };
            if (theItem) {
                $scope.items[pos] = newItem;
            } else {
                $scope.items.push(newItem);
            }
            $scope.totalPrice += totPrice;
            if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                $scope.$apply();
            }

        }
    })


    .controller("cartViewController", function ($scope, $http) {
        $scope.items = [];
        $scope.totalPrice = 0;
        var data = {
            orderItems: []
        }

        $scope.checkout = function () {
            for (var i = 0; i < $scope.items.length; i++) {
                var obj = {
                    itemName: $scope.items[i].name,
                    itemCost: $scope.items[i].price,
                    itemQuantity: $scope.items[i].quant
                };
                data.orderItems.push(obj);
            }
            $http.post("/orders/neworder", data).then(function callBack(response) {
                if (response.data.code == 200) {
                    $scope.items = [];
                    $scope.totalPrice = 0;
                    setTimeout(function () {
                        window.location = 'checkoutSuccess.html'
                    }, 0);
                }
                else if(response.data.code == 403)
                {
                    setTimeout(function () {
                        window.location = 'checkoutUnauthorized.html'
                    }, 0);
                }
                else
                {
                    setTimeout(function () {
                        window.location = 'checkoutError.html'
                    }, 0);
                }
            });
        }
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


function subString(str, start, end) {
    var t = "";
    for (var i = start; i < end; i++) {
        t += str[i];
    }
    return t;
}
