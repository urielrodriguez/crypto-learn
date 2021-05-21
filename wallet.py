from bitcoinaddress import Wallet
import flask
from flask import request, jsonify

app = flask.Flask(__name__)

wallet = Wallet()
public_key = wallet.address.__dict__['pubkeyc']
private_key = wallet.key.__dict__['hex']
print(public_key)
print(private_key)


keys = [
    {'public_key': public_key,
     'private_key': private_key
    }
]


@app.route('/keys', methods=['GET'])
def api_all():
    return jsonify(keys)

app.run()
