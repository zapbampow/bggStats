# BoardGameGeek Player Record Stats

## Todo
- figure out IndexDB (https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- Create base stats and reference functions
  - total plays
  - number of different games
  - list of people you played with
  - number of people you played with
  - number of wins
  - list of games
  - list of people you played with
- consider expansions (filter them in or out)
- refactor count functions (filter by criteria, then add up quantity fields)
- Think through how to build a flexible querying model that can answers many types of questions

## Getting and storing data
1. Check for the newest play record in IndexDB
2. (a) If there is no record, got get all the user's records.
2. (b) If there is a record, get all records from the day after their latest record.
3. In either case, store them in IndexDB

- Note: After some research I think Web Workers probably isn't worth the effort for a v1. If I find that things are slow, then I can move functionality over incrementally and test whether it actually improves things.




##### Things to consider for getting all of a user's play data
- you only get 100 results per request
- total plays and page are included in result, so you'll need to handle a bunch of requests and build up a final object
- There is a rate limit on the number of requests you can make. It's unclear what exactly it is, but it might be 6 per 10 seconds. So you need to build a solution that just keeps requesting until it gets all the results and handles 429 returns.
- can also get user registration date from user request, which could allow you get all player data from start of registration year


## Game Data Stats
- select BGG username
- select date range
- get data, convert to js object, save to local storage

### Questions to Answers
#### How Many
How many total games played?
How many games with only person or group?
How many games with any from person or group?

##### Pattern
How many games played
"of" <select game(s)>
"with only" OR "that included" <select player(s)>

#### Who
did (player(s)) play with
in date range
with player(s)

#### Which games
in date range
with player(s)

#### Types of questions
How many games did I play with this person between these dates where I won and used the color red?



#### BGG API Info
https://boardgamegeek.com/wiki/page/BGG_XML_API2#toc10


