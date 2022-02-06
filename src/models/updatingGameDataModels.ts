export type PlayerModel = {
    username?: string | null;
    userId?: number | null;
    name: string;
    score?: number | null;
    win?: boolean;
    new?: boolean;
    startposition?: number | null;
    color?: string | null;
    rating?: number | null;
}

export type GameData = {
    playId: number;
    gameId: number;
    userId?: number;
    gameName: string;
    date: string;
    quantity?: number;
    location?: string | null;
    length?: number | null;
    incomplete?: boolean;
    comments?: string | null;
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