/*
 Copyright  (c) 2016 Athrael

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
 */

var weaponBaseUpgradeChanceList = [];
var weaponFailstackIncrease = [];
var weaponFailstackLimit = [];

var armorBaseUpgradeChanceList = [];
var armorFailstackIncrease = [];
var armorFailstackLimit = [];

var armorDurabilityList = [], weaponDurabilityList = [];
var forceWeaponList = [], forcedArmorList = [];

var captureRandomRolls = [];
var cfg;
var connectSlider;
var existingFailStacks;

var enchantRange = [], blackStonesUsed = [], costPerEnchant = [];


var configObject = function () {
    this.itemValue = 0;
    this.stoneValue = 0;
    this.enchantItemType = "";
    this.enchantMethod = "";
    this.enchantFrom = 0;
    this.enchantTo = 0;
};

function print(msg) {
    // shows console msg if debug is on else does nothing
    if (typeof console !== 'undefined') {
        console.log(msg);
    }
}

function switchDiv(divID) {
    var divList = ['#config-div', '#enchant-div', '#anl-div', '#main-div'];
    $.each(divList, function (index, value) {
        if (value === divID)
            $(divID).show("slow");
        else {
            $(value).hide("slow");
        }
        $("#myCarousel").hide("slow");
    });
}

function getStDev(values) {
    var avg = average(values);

    var squareDiffs = values.map(function (value) {
        var diff = value - avg;
        var sqrDiff = diff * diff;
        return sqrDiff;
    });

    var avgSquareDiff = average(squareDiffs);

    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
}

function average(data) {
    var sum = data.reduce(function (sum, value) {
        return sum + value;
    }, 0);

    var avg = sum / data.length;
    return avg;
}

$(document).ready(function () {
    $(document).on('click', '.navbar-collapse.in', function (e) {
        if ($(e.target).is('a')) {
            $(this).collapse('hide');
        }
    });

    $("#main-nav").on("click", function () {
        switchDiv("#main-div");
        $("#myCarousel").show("slow");

    });

    $("#config-nav").on("click", function () {
        switchDiv("#config-div");
    });

    $("#enchant-nav").on("click", function () {
        switchDiv("#enchant-div");
    });

    $("#anl-nav").on("click", function () {
        switchDiv("#anl-div");
        $("#testTabs").tab('show');
    });

    $('input[type=radio][name=rarityType]').change(function () {

        if (this.value == 'Green') {
            $("#acquired-by-div").hide('slow');
            $("#fragment-input-div").hide('slow');
            $("#equipment-input-div").show('slow');
        } else if (this.value == 'Blue' || this.value == 'Yellow') {
            $("#acquired-by-div").show('slow');

        }
    });

    $('input[type=radio][name=acquiredBy]').change(function () {
        if (this.value == 'acqByUpgrade') {
            $("#fragment-input-div").hide('slow');
            $("#equipment-input-div").show('slow');
        } else if (this.value == 'acqByDropOrMarket') {
            $("#fragment-input-div").show('slow');
            $("#equipment-input-div").hide('slow');
        }
    });

    $(document).on("click", "#proceed-to-config-button", function () {
        $("#config-nav").trigger("click");
        $("#main-div").hide("slow");
    });

    $(document).on("click", "#proceed-to-enchant-button", function () {

        cfg = new configObject();

        var acquiredBy = $("input[name = 'acquiredBy']:checked").val();
        var gearRarity = $("input[name = 'rarityType']:checked").val();

        if (gearRarity === "Green")
            cfg.itemValue = $("#itemMarketValue").val();
        else if (gearRarity === "Blue" || gearRarity === "Yellow") {
            if (acquiredBy === "acqByUpgrade")
                cfg.itemValue = $("#itemMarketValue").val();
            else if (acquiredBy === "acqByDropOrMarket")
                cfg.itemValue = $("#fragmentMarketValue").val();
        }

        cfg.stoneValue = $("#blackStoneMarketValue").val();
        cfg.enchantItemType = $('input[name=itemRadio]:checked').val();
        cfg.enchantMethod = $('input[name=methodRadio]:checked').val();
        if ((cfg.itemValue > 1000 || cfg.itemValue < 50) || (cfg.stoneValue > 1000 || cfg.stoneValue < 50))
            swal({
                title: "Error!",
                confirmButtonColor: "#D2B48C",
                html: "true",
                text: "Please Select a value between 50k-1000k for the Cost Breakdown.",
                confirmButtonText: "Ok!"
            });
        else {
            $("#enchant-nav a").show("slow");
            $("#enchant-nav").trigger("click");
            $("#enchant-button").trigger("click");
            $("#enchant-nav").show("slow");
        }
    });

    $(document).on("click", "#proceed-to-anl-button", function () {
        if ($("input[name = 'enchantMethod']:checked").val() === "RNG") {
            $("#anl-nav a").show("slow");
            $("#anl-nav").trigger("click");
            $("#anl-nav").show("slow");
        }
    });

    $(document).on("click", "#back-to-main-button", function () {
        $("#main-nav").trigger("click");
    });

    $(document).on("click", "#back-to-enchant-button", function () {
        $("#enchant-nav").trigger("click");
    });

    $(document).on("click", "#refine-button", function () {
        $("#config-nav").trigger("click");
    });

    $(document).on("click", "#enchant-button", function () {
        enchantRange = [];
        blackStonesUsed = [];
        costPerEnchant = [];

        enchant();

        drawEnchantChart("Single", enchantRange, blackStonesUsed, costPerEnchant, "#container");
        $('#enchant-content2').show("slow");

    });

    $(document).on("click", "#analyze-button", function () {

        var blackStonesUsedTotal = [];
        var costPerEnchantTotal = [];
        var bsStatsList = [], costStatsList = [];
        var numSims = $('#numOfSims').val();
        if (numSims < 5 || numSims > 100) {
            swal({
                title: "Error!",
                confirmButtonColor: "#D2B48C",
                html: "true",
                text: "Please Select a Simulation value between 5-100.",
                confirmButtonText: "Ok!"
            });
        }
        else {
            var luckiestEnchant = 1000000000, unluckiestEnchant = 0;
            var luckiestCost = 1000000000000, unluckiestCost = 0;
            var averageBS = 0, averageCost = 0;
            for (var i = 0; i < numSims; i++) {
                enchantRange = [];
                blackStonesUsed = [];
                costPerEnchant = [];

                enchant();

                blackStonesUsedTotal[i] = blackStonesUsed.reduce(function (a, b) {
                    return a + b;
                });

                costPerEnchantTotal[i] = (costPerEnchant[costPerEnchant.length - 1]);


                if (luckiestEnchant > blackStonesUsedTotal[i]) {
                    luckiestEnchant = blackStonesUsedTotal[i];
                    luckiestCost = costPerEnchantTotal[i];

                }
                if (unluckiestEnchant < blackStonesUsedTotal[i]) {
                    unluckiestEnchant = blackStonesUsedTotal[i];
                    unluckiestCost = costPerEnchantTotal[i];
                }

            }
            averageBS = (blackStonesUsedTotal.reduce(function (a, b) {
                    return a + b;
                })) / blackStonesUsedTotal.length;

            averageCost = (costPerEnchantTotal.reduce(function (a, b) {
                    return a + b;
                })) / costPerEnchantTotal.length;

            drawEnchantChart("Multiple", enchantRange, blackStonesUsedTotal, costPerEnchantTotal, "#container2");

            if ($("input[name = 'enchantMethod']:checked").val() === "RNG") {
                $('#rng-enchant').show("slow");
            } else
                $('#rng-enchant').hide("slow");

            bsStatsList.push(parseInt(averageBS));
            bsStatsList.push(parseInt(getStDev(blackStonesUsedTotal).toFixed(2)));
            bsStatsList.push(parseInt(luckiestEnchant));
            bsStatsList.push(parseInt(unluckiestEnchant));

            costStatsList.push(parseFloat(averageCost.toFixed(2)));
            costStatsList.push(parseFloat(getStDev(costPerEnchantTotal).toFixed(2)));
            costStatsList.push(parseFloat(luckiestCost));
            costStatsList.push(parseFloat(unluckiestCost));

            drawStatsChart(bsStatsList, costStatsList);

            $('#analysis-content').show("slow");
        }
    });

    $(document).on('keydown', '#blackStoneMarketValue, #itemMarketValue, #fragmentMarketValue', function (e) {
        var key = e.keyCode ? e.keyCode : e.which;

        if (!([8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
                (key == 65 && (e.ctrlKey || e.metaKey)) ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
                (key >= 96 && key <= 105)
            ))
            e.preventDefault();
    });
});

function initEnchantTables() {

    var tableContent = "";
    tableContent += "<thead>";
    tableContent += "<tr >";
    tableContent += "<th>Enchant Level</th>";
    tableContent += "<th>Base Chance</th>";
    tableContent += "<th>% Per Fail-Stack</th>";
    tableContent += "<th>Fail-Stack Cap</th>";
    tableContent += "<th>Success Cap</th>";
    tableContent += "<th>Forced Enchant</th>";
    tableContent += "</tr>";
    tableContent += "</thead>";

    $('#armorEnchantTable').html(tableContent);
    $('#weaponEnchantTable').html(tableContent);

    var armorEnchantTable = $('#armorEnchantTable').DataTable({
        "paging": false,
        "searching": false,
        "bSort": false,
        "bInfo": false
    });

    var weaponEnchantTable = $('#weaponEnchantTable').DataTable({
        "paging": false,
        "searching": false,
        "bSort": false,
        "bInfo": false
    });

    armorEnchantTable.row.add(["+1", "100%", "-", "-", "100%", "-"]).draw();
    armorEnchantTable.row.add(["+2", "100%", "-", "-", "100%", "-"]).draw();
    armorEnchantTable.row.add(["+3", "100%", "-", "-", "100%", "-"]).draw();
    armorEnchantTable.row.add(["+4", "100%", "-", "-", "100%", "-"]).draw();
    armorEnchantTable.row.add(["+5", "100%", "-", "-", "100%", "-"]).draw();
    armorEnchantTable.row.add(["+6", "20%", "2.5%", "13", "52.5%", "2, -10 dur"]).draw();
    armorEnchantTable.row.add(["+7", "17.5%", "2%", "14", "45.5%", "3, -10 dur"]).draw();
    armorEnchantTable.row.add(["+8", "16.25%", "1.75%", "14", "40.75%", "4, -10 dur"]).draw();
    armorEnchantTable.row.add(["+9", "15%", "1.5%", "15", "37.5%", "5, -20 dur"]).draw();
    armorEnchantTable.row.add(["+10", "12.5%", "1.25%", "16", "32.5%", "7, -30 dur"]).draw();
    armorEnchantTable.row.add(["+11", "11.25%", "1%", "17", "28.25%", "9, -40 dur"]).draw();
    armorEnchantTable.row.add(["+12", "10%", "0.75%", "18", "23.5%", "11, -50 dur"]).draw();
    armorEnchantTable.row.add(["+13", "7.5%", "0.63%", "20", "20.1%", "17, -60 dur"]).draw();
    armorEnchantTable.row.add(["+14", "5%", "0.5%", "25", "17.5%", "23, -70 dur"]).draw();
    armorEnchantTable.row.add(["+15", "2.5%", "0.5%", "25", "15%", "29, -100 dur"]).draw();
    armorEnchantTable.row.add(["PRI", "15%", "1.50%", "25", "52.5%", ""]).draw();
    armorEnchantTable.row.add(["DUO", "7.5%", "0.75%", "35", "33.75%", ""]).draw();
    armorEnchantTable.row.add(["TRI", "5%", "0.50%", "44", "27%", ""]).draw();
    armorEnchantTable.row.add(["TET", "2", "0.2556%", "90", "25%", ""]).draw();
    armorEnchantTable.row.add(["PEN", "1.5%", "0.15%", "124", "20.1%", ""]).draw();

    weaponEnchantTable.row.add(["+1", "100%", "-", "-", "100%", "-"]).draw();
    weaponEnchantTable.row.add(["+2", "100%", "-", "-", "100%", "-"]).draw();
    weaponEnchantTable.row.add(["+3", "100%", "-", "-", "100%", "-"]).draw();
    weaponEnchantTable.row.add(["+4", "100%", "-", "-", "100%", "-"]).draw();
    weaponEnchantTable.row.add(["+5", "100%", "-", "-", "100%", "-"]).draw();
    weaponEnchantTable.row.add(["+6", "100%", "-", "-", "100%", "-"]).draw();
    weaponEnchantTable.row.add(["+7", "100%", "-", "-", "100%", "-"]).draw();
    weaponEnchantTable.row.add(["+8", "20%", "2.5%", "13", "52.5%", "2 stones, -10 dur"]).draw();
    weaponEnchantTable.row.add(["+9", "17.5%", "2%", "14", "45.5%", "3 stones, -10 dur"]).draw();
    weaponEnchantTable.row.add(["+10", "15%", "1.5%", "15", "37.5%", "5 stones, -20 dur"]).draw();
    weaponEnchantTable.row.add(["+11", "12.5%", "1.25%", "16", "32.5%", "7 stones, -30 dur"]).draw();
    weaponEnchantTable.row.add(["+12", "10%", "0.75%", "18", "23.5%", "11 stones, -50 dur"]).draw();
    weaponEnchantTable.row.add(["+13", "7.5%", "0.63%", "20", "20.1%", "17 stones, -60 dur"]).draw();
    weaponEnchantTable.row.add(["+14", "5%", "0.5%", "25", "17.5%", "23 stones, -70 dur"]).draw();
    weaponEnchantTable.row.add(["+15", "2.5%", "0.5%", "25", "15%", "29 stones, -100 dur"]).draw();
    weaponEnchantTable.row.add(["PRI", "15%", "1.50%", "25", "52.5%", ""]).draw();
    weaponEnchantTable.row.add(["DUO", "7.5%", "0.75%", "35", "33.75%", ""]).draw();
    weaponEnchantTable.row.add(["TRI", "5%", "0.50%", "44", "27%", ""]).draw();
    weaponEnchantTable.row.add(["TET", "2", "0.2556%", "90", "25%", ""]).draw();
    weaponEnchantTable.row.add(["PEN", "1.5%", "0.15%", "124", "20.1%", ""]).draw();
}

function initWeaponLists() {
    for (var i = 1; i < 8; i++) {
        weaponBaseUpgradeChanceList[i] = 100;
        weaponFailstackIncrease[i] = 0;
        weaponFailstackLimit[i] = 0;
    }
    weaponBaseUpgradeChanceList[8] = 20;
    for (i = 9; i < 16; i++) {
        weaponBaseUpgradeChanceList[i] = (weaponBaseUpgradeChanceList[i - 1] - 2.5);
    }

    weaponFailstackIncrease[8] = 2.5;
    weaponFailstackIncrease[9] = 2;
    weaponFailstackIncrease[10] = 1.5;
    weaponFailstackIncrease[11] = 1.25;
    weaponFailstackIncrease[12] = 0.75;
    weaponFailstackIncrease[13] = 0.63;
    weaponFailstackIncrease[14] = 0.5;
    weaponFailstackIncrease[15] = 0.5;

    weaponFailstackLimit[8] = 13;
    weaponFailstackLimit[9] = 14;
    weaponFailstackLimit[10] = 15;
    weaponFailstackLimit[11] = 16;
    weaponFailstackLimit[12] = 18;
    weaponFailstackLimit[13] = 20;
    weaponFailstackLimit[14] = 25;
    weaponFailstackLimit[15] = 25;
}

function initArmorLists() {
    for (var i = 1; i < 6; i++) {
        armorBaseUpgradeChanceList[i] = 100;
        armorFailstackIncrease[i] = 0;
        armorFailstackLimit[i] = 0;
    }
    armorBaseUpgradeChanceList[6] = 20;
    for (i = 7; i < 16; i++) {
        armorBaseUpgradeChanceList[i] = (armorBaseUpgradeChanceList[i - 1] - 2.5);
    }

    armorFailstackIncrease[6] = 2.5;
    armorFailstackIncrease[7] = 2;
    armorFailstackIncrease[8] = 1.75;
    armorFailstackIncrease[9] = 1.5;
    armorFailstackIncrease[10] = 1.25;
    armorFailstackIncrease[11] = 1;
    armorFailstackIncrease[12] = 0.75;
    armorFailstackIncrease[13] = 0.63;
    armorFailstackIncrease[14] = 0.5;
    armorFailstackIncrease[15] = 0.5;

    armorFailstackLimit[6] = 13;
    armorFailstackLimit[7] = 14;
    armorFailstackLimit[8] = 14;
    armorFailstackLimit[9] = 15;
    armorFailstackLimit[10] = 16;
    armorFailstackLimit[11] = 17;
    armorFailstackLimit[12] = 18;
    armorFailstackLimit[13] = 20;
    armorFailstackLimit[14] = 25;
    armorFailstackLimit[15] = 25;
}

function initDurabilityLists() {
    for (i = 1; i < 8; i++) {
        armorDurabilityList[i] = 0;
        weaponDurabilityList[i] = 0;
    }

    armorDurabilityList[6] = 10;
    armorDurabilityList[7] = 10;
    armorDurabilityList[8] = 10;
    armorDurabilityList[9] = 20;
    armorDurabilityList[10] = 30;
    armorDurabilityList[11] = 40;
    armorDurabilityList[12] = 50;
    armorDurabilityList[13] = 60;
    armorDurabilityList[14] = 70;
    armorDurabilityList[15] = 100;

    weaponDurabilityList[8] = 10;
    weaponDurabilityList[9] = 20;
    weaponDurabilityList[10] = 30;
    weaponDurabilityList[11] = 40;
    weaponDurabilityList[12] = 50;
    weaponDurabilityList[13] = 60;
    weaponDurabilityList[14] = 70;
    weaponDurabilityList[15] = 100;
}

function initForcedEnchantLists() {
    for (i = 1; i < 8; i++) {
        forcedArmorList[i] = 1;
        forceWeaponList[i] = 1;
    }

    forcedArmorList[6] = 2;
    forcedArmorList[7] = 3;
    forcedArmorList[8] = 4;
    forcedArmorList[9] = 5;
    forcedArmorList[10] = 7;
    forcedArmorList[11] = 9;
    forcedArmorList[12] = 11;
    forcedArmorList[13] = 17;
    forcedArmorList[14] = 23;
    forcedArmorList[15] = 29;

    forceWeaponList[8] = 2;
    forceWeaponList[9] = 3;
    forceWeaponList[10] = 5;
    forceWeaponList[11] = 7;
    forceWeaponList[12] = 11;
    forceWeaponList[13] = 17;
    forceWeaponList[14] = 23;
    forceWeaponList[15] = 29;

}

function enchant() {
    var randomValue;
    var currentFailStacks = 0;
    var currentEnchantChance = 0;
    var enchantItemType = $("input[name = 'enchantType']:checked").val();
    var enchantFrom = parseInt($("#slider-limit-value-min").text());
    var enchantTo = parseInt($("#slider-limit-value-max").text());
    var gearRarity = $("input[name = 'rarityType']:checked").val();
    var acquiredBy = $("input[name = 'acquiredBy']:checked").val();
    var repairMultiplier = 0;
    var enchantAt = enchantFrom;
    var bsUsed = 0;
    var repairsCost = 0;
    var blackStoneCost = 0;
    var totalCost = 0;
    var totalDurabilityLost = 0;

    if (gearRarity === "Green") {
        repairMultiplier = 10;
        //cfg.itemValue = $("#itemMarketValue").val();
    }
    else if (gearRarity === "Blue" || gearRarity === "Yellow") {
        if (acquiredBy === "acqByUpgrade")
            repairMultiplier = 10;
        else if (acquiredBy === "acqByDropOrMarket")
            repairMultiplier = 1;
    }

    if (enchantItemType === "Weapon") {
        currentEnchantChance = weaponBaseUpgradeChanceList[1];
    } else if (enchantItemType === "Armor") {
        var currentEnchantChance = armorBaseUpgradeChanceList[1];
    }
    var enchantMethod = $("input[name = 'enchantMethod']:checked").val();

    if (enchantMethod === "RNG") {
        $("#proceed-to-anl-button").value = "Analysis <span class='glyphicon glyphicon-arrow-right'></span>";
        $("#proceed-to-anl-button").attr("disabled", false);
        while (enchantAt < enchantTo) {
            randomValue = Math.random() * 100;
            captureRandomRolls[enchantAt + 1] = randomValue;
            if (randomValue >= 0 && randomValue <= currentEnchantChance) {
                bsUsed += currentFailStacks + 1;
                blackStoneCost += ((currentFailStacks + 1) * cfg.stoneValue * 1000) / 1000000;
                repairsCost += (((currentFailStacks) * 5) / repairMultiplier * cfg.itemValue * 1000) / 1000000;
                totalDurabilityLost += currentFailStacks * 5;
                totalCost = (repairsCost + blackStoneCost);
                enchantAt++;
                blackStonesUsed.push(currentFailStacks + 1);
                costPerEnchant.push(parseFloat(totalCost.toFixed(2)));
                currentFailStacks = 0;
                if (enchantItemType === "Weapon")
                    currentEnchantChance = weaponBaseUpgradeChanceList[enchantAt + 1];
                else if (enchantItemType === "Armor")
                    currentEnchantChance = armorBaseUpgradeChanceList[enchantAt + 1];
            } else {
                currentFailStacks++;
                if (enchantItemType === "Weapon") {
                    if (currentFailStacks <= weaponFailstackLimit[enchantAt + 1]) {
                        currentEnchantChance += weaponFailstackIncrease[enchantAt + 1];
                    }
                } else if (enchantItemType === "Armor")
                    if (currentFailStacks <= armorFailstackLimit[enchantAt + 1]) {
                        currentEnchantChance += armorFailstackIncrease[enchantAt + 1];
                    }
            }
        }
    } else if (enchantMethod === "Forced") {
        $("#proceed-to-anl-button").value = "Analysis <span class='glyphicon glyphicon-ban-circle'></span>";
        $("#proceed-to-anl-button").attr("disabled", true);
        var currentBsCost = 0;
        var currentRepairCost = 0;

        for (var i = enchantFrom + 1; i <= enchantTo; i++) {
            var durability = [], bscost = [];
            if (enchantItemType === "Weapon") {
                durability = weaponDurabilityList[i];
                bscost = forceWeaponList[i];
            } else if (enchantItemType === "Armor") {
                durability = armorDurabilityList[i];
                bscost = forcedArmorList[i];
            }
            totalDurabilityLost += durability;
            currentRepairCost = ((durability) / repairMultiplier * cfg.itemValue * 1000) / 1000000;
            currentBsCost = (bscost * cfg.stoneValue * 1000) / 1000000;
            if (enchantItemType === "Weapon") {
                bsUsed += forceWeaponList[i];
                blackStonesUsed.push(forceWeaponList[i]);
            } else if (enchantItemType === "Armor") {
                bsUsed += forcedArmorList[i];
                blackStonesUsed.push(forcedArmorList[i]);
            }

            blackStoneCost += currentBsCost;
            repairsCost += currentRepairCost;
            totalCost = blackStoneCost + repairsCost;
            costPerEnchant.push(totalCost);
        }
    }
    $("#itemType").val(enchantItemType);
    $("#range").val("From " + "+" + enchantFrom + " To +" + enchantTo);
    $("#durabilityLost").val(totalDurabilityLost);
    $("#blackStonesUsed").val(bsUsed);
    $("#costOfblackStones").val(blackStoneCost.toFixed(2));
    $("#costOfWeaponRepairs").val(repairsCost.toFixed(2));
    $("#totalCost").val(totalCost.toFixed(2));

    var numEnchants = enchantTo - enchantFrom;
    for (var i = 0; i <= numEnchants; i++) {
        enchantRange[i] = enchantFrom + 1;
        enchantFrom++;
    }
}

function initSlider() {
    connectSlider = document.getElementById('connect');

    noUiSlider.create(connectSlider, {
        start: [0, 15],
        step: 1,
        connect: false,
        range: {
            'min': 0,
            'max': 15
        }
    });
}

function runSlider() {
    var connectBar = document.createElement('div'),
        connectBase = connectSlider.querySelector('.noUi-base');

// Give the bar a class for styling and add it to the slider.
    connectBar.className += 'connect';
    connectBase.appendChild(connectBar);

    connectSlider.noUiSlider.on('update', function (values, handle, a, b, handlePositions) {

        var offset = handlePositions[handle];

        // Right offset is 100% - left offset
        if (handle === 1) {
            offset = 100 - offset;
        }

        // Pick left for the first handle, right for the second.
        connectBar.style[handle ? 'right' : 'left'] = offset + '%';
    });

    var limitFieldMin = document.getElementById('slider-limit-value-min');
    var limitFieldMax = document.getElementById('slider-limit-value-max');

    connectSlider.noUiSlider.on('update', function (values, handle) {
        (handle ? limitFieldMax : limitFieldMin).innerHTML = "+" + parseInt(values[handle]);
    });
}

$(document).ready(function () {
    $("#tabs").tabs();
    $("#resultTabs").tabs();

    initSlider();
    runSlider();

    initEnchantTables();

    initWeaponLists();
    initArmorLists();

    initDurabilityLists();
    initForcedEnchantLists();


});