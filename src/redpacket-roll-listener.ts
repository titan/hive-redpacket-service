import { BusinessEventContext, BusinessEventHandlerFunction, BusinessEventListener, ProcessorFunction, AsyncServerFunction, CmdPacket, Permission, waitingAsync, msgpack_decode_async, msgpack_encode_async } from "hive-service";
import { Client as PGClient, QueryResult } from "pg";
import { RedisClient, Multi } from "redis";
import * as bluebird from "bluebird";
import * as bunyan from "bunyan";
import * as uuid from "uuid";
import * as Disq from "hive-disque";
import { RedPacket } from "redpacket-library";
import { RollEvent } from "./redpacket-define";

export const listener = new BusinessEventListener("roll-events");

const log = bunyan.createLogger({
  name: "redpacket-listener",
  streams: [
    {
      level: "info",
      path: "/var/log/redpacket-roll-listener-info.log",  // log ERROR and above to a file
      type: "rotating-file",
      period: "1d",   // daily rotation
      count: 7        // keep 7 back copies
    },
    {
      level: "error",
      path: "/var/log/redpacket-roll-listener-error.log",  // log ERROR and above to a file
      type: "rotating-file",
      period: "1w",   // daily rotation
      count: 3        // keep 7 back copies
    }
  ]
});

listener.onEvent(async function (ctx: BusinessEventContext, data: any) {

  const event              = data as RollEvent;
  const db: PGClient       = ctx.db;
  const cache: RedisClient = ctx.cache;

  // Todo: add implementation here
});
