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
        updateAuction: builder.mutation({
            query: ({ formData, id }) => {
                return {
                    url: `/auction/update-auction/${id}`,
                    method: 'PATCH',
                    body: formData
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
            query: (searchParams) => {
                return {
                    url: `/order/get-all-orders?searchTerm=${searchParams}`,
                    method: 'GET'
                }
            }
        }),

        /** Category Api */
        getAllCategory: builder.query({
            query: () => {
                return {
                    url: '/category',
                    method: 'GET'
                }
            },
            providesTags: ['category']
        }),
        createCategory: builder.mutation({
            query: (formData) => {
                return {
                    url: '/category/create-category',
                    method: 'POST',
                    body: formData
                }
            },
            invalidatesTags: ['category']
        }),
        deleteCategory: builder.mutation({
            query: (id) => {
                return {
                    url: `/category/delete-category/${id}`,
                    method: "DELETE"
                }
            },
            invalidatesTags: ['category']
        }),
        updateCategory: builder.mutation({
            query: ({ formData, id }) => {
                return {
                    url: `/category/update-category/${id}`,
                    method: 'PATCH',
                    body: formData
                }
            },
            invalidatesTags: ['category']
        }),

        /** dashboard banner api  */
        getBanner: builder.query({
            query: () => {
                return {
                    url: '/dashboard/get-banner',
                    method: 'GET'
                }
            },
            providesTags: ['banner']
        }),

        createBanner: builder.mutation({
            query: (formData) => {
                return {
                    url: '/dashboard/create-banner',
                    method: 'POST',
                    body: formData
                }
            },
            invalidatesTags: ['banner']
        }),
        deleteBanner: builder.mutation({
            query: (id) => {
                return {
                    url: `/dashboard/delete-banner/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['banner']
        }),
        /** Notification  */
        getNotification: builder.query({
            query: () => {
                return {
                    url: '/notification/get-all-notification',
                    method: 'GET'
                }
            }
        }),
        /** User management */
        getAllUsers: builder.query({
            query: (searchParams) => {
                return {
                    url: `/dashboard/auth/get-all-user?searchTerm=${searchParams}`,
                    method: 'GET'
                }
            },
            providesTags: ['userManagement']
        }),
        blockUnblockUser: builder.mutation({
            query: (data) => {
                return {
                    url: '/dashboard/auth/block-unblock-user',
                    method: 'PATCH',
                    body: data
                }
            },
            invalidatesTags: ['userManagement']
        }),


        /** setting api */
        createAboutUs: builder.mutation({
            query: (data) => {
                return {
                    url: '/manage/about-us',
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ['about']
        }),
        getAboutUs: builder.query({
            query: () => {
                return {
                    url: '/manage/about-us',
                    method: 'GET'
                }
            },
            providesTags: ['about']
        }),
        createTipsTricks: builder.mutation({
            query: (data) => {
                return {
                    url: '/manage/tips-and-tricks',
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ['tipsTricks']
        }),
        getTipsTricks: builder.query({
            query: () => {
                return {
                    url: '/manage/tips-and-tricks',
                    method: 'GET'
                }
            },
            providesTags: ['tipsTricks']
        }),
        getAccessibility : builder.query({
            query: () => {
                return {
                    url: '/manage/accessibility',
                    method: 'GET'
                }
            },
            providesTags: ['accessibility']
        }),
        createAccessibility: builder.mutation({
            query: (data) => {
                return {
                    url: '/manage/accessibility',
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ['accessibility']
        }),
    }),

})

export const { useGetDashboardDataQuery, useGetAllAuctionQuery, useGetDashboardChartQuery, useDeleteAuctionMutation, useCreateAuctionMutation, useGetAllOrderQuery, useUpdateAuctionMutation, useGetAllCategoryQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation, useCreateBannerMutation, useDeleteBannerMutation, useGetBannerQuery, useGetNotificationQuery, useGetAllUsersQuery, useBlockUnblockUserMutation, useGetAboutUsQuery, useCreateAboutUsMutation , useCreateTipsTricksMutation, useGetTipsTricksQuery , useCreateAccessibilityMutation, useGetAccessibilityQuery} = dashboardApi 