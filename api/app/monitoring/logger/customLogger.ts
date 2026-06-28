/** @format */


import Transport from 'winston-transport';
import { Logs } from '../local';
import { KafkaProducer } from '@/streaming/kafka';


export default class customTransport extends Transport {
    constructor(opts: any) {
        super(opts);
    }

    log(info: any, callback: any) {
        KafkaProducer(info[Symbol.for("message")], "MERN_TEMPLATE_API_LOGGER").catch(error => Logs.error("Custom Transport Error:", error));
        callback();
    }
}