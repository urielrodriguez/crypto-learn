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


function about_crypto() {
    
    var option_value = document.getElementById('crypto-selection').value;
    var title = document.getElementById('crypto-selection-title');
    var description = document.getElementById('crypto-selection-description');

    if (option_value === '0') {
        title.textContent = '';
        description.textContent = '';
    }

    else if (option_value === 'BTC') {
        title.textContent = 'Bitcoin Data';
        description.textContent = 
            `Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group 
            of people using the name Satoshi Nakamoto. The currency began use in 2009 
            when its implementation was released as open-source software. Bitcoin is a 
            decentralized digital currency, without a central bank or single administrator, 
            that can be sent from user to user on the peer-to-peer bitcoin network without 
            the need for intermediaries. Transactions are verified by network nodes through 
            cryptography and recorded in a public distributed ledger called a blockchain.`;
    } 

    else if (option_value === 'ETH') {
        title.textContent = 'Ethereum Data';
        description.textContent =
            `Ethereum is a decentralized, open-source blockchain with smart contract functionality. 
            Ether (ETH) is the native cryptocurrency of the platform. It is the second-largest 
            cryptocurrency by market capitalization, after Bitcoin. Ethereum is the most actively 
            used blockchain.`
    }

    else if (option_value === 'LTC') {
        title.textContent = 'Litecoin Data';
        description.textContent =
            `Litecoin is a peer-to-peer cryptocurrency and open-source software project released under 
            the MIT/X11 license. Litecoin was an early bitcoin spinoff or altcoin, starting in October 
            2011. In technical details, Litecoin is nearly identical to Bitcoin.`
    }

    else if (option_value === 'DOGE') {
        title.textContent = 'Dogecoin Data';
        description.textContent =
            `is a cryptocurrency created by software engineers Billy Markus and Jackson Palmer, who decided 
            to create a payment system as a joke, making fun of the wild speculation in cryptocurrencies at 
            the time. Dogecoin features the face of the Shiba Inu dog from the "Doge" meme as its logo and 
            namesake. It was introduced on December 6, 2013, and quickly developed its own online community, 
            reaching a market capitalization of US$85,314,347,523 on May 5, 2021.`
    }

    else if (option_value == 'XLM') {
        title.textContent = 'Stellar Lumens Data';
        description.textContent = 
            `Stellar, or Stellar Lumens, is an open source, decentralized protocol for digital currency to 
            fiat money low-cost transfers which allows cross-border transactions between any pair of currencies. 
            The Stellar protocol is supported by a Delaware nonprofit corporation, the Stellar Development Foundation, 
            though this organization does not enjoy 501(c)(3) tax-exempt status with the IRS.`
    }

    else if (option_value == 'ADA') {
        title.textContent = 'Cardano';
        description.textContent =
            `Cardano is a public blockchain platform. It is open source and decentralized, with consensus achieved using 
            proof of stake. It can facilitate peer-to-peer transactions with its internal cryptocurrency Ada. Cardano was 
            founded in 2015 by Ethereum co-founder Charles Hoskinson. The development of the project is overseen and 
            supervised by the Cardano Foundation based in Zug, Switzerland.`
    }

    else if (option_value = 'ATOM') {
        title.textContent = 'Cosmos';
        description.textContent =
            `Cosmos is a decentralized network enabling data exchanges between different blockchains. The project, launched 
            March 2019 via an initial coin offering (ICO) in 2017, says its goal is to create an internet of blockchains 
            that resolves both scalability and interoperability issues in blockchains.`
    }
}



function buy_transaction_preview() {

    var buy_usd_amount = document.getElementById('usd-amount-buy').value;
    var currency = document.getElementById('crypto-selection').value;

    var api_key = 'b231d31b8c9e7ba918ecbdd7929bf1ad';
    var req = new XMLHttpRequest();
    req.open('GET', "https://api.nomics.com/v1/currencies/ticker?key=" + api_key + "&ids=" + currency + "&interval=1d,30d&convert=EUR&per-page=100&page=1", true);
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            var data = response[0];
            console.log(data);

            var currency_price = data['price'];
            var currency_quantity = buy_usd_amount / currency_price;

            document.getElementById('coin-price').innerHTML = '<strong>' + currency + ' Price</strong> ' +  format_value_string('$' + currency_price.substr(0, currency_price.length-6), true);
            document.getElementById('coin-amount').innerHTML = '<strong>' + currency + ' Amount</strong>' + currency_quantity;
            document.getElementById('usd-amount').innerHTML = '<strong>USD Amount </strong> $' + buy_usd_amount;   

        }
        else {
            console.log('Error in network request: ' + req.statusText);
        }
    });
    req.send(null);
    event.preventDefault();

}


document.getElementById('preview-buy-transaction-btn').addEventListener('click', buy_transaction_preview);


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