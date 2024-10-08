/*
  Example script for reading a message from user JB55
*/

import {RelayPool, decryptDm} from 'nostr'
import { hexToBytes } from '@noble/hashes/utils'
import { finalizeEvent, generateSecretKey, getPublicKey } from 'nostr-tools/pure'
import {nip04} from 'nostr-tools'

// Alice is our user sending the message
const alicePrivKeyHex = "3292a48aa331aeccce003d50d70fbd79617ba91860abbd2c78fa4a8301e36bc0"
const alicePrivKeyBin = hexToBytes(alicePrivKeyHex)
const alicePubKey = getPublicKey(alicePrivKeyBin)
console.log(`Alice Public Key: ${alicePubKey}`)

// Bob is the reciver of the message
const bobPrivKeyHex = "d2e71a977bc3900d6b0f787421e3d1a666cd12ca625482b0d9eeffd23489c99f"
const bobPrivKeyBin = hexToBytes(bobPrivKeyHex)
const bobPubKey = getPublicKey(bobPrivKeyBin)
console.log(`Bob Public Key: ${bobPubKey}`)

const psf = "wss://nostr-relay.psfoundation.info"
const relays = [psf]

// Connect to the relay
const pool = RelayPool(relays)
pool.on('open', relay => {
	// Find encrypted messages (kind 4) that are tagged to bob.
	relay.subscribe("REQ", {limit: 2, kinds:[4], "#p": [bobPubKey]})
});

pool.on('eose', relay => {
	relay.close()
});

pool.on('event', async (relay, sub_id, ev) => {
	console.log(ev)
	console.log('encrypted message: ', ev.content)

	// Decrypt the message
	const msg = await nip04.decrypt(bobPrivKeyBin, alicePubKey, ev.content)

	console.log(`decrypted message: `, msg)
});
