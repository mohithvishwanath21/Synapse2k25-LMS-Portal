import 'dotenv/config'

// export const sendToken = async(res,name,value,age)=>{
//     res.cookie(name,value,{
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "Strict",
//         maxAge: age
//    })
// }

// export const clearToken = async (res, accessTokenName, refreshTokenName) => {
//     res.cookie(accessTokenName, "", { 
//         httpOnly: true, 
//         secure: process.env.NODE_ENV === "production", 
//         sameSite: "Strict", 
//         expires: new Date(0) 
//     });
//     res.cookie(refreshTokenName, "", { 
//         httpOnly: true, 
//         secure: process.env.NODE_ENV === "production", 
//         sameSite: "Strict", 
//         expires: new Date(0) 
//     });
// };


export const sendToken = async (res, name, value, age) => {
  res.cookie(name, value, {
    httpOnly: true,
    secure: true,        // MUST be true on HTTPS
    sameSite: "None",    // MUST be None for cross-domain
    maxAge: age
  });
};

export const clearToken = async (res, accessTokenName, refreshTokenName) => {
  res.cookie(accessTokenName, "", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(0),
  });

  res.cookie(refreshTokenName, "", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    expires: new Date(0),
  });
};
