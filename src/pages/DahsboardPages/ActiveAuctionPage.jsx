import React from 'react'
import ActiveAuction from './ActiveAuction'
import img1 from '../../assets/user6.png'
import img2 from '../../assets/user7.png'
import { IoArrowBackSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useGetAllAuctionQuery } from '../../redux/api/dashboardApi'
const ActiveAuctionPage = () => {
    const {data : getAuction, isLoading :  auctionLoading} = useGetAllAuctionQuery("ACTIVE")

     /** active user table data format */
     const activeUserTableData = getAuction?.data?.result?.map((user , i)=>{
        return  {
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

    // table data 
    const dataSource = [
        {
            key: "#12333",
            name: "Devon Lane",
            img: img1,
            startingDate: "4:45 PM",
            heightBidder: "Kathryn Murp",
            heightBidderImg: img2,
            heightBid: '$248',
            totalBids: "348",

        },
        {
            key: "#12333",
            name: "Devon Lane",
            img: img1,
            startingDate: "4:45 PM",
            heightBidder: "Kathryn Murp",
            heightBidderImg: img2,
            heightBid: '$248',
            totalBids: "348",

        },
        {
            key: "#12333",
            name: "Devon Lane",
            img: img1,
            startingDate: "4:45 PM",
            heightBidder: "Kathryn Murp",
            heightBidderImg: img2,
            heightBid: '$248',
            totalBids: "348",

        },


    ];
  return (
    <div className='bg-white rounded-md p-5'>
        <div className='flex items-center gap-2 bg-white p-5 rounded-md'>
        <Link to={-1}><IoArrowBackSharp className='' /></Link>
        <span className='font-medium'>Active Auction</span>
        </div>
        <ActiveAuction dataSource={activeUserTableData} />
    </div>
  )
}

export default ActiveAuctionPage