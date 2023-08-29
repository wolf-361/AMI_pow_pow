import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { GamesService } from 'src/services/games/games.service';

@WebSocketGateway()
export class GetGamePlayersGateway {

  constructor(
    private gamesService: GamesService,
  ) {}

  @SubscribeMessage('getGamePlayers')
  handleMessage(@MessageBody() gameCode: string): string[] {
    const game = this.gamesService.getGame(gameCode);

    if (!game) {
      return [];
    }

    return game.players.map(player => player.username);
  }

}
