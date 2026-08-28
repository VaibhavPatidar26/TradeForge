import { Request, Response } from "express";
import prisma from "../lib/prisma.js";

export async function fetchPortfolio(req: any, res: any) {
    const { userId } = req.body;
    if (!userId) {
        return res.status(401).json({
            message: "invalid user",
            success: false
        })
    }

    //user found fetch his holdings;

    const holdings = await prisma.holding.findMany({
        where: {
            userId: userId
        }
    })

    //now we found the holdings we fetch the asset details from it.
    //first fetch the assetIds so get the assest name and then fetch live prices from redis

    const assetIds = await holdings.map((item) => item.assetId);

    const assets = await prisma.asset.findMany({
        where: {
            id: {
                in: assetIds
            }
        }
    })
    //now we have all assets which user is holding.
    //we fetch the name of the assets and its current prices;
    //we will show this on frontend;
    const userCurrentAsset = assets.map((item) => {
        return {
            id: item.id,
            name: item.name,
            symbol: item.symbol,
            currentPrice: item.currentPrice
        }
    })
    //






}