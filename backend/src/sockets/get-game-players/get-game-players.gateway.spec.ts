import { Test, TestingModule } from '@nestjs/testing';
import { GetGamePlayersGateway } from './get-game-players.gateway';

describe('GetGamePlayersGateway', () => {
  let gateway: GetGamePlayersGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetGamePlayersGateway],
    }).compile();

    gateway = module.get<GetGamePlayersGateway>(GetGamePlayersGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
