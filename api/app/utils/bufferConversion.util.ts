/** @format */


import DataURIParser from "datauri/parser.js";
import path from "path";

const dataURIChild = new DataURIParser();

export default function bufferConversion(originalName: string, buffer: Buffer) {
    const extension = path.extname(originalName);
    return dataURIChild.format(extension, buffer).content;
}


