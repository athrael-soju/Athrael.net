var valueObjectMap = {};

function valueObject(name, buyOrder, sellOrder, quantity) {
    this.name = name;
    this.buyOrder = buyOrder;
    this.sellOrder = sellOrder;
    this.quantity = quantity;
}

function getCurrencyFormat(coin, format) {
    var gold, silver, copper, sign = "", raw = "";

    if (coin < 0) {
        sign = "-";
        coin = Math.abs(coin);
    }

    copper = Math.round((coin % 100));

    var text = copper + 'c';
    var html = copper + '&nbsp;<img src="img/tp/Copper_coin.png" alt="Copper" />';
    if (copper.toString().length == 1)
        copper = '0' + copper;
    raw = copper;

    if (coin >= 100) {
        silver = (coin / 100 >> 0) % 100;
        html = silver + '&nbsp;<img src="img/tp/Silver_coin.png" alt="Silver" />&nbsp;' + html;
        text = silver + 's ' + text;
        if (silver.toString().length == 1)
            silver = '0' + silver;
        raw = silver + "" + raw;

    }
    if (coin >= 10000) {
        gold = (coin / 10000 >> 0);
        html = gold + '&nbsp;<img src="img/tp/Gold_coin.png" alt="Gold" />&nbsp;' + html;
        text = gold + 'g ' + text;
        raw = gold + "" + raw;
    }

    return format == "html" ? sign + html : format == "text" ? sign + text : sign + raw;
}

$(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
        $(this).collapse('hide');
    }
});

function print(msg) {
    // shows console msg if debug is on else does nothing
    if (typeof console !== 'undefined') {
        console.log(msg);
    }
}

$('#copyright-button').tooltip();

$("#copyright-button").on("click", function () {
    window.open("https://github.com/athraelT");
});

$(".nav a").on("click", function () {
    $(".nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
});

$(".navbar-right").on("click", function () {
    alterDiv('#about');
});

$(".navbar-brand").on("click", function () {
    alterDiv("#home");
    $(".nav").find(".active").removeClass("active");
    location.reload();
});

$("#sim-nav a").on("click", function () {
    alterDiv("#sim-div");
});

$("#config-nav a").on("click", function () {
    alterDiv("#config-div");
});

$("#sim-info-nav a").on("click", function () {
    alterDiv("#sim-info-div");
});

//  HTML is added dynamically after the event handlers are installed, so we use delegated event handling.
$(document).on("click", "#proceed-to-sim-button", function () {

    if ($("#sim-choice option:selected").text() == "Precursor") {
        initPrecursorParams();
    }
    else {
        $("#sim-nav a").show("slow");
        $("#sim-nav a").trigger("click");
        $("#sim-nav").show("slow");
    }
});

$(document).on("click", "#select-sim-button", function () {
    $("#config-nav a").trigger("click");
    $("#config-nav").show("slow");
});

$('select[id="sim-choice"]').change(function () {
    if ($("#sim-choice option:selected").text() == "Precursor") {
        $(function () {
            $("#content").load("precursor.html");
        });
    }
    else if ($("#sim-choice option:selected").text() == "Mystic Clover") {
        $(function () {
            $("#content").load("mystic_clover.html");
        });
    }
    else if ($("#sim-choice option:selected").text() == "Laurel") {
        $(function () {
            $("#content").load("laurel.html");
        });

    }
});

function alterDiv(divID) {
    var divList = ['#home', '#about', '#config-div', '#sim-div', '#sim-info-div'];
    $.each(divList, function (index, value) {
        if (value === divID)
            $(divID).show("slow");
        else {
            $(value).hide("slow");
        }
    });
}

function del_cookie(name)
{
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

function initPrecursorParams() {
    inv2 = document.getElementById("investment2").value, inv3 = document.getElementById("investment3").value;
    rare2 = document.getElementById("rareVal2").value, rare3 = document.getElementById("rareVal3").value;
    exo2 = document.getElementById("exoVal2").value, exo3 = document.getElementById("exoVal3").value;

    investment = parseInt(document.getElementById("investment1").value + "" + adjustInputFields(inv2) + "" + adjustInputFields(inv3));
    r = parseInt(document.getElementById("rareVal1").value + "" + adjustInputFields(rare2) + "" + adjustInputFields(rare3));
    e = parseInt(document.getElementById("exoVal1").value + "" + adjustInputFields(exo2) + "" + adjustInputFields(exo3));
    undercut = parseInt(document.getElementById("undercut").value);

    var err = "";
    if (r == 0 || e == 0)
        err = "Exotic Sell and Rare Buy Values cannot be 0! ";
    if (investment <= 0)
        err += " Investment amount cannot be 0 or negative!";
    if (err != "") {
        swal({title: "Oops!", confirmButtonColor: "#4cae4c", text: err, type: "error", confirmButtonText: "Fine..."});
        $("#sim-nav a").hide("slow");
    }
    else {
        $("#sim-nav a").show("slow");
        $("#sim-nav a").trigger("click");
        $("#sim-nav").show("slow");
    }
}

$(document).ready(function () {
    $(function () {

        $("#content").load("laurel.html");
    });

    $("#sim-info-nav").show("slow");

    var visit = getCookie("cookie");
    if (visit == null) {
        swal({title: "Welcome to the GW2 Simulator!!", confirmButtonColor: "#4cae4c", html: "true", text: "Hey There! It looks like its your first time here. Don't forget to visit the <strong>'About this Sim'</strong> section for more information on how to configure/run each sim. Have fun!", confirmButtonText: "Let me in!"});
        var expire = new Date();
        expire = new Date(expire.getTime() + 7776000000);
        document.cookie = "cookie=here; expires=" + expire;
    }

});