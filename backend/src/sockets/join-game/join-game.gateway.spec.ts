import { Test, TestingModule } from '@nestjs/testing';
import { JoinGameGateway } from './join-game.gateway';

describe('JoinGameGateway', () => {
  let gateway: JoinGameGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JoinGameGateway],
    }).compile();

    gateway = module.get<JoinGameGateway>(JoinGameGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
