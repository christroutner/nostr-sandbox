/*
  Convert an npub to a pubkey
*/

// Global npm libraries
import * as nip19 from 'nostr-tools/nip19'

// Copied a random npub from Nostr
const npub = 'npub1eg59l0mdz29d7srvg9kr8g76lspy9effny25qp425sl2mhcqfmeqqrpnw6'

const { type, data } = nip19.decode(npub)
// console.log('type: ', type)
// console.log('data: ', data)

console.log(`npub input: ${npub}`)
console.log(`pubkey in hex: ${data}`)
