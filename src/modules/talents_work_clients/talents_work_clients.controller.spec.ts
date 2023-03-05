import { Test, TestingModule } from '@nestjs/testing';
import { TalentsWorkClientsController } from './talents_work_clients.controller';
import { TalentsWorkClientsService } from './talents_work_clients.service';

describe('TalentsWorkClientsController', () => {
  let controller: TalentsWorkClientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TalentsWorkClientsController],
      providers: [TalentsWorkClientsService],
    }).compile();

    controller = module.get<TalentsWorkClientsController>(TalentsWorkClientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
