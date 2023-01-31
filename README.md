# BGG Stats Dashboard
An app to explore user play data from Board Game Geek.

## How to use
After entering a username, the app will download the user's play data. By interacting with the charts and filters, the user can answer questions and make insights about their recorded plays.

## TODO
### Top Priorities
1. Mobile styling of table on dashboard + mobile styling of bgg gradient on mobile with few results
2. Name/location dropdowns based on filteredPlays instead of all plays
3. Change menu dropdown based on current location.
   - if on dashboard, include Tools
   - if in Tools, include Dashboard

### Other Tasks
- Bug: Needs error handling if the username entered is not a bgg username
- Bug: When clicking the arrows to navigate the paginated data, it doesn't update the page number
- Bug: When deleting data of one user, all the buttons display "deleting" instead of just the one

- Refactor: for the dropdown filters related to games, players, and location - only display those things for the currently filtered plays instead of for all possible plays
- Refactor: Add icon for sorting in the th tags and add cursor pointer on hover of the sortable columns
  - [Example](https://codesandbox.io/s/github/tanstack/table/tree/main/examples/react/sorting?from-embed=&file=/src/main.tsx:2926-2975)

- Feat(display winners in table): add a trophy next to the winners' names
- Feat(this year filter): add 'this year' and 'last year' as date range options
- Feat(exclude player filter): Add a Without Player filter
- Feat(instructions modal): add modal with instructions - only show if there is no record in localStorage that this person has visited before
  - 1. Drill down your data by interacting with the graphs
  - 2. Use filters to be more specific
  - 3. Customize which dashboard cards are displayed
- Feat(save filters)
  - new table
    - name
    - json version of filter parameters
- Feat(shareable filters with url params)
  - add/update query parameters any time filters are updated
  - on first load, after data is updated, check for query params
    - convert them to filters 
    - and apply the filters
- Feat(drag and drop cards): add drag and drop to the cards
- Feat(most played card): Add top games played card (most played games in the filter)
- Feat(display 'other' data): Let user click other in the player chart and have the chart update with everyone that would be in the other category.
- Feat: Force get new data
- Feat:only get new data if it hasn't updated in a certain amount of time: save last update time in localStorage and reference when deciding whether to run the get bgg data stuff
- Feat: no filters for color, new, rating, score, startposition. You could add them.
- Make data downloadable


## Adding a filter
### What happens when you select a filter in the main dashboard UI (how does it work)?
1. The filter data is added or updated in the PlayFilterContext
2. The useFilteredData hook sees the change and responds
   - It orders them by their order
   - It passed the information to the queryService filter function
3. Using functional programming pipe method, it runs through all the filter options, reducing all the plays down to only the ones that match all the filter options 
   - it knows what to do with each option because of the argFunctionPairs variable
4. useFilteredData saves the filtered plays in the PlayResultsContext
5. RecordedPlays component then displays the filtered plays

### Steps to add a filter
1. Add filter function to an appropriate filterBy file in `services/queryService`  and export it
2. In `services/queryService/queryService` import the filter function and add to argFunctionPairs
3. Add to `app/utils/filterTree` in the listRecordedPlays object, which is used in AddFilterButton to display what filters are add-able
4. Add an option to `components/bggStats/FilterToComponent` which is used to display proper selector (Combobox, date selector, etc).
5. If using a combobox, update `components/bggStats/filters/getOptions` to get whatever values you need to display if necessary
   - also add whatever you need to actually get that data