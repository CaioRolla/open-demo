import { Pipe, PipeTransform } from '@angular/core';
import { LinerProgressTheme } from '@demo/shared-app/ui/progress/linear-progress/linear-progress.component';
import { AssetUploadStatus, FileData } from '../data';

@Pipe({
  name: 'dataProgressTheme',
})
export class DataProgressThemePipe implements PipeTransform {
  transform(
    data: FileData,
    ...args: unknown[]
  ): LinerProgressTheme {
    return {
      [AssetUploadStatus.COMPLETE]: 'success',
      [AssetUploadStatus.EDIT]: 'success',
      [AssetUploadStatus.UPLOADING]: 'primary',
      [AssetUploadStatus.PENDING]: 'neutral',
    }[data.status] as LinerProgressTheme;
  }
}
