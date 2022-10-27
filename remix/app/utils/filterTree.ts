const filterTree = {
  count: {
    filters: [
      { value: "plays", label: "game plays did I record" },
      { value: "games", label: "different games did I record playing" },
      { value: "locations", label: "play locations did I record" },
      { value: "people", label: "people did I record playing" },
      { value: "days", label: "days did I record playing games" },
    ],
    "game name": [
      // ↑↑↑ using string for key because it's used for the section heading in the add menu button select options
      { value: "gameName", label: "of" },
      { value: "gameNames", label: "of these games:" },
    ],
    time: [
      { value: "onDate", label: "on" },
      { value: "betweenDates", label: "between" },
      { value: "afterDate", label: "after" },
      { value: "beforeDate", label: "before" },
      { value: "all", label: "for all time" },
    ],
    players: [
      { value: "withAllPlayerNames", label: "with" },
      { value: "withOnlyPlayerNames", label: "with only" },
      { value: "withAnyPlayerNames", label: "with any of" },
      { value: "whereSinglePlayerNameWon", label: "where the winner was" },
      { value: "wherePlayerNamesWon", label: "where the winners were" },
      // "of", // game name
      // "at", // location
      // "with", // players
      // "with only", // players
      // "winner was", // players and won,
      // possible filters, but not for v1
      // 'that I completed', // incomplete
      // "that I didn't complete", // incomplete
      // 'that lasted', // length
      // 'where I scored', // score
      // "where I played it muliple times in a row", // quantity
      // "where player start position was", // start position
      // "where player rated game",  // rating
      // "where player color was", // color
    ],
    location: [{ value: "location", label: "at" }],
  },
  listPlayerNames: {
    filters: [],
    "game name": [
      { value: "gameName", label: "of" },
      { value: "gameNames", label: "of these games:" },
    ],
    time: [
      { value: "onDate", label: "on" },
      { value: "betweenDates", label: "between" },
      { value: "afterDate", label: "after" },
      { value: "beforeDate", label: "before" },
      { value: "all", label: "for all time" },
    ],
    location: [{ value: "location", label: "at" }],
  },
  listGameNames: {
    filters: [],
    time: [
      { value: "onDate", label: "on" },
      { value: "betweenDates", label: "between" },
      { value: "afterDate", label: "after" },
      { value: "beforeDate", label: "before" },
      { value: "all", label: "for all time" },
    ],
    location: [{ value: "location", label: "at" }],
    players: [
      { value: "withAllPlayerNames", label: "with" },
      { value: "withOnlyPlayerNames", label: "with only" },
      { value: "withAnyPlayerNames", label: "with any of" },
      { value: "whereSinglePlayerNameWon", label: "where the winner was" },
      { value: "wherePlayerNamesWon", label: "where the winners were" },
    ],
  },
  listDates: {
    filters: [],
    "game name": [
      { value: "gameName", label: "of" },
      { value: "gameNames", label: "of these games:" },
    ],
    time: [
      { value: "betweenDates", label: "between" },
      { value: "afterDate", label: "after" },
      { value: "beforeDate", label: "before" },
    ],
    players: [
      { value: "withAllPlayerNames", label: "with" },
      { value: "withOnlyPlayerNames", label: "with only" },
      { value: "withAnyPlayerNames", label: "with any of" },
      { value: "whereSinglePlayerNameWon", label: "where the winner was" },
      { value: "wherePlayerNamesWon", label: "where the winners were" },
    ],
    location: [{ value: "location", label: "at" }],
  },
  listLocations: {
    filters: [],
    "game name": [
      { value: "gameName", label: "of" },
      { value: "gameNames", label: "of these games:" },
    ],
    players: [
      { value: "withAllPlayerNames", label: "with" },
      { value: "withOnlyPlayerNames", label: "with only" },
      { value: "withAnyPlayerNames", label: "with any of" },
      { value: "whereSinglePlayerNameWon", label: "where the winner was" },
      { value: "wherePlayerNamesWon", label: "where the winners were" },
    ],
    time: [
      { value: "onDate", label: "on" },
      { value: "betweenDates", label: "between" },
      { value: "afterDate", label: "after" },
      { value: "beforeDate", label: "before" },
      { value: "all", label: "for all time" },
    ],
  },
  listRecordedPlays: {
    filters: [],
    "game name": [
      // ↑↑↑ using string for key because it's used for the section heading in the add menu button select options
      { value: "gameName", label: "Game" },
      { value: "gameNames", label: "Games" },
    ],
    time: [
      { value: "onDate", label: "On" },
      { value: "betweenDates", label: "Between" },
      { value: "afterDate", label: "After" },
      { value: "beforeDate", label: "Before" },
      // { value: "all", label: "for all time" },
    ],
    players: [
      { value: "withAllPlayerNames", label: "With all" },
      { value: "withOnlyPlayerNames", label: "With only" },
      { value: "withAnyPlayerNames", label: "With any" },
      { value: "whereSinglePlayerNameWon", label: "Where the winner was" },
      { value: "wherePlayerNamesWon", label: "Where the winners were" },
      // "of", // game name
      // "at", // location
      // "with", // players
      // "with only", // players
      // "winner was", // players and won,
      // possible filters, but not for v1
      // 'that I completed', // incomplete
      // "that I didn't complete", // incomplete
      // 'that lasted', // length
      // 'where I scored', // score
      // "where I played it muliple times in a row", // quantity
      // "where player start position was", // start position
      // "where player rated game",  // rating
      // "where player color was", // color
    ],
    location: [{ value: "location", label: "At" }],
  },
};

export default filterTree;
