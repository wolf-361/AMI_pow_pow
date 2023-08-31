import { Test, TestingModule } from '@nestjs/testing';
import { CreateGameGateway } from './create-game.gateway';

describe('CreateGameGateway', () => {
  let gateway: CreateGameGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateGameGateway],
    }).compile();

    gateway = module.get<CreateGameGateway>(CreateGameGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
