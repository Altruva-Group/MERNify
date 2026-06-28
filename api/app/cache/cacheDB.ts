/** @format */

import { Logs } from '../monitoring';
import LFUCache from './inMemoryDB';


const cacheDB = new LFUCache();

// set cache
export const addStreamingRecord = async (id: string, data: any) => {
    try {
        await cacheDB.addRecord(id, data);
        return;
    } catch (error) {
        Logs.error("Set Cache Error:", error);
        return;
    }
};

// get or set cache
export const getStreamingRecord = async (id: string) => {
    try {
        let data = await cacheDB.getRecord(id);

        if (data != null && data !== '') return JSON.parse(data);
        else if (data == null) {
            return null;
        }
    } catch (error) {
        Logs.error("Get Cache Error:", error);
        return null;
    }
};
