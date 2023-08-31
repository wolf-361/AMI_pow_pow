import { Logger } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { GamesService } from 'src/services/games/games.service';

@WebSocketGateway()
export class StartGameGateway {
  private logger: Logger = new Logger('StartGameGateway');

  @WebSocketServer() server;

  constructor(
    private gamesService: GamesService,
  ) {}

  @SubscribeMessage('startGame')
  handleMessage(
    @MessageBody() gameCode: string,
    ): boolean {
    const game = this.gamesService.getGame(gameCode);

    if (!game) {
      return false;
    }

    if (game.players.length < 2) {
      return false;
    }

    game.startGame();
    this.logger.log(`Game ${gameCode} started`);
    
    // Send the game state to all players 
    // TODO: Send it only to the players in the game
    this.server.emit('gameStarted', gameCode);

    return true;
  }
}
