var MapController = angular.module('MapController', []);

MapController.controller("MapController", ['$scope', function ($scope) {

    var canvas = document.getElementById("mapCanvas");
    $scope.loadImage = function() {
        var context = canvas.getContext('2d');
        base_image = new Image();

        base_image.src = 'global_map.png';
        base_image.onload = function() {
        //    context.drawImage(base_image, 0, 0, base_image.width, base_image.height, canvas.width, canvas.height);
            context.drawImage(base_image,0,0);
        };
    };
}]);