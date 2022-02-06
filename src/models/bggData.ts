// Maps the json generated from the bgg xml

// Commented out sections of this exampleData are things i don't care about for my app
const exampleData = {
    _declaration: {
        _attributes: {
            version: '1.0',
            encoding: 'utf-8'
        }
    },
    plays: {
        _attributes: {
            username: 'jpseasia',
            userid: '130233',
            total: '2047',
            page: '1',
            // termsofuse: 'https://boardgamegeek.com/xmlapi/termsofuse'
        },
        play: [
            {
                _attributes: {
                    id: '57826772',
                    date: '2022-01-24',
                    quantity: '1',
                    length: '0',
                    incomplete: '0',
                    nowinstats: '0',
                    location: 'Lilburn, GA'
                },
                item: {
                    _attributes: {
                        name: 'Battleship',
                        // objecttype: 'thing', 
                        objectid: '2425'
                    },
                    comments: {
                        _text: ""
                    },
                    // subtypes: { 
                    //     subtype: { 
                    //         _attributes: { 
                    //             value: 'boardgame' 
                    //         } 
                    //     }
                    // }
                },
                players: {
                    player: [
                        {
                            _attributes: {
                                username: '',
                                userid: '0',
                                name: 'Teresa',
                                startposition: '',
                                color: '',
                                score: '',
                                new: '0',
                                rating: '0',
                                win: '1'
                            }
                        },
                    ]
                }
            }
        ]
    }
}

export type BGGData = {
    _declaration: {
        _attributes: {
            version: string;
            encoding: string;
        }
    };
    plays: {
        _attributes: {
            username: string;
            userid: string;
            total: string;
            page: string;
            termsofuse: string;
        };
        play: BGGPlay[]
    };
};

// Play is always an array with a single object
export type BGGPlay = {
    _attributes: {
        id: string;
        date: string;
        quantity: string;
        length: string;
        incomplete: string;
        nowinstats: string;
        location: string;
    };
    item: BGGItem;
    comments?: {
        _text: string;
    }
    players: {
        player: BGGPlayerData[] | BGGPlayerData;
    }
}

type BGGItem = {
    _attributes: {
        name: string;
        objecttype: string;
        objectid: string;
    };
    subtypes: BGGSubtypes;
};

type BGGSubtypes = {
    subtype: {
        _attributes: {
            value: string;
        };
    };
};

type BGGPlayer = {
    player: BGGPlayerData[] | BGGPlayerData;
};

export type BGGPlayerData = {
    _attributes: {
        username: string;
        userid: string;
        name: string;
        startposition: string;
        color: string;
        score: string;
        new: string;
        rating: string;
        win: string;
    }
}