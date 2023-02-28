import { Module } from '@nestjs/common';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [TopicModule],
})
export class ForumModule {}
