/*
  7/25/25 CT: This was some early experiments. This file will probably
  be deleted in the future.

  This script experiments with the interplace of Nostr and BCH.
  If I have an npub and private key:
  1 - can I convert the npub to a public key?
  2- can convert the public key to a BCH address?
  3 - If I use the private key to directly generate a BCH address, is it the same
      one as 2?
*/

import { generateSecretKey, getPublicKey } from 'nostr-tools/pure'
import { bytesToHex, hexToBytes } from '@noble/hashes/utils' // already an installed dependency
import BchJS from '@psf/bch-js'

const bchjs = new BchJS()

// Use this code to generate a new key pair.
// let sk = generateSecretKey() // `sk` is a Uint8Array
// let pk = getPublicKey(sk) // `pk` is a hex string
// let skHex = bytesToHex(sk)
// const pkHex = bytesToHex(pk)

// Existing key pair
const skHex = '1e4d931f45c5063452fa376c38cbd1dab7c00d804fccd678bd2e4e8b4ea417f0'
const pk = '1a7e4fde65d17c915bc83c5b20747fd9378766e3613c17137ea9219441ed45e5'

console.log('private key: ', skHex)
console.log('public key: ', pk)

// Convert the public key to a BCH address.
const pkBuf = Buffer.from(pk, 'hex')
const ecPair = bchjs.ECPair.fromPublicKey(pkBuf)
console.log('ecPair: ', ecPair)
