const sendtoken=(res,user,statusCode,message)=>{
    const token=user.getjwttoken();

    const options={
        expires:new Date(Date.now()+5*24*60*60*1000),
        httpOnly:true,
        secure:true,
        samesite:"none"
    };
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token,
        message,
    })
};
export default sendtoken;