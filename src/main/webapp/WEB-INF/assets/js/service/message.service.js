app.factory("MessageService", ['ngToast', function(ngToast) {
    return {
        success: function(message) {
            ngToast.success({content:'<i class="icon-check" style="margin-right:5px"></i> '+message, dismissOnTimeout:true});
        },
        warning: function(message){
            ngToast.warning(message);
        },
        info: function(message){
            ngToast.info({content:'<i class="icon-info" style="margin-right:5px"></i> '+message, dismissOnTimeout:true});
        },
        danger: function(message){
            ngToast.danger({content:'<i class="icon-close" style="margin-right:5px"></i> '+message, dismissOnTimeout:true}); 
        }
    }
}]);
