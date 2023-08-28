import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationGateway } from './registration.gateway';

describe('RegistrationGateway', () => {
  let gateway: RegistrationGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistrationGateway],
    }).compile();

    gateway = module.get<RegistrationGateway>(RegistrationGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
