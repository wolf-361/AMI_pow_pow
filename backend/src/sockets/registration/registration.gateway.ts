import { Logger } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { GamesService } from 'src/services/games/games.service';

@WebSocketGateway()
export class RegistrationGateway {
  private logger: Logger = new Logger('RegistrationGateway');

  constructor(
    private gamesService: GamesService,
  ) {}

  @SubscribeMessage('registerPlayer')
  handleMessage(
    @MessageBody() data: { username: string, gameCode: string },
    ): boolean {
    const { username, gameCode } = data;
    this.logger.log(`Registering player ${username} for game ${gameCode}`);
    return this.gamesService.registerPlayer(username, gameCode);
  }
}
