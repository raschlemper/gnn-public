app.factory("BlockService", ['blockUI', 'blockUIConfig', '$timeout', function(blockUI, blockUIConfig, $timeout) {
    return {
        block: function(message) {
            blockUI.start(message);
        },
        stop: function(timeout) {
            if (timeout) {
                $timeout(function() {
                    blockUI.stop();
                }, timeout);
            }else{
            	blockUI.stop();
            }

        }
    }
}]);
