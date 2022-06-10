const filterTree = {
  count: {
    filters: [
      { value: "plays", label: "games did I play" },
      { value: "games", label: "different games did I play" },
      { value: "locations", label: "locations did I play at" },
      { value: "people", label: "people did I play with" },
      { value: "days", label: "days did I play games" },
    ],
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
};

export default filterTree;
