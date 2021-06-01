from bitcoinaddress import Wallet
import flask
from flask import request, jsonify
from mnemonic import Mnemonic
import binascii
from flask_cors import CORS


app = flask.Flask(__name__)
CORS(app, support_credentials=True)

@app.route('/keys-only', methods=['GET'])
def get_keys():

    wallet = Wallet()
    public_key = wallet.address.__dict__['pubkeyc'][:24]
    private_key = wallet.key.__dict__['hex'][:24]

    keys = [
        {'public_key': public_key,
         'private_key': private_key
        }
    ]

    response = jsonify(keys)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route('/keys-mnemonic', methods=['POST', 'GET'])
def create_keys():

    if request.method == 'POST':

        data = request.get_json()
        mnemonic_phrase = data['mnemonic_phrase']

        public_key_mnemonic = mnemonic_phrase
        private_key_mnemonic = mnemonic_phrase[::-1]

        mn = Mnemonic('english')
        public_key_seed = mn.to_seed(public_key_mnemonic)
        private_key_seed = mn.to_seed(private_key_mnemonic)

        public_key = str(binascii.hexlify(public_key_seed))[2:26]
        private_key = str(binascii.hexlify(private_key_seed))[2:26]
        
        keys = [
            {'public_key': public_key,
            'private_key': private_key
            }
        ]

        response = jsonify(keys)
        return response    

app.run()
