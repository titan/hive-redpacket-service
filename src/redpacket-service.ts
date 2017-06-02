import { Service, Server, Processor, Config } from "hive-service";
import { server } from "./redpacket-server";
import { processor } from "./redpacket-processor";
import { listener as redpacket_listener } from "./redpacket-redpacket-listener";
import { listener as roll_listener } from "./redpacket-roll-listener";
import * as trigger from "./redpacket-trigger";
import * as bunyan from "bunyan";

const log = bunyan.createLogger({
  name: "redpacket-service",
  streams: [
    {
      level: "info",
      path: "/var/log/redpacket-service-info.log",  // log ERROR and above to a file
      type: "rotating-file",
      period: "1d",   // daily rotation
      count: 7        // keep 7 back copies
    },
    {
      level: "error",
      path: "/var/log/redpacket-service-error.log",  // log ERROR and above to a file
      type: "rotating-file",
      period: "1w",   // daily rotation
      count: 3        // keep 7 back copies
    }
  ]
});

const config: Config = {
  modname: "redpacket",
  serveraddr: process.env["REDPACKET"],
  queueaddr: "ipc:///tmp/redpacket.ipc",
  cachehost: process.env["CACHE_HOST"],
  dbhost: process.env["DB_HOST"],
  dbuser: process.env["DB_USER"],
  dbport: process.env["DB_PORT"],
  database: process.env["DB_NAME"],
  dbpasswd: process.env["DB_PASSWORD"],
  queuehost: process.env["QUEUE_HOST"],
  queueport: process.env["QUEUE_PORT"],
  loginfo: (...x) => log.info(x),
  logerror: (...x) => log.error(x),
};

const svc: Service = new Service(config);

svc.registerServer(server);
svc.registerProcessor(processor);
svc.registerEventListener(redpacket_listener);
svc.registerEventListener(roll_listener);

svc.run();
trigger.run();
