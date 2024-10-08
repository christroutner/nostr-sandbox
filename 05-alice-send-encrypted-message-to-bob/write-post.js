/*
  Example script for write a post to a relay
*/

import { finalizeEvent, generateSecretKey, getPublicKey } from 'nostr-tools/pure'
// import {RelayPool} from 'nostr'
import {Relay, useWebSocketImplementation} from 'nostr-tools/relay'
import {nip04} from 'nostr-tools'
import { hexToBytes } from '@noble/hashes/utils'
import WebSocket from 'ws'
useWebSocketImplementation(WebSocket)

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

// Relay list
const psf = "wss://nostr-relay.psfoundation.info"

const now = new Date()

const clearMsgStr = `This is an encrypted message created at ${now.toLocaleString()}`

const encryptedMsg = await nip04.encrypt(alicePrivKeyBin, bobPubKey, clearMsgStr)

// Generate a post.
const eventTemplate = {
	kind: 4,
	created_at: Math.floor(Date.now() / 1000),
	tags: [['p', bobPubKey]],
	content: encryptedMsg
}
console.log(`eventTemplate: ${JSON.stringify(eventTemplate, null, 2)}`)

// Sign the post
const signedEvent = finalizeEvent(eventTemplate, alicePrivKeyBin)

// Connect to a relay.
const relay = await Relay.connect(psf)
console.log(`connected to ${relay.url}`)

// Publish the message to the relay.
await relay.publish(signedEvent)

// Close the connection to the relay.
relay.close()
