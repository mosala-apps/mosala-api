import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { WorkService } from './work.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { CurrentUser } from '../auth/decorator/user.decorator';

@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createWorkDto: CreateWorkDto, @CurrentUser() currentUser) {
    createWorkDto.createdBy = currentUser;
    return this.workService.create(createWorkDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.workService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateWorkDto: UpdateWorkDto,
    @CurrentUser() currentUser,
  ) {
    updateWorkDto.updatedBy = currentUser;
    return this.workService.update(+id, updateWorkDto);
  }

  @Put('matching/:id')
  @UseGuards(JwtAuthGuard)
  matching(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWorkDto: UpdateWorkDto,
    @CurrentUser() currentUser,
  ) {
    updateWorkDto.updatedBy = currentUser;
    return this.workService.matching(id, updateWorkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workService.remove(+id);
  }
}
