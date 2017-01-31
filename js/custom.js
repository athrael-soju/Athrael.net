alterDiv("#home-div");

$("#home-nav").on("click", function () {
    alterDiv("#home-div");
});

$("#tweets-nav").on("click", function () {
    alterDiv("#tweets-div");
});

$("#contact-nav").on("click", function () {
    alterDiv("#contact-div");
});

function alterDiv(divID) {
    var divList = ['#home-div', '#tweets-div', '#contact-div'];
    $.each(divList, function (index, value) {
        if (value === divID)
            $(divID).show("slow");
        else {
            $(value).hide("slow");
        }
    });
}