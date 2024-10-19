import { Table } from 'antd';
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci';
import { FaArrowLeft } from 'react-icons/fa';
import { MdBlock } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useBlockUnblockUserMutation, useGetAllUsersQuery } from '../../redux/api/dashboardApi';
import { toast } from 'sonner';

const UserManagement = () => {
  const [searchParams, setSearchParams] = useState('')
  const { data: getAllUsers } = useGetAllUsersQuery(searchParams);
  const [blockUnblockUser, { isLoading }] = useBlockUnblockUserMutation()
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
      render: (_, record) => (
        <div>
          {
            record?.is_block ? <button onClick={() => handleBlockUnBlockUser(record?.email, false)} className="bg-[#d9000a] text-white p-2 rounded">
              <MdBlock size={20} />
            </button> : <button onClick={() => handleBlockUnBlockUser(record?.email, true)} className="bg-gray text-white p-2 rounded">
              <MdBlock size={20} />
            </button>
          }


        </div>
      )
    },
  ];

  const userTableData = getAllUsers?.data?.map((user, i) => ({
    key: i + 1,
    name: user?.name,
    img: user?.profile_image,
    email: user?.email,
    contactNumber: user?.phone_number || 'Not available',
    dob: user?.date_of_birth || 'Not available',
    location: user?.location || 'Not available',
    auctionWin: user?.totalWin,
    is_block: user?.is_block
  }))

  const handleBlockUnBlockUser = (email, is_block) => {
    return
    const data = {
      email: email,
      is_block: is_block
    }
    blockUnblockUser(data).unwrap()
      .then((payload) => {
        //toast.success(payload?.message)
      })
      .catch((error) => {
        //toast.error(error?.data?.message)
      });
  }



  return (
    <div className='p-5 bg-white rounded-md'>

      <div className="flex justify-between item-center ">
        <div className="flex items-center gap-2">
          <Link to={-1}><FaArrowLeft size={18} className='text-yellow ' /></Link>
          <span className='font-semibold text-[20px]'>User Management</span></div>
        <div>
          <div className="relative">
            <input
              onChange={(e) => setSearchParams(e.target.value)}
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
        <Table dataSource={userTableData} columns={columns} className="custom-pagination" pagination={{
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