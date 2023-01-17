# BGG Stats Dashboard
An app to explore user play data from Board Game Geek.

## How to use
After entering a username, the app will download the user's play data. By interacting with the charts and filters, the user can answer questions and make insights about their recorded plays.

## TODO
### Top Priorities
1. New Games Card/Feature
   - new game for player filter
   - new games card
   - Feat: New games. List of game, game id, and date of first recorded play. Clicking opens new page with full chart of new games and searching of the list.
  - Feat: List first time user recorded all games
1. Name/location dropdowns based on filteredPlays instead of all plays

### Other Tasks
- Bug: When clicking the arrows to navigate the paginated data, it doesn't update the page number
- Bug: When deleting data of one user, all the buttons display "deleting" instead of just the one

- Refactor: for the dropdown filters related to games, players, and location - only display those things for the currently filtered plays instead of for all possible plays
- Refactor: Add icon for sorting in the th tags and add cursor pointer on hover of the sortable columns
  - [Example](https://codesandbox.io/s/github/tanstack/table/tree/main/examples/react/sorting?from-embed=&file=/src/main.tsx:2926-2975)

- Feat:only get new data if it hasn't updated in a certain amount of time: save last update time in localStorage and reference when deciding whether to run the get bgg data stuff
- Feat: Force get new data
- Feat: add 'this year' and 'last year' as date range options
- Feat: Let user click other in the player chart and have the chart update with everyone that would be in the other category.
- Feat: Add a Without Player filter
- Feat: Add top games played card (most played games in the filter)
- Feat: no filters for color, new, rating, score, startposition. You could add them.
- Feat: add modal with instructions - only show if there is no record in localStorage that this person has visited before
  - 1. Drill down your data by interacting with the graphs
  - 2. Use filters to be more specific
  - 3. Customize which dashboard cards are displayed
- Feat: add drag and drop to the cards
- Feat: add a trophy next to the winners' names

