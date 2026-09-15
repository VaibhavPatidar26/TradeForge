import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/"

async function selling(token:string,stockId:string,quantity:number){
    const response = await axios.post(`${BACKEND_URL}api/orders/sell`,{stockId:stockId,quantity:quantity},{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response;
}

export default selling;