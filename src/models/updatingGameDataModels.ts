export type PlayerModel = {
    username?: string;
    name: string;
    score?: string;
    win?: boolean;
    new?: boolean;
    startposition?: string;
    color?: string;
    rating?: string;
}

export type GameData = {
    playId: number;
    gameId: number;
    userId?: number;
    gameName: string;
    date: string;
    quantity?: number;
    location?: string;
    length?: number;
    incomplete?: boolean;
    comments?: string;
    noWinStats?: boolean;
}

export interface GameDataModel extends GameData {
    players: PlayerModel[];
}

export type InitialData = {
    'play ID': string;
    'game ID': string;
    userid :string;
    'game name': string;
    date: string;
    quantity: string;
    location: string;
    length: string;
    incomplete: string;
    nowinstats: string;
    [prop: string]: string
}