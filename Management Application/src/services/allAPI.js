import commonAPI from "./commonAPI"

export const onRegister=async(data)=>{
    return await commonAPI('post','/register',data,{})
}
export const onVerify=async(otp)=>{
return await commonAPI("post",`/register/${otp}`,{},{})
}

export const onLogin=async(data)=>{
    return await commonAPI('post','/login',data,{})
}

