/** @format */

// import { EXPIRATION_DAYS, LFU_CACHE_LIMIT } from "@/constants";


class LFUCache {
    records: Map<any, any>;

    constructor () {
        this.records = new Map();
    }

    //=== ADD ===//
    async addRecord(id: string, data: any) {
        const now = Date.now();

        // check existing record
        if (this.records.has(id)) {
            return null;
        }

        // add new record
        await this.records.set(id, JSON.stringify({
            data
        }));
    }

    //=== GET ===//
    async getRecord(id: string) {        
        const record = await this.records.get(id);
        if (!record) return null;
        else if (record) await this.records.delete(id);

        return record;
    }
}


export default LFUCache;