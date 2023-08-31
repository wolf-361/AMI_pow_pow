import { Test, TestingModule } from '@nestjs/testing';
import { StartGameGateway } from './start-game.gateway';

describe('StartGameGateway', () => {
  let gateway: StartGameGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StartGameGateway],
    }).compile();

    gateway = module.get<StartGameGateway>(StartGameGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
