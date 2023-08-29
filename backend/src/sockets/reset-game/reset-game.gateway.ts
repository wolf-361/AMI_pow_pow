import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { GamesService } from 'src/services/games/games.service';

@WebSocketGateway()
export class ResetGameGateway {

  constructor(
    private gameService: GamesService,
  ) {}
  @SubscribeMessage('resetGame')
  handleMessage(@MessageBody() gameCode: string): boolean {
    const game = this.gameService.getGame(gameCode);

    if (!game) {
      return false;
    }

    game.resetGameData();

    return true;

  }
}
