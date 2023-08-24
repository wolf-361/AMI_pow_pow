
/**
 * Player model
 * Represents a player in a game
 */
export class Player {

    public username: string; // The player's username, as entered by the user
    public score: number; // The player's score, as calculated by the server
    public socketId: string; // The player's socket ID, as assigned by the server via socket.io
}
