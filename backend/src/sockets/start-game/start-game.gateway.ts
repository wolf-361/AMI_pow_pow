import { Logger } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { GamesService } from 'src/services/games/games.service';

@WebSocketGateway()
export class StartGameGateway {
  private logger: Logger = new Logger('StartGameGateway');

  constructor(
    private gamesService: GamesService,
  ) {}

  @SubscribeMessage('startGame')
  handleMessage(@MessageBody() gameCode: string): WsResponse {
    const game = this.gamesService.getGame(gameCode);

    if (!game) {
      return { event: 'gameNotFound', data: gameCode };
    }

    if (game.players.length < 2) {
      return { event: 'notEnoughPlayers', data: gameCode };
    }

    game.startGame();
    this.logger.log(`Game ${gameCode} started`);
    
    return { event: 'gameStarted', data: gameCode };
  }
}
