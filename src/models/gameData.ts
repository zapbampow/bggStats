export type GameData = {
    'play ID': string;
    'game ID': string;
    'game name': string;
    date: string;
    quantity: string;
    length: string;
    incomplete: string;
    comments: string;
    [key:string]: string; // for all the player # username, player # name, player # score, player # win, player # new
}