/*
  Example script for reading a message from user JB55
*/

import {RelayPool} from 'nostr'

const alicePrivKey = "3292a48aa331aeccce003d50d70fbd79617ba91860abbd2c78fa4a8301e36bc0"
const alicePubKey = "2c7e76c0f8dc1dca9d0197c7d19be580a8d074ccada6a2f6ebe056ae41092e9"


const jb55 = "32e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245"
const damus = "wss://relay.damus.io"
const scsi = "wss://nostr-pub.wellorder.net"
const psf = "wss://nostr-relay.psfoundation.info"
const relays = [damus, scsi]

const pool = RelayPool(relays)

pool.on('open', relay => {
	relay.subscribe("subid", {limit: 2, kinds:[1], authors: [jb55]})
});

pool.on('eose', relay => {
	relay.close()
});

pool.on('event', (relay, sub_id, ev) => {
	console.log(ev)
});
