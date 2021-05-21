function get_keys() {
    var req = new XMLHttpRequest();
    req.open('GET', 'http://127.0.0.1:5000/keys', true);
    req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            console.log(response);
        }
        else {
            console.log('Error in network request: ' + req.statusText);
        }
    });
    req.send(null);
}

get_keys();