/*
  Example script creating a key-pair for a Nostr account from a BCH private key.
*/

import { generateSecretKey, getPublicKey } from 'nostr-tools/pure'
import { bytesToHex, hexToBytes } from '@noble/hashes/utils' // already an installed dependency
import BCHJS from '@psf/bch-js'
import {base58_to_binary} from 'base58-js'
import * as nip19 from 'nostr-tools/nip19'

const BCHN_MAINNET = 'https://bchn.fullstack.cash/v5/'
const bchjs = new BCHJS({ restURL: BCHN_MAINNET })


// create 256 bit BIP39 mnemonic
const mnemonic = bchjs.Mnemonic.generate(
  128,
  bchjs.Mnemonic.wordLists()['english']
)
console.log('mnemonic: ', mnemonic)

// root seed buffer
const rootSeed = await bchjs.Mnemonic.toSeed(mnemonic)

// master HDNode
const masterHDNode = bchjs.HDNode.fromSeed(rootSeed)

// Use the first keypair in the HD wallet.
const i = 0
const derivationPath = `m/44'/145'/0'/0/${i}`

console.log(`Derivation path: ${derivationPath}`)
const childNode = masterHDNode.derivePath(derivationPath)
const cashAddr = bchjs.HDNode.toCashAddress(childNode)
console.log('BCH addr: ', cashAddr)
const privKey = bchjs.HDNode.toWIF(childNode)
console.log('BCH private key (WIF format): ', privKey)

// Extract the privaty key from the WIF, using this guide:
// https://learnmeabitcoin.com/technical/keys/private-key/wif/
const wifBuf = base58_to_binary(privKey)
const privBuf = wifBuf.slice(1,33)
// console.log('privBuf: ', privBuf)

const privHex = bytesToHex(privBuf)
console.log('BCH & Nostr private key (HEX format): ', privHex)

const nostrPubKey = getPublicKey(privBuf)
console.log('nostrPubKey: ', nostrPubKey)

// Convert pubkey to npub
const nostrNpub = nip19.npubEncode(nostrPubKey)
console.log('nostrNpub: ', nostrNpub)
