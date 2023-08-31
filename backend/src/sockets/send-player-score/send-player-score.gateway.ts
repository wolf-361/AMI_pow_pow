import { Logger } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { GamesService } from 'src/services/games/games.service';

@WebSocketGateway()
export class SendPlayerScoreGateway {
  private logger: Logger = new Logger('SendPlayerScoreGateway');
  private scoreMultiplier = 100;

  constructor(
    private gamesService: GamesService,
  ) {}

  @SubscribeMessage('sendPlayerScore')
  handleMessage(@MessageBody() data: { username: string, gameCode: string, score: number}): boolean {
    const { username, gameCode, score } = data;
    const game = this.gamesService.getGame(gameCode);

    if (!game) {
      return false;
    } 

    const player = game.getPlayer(username);

    if (!player) {
      return false;
    }

    player.score = score * this.scoreMultiplier;
    this.logger.log(`Player ${username} has scored ${player.score} points`);

    return true;
  }
}
