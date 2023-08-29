import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Player } from 'src/classes/player/player';
import { GamesService } from 'src/services/games/games.service';

@WebSocketGateway()
export class RegistrationGateway {

  constructor(
    private gamesService: GamesService,
  ) {}

  @SubscribeMessage('registerPlayer')
  handleMessage(
    @MessageBody() data: { username: string, gameCode: string },
    ): boolean {
    const { username, gameCode } = data;
    return this.gamesService.registerPlayer(username, gameCode);
  }
}
