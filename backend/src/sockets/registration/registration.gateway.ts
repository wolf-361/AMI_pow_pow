import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Player } from 'src/classes/player/player';
import { PlayersService } from 'src/services/players/players.service';

@WebSocketGateway()
export class RegistrationGateway {

  constructor(
    private playersService: PlayersService,
  ) {}

  @SubscribeMessage('registration')
  handleMessage(
    @MessageBody() username: string
    ): boolean {
    const player = new Player(username);

    return this.playersService.addPlayer(player);
  }
}
