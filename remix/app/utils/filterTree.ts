const filterTree = {
  count: {
    filters: [
      { value: "plays", label: "games did I play" },
      { value: "games", label: "different games did I play" },
      { value: "locations", label: "locations did I play at" },
      { value: "people", label: "people did I play with" },
      { value: "days", label: "days did I play games" },
    ],
    where: [
      "of", // game name
      "at", // location
      "with", // players
      "with only", // players
      "winner was", // players and won,
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
    time: ["for all time", "before", "after", "between", "on"],
  },
};

export default filterTree;
