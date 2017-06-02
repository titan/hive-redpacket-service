import { Processor, ProcessorFunction, ProcessorContext, rpcAsync, msgpack_encode_async, msgpack_decode_async, waitingAsync, Result } from "hive-service";
import { Client as PGClient, QueryResult } from "pg";
import { RedisClient, Multi } from "redis";
import * as crypto from "crypto";
import * as bunyan from "bunyan";
import * as uuid from "uuid";
import * as bluebird from "bluebird";
import { RedPacket } from "redpacket-library";
import { AdditionalOrder } from "order-library";
import { RedPacketEvent, RollEvent } from "./redpacket-define";

const log = bunyan.createLogger({
  name: "redpacket-processor",
  streams: [
    {
      level: "info",
      path: "/var/log/redpacket-processor-info.log",  // log ERROR and above to a file
      type: "rotating-file",
      period: "1d",   // daily rotation
      count: 7        // keep 7 back copies
    },
    {
      level: "error",
      path: "/var/log/redpacket-processor-error.log",  // log ERROR and above to a file
      type: "rotating-file",
      period: "1w",   // daily rotation
      count: 3        // keep 7 back copies
    }
  ]
});

export const processor = new Processor();

log.info("Start redpacket processor");
