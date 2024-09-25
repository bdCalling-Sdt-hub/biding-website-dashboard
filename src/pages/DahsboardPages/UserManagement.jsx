import { Table } from 'antd';
import React from 'react'
import { CiSearch } from 'react-icons/ci';
import { FaArrowLeft } from 'react-icons/fa';
import { MdBlock } from 'react-icons/md';
import { Link } from 'react-router-dom';

import img1 from '../../assets/user6.png'
import img2 from '../../assets/phone2.png'
const UserManagement = () => {

    const columns = [
        {
          title: "SL no",
          dataIndex: "key",
          key: "key",
        },
        {
          title: "User's Name",
          dataIndex: "name",
          key: "name",
          render: (_, record) => {
            return (
              <div className="flex items-center gap-2">
                <img
                  src={record?.img}
                  className="w-[40px] h-[40px] rounded-[8px]"
                  alt=""
                />
                <p className="font-medium">{record?.name}</p>
              </div>
            );
          },
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "Contact Number",
          dataIndex: "contactNumber",
          key: "contactNumber",
        },
        {
          title: "Date of Birth",
          dataIndex: "dob",
          key: "dob",
        },
        {
          title: "Location",
          dataIndex: "location",
          key: "location",
        },
        {
          title: "Auction Win",
          dataIndex: "auctionWin",
          key: "auctionWin",
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: () => (
            <button className="bg-[#d9000a] text-white p-2 rounded">
              <MdBlock size={20} />
            </button>
          ),
        },
      ];
    
    
      const dataSource = [
        {
          key: "#12333",
          name: "Kathryn Murphy",
          img: img1, 
          email: "bockely@att.com",
          contactNumber: "(201) 555-0124",
          dob: "4/4/04",
          location: "West Greenwich, RI7",
          auctionWin : '24'
        },
        {
          key: "#12334",
          name: "Devon Lane",
          img: img2, 
          email: "csilvers@rizon.com",
          contactNumber: "(219) 555-0114",
          dob: "9/23/08",
          location: "Jericho, NY 11753",
          auctionWin : '5'

        },
        {
          key: "#12335",
          name: "Foysal Rahman",
          img: img1,
          email: "qamaho@gmail.com",
          contactNumber: "(316) 555-0116",
          dob: "7/27/02",
          location: "Aurora, OR 97002",
          auctionWin : '9'

        },
        {
          key: "#12336",
          name: "Hari Danang",
          img: img1,
          email: "xterris@gmail.com",
          contactNumber: "(907) 555-0101",
          dob: "10/6/01",
          location: "Midland Park, NJ 072",
          auctionWin : '24'

        },
        {
          key: "#12337",
          name: "Floyd Miles",
          img: img1 ,
          email: "xterris@gmail.com",
          contactNumber: "(505) 555-0125",
          dob: "5/27/04",
          location: "Saint Cloud, FL 349",
          auctionWin : '4'

        },
        
      ];



  return (
    <div className='p-5 bg-white rounded-md'>

    <div className="flex justify-between item-center ">
      <div className="flex items-center gap-2">
        <Link to={-1}><FaArrowLeft size={18} className='text-yellow ' /></Link>
        <span className='font-semibold text-[20px]'>User Managment</span></div>
      <div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full pl-10 pr-4 py-1 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 "
          />
          <span className="absolute left-3 top-2.5 text-gray-400">

            <CiSearch />
          </span>
        </div>
      </div>
    </div>


    {/* User Management table */}
    <div className='mt-5'>
      <Table dataSource={dataSource} columns={columns} className="custom-pagination" pagination={{
        pageSize: 5,
        showTotal: (total, range) => `Showing ${range[0]}-${range[1]} out of ${total}`,
        locale: {
          items_per_page: '',
          prev_page: 'Previous',
          next_page: 'Next',
        },
      }} />
    </div>


  </div>
  )
}

export default UserManagement