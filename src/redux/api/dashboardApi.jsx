import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
    endpoints : (builder) =>({
        getDashboardData : builder.query({
            query : ()=>{
                return {
                    url  : '/dashboard/get-dashboard-meta-data',
                    method :  "GET"
                }
            }
        }),
        getAllAuction : builder.query({
            query : (status)=>{
                if(status){
                    return {
                        url : `/auction?status=${status}`,
                        method : 'GET'
                    }
                }else{
                    return {
                        url : `/auction`,
                        method : 'GET'
                    }
                }
               
            }
        }),
        getDashboardChart : builder.query({
            query : (year)=>{
                return {
                    url : `/dashboard/get-income-chart-data?year=${year}`,
                    method : "GET"
                }
            }
        })
    })
})

export const { useGetDashboardDataQuery, useGetAllAuctionQuery, useGetDashboardChartQuery } = dashboardApi 