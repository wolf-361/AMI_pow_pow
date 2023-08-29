import { Logger } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { GamesService } from 'src/services/games/games.service';

@WebSocketGateway()
export class GetGamePlayersGateway {
  private logger: Logger = new Logger('GetGamePlayersGateway');

  constructor(
    private gamesService: GamesService,
  ) {}

  @SubscribeMessage('getGamePlayers')
  handleMessage(@MessageBody() gameCode: string): string[] {
    const game = this.gamesService.getGame(gameCode);

    if (!game) {
      this.logger.error(`Game with code ${gameCode} not found`);
      return;
    }

    return game.players.map(player => player.username);
  }

}
