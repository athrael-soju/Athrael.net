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
var elementList = {};
var graphData = [];
var powerColorMap = {};
var latestCycle = 0;

function print(msg) {
    // shows console msg if debug is on else does nothing
    if (typeof console !== 'undefined') {
        console.log(msg);
    }
}

function initTabs() {
    $(function () {
        $("#tabs").tabs({
        });
    });
}

function initPowerColorMap() {
    powerColorMap = {"Hudson": "#fc0100", "Winters": "#ff8100", "Arissa": "#7e02f6", "Aisling": "#208fe0",
        "Torval": "#0044ff", "Patreus": "#06f9ff", "Mahon": "#00ff00", "Sirius": "#c4ff03", "Archon": "#81fa00",
        "Antal": "#ffff07"};
}

var Power = function (name) {
    this.type = "Power";
    this.name = name;
    this["data"] = {};
    this["Preparation"] = {};
    this["Fortification"] = {};
    this["Expansion"] = {};
    this["Undermining"] = {};
    this["Opposition"] = {};
};

var Analysis = function (name) {
    this.type = "Analysis";
    this.name = name;
    this["data"] = {};
};

function initMultiSelect() {
    $('#powers-list').multiselect({
        buttonWidth: '240',
        includeSelectAllOption: true
    });
}

function initAnalysis() {
    elementList["Overview"] = new Analysis("Overview");
    elementList["Intro"] = new Analysis("Intro");
    elementList["Body"] = new Analysis("Body");
    elementList["Conclusion"] = new Analysis("Conclusion");
    elementList["Sources"] = new Analysis("Sources");
    elementList["Writer"] = new Analysis("Writer");
}

function initPower() {
    elementList["Hudson"] = new Power("Hudson");
    elementList["Winters"] = new Power("Winters");
    elementList["Arissa"] = new Power("Arissa");
    elementList["Aisling"] = new Power("Aisling");
    elementList["Torval"] = new Power("Torval");
    elementList["Patreus"] = new Power("Patreus");
    elementList["Mahon"] = new Power("Mahon");
    elementList["Sirius"] = new Power("Sirius");
    elementList["Archon"] = new Power("Archon");
    elementList["Antal"] = new Power("Antal");

    elementList["Alliance"] = new Power("Alliance");
    elementList["Federation"] = new Power("Federation");
    elementList["Empire"] = new Power("Empire");
    elementList["Independents"] = new Power("Independents");
}

function initCurrentCycle() {
    // Get current cycle by number of entries in a Power's activity.
    latestCycle = Object.keys(elementList["Aisling"]["Preparation"]).length;
}

function updatePower() {
    $.each(cycle_activity[0], function (cycle, value) {
        $.each(value, function (index, data) {
            $.each(elementList, function (index, value) {
                elementList[index][data.Activity][cycle] = data[index];
            });
        });
    });
}

function updateAnalysis() {
    $.each(cycle_analysis[0], function (cycle, value) {
        $.each(value, function (index, data) {
            $.each(elementList, function (index, value) {
                elementList[index]["data"][cycle] = data[index];
            });
        });
    });
}

function writeAnalysis() {
    var numCycles = latestCycle;

    var cycleData = "";

    cycleData += "<div class='scroller'>";
    cycleData += "<ul>";

    for (i = numCycles; i > 0; i--) {
        cycleData += "<li><a href='#tab-" + i + "'>Cycle " + i + "</a></li>";
    }
    cycleData += "</ul>";
    cycleData += "</div>";

    var tabsWidth = numCycles * 100 + "px";

    $("#tabs").append(cycleData);
    $("#tabs ul").css("width", tabsWidth);

    $.each(elementList["Mahon"]["data"], function (cycle, data) {
        cycleData = "";
        cycleData += "<div id='tab-" + cycle + "'>";

        if (elementList["Overview"]["data"][cycle] !== "") {
            cycleData += "<h3 class='powers-h'>Overview</h3>";

            var overviewText = elementList["Overview"]["data"] [cycle];
            if (overviewText.length < 100)
                cycleData += "<center>" + overviewText + "</center>";
            else
                cycleData += overviewText;
            cycleData += "<hr>";
        }

        cycleData += "<div class='powers-div'>";

        var extension = "", iconType = "";
        $.each(elementList, function (index, value) {
            if (index === "Alliance" || index === "Federation" || index === "Empire" || index === "Independents") {
                extension = ".png";
                iconType = "factions";
            } else {
                extension = ".jpg";
                iconType = "powers";
            }
            if (elementList[index]["data"][cycle] != null && elementList[index]["data"][cycle] !== "" && value.type === "Power") {
                cycleData += "<h3 class='powers-h' style='color:" + powerColorMap[index] + "'>" + index + "</h3>";
                cycleData += "<p class='powers-p'><img class = 'powers-img'src='img/" + iconType + "/" + index + extension + "'> "
                        + elementList[index]["data"][cycle] + "</p>";
            }
        });
        cycleData += "</div>";
        cycleData += "<div>";

        var sectionTitles = {"Body": "Guesses & Predictions", "Conclusion": "Final Words", "Sources": "Sources"};
        $.each(sectionTitles, function (index, value) {
            if (elementList[index]["data"][cycle] !== "") {
                cycleData += "<h3 class='powers-h'>" + value + "</h3>";
                cycleData += elementList[index]["data"][cycle];
                cycleData += "<hr>";
            }
        });
        if (elementList["Writer"]["data"][cycle] !== "") {
            cycleData += "<h3 class='powers-h'>Written By</h3>";
            cycleData += "<div align='center'>" + elementList["Writer"]["data"][cycle] + "</div>";
            cycleData += "</div>";
        } else {
            cycleData += "<br /><div align='center'><strong>Analysis in progress. Please check back later for updates...</strong></div>"
        }
        $("#tabs").append(cycleData);
    });
}

$("#ranks-nav").on("click", function () {
    switchDiv("#ranks-div");
});

$("#data-analysis-nav").on("click", function () {
    switchDiv("#data-analysis-div");
});

$("#power-analysis-nav").on("click", function () {
    switchDiv("#power-analysis-div");
});

$(document).on("click", "#proceed-to-data-analysis", function () {
    switchDiv("#data-analysis-div");
});

$(document).on("click", "#proceed-to-power-analysis", function () {
    switchDiv("#power-analysis-div");
});

$(document).on("click", "#back-to-data-analysis", function () {
    switchDiv("#data-analysis-div");
});

function sortDesc(a, b) {
    //  Sort by Descending order.
    return ((a.value > b.value) ? -1 : ((a.value < b.value) ? 1 : 0));
}

function switchDropDownMenu(divID) {
    var divList = ['#latestEcon-div', '#latestAct-div', '#cumulativeAct-div', '#latestRanks-div'];
    $.each(divList, function (index, value) {
        if (value === divID)
            $(divID).show("slow");
        else {
            $(value).hide("slow");
        }
    });
}

function switchDiv(divID) {
    var divList = ['#ranks-div', '#data-analysis-div', '#power-analysis-div'];
    $.each(divList, function (index, value) {
        if (value === divID)
            $(divID).show("slow");
        else {
            $(value).hide("slow");
        }
    });
}

function writeRanks(rankList, factor, cycle) {
    var rank = 1;
    var rankData = "<hr><h1>Cycle " + cycle + ": " + factor + "</h1>";
    rankData += "<hr>";
    $.each(rankList, function (index, value) {
        rankData += "<h2 class='powers-h' style='color:" + powerColorMap[value.name] + "'>[" + rank + "] " + value.name + "</h2>";
        rankData += "<img style='height: 35%; width:35%; ' src='img/powers/" + value.name + ".jpg'>";
        rankData += "<h4> " + factor + ": <strong><u>" + value.value + "</u><strong></h4>";
        rankData += "<hr>";
        rank++;
    });
    $("#power-ranks").html(rankData);
}

function initRanks() {
    $("#rank-dropdown a").trigger("click");
}

function showSelectedPowersError() {
    swal({title: "Error!", confirmButtonColor: "#D2B48C", html: "true", text: "Please Select one or more powers to display the chart.", confirmButtonText: "Ok!"});
}

function initDropdownData() {
    $('#latestRanks-dropdown a').click(function (a) {
        a.preventDefault();
        var selectedPowers = $('#powers-list').val();
        if (selectedPowers === null)
            showSelectedPowersError();
        else {
            var activity = $(this).text();
            var activityList = [];
            var actMap = {"Controlled Systems": "control", "Taking Control": "takingControl",
                "Contested Systems": "contested", "Systems in Turmoil": "turmoil", "Blocked Systems": "blocked"};

            $("#latestRanks").html(activity);
            $("#cumulativeAct").html("Cumulative Military Activity");
            $("#latestEcon").html("Latest Economic Activity");
            $("#latestAct").html("Latest Military Activity");

            var cycle = latestCycle;

            activityList = cycle_ranks[cycle][actMap[activity]];

            drawPieChart(selectedPowers, activity, activityList, cycle);
        }
    });

    $('#latestEcon-dropdown a').click(function (a) {
        a.preventDefault();
        var activity = $(this).text();
        var cycle = latestCycle;
        var selectedPowers = $('#powers-list').val();
        if (selectedPowers === null)
            showSelectedPowersError();
        else {
            var econList = [];
            var econMap = {"ES": "exploitedList", "CS": "controlledList", "Income": "incomeList",
                "Upkeep": "upkeepList", "Overhead": "overheadList", "AvailableCC": "availableList"};

            econList["exploitedList"] = [];
            econList["controlledList"] = [];
            econList["incomeList"] = [];
            econList["upkeepList"] = [];
            econList["overheadList"] = [];
            econList["availableList"] = [];

            if (activity === "Income, Upkeep & Overhead")
                $("#latestEcon").html("Income, Upkeep<br /> & Overhead");
            else
                $("#latestEcon").html(activity);
            $("#cumulativeAct").html("Cumulative Military Activity");
            $("#latestAct").html("Latest Military Activity");
            $("#latestRanks").html("Latest Power Ranks");

            $.each(cycle_economy[cycle], function (index, val) {
                $.each(val, function (powerName, value) {
                    if (jQuery.inArray(powerName, selectedPowers) !== -1) {
                        econList[econMap[index]].push(value);
                    }
                });
            });
            drawBarChart(selectedPowers, activity, econList, cycle);
        }
    });

    $('#rank-dropdown a').click(function (a) {
        a.preventDefault();
        var factor = $(this).text();
        $("#rank-factor").html(factor);
        var factorList = [];
        var rankList = [];
        var cycle = latestCycle;
        var factorMap = {"Controlled Systems": "control", "Taking Control": "takingControl",
            "Contested Systems": "contested", "Systems in Turmoil": "turmoil", "Blocked Systems": "blocked"};

        factorList = cycle_ranks[cycle][factorMap[factor]];

        $.each(factorList, function (name, value) {
            rankList.push({
                name: name,
                value: value
            });
        });

        rankList.sort(sortDesc);
        writeRanks(rankList, factor, cycle);
    });

    $('#latestAct-dropdown a').click(function (a) {
        a.preventDefault();
        var activity = $(this).text();
        var selectedPowers = $('#powers-list').val();
        if (selectedPowers === null)
            showSelectedPowersError();
        else {
            var controlList = [];
            controlList["prepList"] = [];
            controlList["fortList"] = [];
            controlList["opList"] = [];
            controlList["expList"] = [];
            controlList["undList"] = [];

            if (activity === "Preparation, Fortification & Expansion")
                $("#latestAct").html("Preparation, Fortification<br /> & Expansion");
            else
                $("#latestAct").html(activity);
            $("#cumulativeAct").html("Cumulative Military Activity");
            $("#latestEcon").html("Latest Economic Activity");
            $("#latestRanks").html("Latest Power Ranks");

            var cycle = latestCycle;

            $.each(elementList, function (name, value) {
                if (jQuery.inArray(value["name"], selectedPowers) !== -1) {
                    controlList["prepList"].push(value["Preparation"][Object.keys(value["Preparation"]).length]);
                    controlList["fortList"].push(value["Fortification"][Object.keys(value["Fortification"]).length]);
                    controlList["opList"].push(value["Opposition"][Object.keys(value["Opposition"]).length]);
                    controlList["expList"].push(value["Expansion"][Object.keys(value["Expansion"]).length]);
                    controlList["undList"].push(value["Undermining"][Object.keys(value["Undermining"]).length]);
                }
            });
            drawStackedChart(selectedPowers, activity, controlList, cycle);
        }
    });

    $('#cumulativeAct-dropdown a').click(function (a) {
        a.preventDefault();
        var selectedPowers = $('#powers-list').val();
        if (selectedPowers === null)
            showSelectedPowersError();
        else {
            var activity = $(this).text();
            $("#cumulativeAct").html(activity);
            $("#latestAct").html("Latest Military Activity");
            $("#latestEcon").html("Latest Economic Activity");
            $("#latestRanks").html("Latest Power Ranks");

            var graphDataList = [];
            var graphData = [];

            $.each(elementList, function (name, value) {
                if (value.type === "Power") {
                    $.each(value[activity], function (index, value) {
                        graphData.push(value);
                    });
                    graphDataList.push([name, graphData]);
                }
                graphData = [];
            });
            drawLineChart(graphDataList, activity, selectedPowers);
        }
    });

    $('#selectChart-dropdown a').click(function (a) {
        a.preventDefault();
        var activity = $(this).text();
        var actMap = {"Cumulative Military Activity": "#cumulativeAct-div", "Latest Military Activity": "#latestAct-div",
            "Latest Economic Activity": "#latestEcon-div", "Latest Power Ranks": "#latestRanks-div"}

        switchDropDownMenu(actMap[activity]);

        $("#cumulativeAct").html("Cumulative Military Activity");
        $("#latestAct").html("Latest Military Activity");
        $("#latestEcon").html("Latest Economic Activity");
        $("#latestRanks").html("Latest Power Ranks");
    });
    switchDropDownMenu("");
}

function del_cookie(name) {
    document.cookie = name + '=; expires=Thu, 10 Jun 1982 00:00:01 GMT;';
}

function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start === -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start === -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end === -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

function checkCookie() {
    if (getCookie("cookie") === null) {
        //swal({title: "Welcome!", confirmButtonColor: "#D2B48C", html: "true", text: "The Powerplay Herald is dedicated in informing players about each Leader's performance in the Powerplay activities of Elite Dangerous by providing weekly Ranking, Performance Charts and Analysis for each Power.<br /><br /><i>This is a one time message.</i>", confirmButtonText: "Ok!"});
        swal({title: "Welcome!", confirmButtonColor: "#D2B48C", html: "true", text: "Denizens of Elite Dangerous: This message is to inform you that the Powerplay Herald is now retired. This means that the project will no longer be updated. Sorry for the inconvenience and I hope you enjoy your space travels!", confirmButtonText: "Ok!"});
        var expire = new Date();
        expire = new Date(expire.getTime() + 7776000000);
        document.cookie = "cookie=here; expires=" + expire;
    }
    del_cookie("cookie");
}

$(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a')) {
        $(this).collapse('hide');
    }
});

$(document).ready(function () {
    checkCookie();

    initPower();
    updatePower();

    initCurrentCycle();

    initMultiSelect();
    initPowerColorMap();
    initDropdownData();
    initTabs();
    initRanks();

    initAnalysis();
    updateAnalysis();
    writeAnalysis();
});
