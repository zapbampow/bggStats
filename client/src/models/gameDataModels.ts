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

export type PlayData = {
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

export interface PlayDataModel extends PlayData {
    players: PlayerModel[];
}
