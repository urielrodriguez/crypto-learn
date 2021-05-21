function get_keys() {
    var req = new XMLHttpRequest();
    req.open('GET', 'http://127.0.0.1:5000/keys-only', true);
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            document.getElementById('public-key').textContent = 'Public Key: ' + response[0]['public_key']
            document.getElementById('private-key').textContent = 'Private Key: ' + response[0]['private_key']
        }
        else {
            console.log('Error in network request: ' + req.statusText);
        }
    });
    req.send(null);
}

document.getElementById('get-keys').addEventListener('click', function() {
    get_keys();
});


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
            document.getElementById('public-key-mnemonic').textContent = 'Public Key: ' + response[0]['public_key']
            document.getElementById('private-key-mnemonic').textContent = 'Private Key: ' + response[0]['private_key']
        }
        else {
            console.log("Error in network request: " + req.statusText);
        }
    })
    req.send(JSON.stringify(payload));
    event.preventDefault();

}


document.getElementById('submit-mnemonic-phrase').addEventListener('click', function() {
    get_keys_mnemonic();
});