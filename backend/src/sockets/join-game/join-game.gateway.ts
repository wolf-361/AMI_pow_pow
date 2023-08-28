import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { get } from 'http';
import { Socket } from 'socket.io';
import { GamesService } from 'src/services/games/games.service';
import { PlayersService } from 'src/services/players/players.service';

@WebSocketGateway()
export class JoinGameGateway {
  constructor(
    private gamesService: GamesService,
    private playersService: PlayersService,
  ) {}

  @SubscribeMessage('join-game')
  handleMessage(
    @MessageBody() gameCode: string,
    @ConnectedSocket() client: Socket,
  ): boolean {
    // Find the game with the given game code
    const game = this.gamesService.getGame(gameCode);

    // If the game doesn't exist, return false
    if (!game) {
      return false;
    }

    // Find the player
    const player = this.playersService.getPlayer(client.id);

    // If the player doesn't exist, return false
    if (!player) {
      return false;
    }

    // Add the player to the game
    game.addPlayer(player);

    // Add the game to the player
    player.game = game;

    // Return true
    return true;
  }
}
