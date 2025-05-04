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

export const onSaveFlow=async(data,header)=>{
    return await commonAPI('post','/flow/save',data,header)
}
export const onGetFlow=async(header)=>{
    return await commonAPI('get','/flow/load',{},header)
}