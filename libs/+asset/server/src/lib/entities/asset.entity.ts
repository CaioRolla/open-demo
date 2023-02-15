import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  AfterLoad,
} from 'typeorm';

import { Asset } from '@demo/+asset/core';

@Entity({ name: 'asset' })
export class AssetEntity implements Asset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  url: string;

  @Column({ type: 'varchar', length: 36, nullable: true })
  token: string | null;

  accessUrl: string;

  @Column({ type: 'varchar', length: 500 })
  originalname: string;

  @Column({ type: 'varchar', length: 500 })
  mimeType: string;

  @Column({ type: 'int' })
  size: number;

  @Column({ type: 'int', default: 0 })
  orderIndex: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date | null;

  @DeleteDateColumn({ select: false })
  deletedAt: Date | null;

  // THIS IS A TOTAL GAMBIARRA!
  @AfterLoad()
  updateAccessUrl() {
      // this.accessUrl = `${process.env.BASE_API_PATH}/v1/asset/${this.id}/${this.originalname}${this.token ? '?token=' + this.token : ''}`;
      
      // IN ORDER TO NOT FUCK UP THE SERVER BECAUSE OF WISH, LET`S SEND PUBLIC DIRECTLY TO S3
      if(this.token){
        this.accessUrl = `${process.env.BASE_API_PATH}/v1/asset/${this.id}/${this.originalname}?token=${this.token}`;
      } else {
        this.accessUrl = this.url;
      }
      
  }
}
