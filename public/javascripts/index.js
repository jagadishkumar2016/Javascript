angular
    .module("application", ["ui.router", "ngResource"])
    .controller("aboutUsViewController", function ($scope, $http) {

    })
    .controller("navBarController", function ($scope, $http) {
        $http.get('/login/').then(function callBack(response) {
            if (response.data.uname) {
                $scope.currentUser = response.data.uname;
                $scope.signOutStatus = "Sign Out";
            }
            if ($scope.currentUser == "null") {
                $scope.currentUser = "Sign In";
                $scope.signOutStatus = "";
            }
        });

        $scope.signOutIfPossible = function () {
            $http.get("login/logout").then(function callBack(data) {
                if (data.data.code == 200) {
                    setTimeout(function () {
                        window.location = 'index.html'
                    }, 0);
                }
            });
        }

    });

$('.carousel').carousel({
  interval: 6000,
  pause: "false"
});

var $item = $('.carousel .item');
var $wHeight = $(window).height();

$item.height($wHeight); 
$item.addClass('full-screen');

$('.carousel img').each(function() {
  var $src = $(this).attr('src');
  var $color = $(this).attr('data-color');
  $(this).parent().css({
    'background-image' : 'url(' + $src + ')',
    'background-color' : $color
  });
  $(this).remove();
});

$(window).on('resize', function (){
  $wHeight = $(window).height();
  $item.height($wHeight);
});