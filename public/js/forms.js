$body = $("body");

$(document).ready(function() {

    //HIDING ERROR AND SUCCESS DIVS ON PAGE LOAD
    //$("div.error-box").hide();
    $("div#message").hide();

    //FUNCTIOZN TO SERIALIZE OBJECT
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    //FORM SUBMIT FUNCTION
	$("form").on("submit", function(e) {
        e.preventDefault();
        var _data = $(e.currentTarget).serializeObject();
        //var valid = $(e.currentTarget).valid();   
        //if(valid) {
            var _method = e.currentTarget.method;
            var _action = e.currentTarget.action;
            var _data = JSON.stringify(_data);
            console.log("METOD: " + _method);
            console.log("ACTION: " + _action);
            console.log("DATA: " + _data);
            $.ajax({
                type: _method,
                url: _action,
                data: _data,
                success: function(data) {
                    console.log("DATA: " + JSON.stringify(data)); 
                    if(data) {
                        if(data.status == 200) {
                            if($(e.currentTarget).data().uri)
                                window.location=$(e.currentTarget).data().uri;
                            else {
                                console.log(data.message);
                                $(e.currentTarget).find("div#message p").html(data.message);
                                $(e.currentTarget).find("div#message").show();
                                $(window).scrollTop($('div#message').offset().top);
                            }
                        } else {                  
                            $(e.currentTarget).find("div#message p").html(data.message);
                            $(e.currentTarget).find("div#message").show();
                            $(window).scrollTop($('div#message').offset().top);
                        } 
                    }
                },
                error: function(xhr, textStatus, errorThrown) {                
                    $(e.currentTarget).find("div#message p").html(xhr.responseText);
                    $(e.currentTarget).find("div#message").show();
                    $(window).scrollTop($('div#message').offset().top);
                },
                dataType: "json",
                contentType: "application/json"
            });
        //}
	});
});