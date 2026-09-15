import { Request, Response } from "express";
import prisma from "../lib/prisma.js";

export async function fetchPortfolio(req: any, res: any) {
    
    const  userId  = req.userId;
    try{

    
    if (!userId) {
        return res.status(401).json({
            message: "invalid user",
            success: false
        })
    }

    //user found fetch his holdings;

    const userCurrentHoldings = await prisma.holding.findMany({
        where: {
            userId: userId
        },
        include:{
           stock:true 
        }
    })

    //now we found the holdings we fetch the asset details from it.
    //first fetch the assetIds so get the assest name and then fetch live prices from redis

    const stockIds = await userCurrentHoldings.map((item) => item.stockId);

    const OwnedStocks = await prisma.stocks.findMany({
        where: {
            instrument_key: {
                in: stockIds
            }
        }
    })
    //return the complete data OwnedStocks
    console.log(OwnedStocks)
    return res.status(200).json({
        message: "Portfolio fetched successfully",
        success: true,
        portfolio: userCurrentHoldings
    });

}
catch(err){
    console.log(err);
    return res.status(500).json({
        message: "server failed",
            success: false
    })
}
}