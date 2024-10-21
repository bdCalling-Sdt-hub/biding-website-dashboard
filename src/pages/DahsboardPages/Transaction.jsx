import { Empty, Pagination, Spin, Table } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { useGetTransactionQuery } from '../../redux/api/dashboardApi';
const Transaction = () => {
    const [searchParams, setSearchParams] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { data: getAllTransaction , isLoading} = useGetTransactionQuery({searchParams, page: currentPage, limit: pageSize })

    const onChange = (page) => {
        setCurrentPage(page);
    };



    const columns = [
        {
            title: "SL no",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
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
            title: "Item",
            dataIndex: "item",
            key: "item",
        },
        {
            title: "Payment Status",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
        },
        {
            title: "Paid Amount",
            dataIndex: "paymentAmount",
            key: "paymentAmount",
        },
        {
            title: "Payment Type",
            dataIndex: "paymentType",
            key: "paymentType",
        },


    ];


    /**Table data format */
    const tableData = getAllTransaction?.data?.result?.map((item, i) => {
        return {
            key:(currentPage - 1) * pageSize + (i + 1),
            date: item?.createdAt?.split('T')[0],
            name: item?.user?.name,
            img: item?.user?.profile_image,
            email: item?.user?.email,
            item: item?.item,
            paymentStatus: item?.paymentStatus,
            paymentAmount: `$${item?.paidAmount}`,
            paymentType: item?.paymentType,
        }
    })

    


    return (
        <div className='bg-white rounded-md p-5'>
            <div className="flex justify-between item-center mb-5">
                <div className="flex items-center gap-2">
                    <Link to={-1}><FaArrowLeft size={18} className='text-yellow ' /></Link>
                    <span className='font-semibold text-[20px]'>Transaction</span></div>
                <div>
                    <div className="relative">
                        <input
                        onChange={(e)=> setSearchParams(e.target.value)}
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
            <div className='mt-2 '>
                <Table dataSource={tableData} columns={columns} className="custom-pagination"
                    pagination={false}
                    loading={{
                        spinning: isLoading,
                        indicator: <Spin size="large" className='text-yellow' />,
                      }}
                      locale={isLoading ? { emptyText: <Empty description="No Transactions Found" /> } : {}}
                />
                <div className='flex items-center  justify-center mt-5'>
                    <Pagination current={currentPage}
                        onChange={onChange}
                        total={getAllTransaction?.data?.meta?.total}
                        pageSize={getAllTransaction?.data?.meta?.limit}
                        showSizeChanger={false}
                        showTotal={(total, range) => `Showing ${range[0]}-${range[1]} out of ${total}`} />
                </div>
            </div>
        </div>
    )
}

export default Transaction