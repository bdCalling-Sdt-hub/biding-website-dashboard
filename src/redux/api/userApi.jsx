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
        getUserProfile : builder.query({
            query : ()=>{
                return {
                    url : '/admin/auth/profile',
                    method : 'GET'
                }
            },
            providesTags : ['user']
        }),
        updateUserProfile : builder.mutation({
            query : (data)=>{
                console.log(data);
                return {
                    url : '/admin/auth/update-profile',
                    method : "PATCH",
                    body: data
                }
            },
            invalidatesTags : ['user']
        }),
        changePassword : builder.mutation({
            query : (data)=>{
                return{
                    url : '/admin/auth/change-password',
                    method : 'PATCH',
                    body :  data
                }
            }
        })
    })
})

export const { useRegisterUserMutation , useLoginAdminMutation , useGetUserProfileQuery , useUpdateUserProfileMutation , useChangePasswordMutation } = userApi;