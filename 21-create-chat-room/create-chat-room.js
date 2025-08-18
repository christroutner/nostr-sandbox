/*
  Example script for write a post to a relay
*/

import { finalizeEvent, generateSecretKey, getPublicKey } from 'nostr-tools/pure'
// import {RelayPool} from 'nostr'
import {Relay, useWebSocketImplementation} from 'nostr-tools/relay'
import { hexToBytes } from '@noble/hashes/utils'
import WebSocket from 'ws'
useWebSocketImplementation(WebSocket)

// Alice is our user making the post.
const alicePrivKeyHex = "3292a48aa331aeccce003d50d70fbd79617ba91860abbd2c78fa4a8301e36bc0"
const alicePrivKeyBin = hexToBytes(alicePrivKeyHex)
const alicePubKey = getPublicKey(alicePrivKeyBin)
console.log(`Alice Public Key: ${alicePubKey}`)

// Relay list
const psf = "wss://nostr-relay.psfoundation.info"

const now = new Date()

// Generate a post.
const eventTemplate = {
	kind: 40,
	created_at: Math.floor(Date.now() / 1000),
	tags: [],
	content: "{\"name\": \"TEST-CHANNEL\", \"about\": \"A test chat room\", \"picture\": \"https://psfoundation.cash/static/psf-logo-32a2c411985bbbf299687b06c3224384.png\", \"relays\": [\"wss://nostr-relay.psfoundation.info\", \"wss://relay.damus.io\"]}"
}
console.log(`eventTemplate: ${JSON.stringify(eventTemplate, null, 2)}`)

// Sign the post
const signedEvent = finalizeEvent(eventTemplate, alicePrivKeyBin)
console.log('signedEvent: ', signedEvent)

// Connect to a relay.
const relay = await Relay.connect(psf)
console.log(`connected to ${relay.url}`)

// Publish the message to the relay.
const result = await relay.publish(signedEvent)
console.log('result: ', result)

// Close the connection to the relay.
relay.close()
