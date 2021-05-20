from bitcoinaddress import Wallet

wallet = Wallet()
public_key = wallet.address.__dict__['pubkeyc']
private_key = wallet.key.__dict__['hex']
print(public_key)
print(private_key)
