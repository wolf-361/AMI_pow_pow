import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { GamesService } from 'src/services/games/games.service';

@WebSocketGateway()
export class GetGameScoresGateway {

  constructor(
    private gamesService: GamesService,
  ) {}

  @SubscribeMessage('getGameScores')
  handleMessage(@MessageBody() gameCode: string): { username: string, score: number }[] {
    const game = this.gamesService.getGame(gameCode);

    if (!game) {
      return [];
    }

    return game.players.map(player => ({ username: player.username, score: player.score }));
  }
}
