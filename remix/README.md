Additional Aggregator Logic
- when a making a selection, clear all other filters because the filter tree will be different
- This should include when updating a 'how many' filter 
- It's possible that how many needs it's own seperate filter tree. I need to think through it a bit more.
- 

# Todo
- [ ] Componentize dropdown button and list for reuse
- [x] Add play filtering context basically just for the filtering object. Update the object with each selection
- [ ] Handle errors on username/plays
- [ ] Add meta to pages
- [ ] Add settings
  - [ ] data used display
  - [ ] clear data by user
  - [ ] clear all data button
- [x] In data fetching, check if newest retrieved is higher than newest in db before trying to add them to the db
  - [x] Only try to add plays whose play id is higher than the most recent
- [x] Create filter methods
- [x] Change route from /plays/$username to $username/plays
- [x] Generate a list of players that includes names, ids, and usernames from all the stored data
  - [x] { id: number; name: string; username: string }
  - [x] use this to display list of possible players in player select

## Design
- try out a glassmorphism design with floating meeples in the background.

## What this app doesn't do
- Keep everything totally in sync. If you go back and update data that's already stored in the app, then it won't know about those updates. It only goes and gets your newest plays.


## Questions
### Core Questions
- How many
- What
- Who
- When

### 'How many' filters
#### Top level 
- I played
- I recorded (you can record a game without playing in it)
- afterDate
- beforeDate
- betweenDates
- onDate

#### Game Filters
- gameName
- location
- length
- incomplete
- with player(s)
- player won

#### Player filters
- withPlayers([{ name: string;, id: number; username: string }])
- withOnlyPlayerNames
- withPlayerIds
- withOnlyPlayerIds
- playersWon





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
