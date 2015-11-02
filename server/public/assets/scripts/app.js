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
                appendPerson(data);
                appendEverything(data);
            }
        })
    });
});

function appendPerson(data){
    $("#zetaInfo").empty();
    $("#zetaInfo").append("<div id='zetaPerson' class='zeta-person well'></div>");
    $("#zetaPerson").text("<p>Name: " + data[0].name + "</p>");
    $("#zetaPerson").text("<p>Animal: " + data[0].animal + "</p>");
    $("#zetaPerson").hide().fadeIn();
}

function appendEverything(data){
    $("#zetaInfo").empty();
    for (var i=0; i<data.length; i++){
        $("#zetaInfo").append("<div id='zetaPerson" + i + "' class='zeta-person well'></div>");
        $("#zetaPerson" + i).append("<p>Name: " + data[i].name + "</p>");
        $("#zetaPerson"+ i).append("<p>Animal: " + data[i].animal + "</p>");
        $("#zetaPerson" + i).hide().delay(i*200).fadeIn();
    }
}