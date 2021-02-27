// GETS SELECTED CRYPTOCURRENCY FROM SCROLL BOX.
function getCryptoSelection() {
    var available_options = document.getElementById('select-options');
    var selected_option = available_options.options[available_options.selectedIndex].value;
    return selected_option;
}


// FORMATS THE PROVIDED STRING TO ONLY CONTAIN TWO DECIMAL POINTS.
function format_value_string(string, contains_decimal) {
    var start;
    if (contains_decimal) {
        start = string.indexOf('.')-1
    }
    else {
        start = string.length-1;
    }
    var number_count = 0;
    for (var i = start; i > 1; i--) {
        if (number_count === 2) {
            string = string.substr(0, i) + ',' + string.substr(i, string.length);
            number_count = 0;
        }
        else {
            number_count += 1;
        }
    }
    return string;
}


// FUNCTION THAT IS EXECUTED WHEN THE 'SUBMIT' BUTTON IS CLICKED IN THE 
// CRYPTOCURRENCY TRANSACTION FORM IN THE 'MOCK TRANSACTION' PAGE.
document.getElementById('get-receipt').addEventListener('click', function(event) {
    var api_key = 'b231d31b8c9e7ba918ecbdd7929bf1ad';
    var req = new XMLHttpRequest();
    var currency = getCryptoSelection();
    req.open('GET', "https://api.nomics.com/v1/currencies/ticker?key=" + api_key + "&ids=" + currency + "&interval=1d,30d&convert=EUR&per-page=100&page=1", true);
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            var data = response[0];
            console.log(data);

            var dollar_amount = document.getElementById('dollars-amount-input').value;
            var currency_price = data['price'];
            var currency_quantity = dollar_amount / currency_price;

            
            document.getElementById('receipt-title').textContent = 'Transaction Details';
            document.getElementById('crypto-bought-title').textContent = 'Currency';
            document.getElementById('currency-price-title').textContent = 'Currency Price';
            document.getElementById('dollar-amount-title').textContent = 'Amount in $';
            document.getElementById('crypto-amount-title').textContent = 'Currency Amount';

            document.getElementById('crypto-bought').textContent = data['name'];
            document.getElementById('currency-price').textContent = format_value_string('$' + data['price'].substr(0, data['price'].length-6), true);;
            document.getElementById('dollar-amount').textContent = dollar_amount;
            document.getElementById('crypto-amount').textContent = currency_quantity;

        }
        else {
            console.log('Error in network request: ' + req.statusText);
        }
    });
    req.send(null);
    event.preventDefault();
});


// GETS THE CRYPTOCURRENCY DATA WHEN A CRYPTOCURRENCY IS SELECTED IN THE
// 'PRICES & DATA" PAGE.
function get_data() {
    var api_key = 'b231d31b8c9e7ba918ecbdd7929bf1ad';
    var req = new XMLHttpRequest();
    var currency = getCryptoSelection();
    req.open('GET', "https://api.nomics.com/v1/currencies/ticker?key=" + api_key + "&ids=" + currency + "&interval=1d,30d&convert=EUR&per-page=100&page=1", true);
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            console.log(response);
            var data = response[0];
            var percent_change = parseFloat(data['1d']['price_change_pct'] * 100).toFixed(2);
            console.log(data);

            document.getElementById('name-title').textContent = 'Name';
            document.getElementById('currency-title').textContent = 'Currency';
            document.getElementById('price-title').textContent = 'Price';
            document.getElementById('market-cap-title').textContent = 'Market Cap';
            document.getElementById('price-change-title').textContent = '% Change';
            document.getElementById('crypto-data-title').textContent = 'Cryptocurrency Data';

            document.getElementById('logo').src = data['logo_url'];
            document.getElementById('name').textContent = data['name'];
            document.getElementById('currency').textContent = data['currency'];
            document.getElementById('price').textContent = format_value_string('$' + data['price'].substr(0, data['price'].length-6), true);
            document.getElementById('market-cap').textContent = format_value_string('$' + data['market_cap'].substr(0, data['market_cap'].length-3), false);
            document.getElementById('price-change').textContent = percent_change + '%';
        }
        else {
            console.log('Error in network request: ' + req.statusText);
        }
    });
    req.send(null);
}



