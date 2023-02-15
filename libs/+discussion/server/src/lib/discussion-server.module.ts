import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DiscussionCommentController } from './controllers/discussion-comment.controller';
import { DiscussionController } from './controllers/discussion.controller';
import { DiscussionServerConfig } from './discussion-server.config';
import { DiscussionEntity } from './entities/discussion.entity';
import { DiscussionCommentRepositoryProvider } from './repositories/discussion-comment.repository';
import { DiscussionRepository, DiscussionRepositoryProvider } from './repositories/discussion.repository';
import { DiscussionCommentService } from './services/discussion-comment.service';
import { DiscussionService } from './services/discussion.service';

@Module({
  imports: [TypeOrmModule.forFeature([DiscussionEntity])],
  controllers: [DiscussionController, DiscussionCommentController],
  providers: [
    DiscussionRepositoryProvider,
    DiscussionCommentRepositoryProvider,
    DiscussionService,
    DiscussionCommentService,
  ],
  exports: [DiscussionRepository, DiscussionService],
})
export class DiscussionServerModule {
  static forRoot(config: DiscussionServerConfig): DynamicModule {
    return {
      module: DiscussionServerModule,
      providers: [
        {
          provide: DiscussionServerConfig,
          useValue: config,
        },
      ],
    };
  }
}
