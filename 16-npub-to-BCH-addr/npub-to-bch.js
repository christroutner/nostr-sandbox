/*
  Example script converting a Nostr public key (npub) to a BCH address.

  Based on proof-of-concept described in this code repository:
  https://github.com/bastiancarmy/nostr-multi-chain-tipping-nip/tree/main/examples/javascript/pay-to-npub
*/

import { bech32 } from '@scure/base'
import { ripemd160 } from 'ethereum-cryptography/ripemd160.js'
import { sha256 } from 'ethereum-cryptography/sha256.js'
import * as crypto from 'crypto';
import SlpWallet from 'minimal-slp-wallet'

// This information generated with the 08 example.
// mnemonic: camera mansion crater legend sketch claim until jelly great long frog cattle
// derivation: m/44'/145'/0'/0/0
// WIF private key: 'KwPJmP7erLMGpWjEyUgDN9AKrLiQin2Px3cdKtiAgYDgzGacpVGk'
const expectedBchAddr = 'bitcoincash:qz5lz55xdjtyrnm0dgezfxgta28zr4t7dqc2ec0xr9'
const nostrNpub = 'npub1j0r86v2qq0prk2j9dkwd6yvy9avkmp0v0axlvaqsylz34w7j7wdqnydyju'

async function start() {
  try {
    console.log('Starting npub: ', nostrNpub)

    // Decode npub to x-only pub bytes
    const decoded = bech32.decode(nostrNpub)
    const pubBytes = new Uint8Array(bech32.fromWords(decoded.words))

    // Compress pub (add parity byte: 02 even, 03 odd)
    const parity = pubBytes[31] % 2 === 0 ? 0x02 : 0x03
    const compressedPub = new Uint8Array(33)
    compressedPub[0] = parity
    compressedPub.set(pubBytes, 1)

    // BCH hash160
    const hash160 = (x) => ripemd160(sha256(x))
    const pkh = hash160(compressedPub)
    console.log('Pay to PKH for BCH (hex):', Buffer.from(pkh).toString('hex'))

    // BTC/BCH (legacy) address
    let prefix = Buffer.from([0x00])
    let payload = Buffer.concat([prefix, pkh])
    let checksum = doubleSha256(payload).slice(0, 4)
    let btcBchLegacyAddress = b58encode(Buffer.concat([payload, checksum]))
    console.log(`BTC/BCH (legacy) address: ${btcBchLegacyAddress}`)

    // Convert legacy address to BCH address
    const wallet = new SlpWallet()
    await wallet.walletInfoPromise
    const bchjs = wallet.bchjs
    const bchAddr = bchjs.Address.toCashAddress(btcBchLegacyAddress)
    console.log('BCH address: ', bchAddr)

    // Compare the generated address to the expected address
    if(bchAddr === expectedBchAddr) {
      console.log('Success! BCH address matches expected address!')
    } else {
      console.log('Failure! BCH address does not match expected address')
    }
  } catch(err) {
    console.error('Error: ', err)
  }
}
start()

// Helper functions

// Base58Check for BTC/BCH legacy address (prefix 0x00)
function doubleSha256(x) {
  return crypto.createHash('sha256').update(crypto.createHash('sha256').update(x).digest()).digest();
}

function b58encode(v) {
  const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let nPad = 0;
  for (let c of v) {
      if (c === 0) nPad++;
      else break;
  }
  let p = BigInt(1);
  let acc = BigInt(0);
  for (let c of Array.from(v).reverse()) {
      acc += p * BigInt(c);
      p = p * BigInt(256);
  }
  let string = '';
  while (acc > 0n) {
      let [newAcc, idx] = [acc / 58n, Number(acc % 58n)];
      acc = newAcc;
      string = alphabet[idx] + string;
  }
  return alphabet[0].repeat(nPad) + string;
}