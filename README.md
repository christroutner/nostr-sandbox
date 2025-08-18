# nostr-sandbox

A series of JavaScript examples for interacting with Nostr protocol.

- 01-create-account - Example of how to generate a Nostr private/public key pair.
- 02-read-posts - Given a users public key, read their posts.
- 03-write-post - Post to a Nostr relay using a Nostr private/public key pair.
- 04-read-alice-posts - Read post created by example 03.
- 05-alice-send-encrypted-message-to-bob - Use NIP04 encryption for Alice to send a message to Bob.
- 06-bob-reads-message - Decrypt and read the message from example 05.
- 07-read-post-by-event-id - Given the event ID of a post, retrieve that post.
- 08-create-nostr-account-from-bch-priv-key - Given a Bitcoin private key in WIF format, generate a Nostr private/public key pair.

- 10-post-topic - Post a message to a 'topic' that can be followed and posted to by many clients.
- 11-read-post-by-topic - Read recent posts based on a 'topic'
- 12-convert-npub-to-pubkey - Given an npub, convert it to a public key, using NIP19.
- 13-convert-eventid-to-note - Given an event ID (hex), convert it to a note format
- 14-get-follow-list - Given a user pubkey, get the other users that follow them
- 15-update-follow-list - Update a users follow list, to add or remove users that they are following.
- 16-npub-to-BCH-addr - Given an npub, generate a BCH address. This allows users to send BCH to a Nostr user without needing any information from them. The same private key controls both the npub and BCH address.
- 17-liking-event - Generate a Kind 7 'like' event related to a post (event ID)
- 18-get-event-likes - Get a count of likes for an event ID (post)
- 19-liking-url - Example to generate kind 17 'like' event for something other than an event ID. The primary  use case for this is 'liking' SLP tokens.
- 20-get-url-likes - Given a URL, get a count on how many likes it has.
- 21-create-chat-room - Create a [NIP 28](https://github.com/nostr-protocol/nips/blob/master/28.md) chat room by generating a Kind 40 event.
- 22-update-room-metadata - Update the chat room metadata by generated a Kind 41 event.
- 23-chat-message - Send a chat message to the chat room by generating a Kind 42 event.
