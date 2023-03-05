import { Controller } from '@nestjs/common';
import { TalentsWorkClientsService } from './talents_work_clients.service';

@Controller('talents-work-clients')
export class TalentsWorkClientsController {
  constructor(private readonly talentsWorkClientsService: TalentsWorkClientsService) {}
}
