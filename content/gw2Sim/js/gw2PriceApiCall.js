var elements = {};
$('.gw2-tpprice').each(function () {
    var id = +this.getAttribute('data-id');
    var data_name = this.getAttribute('data-name');
    var data_quantity = this.getAttribute('data-quantity');
    var myValueObject = new valueObject();
    myValueObject.name = data_name;
    myValueObject.quantity = data_quantity;

    valueObjectMap[id] = myValueObject;

    if (!id || parseInt(id) != id) {
        return;
    }
    if (!elements[id]) {
        elements[id] = [];
    }
    elements[id].push({
        elem: this,
        info: this.getAttribute('data-info')
    });
});

var ids = $.map(elements, function (o, i) {
    return i;
}).join(',');

$.getJSON('https://api.guildwars2.com/v2/commerce/prices?wiki=1&ids=' + ids).done(function (data) {
    try {
        $.each(data, function (index, item) {
            var buyText = 'Highest buy order: ' + getCurrencyFormat(item.buys.unit_price);
            var sellText = 'Lowest sell offer: ' + getCurrencyFormat(item.sells.unit_price);

            var hoverBuyText = 'Highest buy order: ' + getCurrencyFormat(item.buys.unit_price, "text");
            var hoverSellText = 'Lowest sell offer: ' + getCurrencyFormat(item.sells.unit_price, "text");

            if (typeof valueObjectMap[item.id].buyOrder == 'undefined') {
                valueObjectMap[item.id].buyOrder = item.buys.unit_price;
                valueObjectMap[item.id].sellOrder = item.sells.unit_price;
            }

            $.each(elements[item.id], function () {
                if (this.info == 'buy') {
                    this.elem.innerHTML = getCurrencyFormat(item.buys.unit_price, "html");
                    this.elem.title = buyText + ' (' + item.buys.quantity + ' ordered)';
                } else if (this.info == 'sell') {
                    this.elem.innerHTML = getCurrencyFormat(item.sells.unit_price, "html");
                    this.elem.title = sellText + ' (' + item.sells.quantity + ' listed)';
                } else {
                    this.elem.innerHTML = getCurrencyFormat(item.sells.unit_price, "html");
                    this.elem.title = hoverSellText + ' / ' + hoverBuyText;
                }
                if ((this.info == 'buy' && !item.buys.quantity) || (this.info != 'buy' && !item.sells.quantity)) {
                    this.elem.style.opacity = '.5';
                }
            });
        });
    } catch (err) {
        print("Too many Json requests!. Please Slow Down!");
    }
});
