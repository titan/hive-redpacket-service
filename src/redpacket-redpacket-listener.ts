import { BusinessEventContext, BusinessEventHandlerFunction, BusinessEventListener, ProcessorFunction, AsyncServerFunction, CmdPacket, Permission, waitingAsync, msgpack_decode_async, msgpack_encode_async, rpcAsync } from "hive-service";
import { Client as PGClient, QueryResult } from "pg";
import { RedisClient, Multi } from "redis";
import * as bluebird from "bluebird";
import * as bunyan from "bunyan";
import * as uuid from "uuid";
import * as Disq from "hive-disque";
import { RedPacket } from "redpacket-library";
import { RedPacketEvent, RollEvent } from "./redpacket-define";

export const listener = new BusinessEventListener("redpacket-events");

const log = bunyan.createLogger({
  name: "redpacket-listener",
  streams: [
    {
      level: "info",
      path: "/var/log/redpacket-redpacket-listener-info.log",  // log ERROR and above to a file
      type: "rotating-file",
      period: "1d",   // daily rotation
      count: 7        // keep 7 back copies
    },
    {
      level: "error",
      path: "/var/log/redpacket-redpacket-listener-error.log",  // log ERROR and above to a file
      type: "rotating-file",
      period: "1w",   // daily rotation
      count: 3        // keep 7 back copies
    }
  ]
});


listener.onEvent(async (ctx: BusinessEventContext, data: any) => {

  const event: RedPacketEvent = data as RedPacketEvent;
  const db: PGClient        = ctx.db;
  const cache: RedisClient  = ctx.cache;

  if (!event) {
    return { code: 400, msg: "RedPacketEvent is null" };
  }

  // Todo: add implementation here

});
