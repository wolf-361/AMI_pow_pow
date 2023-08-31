import { Test, TestingModule } from '@nestjs/testing';
import { SocketsGateway } from './sockets.gateway';

describe('SocketsGateway', () => {
  let sockets: SocketsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketsGateway],
    }).compile();

    sockets = module.get<SocketsGateway>(SocketsGateway);
  });

  it('should be defined', () => {
    expect(sockets).toBeDefined();
  });
});
