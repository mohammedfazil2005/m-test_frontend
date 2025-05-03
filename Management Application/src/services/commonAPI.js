import axios from "axios";
import baseURL from "./baseURL";

const commonAPI=async(HTTPmethod,endpoint,data,header)=>{
    let payload={
        method:HTTPmethod,
        url:baseURL+endpoint,
        data:data,
        headers:header
    }
    return await axios(payload).then((res)=>{
        return res
    }).catch((err)=>{
        return err
    })
}

export default commonAPI;