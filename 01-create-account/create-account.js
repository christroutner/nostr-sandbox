/*
  Example script creating a key-pair for a Nostr account.
*/

import { generateSecretKey, getPublicKey } from 'nostr-tools/pure'
import { bytesToHex, hexToBytes } from '@noble/hashes/utils' // already an installed dependency

let sk = generateSecretKey() // `sk` is a Uint8Array
let pk = getPublicKey(sk) // `pk` is a hex string

let skHex = bytesToHex(sk)
// const pkHex = bytesToHex(pk)

console.log('private key: ', skHex)
console.log('public key: ', pk)
