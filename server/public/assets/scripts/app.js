$(document).ready(function(){
    $("#search").submit(function(event){
        event.preventDefault();
        var values = {};

        $.each($(this).serializeArray(), function(i, field){
            values[field.name] = field.value;
        });

        $.ajax({
            type: "GET",
            url: "/data",
            data: values,
            success: function(data){
                appendEverything(data);
            }
        })
    });
});

function appendEverything(data){
    $("#zetaInfo").empty();
    for (var i=0; i<data.length; i++){
        $("#zetaInfo").append("<div id='zetaPerson" + i + "' class='zeta-person well'></div>");
        $("#zetaPerson" + i).append("<p>Name: " + data[i].name + "</p>");
        $("#zetaPerson"+ i).append("<p>Animal: " + data[i].animal + "</p>");
        $("#zetaPerson" + i).hide().delay(i*200).fadeIn();
    }
}