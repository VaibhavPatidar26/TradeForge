import prisma from "../lib/prisma.js";

async function addToWatchlist(req: any, res: any) {
    const { stockId } = req.params;
    const userId = req.userId;

    try{

    
    if(!userId){
        return res.json({
            message:"invalid user",
            success:false
        })
    }

    const stock = await prisma.stocks.findUnique({
        where: {
            instrument_key: stockId
        }
    });

    if (!stock) {
        return res.status(404).json({
            message: "Stock not found"
        });
    }

    const existing = await prisma.watchlist.findFirst({
        where: {
            userId,
            stockId: stockId
        }
    });

    if (existing) {
        return res.status(400).json({
            message: "Stock already in watchlist"
        });
    }

    await prisma.watchlist.create({
        data: {
            userId,
            stockId: stockId
        }
    });

    return res.status(201).json({
        message: "Added to watchlist"
    });
}
catch(err){
    console.log(err);
    return res.json({
        message:err,
        success:false
    })
}
}

export default addToWatchlist;