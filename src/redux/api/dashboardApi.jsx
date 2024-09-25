import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
    endpoints : (builder) =>({
        /** Dashboard chart api */
        getDashboardChart : builder.query({
            query : (year)=>{
                return {
                    url : `/dashboard/get-income-chart-data?year=${year}`,
                    method : "GET"
                }
            }
        }),
        getDashboardData : builder.query({
            query : ()=>{
                return {
                    url  : '/dashboard/get-dashboard-meta-data',
                    method :  "GET"
                }
            }
        }),
        /** Auction managment all api */
        getAllAuction : builder.query({
            query : ({status , page})=>{
                console.log(page);
                if(status){
                    return {
                        url : `/auction?status=${status}`,
                        method : 'GET'
                    }
                }else{
                    return {
                        url : `/auction?page=${page}`,
                        method : 'GET'
                    }
                }
            },
            providesTags  : ["allAuction"]
        }),
        createAuction :  builder.mutation({
            query : (formData)=>{
                return  {
                    url : "/auction/create-auction",
                    method :"POST",
                    body : formData
                }
            },
            invalidatesTags : ['allAuction']
        }),
        deleteAuction : builder.mutation({
            query : (id)=>{
                return {
                    url : `/auction/delete-auction/${id}`,
                    method : 'DELETE'
                }
            },
            invalidatesTags : ['allAuction']
        }),
        
    })
})

export const { useGetDashboardDataQuery, useGetAllAuctionQuery, useGetDashboardChartQuery, useDeleteAuctionMutation, useCreateAuctionMutation } = dashboardApi 