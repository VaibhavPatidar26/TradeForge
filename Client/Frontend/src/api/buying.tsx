import axios from "axios";
// import { useAuthStore } from "../store/authStore";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/";


async function buying(token:string,stockId:string,quantity:number){
    const response = await axios.post(`${BACKEND_URL}api/orders/buy`,{stockId:stockId,quantity:quantity},{headers:{
        Authorization:`Bearer ${token}`
    }})
    return response;
}

export default buying;