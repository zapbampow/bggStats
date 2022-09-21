Additional Aggregator Logic
- when a making a selection, clear all other filters because the filter tree will be different
- This should include when updating a 'how many' filter 
- It's possible that how many needs it's own seperate filter tree. I need to think through it a bit more.

# Next
- Add Header and Footer to React-Date-Picker
- Add Remove and Clear to DatePicker and MultiDatePicker
- Make sure mobile styles look okay for Combobox, multi combo, datepicker, and multidatepicker
- Add 'Remove Filter' to all filter components using the dispatch({type: remove}) action.
- Add 'Clear' functionality to clear all filters
- Add answer display components (Count, list, table)
- Update design

# Long Term
- add navbar (query history, general stats, recent plays)
- save history of queries
- add 'this year' and 'last year' as date range options
- add 'games I recorded' and update I played to include filter for games where username is a player
- add a general stats page (most recent plays, total games played, total this year, most played games, most played with players, most played locations, etc.)
- 

## How to Connect Frontend Filter to Backend
1. Update FilterToComponent to make sure the correct component is used for that filter type
2. If getOptions is needed, make sure the filter option is connected to the correct accumulator
3. Make sure the accumulator function has been updated to return {value, label}[]

# Generic Select/Filter Components
props: filter option {value, label}
It takes the filter option (ex. gameName, player, location) and gets the possible values
Sets them in component state
On select, adds them to context state

The AddFilterButton disables options that have already been selected.
Add a way to remove the filterButtons and their options

# Todo
- [ ] Add initial button when selecting option from +. Decide how you want to do this. Look at UsernamePlays comments for thoughts on options. And the Section above for 
- [x] Componentize combo box
- [ ] Add filter button when selecting 'how many', 'games', 'of' and use the combo box. This should provide a pattern for adding any other combo box
- [ ] Componentize multiselect box, multiselect combo, date selector, 
- [x] Componentize dropdown button and list for reuse
- [ ] Save filters to local storage so that users can revisit past queries
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


## Other Options
Board Game Stats App likely does a lot of this and certainly does a lot more. It is very popular and the people who use it seem to love it. The guy who built it also built the official BGG app. So he clearly knows what he's doing. https://www.bgstatsapp.com/

Board Gamer Tools http://www.boredgamertools.com/
Has some nice pie charts based on your play data along with piles of charts with your play data. It also has some features around your collection, including a recommendation tool for games you may like.

http://www.sheltonsonline.net/bggtools/getplays
View play data. Download as excel sheet. Last time I went here it was down because some stuff when wrong when updating their site. But it sounded like he planned on getting it back up at some point.




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
