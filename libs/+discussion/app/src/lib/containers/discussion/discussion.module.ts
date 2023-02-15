import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { FormFieldModule } from '@demo/shared-app/forms/form-field';
import { AvatarModule } from '@demo/shared-app/ui/avatar';
import { DiscussionComponent } from './discussion.component';
import { CommentRowComponent } from './comment-row/comment-row.component';
import { ButtonModule } from '@demo/shared-app/ui/button';
import { MenuModule } from '@demo/shared-app/ui/menu';
import { HeroIconsModule } from 'ng-heroicons';
import { CommentDeleteDialogComponent } from './comment-delete-dialog/comment-delete-dialog.component';
import { CardModule } from '@demo/shared-app/ui/card';
import { DialogModule } from '@demo/shared-app/ui/dialog';

@NgModule({
  declarations: [DiscussionComponent, CommentRowComponent, CommentDeleteDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldModule,
    QuillModule,
    AvatarModule,
    ButtonModule,
    HeroIconsModule,
    MenuModule,
    CardModule,
    DialogModule
  ],
  exports: [DiscussionComponent],
})
export class DiscussionModule {}
