var precPerRun = [];
var graphData = [];
var precVal;
var precursorsCrafted = 0;
var inv2, rare2, exo2;
var investment, r, e, undercut;

function adjustInputFields(fieldVal) {
    var field = fieldVal;

    while (field.length < 2) {
        field = '0' + field;
    }
    return field;
}

$(".test-input-field").keyup(function () {
    if ($(this).val().length > 2) {
        $(this).val($(this).val().substr(0, 2));
    }
});
$(".test-input-field2").keyup(function () {
    if ($(this).val().length > 5) {
        $(this).val($(this).val().substr(0, 5));
    }
});

$("#pre-selector").change(function () {
    $("#specialSpan").attr("data-id", $('#pre-selector :selected').val());
    $.getScript("js/gw2PriceApiCall.js", function () {
    });
});

$(document).ready(function () {
    $("#submitButton").unbind('click').on("click", function () {

        precPerRun = [], graphData = [];

        var id = $("#specialSpan").attr("data-id");

        if (id === 29185 || id === 29169) {
            var duskVal = valueObjectMap[29185].sellOrder, dawnVal = valueObjectMap[29169].sellOrder;
            precVal = parseInt((getCurrencyFormat(duskVal + dawnVal, "raw")) / 2);
        }
        else {
            precVal = parseInt(getCurrencyFormat(valueObjectMap[id].sellOrder, "raw"));
        }
        var sims = parseInt($("#selectSims option:selected").text());

        var cost = parseInt((400 * r - 124 * 0.2 * 0.85 * e) / 124);

        if (cost < 0)
        {
            swal({title: "Oops!", confirmButtonColor: "#4cae4c", text: "It seems that Your configuration resulted in an cost that is negative. Please adjust the config parameters and try again!", type: "error", confirmButtonText: "Fine..."});
        }
        else {
            var totalPrecursorsCrafted = 0;


            for (i = 0; i < sims; i++) {

                var gold = investment;
                var precursorsCrafted = 0;

                var numConversions = parseInt(gold / cost);
                for (j = 0; j < numConversions; j++) {
                    var rand = Math.floor((Math.random() * 700) + 1);
                    if (rand === 350) {
                        precursorsCrafted++;
                    }
                }
                precPerRun[i] = precursorsCrafted;
            }
            if (typeof precPerRun !== 'undefined') {
                $.each(precPerRun, function (index, value) {
                    var obj = [index, value];
                    graphData.push(obj);
                    totalPrecursorsCrafted += value;
                });
            }

            var gains = parseInt((totalPrecursorsCrafted * precVal));

            var gainsAfterFees = gains * .85 * ((100 - undercut) / 100)
            var losses = investment * sims;
            var total = gainsAfterFees - losses;

            if (total < 0)
                $("#result-label").text("Net Loss after TP fees:");
            else if (total > 0)
                $("#result-label").text("Net Profit after TP fees:");
            else
                $("#result-label").text("Net Even after TP fees:");

            $('#expenses').html(getCurrencyFormat(losses, "html"));
            $('#earnings').html(getCurrencyFormat(gains, "html"));

            $('#result').html(getCurrencyFormat(total, "html"));
            $('#numPrecs').html(totalPrecursorsCrafted);

            var sum;

            var data = new Array();
            $.each(graphData, function (index, value) {
                sum += value;
                data.push(value[1] * precVal);
            });

            var x = new getStats(data);


            $('#mean').html(getCurrencyFormat(x.mean, "html"));
            $('#stdev').html(getCurrencyFormat(x.deviation, "html"));

            if ($("#graph-choice option:selected").text() == "Bar") {
                $(function () {
                    drawBarGraph(graphData, "Precursor Simulation Graph");
                });
            }
            else if ($("#graph-choice option:selected").text() == "Line") {
                $(function () {
                    drawLineGraph(graphData, "Precursor Simulation Graph");
                });
            }
            else if ($("#graph-choice option:selected").text() == "Scatter") {
                $(function () {
                    drawScatterGraph(graphData, "Precursor Simulation Graph");
                });
            }
        }
    });
});

getStats = function (a) {
    var r = {
        mean: 0,
        variance: 0,
        deviation: 0
    }, t = a.length;
    for (var m, s = 0, l = t; l--; s += a[l])
        ;
    for (m = r.mean = s / t, l = t, s = 0; l--; s += Math.pow(a[l] - m, 2))
        ;
    return r.deviation = Math.sqrt(r.variance = s / t), r;
}

$(".test-input-field, .test-input-field2").keydown(function (e) {
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A
                    (e.keyCode == 65 && e.ctrlKey === true) ||
                    // Allow: Ctrl+C
                            (e.keyCode == 67 && e.ctrlKey === true) ||
                            // Allow: Ctrl+X
                                    (e.keyCode == 88 && e.ctrlKey === true) ||
                                    // Allow: home, end, left, right
                                            (e.keyCode >= 35 && e.keyCode <= 39)) {
                                // let it happen, don't do anything
                                return;
                            }
                            // Ensure that it is a number and stop the keypress
                            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                                e.preventDefault();
                            }
                        });