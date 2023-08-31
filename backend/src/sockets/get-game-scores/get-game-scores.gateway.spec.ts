import { Test, TestingModule } from '@nestjs/testing';
import { GetGameScoresGateway } from './get-game-scores.gateway';

describe('GetGameScoresGateway', () => {
  let gateway: GetGameScoresGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetGameScoresGateway],
    }).compile();

    gateway = module.get<GetGameScoresGateway>(GetGameScoresGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
