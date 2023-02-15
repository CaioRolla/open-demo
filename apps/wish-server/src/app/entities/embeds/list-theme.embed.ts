import { Column } from 'typeorm';

import { ListTheme } from '@demo/wish-shared/core';

export class ListThemeEmbed implements ListTheme {
  @Column({ type: 'varchar', length: 36, default: 'basic' })
  id: string;

  @Column({ type: 'varchar', length: 20, nullable: true, default: '#fff' })
  background: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true, default: '#1F2937' })
  color: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true, default: '#F3F4F6' })
  borderColor: string | null;
}
