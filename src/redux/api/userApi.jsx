import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints : (builder)=>({
        registerUser : builder.mutation({
            query : (data)=>{
                return {
                    url : '/user/auth/register',
                    method : "POST",
                    body : data,
                }
            }
        }),
        loginAdmin : builder.mutation({
            query : (data)=>{
                // console.log(data);
                return {
                    url : '/admin/auth/login',
                    method : "POST",
                    body : data,
                }
            }
        }),
    })
})

export const { useRegisterUserMutation , useLoginAdminMutation } = userApi;