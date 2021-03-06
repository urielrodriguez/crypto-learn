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


var dict_descriptions = {
    '0'     :   '',
    'BTC'   :   `Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group 
                of people using the name Satoshi Nakamoto. The currency began use in 2009 
                when its implementation was released as open-source software. Bitcoin is a 
                decentralized digital currency, without a central bank or single administrator, 
                that can be sent from user to user on the peer-to-peer bitcoin network without 
                the need for intermediaries. Transactions are verified by network nodes through 
                cryptography and recorded in a public distributed ledger called a blockchain.`,
    'ETH'   :   `Ethereum is a decentralized, open-source blockchain with smart contract functionality. 
                Ether (ETH) is the native cryptocurrency of the platform. It is the second-largest 
                cryptocurrency by market capitalization, after Bitcoin. Ethereum is the most actively 
                used blockchain.`,
    'LTC'   :   `Litecoin is a peer-to-peer cryptocurrency and open-source software project released under 
                the MIT/X11 license. Litecoin was an early bitcoin spinoff or altcoin, starting in October 
                2011. In technical details, Litecoin is nearly identical to Bitcoin.`,
    'DOGE'  :   `is a cryptocurrency created by software engineers Billy Markus and Jackson Palmer, who decided 
                to create a payment system as a joke, making fun of the wild speculation in cryptocurrencies at 
                the time. Dogecoin features the face of the Shiba Inu dog from the "Doge" meme as its logo and 
                namesake. It was introduced on December 6, 2013, and quickly developed its own online community, 
                reaching a market capitalization of US$85,314,347,523 on May 5, 2021.`,
    'XLM'   :   `Stellar, or Stellar Lumens, is an open source, decentralized protocol for digital currency to 
                fiat money low-cost transfers which allows cross-border transactions between any pair of currencies. 
                The Stellar protocol is supported by a Delaware nonprofit corporation, the Stellar Development Foundation, 
                though this organization does not enjoy 501(c)(3) tax-exempt status with the IRS.`,
    'ADA'   :   `Cardano is a public blockchain platform. It is open source and decentralized, with consensus achieved using 
                proof of stake. It can facilitate peer-to-peer transactions with its internal cryptocurrency Ada. Cardano was 
                founded in 2015 by Ethereum co-founder Charles Hoskinson. The development of the project is overseen and 
                supervised by the Cardano Foundation based in Zug, Switzerland.`,
    'ATOM'  :   `Cosmos is a decentralized network enabling data exchanges between different blockchains. The project, launched 
                March 2019 via an initial coin offering (ICO) in 2017, says its goal is to create an internet of blockchains 
                that resolves both scalability and interoperability issues in blockchains.`
}


function about_crypto() {
    
    var option_value = document.getElementById('crypto-selection').value;
    var title = document.getElementById('crypto-selection-title');
    var description = document.getElementById('crypto-selection-description');

    var description_content = dict_descriptions[option_value];
    title.textContent = option_value + ' Data';
    description.textContent = description_content;

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
            console.log(currency_quantity);
            console.log(buy_usd_amount);

            document.getElementById('coin-price').innerHTML = '<strong>' + currency + ' Price</strong> ' +  format_value_string('$' + currency_price.substr(0, currency_price.length-6), true);
            document.getElementById('coin-amount').innerHTML = '<strong>' + currency + ' Amount</strong> ' + currency_quantity;
            document.getElementById('dollar-amount').innerHTML = '<strong>USD Amount</strong> $' + buy_usd_amount;   

        }
        else {
            console.log('Error in network request: ' + req.statusText);
        }
    });
    req.send(null);
    event.preventDefault();
}


function sell_transaction_preview() {
    var sell_usd_amount = document.getElementById('usd-amount-sell').value;
    var currency = document.getElementById('crypto-selection-sell').value;
    console.log(currency);
    var api_key = 'b231d31b8c9e7ba918ecbdd7929bf1ad';
    var req = new XMLHttpRequest();
    req.open('GET', "https://api.nomics.com/v1/currencies/ticker?key=" + api_key + "&ids=" + currency + "&interval=1d,30d&convert=EUR&per-page=100&page=1", true);
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            var data = response[0];
            console.log(data);

            var currency_price = data['price'];
            var currency_quantity = sell_usd_amount / currency_price;
            console.log(currency_quantity);
            console.log(sell_usd_amount);

            document.getElementById('coin-price-sell').innerHTML = '<strong>' + currency + ' Price</strong> ' +  format_value_string('$' + currency_price.substr(0, currency_price.length-6), true);
            document.getElementById('coin-amount-sell').innerHTML = '<strong>' + currency + ' Amount</strong> ' + currency_quantity;
            document.getElementById('dollar-amount-sell').innerHTML = '<strong>USD Amount</strong> $' + sell_usd_amount;   

        }
        else {
            console.log('Error in network request: ' + req.statusText);
        }
    });
    req.send(null);
    event.preventDefault();
}


document.getElementById('preview-buy-transaction-btn').addEventListener('click', buy_transaction_preview);
document.getElementById('preview-sell-transaction-btn').addEventListener('click', sell_transaction_preview);


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


// Create new key pair without a mnemonic phrase
function get_keys() {
    var req = new XMLHttpRequest();
    req.open('GET', 'http://127.0.0.1:5000/keys-only', true);
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            document.getElementById('new-public-key').innerHTML = '<strong>Public Key: </strong>' + response[0]['public_key']
            document.getElementById('new-private-key').innerHTML = '<strong>Private Key: </strong>' + response[0]['private_key']
        }
        else {
            console.log('Error in network request: ' + req.statusText);
        }
    });
    req.send(null);
};


// Create new key pair with a mnemonic phrase
function get_keys_mnemonic() {
    var req = new XMLHttpRequest();
    var payload = {mnemonic_phrase:null};
    payload.mnemonic_phrase = document.getElementById('mnemonic-phrase').value;
    req.open('POST', 'http://127.0.0.1:5000/keys-mnemonic', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            console.log(response);
            document.getElementById('mnemonic-phrase-keys').innerHTML = '<strong>Mnemonic Phrase: </strong>' + document.getElementById('mnemonic-phrase').value;
            document.getElementById('new-public-key').innerHTML = '<strong>Public Key: </strong>' + response[0]['public_key']
            document.getElementById('new-private-key').innerHTML = '<strong>Private Key: </strong>' + response[0]['private_key']
        }
        else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(JSON.stringify(payload));
    event.preventDefault();
}


document.getElementById('complete-key-creation-btn').addEventListener('click', function() {
    if (document.getElementById('mnemonic-phrase').value === '') {
        get_keys();
    }
    else {
        get_keys_mnemonic();
    }
});


function get_translate(text, element_id) {
    var req = new XMLHttpRequest();
    req.open('GET', 'http://127.0.0.1:5000/translate/Spanish/' + text, true);
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            console.log(response);
            var translated_text = response['output'];
            document.getElementById(element_id).innerText = translated_text;
        }
        else {
            console.log('Error in network request: ' + req.statusText);
        }
    });
    req.send(null);
};

document.getElementById('translate').addEventListener('click', function() {
    var page_title = document.getElementById('page-title').innerText;
    get_translate(page_title, 'page-title');

    var new_keys_question = document.getElementById('new-keys-question').innerText;
    get_translate(new_keys_question, 'new-keys-question');

    var create_keys_btn = document.getElementById('create-keys-btn').innerText;
    get_translate(create_keys_btn, 'create-keys-btn');
});

document.getElementById('complete-key-recovery-btn').addEventListener('click', function() {
    var req = new XMLHttpRequest();
    var payload = {mnemonic_phrase:null};
    payload.mnemonic_phrase = document.getElementById('mnemonic-phrase-recover').value;
    req.open('POST', 'http://127.0.0.1:5000/keys-mnemonic', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            console.log(response);
            document.getElementById('recovered-mnemonic-phrase').innerHTML = '<strong>Mnemonic Phrase: </strong>' + document.getElementById('mnemonic-phrase-recover').value;
            document.getElementById('recovered-public-key').innerHTML = '<strong>Public Key: </strong>' + response[0]['public_key']
            document.getElementById('recovered-private-key').innerHTML = '<strong>Private Key: </strong>' + response[0]['private_key']
        }
        else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(JSON.stringify(payload));
    event.preventDefault();
});
