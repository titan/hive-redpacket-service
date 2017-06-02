import { rpcAsync, msgpack_decode_async, msgpack_encode_async, Result } from "hive-service";
import * as bluebird from "bluebird";
import * as msgpack from "msgpack-lite";
import * as bunyan from "bunyan";
import { createClient, RedisClient, Multi } from "redis";
import { Socket, socket } from "nanomsg";
import { AdditionalOrder, AdditionalOrderEventType, AdditionalOrderEvent } from "order-library";
import { User } from "profile-library";
import { RedPacket } from "redpacket-library";

const log = bunyan.createLogger({
  name: "redpacket-trigger",
  streams: [
    {
      level: "info",
      path: "/var/log/redpacket-trigger-info.log",  // log ERROR and above to a file
      type: "rotating-file",
      period: "1d",   // daily rotation
      count: 7        // keep 7 back copies
    },
    {
      level: "error",
      path: "/var/log/redpacket-trigger-error.log",  // log ERROR and above to a file
      type: "rotating-file",
      period: "1w",   // daily rotation
      count: 3        // keep 7 back copies
    }
  ]
});

export function run () {
  const cache: RedisClient = bluebird.promisifyAll(createClient(process.env["CACHE_PORT"], process.env["CACHE_HOST"], { "return_buffers": true })) as RedisClient;
  const sock: Socket = socket("sub");
  sock.connect(process.env["ADDITIONAL-ORDER-EVENT-TRIGGER"]);
  sock.on("data", function (buf) {
    const event: AdditionalOrderEvent = msgpack.decode(buf) as AdditionalOrderEvent;
    log.info(`Got additional order event (${JSON.stringify(event)})`);
    (async () => {
      switch(event.type) {
      case AdditionalOrderEventType.PAY: {
        // Todo: add implementation here
      }
      default: break;
      }
    })();
  });


  log.info(`redpacket-trigger is running on ${process.env["ADDITIONAL-ORDER-EVENT-TRIGGER"]}`);
}
