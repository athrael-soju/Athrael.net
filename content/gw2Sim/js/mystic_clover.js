/*
 * 
 * Material Drop Percentages (from Wikipedia)
 * 
 * 
 10x
 725	225	35	39	44	32	39	27	37	32	37	26	42	33	8	22	10	7	9	6	15	 
 31.03%	4.83%	5.38%	6.07%	4.41%	5.38%	3.72%	5.1%	4.41%	5.1%	3.59%	5.79%	4.55%	1.1%	3.03%	1.38%	0.97%	1.24%	0.83%	2.07%	
 Clover	Blood	Bone	Claw	Dust	Fang	Scale	Totem	Venom	Bolt	Ingot	Leather	Wood	Ecto	Lodestone	Putrid	Shard	Coin	Crystal	Treasure	
 
 1x
 6206	1912	303	319	355	295	312	372	335	327	294	267	316	283	73	164	40	70	56	60	53	 
 30.81%	4.88%	5.14%	5.72%	4.75%	5.03%	5.99%	5.4%	5.27%	4.74%	4.3%	5.09%	4.56%	1.18%	2.64%	0.64%	1.13%	0.9%	0.97%	0.85%	
 Clover	Blood	Bone	Claw	Dust	Fang	Scale	Totem	Venom	Bolt	Ingot	Leather	Wood	Ecto	Lodestone	Putrid	Shard	Coin	Crystal	Treasure	
 */

var cloverMap = new Map();

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var rangeObject = function (from, to, type) {
    this.type = type;
    this.from = from;
    this.to = to;
};

var getMapValue = function (key) {
    return cloverMap[key];
};

var getMaterialAmounts = function (type) {
    if (type == "A")
        return new rangeObject(1, 3, null);
    else if (type == "B")
        return new rangeObject(2, 4, null);
    else if (type == "C")
        return new rangeObject(5, 5, null);
    else if (type == "D")
        return new rangeObject(2, 2, null);
    else if (type == "E")
        return new rangeObject(1, 1, null);
};

var getOtherValue = function (num) {
    if (num <= 7.8125)
        return "24335";//"Pile of Putrid Essence";
    else if (num > 7.8125 && num <= 15.625)
        return "24310";//"Onyx Lodestone";
    else if (num > 15.625 && num <= 23.4375)
        return "24315";//"Molten Lodestone";
    else if (num > 23.4375 && num <= 31.25)
        return "24320";//"Glacial Lodestone"
    else if (num > 31.25 && num <= 39.0625)
        return "24325";//"Destroyer Lodestone";
    else if (num > 39.0625 && num <= 46.875)
        return "24330";//"Crystal Lodestone";
    else if (num > 46.875 && num <= 54.6875)
        return "24340";//"Corrupted Lodestone";
    else if (num > 54.6875 && num <= 62.5)
        return "24305";//"Charged Lodestone";
    return "19721";//"Glob of Ectoplasm";
};

cloverMap["24358"] = (new rangeObject(1, 5, "B")); //Ancient Bone
cloverMap["24351"] = (new rangeObject(getMapValue("24358").to + 1, getMapValue("24358").to + 5, "B")); //Vicious Claw
cloverMap["24277"] = (new rangeObject(getMapValue("24351").to + 1, getMapValue("24351").to + 5, "B")); //Pile of Crystalline Dust
cloverMap["24357"] = (new rangeObject(getMapValue("24277").to + 1, getMapValue("24277").to + 5, "B")); //Vicious Fang
cloverMap["24289"] = (new rangeObject(getMapValue("24357").to + 1, getMapValue("24357").to + 5, "B"));    //Armored Scale
cloverMap["24300"] = (new rangeObject(getMapValue("24289").to + 1, getMapValue("24289").to + 5, "B"));    //Elaborate Totem
cloverMap["24283"] = (new rangeObject(getMapValue("24300").to + 1, getMapValue("24300").to + 5, "B"));  //Powerful Venom Sac
cloverMap["24295"] = (new rangeObject(getMapValue("24283").to + 1, getMapValue("24283").to + 5, "B"));   //Vial of Powerful Blood

cloverMap["19675"] = (new rangeObject(getMapValue("24295").to + 1, getMapValue("24295").to + 32, "E"));   //Mystic Clover

cloverMap["19685"] = (new rangeObject(getMapValue("19675").to + 1, getMapValue("19675").to + 5, "A"));   //Orichalcum Ingot
cloverMap["19712"] = (new rangeObject(getMapValue("19685").to + 1, getMapValue("19685").to + 5, "A"));   //Ancient Wood Plank
cloverMap["19746"] = (new rangeObject(getMapValue("19712").to + 1, getMapValue("19712").to + 5, "A"));  //Bolt of Gossamer
cloverMap["19737"] = (new rangeObject(getMapValue("19746").to + 1, getMapValue("19746").to + 5, "A"));    //Cured Hardened Leather Square

cloverMap["other"] = (new rangeObject(getMapValue("19737").to + 1, getMapValue("19737").to + 4, "E"));  // Other

cloverMap["19976"] = (new rangeObject(getMapValue("other").to + 1, getMapValue("other").to + 1, "C"));    //Mystic Coin

cloverMap["20799"] = (new rangeObject(getMapValue("19976").to + 1, getMapValue("19976").to + 1, "D"));    //Crystal

cloverMap["19925"] = (new rangeObject(getMapValue("20799").to + 1, getMapValue("20799").to + 1, "D")); //Obsidian Shard

cloverMap["9267"] = (new rangeObject(getMapValue("19925").to + 1, getMapValue("19925").to + 1, "D"));  //Hidden Treasure



$(document).ready(function () {
    $("#sim-nav a").on("click", function () {
        $('#19976').html(getCurrencyFormat(valueObjectMap[parseInt("19976")].buyOrder, "html"));
        $('#19721').html(getCurrencyFormat(valueObjectMap[parseInt("19721")].buyOrder, "html"));

        $('#19976-1').html(getCurrencyFormat(valueObjectMap[parseInt("19976")].buyOrder * 10, "html"));
        $('#19721-2').html(getCurrencyFormat(valueObjectMap[parseInt("19721")].buyOrder * 10, "html"));
    });

    $("#submitButton").unbind('click').on("click", function () {
        var resultList = {};
        var graphData = [];
        var cloversGenerated = 0;
        var earned = 0;
        var cloverAttemptNum = parseInt($("#selectCloverNum option:selected").text());

        var sims = parseInt($("#selectSims option:selected").text());

        for (var i = 0; i < sims; i++) {

            var num = parseInt((Math.random() * 100) + 1);
            var chosenKey;
            var amountGenerated;
            $.each(cloverMap, function (key, value) {
                var from = value.from;
                var to = value.to;

                if (from <= num && to >= num) {
                    if (key == "other") {
                        var otherNum = (Math.random() * 100).toFixed(4);
                        chosenKey = getOtherValue(otherNum);
                    }
                    else
                        chosenKey = key;
                    amountGenerated = getMaterialAmounts(cloverMap[key].type);
                    return false;
                }
            });

            var quantity = getRandomInt(amountGenerated.from, amountGenerated.to) * cloverAttemptNum;
            var itemName;
            var sellOrder = 0, buyOrder = 0;
            var objStack;

            if (chosenKey == "19675") {
                itemName = "Mystic Clover";
                cloversGenerated += cloverAttemptNum;
            }
            else if (chosenKey == "20799")
                itemName = "Crystal";
            else if (chosenKey == "19925")
                itemName = "Obsidian Shard";
            else
            {
                itemName = valueObjectMap[parseInt(chosenKey)].name;
                sellOrder = getCurrencyFormat(valueObjectMap[parseInt(chosenKey)].sellOrder);
                buyOrder = getCurrencyFormat(valueObjectMap[parseInt(chosenKey)].buyOrder);
                earned += (valueObjectMap[parseInt(chosenKey)].sellOrder * quantity);
            }
            objStack = new valueObject(itemName, sellOrder, buyOrder, quantity);

            if (typeof resultList[chosenKey] != 'undefined') {
                objStack.quantity += resultList[chosenKey].quantity;
            }

            resultList[chosenKey] = objStack;
        }

        $.each(resultList, function (index, item) {
            var graphObj = [item.name, item.quantity];
            graphData.push(graphObj);
        });

        if ($("#graph-choice option:selected").text() == "3D Pie") {
            $(function () {
                drawPieGraph(graphData, "Mystic Clover Simulation Graph");
            });
        }

        var ratio = Math.round((cloversGenerated / (sims * cloverAttemptNum)) * 100);
        $('#numClovers').html(cloversGenerated + " ( " + ratio + "% Success ratio)");
        var costs = (valueObjectMap[parseInt("19721")].buyOrder + valueObjectMap[parseInt("19976")].buyOrder) * cloverAttemptNum * sims;

        var total = (earned * .85) - costs;

        if (total < 0)
            $("#result-label").text("Net Loss after TP fees:");
        else if (total > 0)
            $("#result-label").text("Net Profit after TP fees:");
        else
            $("#result-label").text("Net Even after TP fees:");

        $('#result').html(getCurrencyFormat(total, "html"));
        $('#expenses').html(getCurrencyFormat(costs, "html"));
        $('#earnings').html(getCurrencyFormat(earned, "html"));
    });

});
