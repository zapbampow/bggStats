# BGG Stats Dashboard
An app to explore user play data from Board Game Geek.

## How to use
After entering a username, the app will download the user's play data. By interacting with the charts and filters, the user can answer questions and make insights about their recorded plays.

## TODO
- Bug: When clicking the arrows to navigate the paginated data, it doesn't update the page number
- Bug: When deleting data of one user, all the buttons display "deleting" instead of just the one
- Feat: add a View button to each user on the Manage Data page
- Feat:only get new data if it hasn't updated in a certain amount of time: save last update time in localStorage and reference when deciding whether to run the get bgg data stuff
- Feat: Force get new data
- Feat: add 'this year' and 'last year' as date range options
- Feat: List first time user recorded all games
- Feat: Let user click other in the player chart and have the chart update with everyone that would be in the other category.
- Feat: Add a Without Player filter
- Feat: allow user to remove or add the charts they want to see
- Feat: # games played card that mirrors the # days played card
- Feat: Add top games played card (most played games in the filter)
- Feat: New games. List of game, game id, and date of first recorded play. Clicking opens new page with full chart of new games and searching of the list.
- Feat: no filters for color, new, rating, score, startposition. You could add them.
- Add icon for sorting in the th tags and add cursor pointer on hover of the sortable columns
  - [Example](https://codesandbox.io/s/github/tanstack/table/tree/main/examples/react/sorting?from-embed=&file=/src/main.tsx:2926-2975)
- Feat: add modal with instructions - only show if there is no record in localStorage that this person has visited before
  - 1. Drill down your data by interacting with the graphs
  - 2. Use filters to be more specific
  - 3. Customize which dashboard cards are displayed

### Top Priorities
1. \# Games Played Card
2. New Games Card 
   - a new game is one marked as new or the first time it was recorded by this user
   - include a "?" with popover menu which explains how we calculate "new"
3. First time instruction modal
