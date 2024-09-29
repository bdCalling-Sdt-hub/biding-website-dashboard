import { Modal, Table } from 'antd'
import React, { useState } from 'react'
import { CiLocationOn, CiSearch } from 'react-icons/ci'
import { IoArrowBackSharp, IoEyeOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useGetAllOrderQuery } from '../../redux/api/dashboardApi'

const OrderManagment = () => {
    const {data :  getOrders, isLoading} = useGetAllOrderQuery()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState()
    const columns = [
        {
            title: "Order ID",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Winner",
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
            title: "Winning Product",
            dataIndex: "winningProduct",
            key: "winningProduct",
            render: (_, record) => {
                return (
                    <div className="flex items-center gap-2">
                        <img
                            src={record?.winningProductImg}
                            className="w-[40px] h-[40px] rounded-[8px]"
                            alt=""
                        />
                        <p className="font-medium">{record?.winningProduct}</p>
                    </div>
                );
            },
        },
        {
            title: "Winning Price",
            dataIndex: "winningPrice",
            key: "winningPrice",
        },
        {
            title: "Expected Delivery Time",
            dataIndex: "expectedDeliveryDate",
            key: "expectedDeliveryDate  ",
        },


        {
            title: "Status",
            dataIndex: "status",
            key: "status  ",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
                <button onClick={() => {
                    setIsModalOpen(true)
                    setModalData(record)
                }} className="bg-yellow text-white  p-2 rounded">
                    <IoEyeOutline size={20} />
                </button>
            ),
        },



    ];

    // Order management table data
    const orderManagmentTableData = getOrders?.data?.result?.map((order, i)=>{
      
        return {
            key: i+ 1,
            name: order?.user?.name ,
            img: order?.user?.profile_image,
            winningProduct: order?.item?.name,
            winningProductImg: order?.item?.images[0],
            winningPrice: order?.item?.currentPrice,
            status: order?.status,
            expectedDeliveryDate: order?.expectedDeliveryData || "No Date",
            phone:order?.user?.phone_number,
            shippingAddress: order?.shippingAddress?.city,
            orderId: order?._id
        }
    })
    
    return (
        <div className='bg-white p-5 rounded-md'>
            <div className='flex  justify-between items-center'>
                <div className='flex items-center gap-1'>
                    <Link to={-1}> <IoArrowBackSharp className='text-yellow' /></Link>
                    <span className='font-medium'>Order Management</span>
                </div>
                <div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="w-full pl-10 pr-4 py-1 rounded-md border border-[#EAEAEA] focus:border-blue-500 focus:outline-none focus:ring-1 "
                        />
                        <span className="absolute left-3 top-2.5 text-gray-400">
                            <CiSearch />
                        </span>
                    </div>
                </div>
            </div>


            <div className='mt-5'>
                <Table dataSource={orderManagmentTableData} columns={columns} className="custom-pagination" pagination={{
                    pageSize: 5,
                    showTotal: (total, range) => `Showing ${range[0]}-${range[1]} out of ${total}`,
                    locale: {
                        items_per_page: '',
                        prev_page: 'Previous',
                        next_page: 'Next',
                    },
                }} />


                <Modal open={isModalOpen} centered footer={false} onCancel={() => setIsModalOpen(false)}>
                    <p className='font-medium'>Winner:</p>
                    <div className='flex flex-col items-center justify-center space-y-2 '>
                        <img src={modalData?.img} className='rounded-full w-24' alt="" />
                        <p className='mt-2 font-medium'>{modalData?.name}</p>
                        <p>Phone Number: {modalData?.phone} </p>
                        <p className='flex items-center justify-center'><CiLocationOn className='text-yellow' /> Shipping Address: {modalData?.shippingAddress} </p>
                    </div>
                    <p>Winning Product</p>

                    <div className='mt-2 flex gap-2 items-center'>
                        <img src={modalData?.winningProductImg} className='h-24' alt="" />
                        <div>
                            <p className='font-medium'>{modalData?.winningProduct}</p>
                            <p>winnign Price : <span className='font-medium'> {modalData?.winningPrice}</span> </p>
                        </div>
                    </div>

                    <div className='mt-5 space-y-2'>
                        <p className='flex justify-between'><span className='font-medium'>Order ID :</span> <span>{modalData?.orderId}</span></p>
                        <p className='flex justify-between'><span className='font-medium'>Order Date :</span> <span>{modalData?.or}</span></p>
                        <p className='flex justify-between'><span className='font-medium'>Expected Delivery Date:</span> <span>{modalData?.expectedDeliveryDate}</span></p>
                        <p className='flex justify-between'><span className='font-medium'>Status:</span> <span>{modalData?.status}</span></p>
                    </div>
                </Modal>

            </div>
        </div>
    )
}

export default OrderManagment