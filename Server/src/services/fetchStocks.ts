import { gunzipSync } from "node:zlib";
import axios from "axios";
import prisma from "../lib/prisma.js";
const url = "https://assets.upstox.com/market-quote/instruments/exchange/NSE.json.gz";

const response = await axios.get(url,{
    responseType:"arraybuffer",
});

const jsonBuffer = gunzipSync(response.data);

const instruments = JSON.parse(jsonBuffer.toString("utf-8"));

//now feed this data into the database;//its a complete list of all the instruments available in NSE and BSE;//so its also a cron job to update the instruments list in the database every day at 6:00 AM morninng

// we need to loop for each index in the instruments array and insert it into the database, but first we need to check if the instrument already exists in the database or not, if it exists then we need to update it, if it doesn't exist then we need to insert it.

for(let i=0;i<instruments.length;i++){

    let stock = instruments[i];

    let instrument_key = stock.instrument_key;

    // take only the fields that exist in our schema
    let stockData = {
        segment: stock.segment,
        name: stock.name,
        exchange: stock.exchange,
        
        instrument_type: stock.instrument_type,
        instrument_key: stock.instrument_key,
        
        
       
        trading_symbol: stock.trading_symbol,
       
    };

    let existingStock = await prisma.stocks.findUnique({
        where:{
            instrument_key: instrument_key
        }
    });

    if(existingStock){

        existingStock = await prisma.stocks.update({
            where:{
                instrument_key: instrument_key
            },
            data:{
                ...stockData
            }
        });

    }

    if(!existingStock){

       await prisma.stocks.create({
        data:{
            ...stockData
        }
        })

    }
}

console.log(instruments[0])