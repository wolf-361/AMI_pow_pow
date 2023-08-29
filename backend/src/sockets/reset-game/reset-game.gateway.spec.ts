import { Test, TestingModule } from '@nestjs/testing';
import { ResetGameGateway } from './reset-game.gateway';

describe('ResetGameGateway', () => {
  let gateway: ResetGameGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResetGameGateway],
    }).compile();

    gateway = module.get<ResetGameGateway>(ResetGameGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
