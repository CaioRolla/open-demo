import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscussionAppConfig } from './discussion-app.config';
import { DiscussionService } from './services';
import { DiscussionCommentService } from './services/discussion-comment.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    DiscussionService,
    DiscussionCommentService
  ]
})
export class DiscussionAppModule {
  static forRoot(config: DiscussionAppConfig): ModuleWithProviders<DiscussionAppModule> {
    return {
      ngModule: DiscussionAppModule,
      providers: [{ provide: DiscussionAppConfig, useValue: config }],
    };
  }
}
