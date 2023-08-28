
/**
 * Generates a random game code
 * @returns a random game code of 4 capital letters
 */
export function generateGameCode(): string {

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';

    for (let i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    return result;
}
