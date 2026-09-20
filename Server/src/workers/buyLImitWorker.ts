import redis from "../redis/client.js";

const subscriber = redis.subscribe("/limitBuyWatch",function(err,msg){
    if(err){
        console.log(err)
    }
    else{
        console.log(msg)
    }
})