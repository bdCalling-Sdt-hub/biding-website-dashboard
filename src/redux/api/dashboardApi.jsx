import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /** Dashboard chart api */
        getDashboardChart: builder.query({
            query: (year) => {
                return {
                    url: `/dashboard/get-income-chart-data?year=${year}`,
                    method: "GET"
                }
            }
        }),
        getDashboardData: builder.query({
            query: () => {
                return {
                    url: '/dashboard/get-dashboard-meta-data',
                    method: "GET"
                }
            }
        }),
        /** Auction managment all api */
        getAllAuction: builder.query({
            query: ({ status, page }) => {
                if (status) {
                    return {
                        url: `/auction?status=${status}`,
                        method: 'GET'
                    }
                } else {
                    return {
                        url: `/auction?page=${page}`,
                        method: 'GET'
                    }
                }
            },
            providesTags: ["allAuction"]
        }),
        createAuction: builder.mutation({
            query: (formData) => {
                return {
                    url: "/auction/create-auction",
                    method: "POST",
                    body: formData
                }
            },
            invalidatesTags: ['allAuction']
        }),
        updateAuction : builder.mutation({
            query : ({formData , id}) =>{
                return {
                    url : `/auction/update-auction/${id}`,
                    method : 'PATCH',
                    body : formData
                }
            },
            invalidatesTags: ['allAuction']
        }),
        deleteAuction: builder.mutation({
            query: (id) => {
                return {
                    url: `/auction/delete-auction/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['allAuction']
        }),
        /** Order Managment api  */
        getAllOrder: builder.query({
            query: () => {
                return {
                    url: '/order/get-all-orders',
                    method: 'GET'
                }
            }
        }),

        /** Category Api */
        getAllCategory : builder.query({
            query :() => {
                return {
                    url : '/category',
                    method : 'GET'
                }
            },
            providesTags : ['category']
        }),
        createCategory : builder.mutation({
            query : (formData)=>{
                return {
                    url : '/category/create-category',
                    method : 'POST',
                    body : formData
                }
            },
            invalidatesTags : ['category']
        }),
        deleteCategory : builder.mutation({
            query : (id)=>{
                return {
                    url : `/category/delete-category/${id}`,
                    method : "DELETE"
                }
            },
            invalidatesTags : ['category']
        })
    }),

})

export const { useGetDashboardDataQuery, useGetAllAuctionQuery, useGetDashboardChartQuery, useDeleteAuctionMutation, useCreateAuctionMutation, useGetAllOrderQuery, useUpdateAuctionMutation, useGetAllCategoryQuery , useCreateCategoryMutation , useDeleteCategoryMutation} = dashboardApi 