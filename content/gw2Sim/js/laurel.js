function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var material = function (id, name) {
    this.id = id;
    this.name = name
};

var getMaterialID = function (num) {
    if (num <= 125)
        return new material(24351, "Vicious Claw");
    else if (num > 125 && num <= 250)
        return new material(24277, "Pile of Crystalline Dust");
    else if (num > 250 && num <= 375)
        return new material(24357, "Vicious Fang");
    else if (num > 375 && num <= 500)
        return new material(24289, "Armored Scale");
    else if (num > 500 && num <= 625)
        return new material(24300, "Elaborate Totem");
    else if (num > 625 && num <= 750)
        return new material(24283, "Powerful Venom Sac");
    else if (num > 750 && num <= 875)
        return new material(24295, "Vial of Powerful Blood");
    else if (num > 875 && num <= 1000)
        return new material(24358, "Ancient Bone");
};

$(document).ready(function () {

    $("#submitButton").unbind('click').on("click", function () {
        var resultList = {};
        var graphData = [];
        var sims = parseInt($("#selectSims option:selected").text());
        var earnedFromBuyOrder = 0;
        var earnedFromSellOrder = 0;
        var materialData;

        for (var i = 0; i < sims * 3; i++) {
            var num = parseInt((Math.random() * 1000) + 1);
            var key = getMaterialID(num).id;
            earnedFromBuyOrder += (valueObjectMap[key].buyOrder);
            earnedFromSellOrder += (valueObjectMap[key].sellOrder);

            materialData = new valueObject(getMaterialID(num).name, 0, 0, 1);

            if (typeof resultList[key] != 'undefined') {
                materialData.quantity += resultList[key].quantity;
            }

            resultList[key] = materialData;
        }

        $.each(resultList, function (index, item) {
            var graphObj = [item.name, item.quantity];
            graphData.push(graphObj);
        });

        var total1 = (earnedFromBuyOrder * .85);
        var total2 = (earnedFromSellOrder * .85);

        $('#earnings').html(getCurrencyFormat(earnedFromBuyOrder, "html"));
        $('#earnings2').html(getCurrencyFormat(earnedFromSellOrder, "html"));

        $('#result').html(getCurrencyFormat(total1, "html"));
        $('#result2').html(getCurrencyFormat(total2, "html"));

        if ($("#graph-choice option:selected").text() == "3D Pie") {
            $(function () {
                drawPieGraph(graphData, "Laurel to Large Crafting Bag Sumulation Graph");
            });
        }
    });
});