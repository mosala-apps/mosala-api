import { Test, TestingModule } from '@nestjs/testing';
import { TalentsWorkClientsService } from './talents_work_clients.service';

describe('TalentsWorkClientsService', () => {
  let service: TalentsWorkClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TalentsWorkClientsService],
    }).compile();

    service = module.get<TalentsWorkClientsService>(TalentsWorkClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
