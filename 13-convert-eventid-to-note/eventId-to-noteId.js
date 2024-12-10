/*
  Convert an npub to a pubkey
*/

// Global npm libraries
import * as nip19 from 'nostr-tools/nip19'

// Copied a random npub from Nostr
// const npub = 'npub1eg59l0mdz29d7srvg9kr8g76lspy9effny25qp425sl2mhcqfmeqqrpnw6'
const eventId = '8f9e81e4c6905c0d1debf5ebc4b220bd9604dd0d810d0815085365acfec00711'

const result = nip19.noteEncode(eventId)
console.log('result: ', result)
