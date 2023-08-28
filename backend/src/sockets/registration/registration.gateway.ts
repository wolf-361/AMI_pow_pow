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
    @MessageBody() username: string,
    @ConnectedSocket() client: Socket,
    ): boolean {
    const player = new Player(username, client.id);
    this.playersService.addPlayer(player);

    return true;
  }
}
