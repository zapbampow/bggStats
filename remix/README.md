# Todo

- [x] In data fetching, check if newest retrieved is higher than newest in db before trying to add them to the db
  - [x] Only try to add plays whose play id is higher than the most recent
- [ ] Map dexie where operators to functions
  - [ ] Setup class with chainable methods
  - [ ] Simple: Count plays (where username === username)
  - [ ] More complicated: Count plays where gamename === someName (where username === username)
  Q: Can I .where(something).equal(something).where(otherThing).equal(otherThing)
- [ ] Handle errors on username/plays
- [ ] Create filter methods
- [ ] Change route from /plays/$username to $username/plays


## What this app doesn't do
- Keep everything totally in sync. If you go back and update data that's already stored in the app, then it won't know about those updates. It only goes and gets your newest plays.





# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Fly Setup

1. [Install `flyctl`](https://fly.io/docs/getting-started/installing-flyctl/)

2. Sign up and log in to Fly

```sh
flyctl auth signup
```

3. Setup Fly. It might ask if you want to deploy, say no since you haven't built the app yet.

```sh
flyctl launch
```

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

If you've followed the setup instructions already, all you need to do is run this:

```sh
npm run deploy
```

You can run `flyctl info` to get the url and ip address of your server.

Check out the [fly docs](https://fly.io/docs/getting-started/node/) for more information.
