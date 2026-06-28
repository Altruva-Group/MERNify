/** @format */


import { redisClient } from "@/globals";
import { Logs } from "@/monitoring";
// import dotenv from "dotenv";


const EXPIRES_IN = 6000 * 5;

// ########## Redis Functions ########### //

// SINGLE DATA
// set cache
export const setCache = async (key, data) => {
    try {
        await redisClient.SETEX(key, EXPIRES_IN, JSON.stringify(data))
        return true
    } catch (error) {
        Logs.error("Set Cache Error:", error);
        return false
    }
}

// get cache
export const getCache = async (key) => {
    try {
        const data = await redisClient.get(key)
        return await JSON.parse(data);
    } catch (error) {
        Logs.error("Set Cache Error:", error);
        return false
    }
}

// get or set cache
export const getOrSetCache = async (key, cb) => {
  try {
    let data = await redisClient.get(key);

    if (data != null && data !== '') return JSON.parse(data);
    else if (data == null) {
      data = await Promise.resolve(cb);

      if (data !== null) {
        await redisClient.SETEX(key, EXPIRES_IN, JSON.stringify(data));
        return data;
      } else {
        return false;
      }
    }
  } catch (error) {
    return false;
  }
};

// update cache key value
export const updateCache = async (key, data) => {
  try {
        await redisClient.SETEX(key, EXPIRES_IN, JSON.stringify(data));
        return data;
  } catch (error) {
    return false;
  }
};

// update cache key value
export const deleteCache = async (key) => {
  try {
      await redisClient.DEL(key);
      return true;
  } catch (error) {
    return false;
  }
};


// // LIST DATA
// // get or set Hash datatype
// export const setHashCache = async (key, cb) => {
//     try {
//         const data = await Promise.resolve(cb);
//         // console.log("data 2", { data });
//         await redisClient.LPUSH(
//           key,
//           EXPIRES_IN,
//           JSON.stringify({ data })
//         );
  
//         return data;
//     } catch (error) {
//       return false;
//     }
//   };

// // get or set Hash datatype
// export const getHashCache = async (key) => {
//     try {
//       let data = await redisClient.lRange(key, 0, -1);

//       return data;
//     } catch (error) {
//       return false;
//     }
//   };

// // get or set Hash datatype
// export const getOrSetHashCache = async (key, cb) => {
//     try {
//       let data = await redisClient.lRange(key, 0, -1);
  
//       if (data.length > 0) return JSON.parse(data);
//       else {
//         data = await Promise.resolve(cb);
//         await redisClient.LPUSH(
//           key,
//           EXPIRES_IN,
//           JSON.stringify({ data })
//         );
  
//         return data;
//       }
//     } catch (error) {
//       return false;
//     }
//   };
  
//   // update hash datatype
//   export const updateHashCache = async (key, value) => {
//     try {
//       await redisClient.LPUSH(key, EXPIRES_IN, JSON.stringify({ value }));
  
//       return true;
//     } catch (error) {
//       return false;
//     }
//   };
  
//   // remove from Hash cache <- ?
//   export const removeFromHashCache = async (key) => {
//     try {
//       await redisClient.RPOP(key);
  
//       return true;
//     } catch (error) {
//       return false;
//     }
//   };
  

