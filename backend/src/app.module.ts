import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Gateways
import { SocketsGateway } from './sockets/sockets/sockets.gateway';
import { CreateGameGateway } from './sockets/create-game/create-game.gateway';
import { JoinGameGateway } from './sockets/join-game/join-game.gateway';
import { RegistrationGateway } from './sockets/registration/registration.gateway';

// Services
import { PlayersService } from './services/players/players.service';
import { GamesService } from './services/games/games.service';

@Module({
  imports: [
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SocketsGateway,
    CreateGameGateway, 
    JoinGameGateway, 
    RegistrationGateway,
    GamesService, 
    PlayersService,]
})
export class AppModule {}
