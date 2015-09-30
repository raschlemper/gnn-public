angular.module('signature', []);
angular.module('signature').directive("signature", ["$http", function ($http) {
    return {
        restrict: "A",
        scope: {
            triggerName: "@",
            trigger: "&"
        },
        template: '<div><canvas style="background-color: #FFFFFF; border: 1px solid #CCCCCC; border-radius: 4px;" width="528" height="200"/><br/><button class="btn btn-success" ng-click="save()" style="width: 530px; height: 30px;">{{triggerName}}</button><br/><button class="btn btn-danger" ng-click="clear()" style="width: 530px; height: 30px;">Apagar Assinatura</button></div>',
        link: function (scope, element, attrs) {
            var ctx = element[0].children[0].children[0].getContext('2d');
            var flag = false
            var prevX = 0;
            var currX = 0;
            var prevY = 0;
            var currY = 0;

            ctx.canvas.addEventListener("mousemove", function (e) { move(e) }, false);
            ctx.canvas.addEventListener("mousedown", function (e) { down(e) }, false);
            ctx.canvas.addEventListener("mouseup", function (e) { upOrOut(e) }, false);
            ctx.canvas.addEventListener("mouseout", function (e) { upOrOut(e) }, false);
            
            scope.save = function () {
            	var dataURL = ctx.canvas.toDataURL().split(',')[1]
            	var blobBin = atob(dataURL);
            	var array = [];
            	for(var i = 0; i < blobBin.length; i++) {
            		array.push(blobBin.charCodeAt(i));
            	}
            	var file = new File([new Uint8Array(array)], "signature.png", {type: 'image/png'});
            	scope.trigger({file: file});
            	scope.clear();
            };
            
            scope.clear = function () {
            	ctx.clearRect(0, 0, 528, 200);
            };

            var draw = function () {
                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(currX, currY);
                ctx.strokeStyle = "black";
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.closePath();
            };

            var findPos = function (obj) {
                var curleft = 0, curtop = 0;
                if (obj.offsetParent) {
                    do {
                        curleft += obj.offsetLeft;
                        curtop += obj.offsetTop;
                    } while (obj = obj.offsetParent);
                    return { x: curleft, y: curtop };
                }
                return undefined;
            };
            
            var down = function (e) {
            	var pos = findPos(element[0].children[0].children[0]);
                prevX = currX;
                prevY = currY;
                currX = e.clientX - pos.x;
                currY = e.clientY - pos.y;
                flag = true;
            };

            var move = function (e) {
                if (flag) {
                	var pos = findPos(element[0].children[0].children[0]);
                    prevX = currX;
                    prevY = currY;
                    currX = e.clientX - pos.x;
                    currY = e.clientY - pos.y;
                    draw();
                }
            };

            var upOrOut = function (e) {
                flag = false;
            };
        }
    };
}]);