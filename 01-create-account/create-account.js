/*
  Example script creating a key-pair for a Nostr account.
*/

import { generateSecretKey, getPublicKey } from 'nostr-tools/pure'
import * as nip19 from 'nostr-tools/nip19'
import { bytesToHex } from '@noble/hashes/utils' // already an installed dependency

const sk = generateSecretKey() // `sk` is a Uint8Array
const nsec = nip19.nsecEncode(sk)
const skHex = bytesToHex(sk)

const pk = getPublicKey(sk) // `pk` is a hex string
const npub = nip19.npubEncode(pk)

console.log('private key:', skHex)
console.log('encoded private key:', nsec)
console.log()
console.log('public key:', pk)
console.log('encoded public key:', npub)
