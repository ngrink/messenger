import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import YandexS3 from 'easy-yandex-s3'

@Injectable()
export class StorageService {
  attachments: YandexS3
  userdata: YandexS3

  constructor(
    private readonly configService: ConfigService
  ) {
    this.attachments = new YandexS3({
      auth: {
        accessKeyId: configService.get('YANDEX_S3_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('YANDEX_S3_SECRET_ACCESS_KEY'),
      },
      Bucket: 'ngrink-messenger-attachments',
      debug: false,
    })

    this.userdata = new YandexS3({
      auth: {
        accessKeyId: configService.get('YANDEX_S3_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('YANDEX_S3_SECRET_ACCESS_KEY'),
      },
      Bucket: 'ngrink-messenger-userdata',
      debug: false,
    })
  }
}
