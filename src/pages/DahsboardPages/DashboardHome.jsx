import React from 'react';
import income from '../../assets/income.png'
import auction from '../../assets/auction.png'
import user from '../../assets/user5.png'
import IncomeOverview from '../../components/ui/IncomeOverview';
import { Link } from 'react-router-dom';
import img1 from '../../assets/user6.png'
import img2 from '../../assets/user7.png'
import ActiveAuction from './ActiveAuction';
import TopBidderAndPerformingTable from '../../components/ui/TopBidderAndPerformingTable';
import { useGetAllAuctionQuery, useGetDashboardDataQuery } from '../../redux/api/dashboardApi';
import { checkImageSource } from '../../lib/checkImageSource';
const DashboardHome = () => {
    const {data :  dashboardData , isLoading} = useGetDashboardDataQuery()
    const {data : getAuction, isLoading :  auctionLoading} = useGetAllAuctionQuery("ACTIVE")


    

    /** Top bidder data format for the table */
    const topBidderDataFormat = dashboardData?.data?.topBidders?.slice(0,3).map((bidder, i) =>(
        {
            key : i+ 1,
            bidder: bidder?.name,
            img: checkImageSource(bidder?.profile_image),
            totalWin: bidder?.totalWin,
        }
    ))

    
    /** Top performing auction table data format */
    const topAuctionDataFormat = dashboardData?.data?.topAuctions?.slice(0,3)?.map((auction,i)=>{
        return {
            key : i+1,
            bidder : auction?.name,
            img : checkImageSource(auction?.images?.[0]),
            totalWin : auction?.currentPrice
        }
    })


    /** active user table data format */
    const activeUserTableData = getAuction?.data?.result?.slice(0,3)?.map((user , i)=>{
        return  {
            id : user?._id,
            key : i + 1,
            name : user?.name,
            img : user?.images?.[0],
            startingDate: user?.startingDate?.split('T')[0],
            heightBidder: user?.winingBidder?.user?.name,
            heightBidderImg: user?.winingBidder?.user?.profile_image || 'No Bidder',
            heightBid: user?.currentPrice || 'No Bid',
            totalBids: user?.totalBidPlace,

        }
    })

    

  
    return (
        <div>
            <div className='grid grid-cols-12 gap-5'>
                <div className='col-span-8'>
                    {/* stastics card */}
                    <div className='flex justify-between items-center gap-5'>
                        <div className=' bg-white rounded-md w-full text-center py-5'>
                            <p className='font-medium mb-2'>Income</p>
                            <img src={income} className='mx-auto' alt="" />
                            <p className='font-medium mt-2 text-xl'>${dashboardData?.data?.totalIncome}</p>
                        </div>
                        <div className=' bg-white rounded-md w-full text-center py-5 '>
                            <p className='font-medium mb-2'>Total User</p>
                            <img src={user} className='mx-auto' alt="" />
                            <p className='font-medium text-xl mt-2'>{dashboardData?.data?.totalUser}</p>
                        </div>
                        <div className=' bg-white rounded-md w-full text-center py-5'>
                            <p className='font-medium mb-2'>Total Auction</p>
                            <img src={auction} className='mx-auto' alt="" />
                            <p className='font-medium mt-2 text-xl'>{dashboardData?.data?.totalAuction}</p>
                        </div>
                    </div>

                    {/* Income Overview */}

                    <div className='bg-white mt-5 rounded-md p-5 '>
                        <IncomeOverview />
                    </div>


                </div>
                <div className='col-span-4'>
                    <div>
                        <div className='p-3 py-5 rounded-md bg-white'>
                            <TopBidderAndPerformingTable dataSource={topBidderDataFormat} tableName={'Top Bidder'} title ={'Bidder'} total={"Total Win"} />
                        </div>
                    </div>
                    <div className='mt-5'>
                        <div className='p-3 py-5 rounded-md bg-white'>
                            <TopBidderAndPerformingTable dataSource={topAuctionDataFormat} tableName={'Top-Performing Auctions'} title ={'Auction Item'} total={"Winning Bid"} />
                        </div>
                    </div>
                </div>
            </div>
            {/* active auction */}

            <div className='bg-white rounded-md p-5 mt-5'>
                <div className='flex items-center justify-between my-5 '>
                    <p className='text-xl font-semibold'>Active Auction</p> <Link to={`/active-auction`}>
                        View all
                    </Link>

                </div>
                <ActiveAuction dataSource={activeUserTableData} />
            </div>
        </div>
    );
}

export default DashboardHome;
