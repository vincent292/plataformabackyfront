import { Injectable } from '@nestjs/common';
import * as Pusher from "pusher";

@Injectable()
export class PusherService {
    pusher:Pusher;

    constructor() {
        this.pusher = new Pusher({
            appId: "1881882",
            key: "2eb329b9cdae48c4a636",
            secret: "fa98c2758d65d7922eac",
            cluster: "us2",
            useTLS: true
          });
        
    }

    async trigger(channel:string, event:string, data:any ){
      await this.pusher.trigger(channel, event, data);
    }
}
