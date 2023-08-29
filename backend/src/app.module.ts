import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Gateways
import { SocketsGateway } from './sockets/sockets/sockets.gateway';
import { CreateGameGateway } from './sockets/create-game/create-game.gateway';
import { RegistrationGateway } from './sockets/registration/registration.gateway';
import { GetGamePlayersGateway } from './sockets/get-game-players/get-game-players.gateway';

// Services
import { GamesService } from './services/games/games.service';
import { StartGameGateway } from './sockets/start-game/start-game.gateway';

@Module({
  imports: [
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SocketsGateway,
    CreateGameGateway, 
    RegistrationGateway,
    GamesService, 
    GetGamePlayersGateway, 
    StartGameGateway,
  ]
})
export class AppModule {}
