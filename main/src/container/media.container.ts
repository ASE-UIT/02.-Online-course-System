import { MediaController } from '@/controller/media.controller';
import { IMediaService } from '@/service/interface/i.media.service';
import { MediaService } from '@/service/media.service';
import { Container } from 'inversify';

class MediaContainer {
  private container = new Container();
  constructor() {
    this.container.bind<IMediaService>('MediaService').to(MediaService);
    this.container.bind<MediaController>(MediaController).toSelf();
  }

  export() {
    const mediaController = this.container.get<MediaController>(MediaController);
    const mediaService = this.container.get<IMediaService>('MediaService');
    return { mediaController, mediaService };
  }
}

const mediaContainer = new MediaContainer();
const { mediaController, mediaService } = mediaContainer.export();
export { mediaController, mediaService };
