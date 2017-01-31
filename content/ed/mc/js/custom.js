/*
 Copyright  (c) 2015 Athrael
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 
 The Elite: Dangerous game logic and data in this file remains the property of Frontier Developments plc,
 and is used here as authorized by Frontier Customer Services (https://forums.frontier.co.uk/showthread.php?t=5349)
 */

var meritList = {};
var resultList = {};
var ratingList = {};
var rankList = {};
var dTable;
$('#startingMerits').prop('disabled', true);

$(function () {
    var tooltips = $("[title]").tooltip({
        position: {
            my: "left top",
            at: "right+5 top-5"
        }
    });
    $("<button>")
            .text("Show help")
            .button()
            .click(function () {
                tooltips.tooltip("open");
            })
            .insertAfter("form");
});

function initRankList() {
    rankList[1] = 0;
    rankList[2] = 100;
    rankList[3] = 750;
    rankList[4] = 1500;
    rankList[5] = 10000;
}

function meritObject(value, cycle) {
    this.value = value;
    this.cycle = cycle;
}

function ratingObject(wBonus, pNoms, pCom) {
    this.wBonus = wBonus;
    this.pNoms = pNoms;
    this.pCom = pCom;
}

function resultObject(cycle, merits, totalMerits) {
    this.cycle = cycle;
    this.merits = merits;
    this.totalMerits = totalMerits;
}

function calcCurrMerits() {
    var totalMerits = 0;
    $.each(meritList, function (index, value) {
        totalMerits += parseInt(meritList[index].value);
    });
    return totalMerits;
}

function print(msg) {
    // shows console msg if debug is on else does nothing
    if (typeof console !== 'undefined') {
        console.log(msg);
    }
}

function populateRatingList() {

    var rankList = [1000, 50000, 500000, 5000000, 50000000];
    $.each(rankList, function (index, value) {
        rankList[index] = rankList[index].toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
    });

    ratingList[1] = new ratingObject(rankList[0], 0, 10);
    ratingList[2] = new ratingObject(rankList[1], 25, 15);
    ratingList[3] = new ratingObject(rankList[2], 50, 20);
    ratingList[4] = new ratingObject(rankList[3], 100, 25);
    ratingList[5] = new ratingObject(rankList[4], 250, 50);
}

function initMeritTable() {

    var initMeritTable = $('#initMeritTable').DataTable({
        "paging": false,
        "searching": false,
        "bSort": false,
        "bInfo": false
    });

    initMeritTable.row.add([1, 0, 0, 0]).draw();
    initMeritTable.row.add([2, 54, Math.ceil(54 / 30), Math.ceil(54 / 30 / 7)]).draw();
    initMeritTable.row.add([3, 400, Math.ceil(400 / 30), Math.ceil(400 / 30 / 7)]).draw();
    initMeritTable.row.add([4, 800, Math.ceil(800 / 30), Math.ceil(800 / 30 / 7)]).draw();
    initMeritTable.row.add([5, 5334, Math.ceil(5334 / 30), Math.ceil(5334 / 30 / 7)]).draw();
}

$("#home-nav").on("click", function () {
    alterDiv("#home-div");
});

$("#config-nav").on("click", function () {
    alterDiv("#config-div");
});

$("#display-nav").on("click", function () {
    alterDiv("#display-div");
});

function alterDiv(divID) {
    var divList = ['#home-div', '#config-div', '#display-div'];
    $.each(divList, function (index, value) {
        if (value === divID)
            $(divID).show("slow");
        else {
            $(value).hide("slow");
        }
    });
}

$(document).on("click", "#proceed-to-config", function () {
    alterDiv("#config-div");
});

$(document).on("click", "#back-to-config", function () {
    alterDiv("#config-div");
});

$("#sMerits").change(function () {
    if ($('#sMerits').is(":checked"))
        $("#startingMerits").prop("disabled", false);
    else
        $("#startingMerits").prop("disabled", true);
});

$("#wMeritRange").change(function () {
    changeRadio("wmr");
    $("#weeklyMeritsFrom").prop("disabled", false);
    $("#weeklyMeritsTo").prop("disabled", false);
});

$("#cMerits").change(function () {
    changeRadio("#customMerits");
});

$("#wMerits").change(function () {
    changeRadio("#weeklyMerits");
});

$("#rRank").change(function () {
    changeRadio("#retainRank");
    $("#retainRank").removeClass("disabled");
});

function changeRadio(divID) {
    var divList = ['#retainRank', '#customMerits', '#weeklyMerits', '#weeklyMeritsFrom', '#weeklyMeritsTo'];

    $.each(divList, function (index, value) {
        if (value === divID)
            $(divID).prop("disabled", false);
        else {
            $(value).prop("disabled", true);
        }
        $("#retainRank").addClass("disabled");
    });
}

$(document).ready(function () {

    alterDiv("#home-div");
    populateRatingList();
    initMeritTable();

    dTable = $('#meritsTable').DataTable({
        "paging": false,
        "searching": false,
        "bSort": false,
        "bInfo": false
    });

    $(document).on("click", "#proceed-to-display", function () {

        dTable.clear();

        var mpw = 0;
        var numCycles = document.getElementById("numCycles").value;
        var from = 0, to = 0;
        var startingMerits = 0;
        var decay = 0.5;
        var week = 1;
        var currMerits = 0;

        if ($('#sMerits').is(':checked'))
            startingMerits = parseInt(document.getElementById("startingMerits").value);

        if ($('#wMerits').is(':checked')) {
            mpw = document.getElementById("weeklyMerits").value;
        }
        else if ($('#wMeritRange').is(':checked')) {
            from = document.getElementById("weeklyMeritsFrom").value;
            to = document.getElementById("weeklyMeritsTo").value;
            mpw = (Math.floor(Math.random() * (to - from + 1)) + parseInt(from));

        }
        else if ($('#rRank').is(':checked')) {
            initRankList();
            var rank = parseInt($("#retainRank option:selected").text());
            var deficit = rankList[rank] - Math.ceil(startingMerits / 2);
            if (deficit > 0)
                mpw = deficit;
            else
                mpw = 0;
        }
        if (numCycles > 100 || numCycles < 1)
            swal({title: "Invalid Value", confirmButtonColor: "#ce5317", html: "true", text: "Please enter a valid number of Cycles (1-100)", confirmButtonText: "Ok"});
        else if (startingMerits < 0 || startingMerits > 99999)
            swal({title: "Invalid Value", confirmButtonColor: "#ce5317", html: "true", text: "Please enter a valid number of Merits (1-99999)", confirmButtonText: "Ok"});
        else if (typeof mpw == 'undefined' || (mpw < 1 && $('#rRank').is(':checked') == false))
            swal({title: "Invalid Value", confirmButtonColor: "#ce5317", html: "true", text: "Please enter a valid non 0 value in the Corresponding Fields.", confirmButtonText: "Ok"});

        else {
            meritList = {};
            resultList = {};

            week = 1;

            if ($('#sMerits').is(':checked'))
                currMerits = document.getElementById("startingMerits").value;
            else
                currMerits = mpw;

            meritList[week] = new meritObject(currMerits, 1);
            resultList[week] = new resultObject(week, currMerits, currMerits);

            var stop = false;
            while (stop !== true && week < numCycles) {
                week++;
                $.each(meritList, function (index, obj) {
                    if (obj.cycle < 4) {
                        obj.cycle++;
                        obj.value *= decay;
                    }
                    else {
                        obj.value = 0;
                        //meritList[index] = null;
                    }
                });

                if ($('#wMeritRange').is(':checked'))
                    mpw = (Math.floor(Math.random() * (to - from + 1)) + parseInt(from));
                else if ($('#rRank').is(':checked')) {
                    mpw = 0;
                    var def2 = rankList[rank] - currMerits;
                    if (def2 > 0)
                        mpw = Math.ceil(currMerits * decay) + def2;
                }

                meritList[week] = new meritObject(mpw, 1);
                currMerits = calcCurrMerits();

                var diff = rankList[rank] - currMerits;
                if ($('#rRank').is(':checked') && diff > 0)
                {
                    mpw += diff;
                    meritList[week] = new meritObject(mpw, 1);
                    currMerits = calcCurrMerits();
                }

                if (week === numCycles) {
                    stop = true;
                    break;
                }
                else
                    resultList[week] = new resultObject(week, mpw, currMerits);
            }
            meritList = {};
            alterDiv("#display-div");

            var maxMerits = 0;
            $.each(resultList, function (index, obj) {
                dTable.row.add([obj.cycle, resultList[index].merits, obj.totalMerits]).draw();
                maxMerits = obj.totalMerits;
            });

            var rating = 1;
            if (maxMerits >= 100 && maxMerits < 750)
                rating = 2;
            else if (maxMerits >= 750 && maxMerits < 1500)
                rating = 3;
            else if (maxMerits >= 1500 && maxMerits < 10000)
                rating = 4;
            else if (maxMerits >= 10000)
                rating = 5;
            
            if ($('#wMerits').is(':checked'))
                $("#results").html("<p>You are capped at <u><strong>" + maxMerits + " Merits</strong></u>, thus retaining Rating: <u><strong>" + rating + "</strong></u></p>");
            else if ($('#rRank').is(':checked'))
                $("#results").html("<p>Following the table above you can maintain <u><strong>" + maxMerits + "</strong></u> Weekly Merits in order to retain Rating: <u><strong>" + rating + "</strong></u> over the next <u><strong>" + numCycles + "</strong></u> Weeks</p>");
            else
                $("#results").html("<p>You have acquired <u><strong>" + maxMerits + "</strong></u> Merits over <u><strong>" + numCycles + "</strong></u> Weeks, thus retaining Rating: <u><strong>" + rating + "</strong></u></p>");

            $("#rewards").html("Weekly Bonus: <u><strong>" + ratingList[rating].wBonus + " Cr" + "</strong></u></strong> | ");
            $("#rewards").append("Preparation Nominations: <u><strong>" + ratingList[rating].pNoms + "</strong></u></strong> | ");
            $("#rewards").append("Power Commodity Allocation every half hour: <u><strong>" + ratingList[rating].pCom + "</strong></u></strong>");
            $("#rewards").append("<hr>");
        }
    });
});