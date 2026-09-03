import express from "express";
import prisma from "../lib/prisma.js"

async function searchStock(req:any,res:any){

    const {stockName} = req.query
try{


    if(!stockName){
       return res.status(400).json({
            messsage:"stockName is required",
            success:false

        })
    }

    const stocks = await prisma.stocks.findMany({
        where:{
            name:{
                startsWith:stockName
            }
        },
        take:10
    }) 
    if(stocks.length ==0){
        return res.json({
            message:"No stocks exists with this name",
            success:false
        })
    }

    return res.json({
        availableStocks: stocks,
        success: true
    })


}catch(err){
    console.log(err)
    return res.status(500).json({
        message:"Internal server error",
        success:false
    })          
}}

export default searchStock;