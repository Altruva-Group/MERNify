import { getStreamingRecord } from "@/cache";
import { STATUS_CODES } from "@/constants";
import { errorHandlerWrapper } from "@/helpers";
import { Logs } from "@/monitoring";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";


const getResponse = asyncHandler( async (
    req: Request, res: Response
) => {
    try{
        const correlationId = req.params.correlationId;

        const result = await getStreamingRecord(correlationId);

            if (result !== null) {
                if (result['errMessage']) {
                    res.status(result['statusCode']).json({
                        success: false,
                        message: result['errMessage'],
                    });
                    return;
                } else if (!result['errMessage']) {
                    res.status(result['statusCode']).json({
                        success: true,
                        message: result['message'],
                        data: result['data'] ? result['data'] : null
                    });
                    return;
                }
            } else {
                res.status(STATUS_CODES.SUCCESS.ACCEPTED).json({
                    message: "Processing request",
                });
                return;
            }

    } catch (error) {
        Logs.error("Get Streaming Result error:", error);
        res.status(STATUS_CODES.SERVER_ERRORS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Server Error! Try Again Later"
        })
    }
})

export const getStreamingResult = errorHandlerWrapper(getResponse) 