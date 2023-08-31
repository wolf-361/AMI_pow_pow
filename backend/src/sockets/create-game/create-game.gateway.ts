import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { GamesService } from 'src/services/games/games.service';

@WebSocketGateway()
export class CreateGameGateway {
  private logger: Logger = new Logger('CreateGameGateway');

  constructor(
    private gamesService: GamesService,
  ) {}

  @SubscribeMessage('createGame')
  handleMessage(): string {
    const gameId = this.gamesService.createGame();

    this.logger.log(`Game created: ${gameId}`);

    return gameId;
  }
}
