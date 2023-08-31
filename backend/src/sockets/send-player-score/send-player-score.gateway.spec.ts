import { Test, TestingModule } from '@nestjs/testing';
import { SendPlayerScoreGateway } from './send-player-score.gateway';

describe('SendPlayerScoreGateway', () => {
  let gateway: SendPlayerScoreGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendPlayerScoreGateway],
    }).compile();

    gateway = module.get<SendPlayerScoreGateway>(SendPlayerScoreGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
