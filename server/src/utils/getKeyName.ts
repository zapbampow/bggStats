export default function getKeyName(keyName: string):string {
    switch (keyName) {
        case 'startposition':
        return 'startPosition';
        case 'play ID':
        return 'playId';
        case 'game ID':
        return 'gameId';
        case 'userid':
        return 'userId';
        case 'game name':
        return 'gameName';
        case 'nowinstats':
        return 'noWinStats';
        default: return keyName;
    }
}