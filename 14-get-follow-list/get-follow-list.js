/*
  Example script for get follow list
*/

import {RelayPool} from 'nostr'
import {  getPublicKey } from 'nostr-tools/pure'
import { hexToBytes } from '@noble/hashes/utils'

// Alice is our user to get the follow list.
const alicePrivKeyHex = "3292a48aa331aeccce003d50d70fbd79617ba91860abbd2c78fa4a8301e36bc0"
const alicePrivKeyBin = hexToBytes(alicePrivKeyHex)
const alicePubKey = getPublicKey(alicePrivKeyBin)
console.log(`Alice Public Key: ${alicePubKey}`)

const psf = "wss://nostr-relay.psfoundation.info"
const relays = [psf]

const pool = RelayPool(relays)

pool.on('open', relay => {
	relay.subscribe("subid", {limit: 5, kinds:[3], authors: [alicePubKey]})
});

pool.on('eose', relay => {
	relay.close()
});

pool.on('event', (relay, sub_id, ev) => {
	//console.log(ev)
  const aliceFollowList =  ev.tags
  console.log(`Alice Follow list`, aliceFollowList)
});
