import { Server, ServerContext, ServerFunction, CmdPacket, Permission, waitingAsync, msgpack_decode_async, rpcAsync, Paging } from "hive-service";
import { RedisClient, Multi } from "redis";
import * as bunyan from "bunyan";
import * as uuid from "uuid";
import { verify, uuidVerifier, stringVerifier, numberVerifier } from "hive-verify";
import * as bluebird from "bluebird";
import { RedPacket } from "redpacket-library";
import { RedPacketEvent, RollEvent } from "./redpacket-define";

let log = bunyan.createLogger({
  name: "redpacket-server",
  streams: [
    {
      level: "info",
      path: "/var/log/redpacket-server-info.log",  // log ERROR and above to a file
      type: "rotating-file",
      period: "1d",   // daily rotation
      count: 7        // keep 7 back copies
    },
    {
      level: "error",
      path: "/var/log/redpacket-server-error.log",  // log ERROR and above to a file
      type: "rotating-file",
      period: "1w",   // daily rotation
      count: 3        // keep 7 back copies
    }
  ]
});

export const server = new Server();

const allowAll: Permission[] = [["mobile", true], ["admin", true]];
const mobileOnly: Permission[] = [["mobile", true], ["admin", false]];
const adminOnly: Permission[] = [["mobile", false], ["admin", true]];



log.info("Start redpacket server");
