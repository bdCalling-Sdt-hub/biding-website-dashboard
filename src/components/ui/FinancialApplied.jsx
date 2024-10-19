import React from 'react'
import { IoEyeOutline } from 'react-icons/io5';

const FinancialApplied = () => {

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
                            alt="Winner"
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
                            alt="Product"
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
            key: "expectedDeliveryDate",
        },
        
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
                <button onClick={() => {
                    // setIsModalOpen(true)
                    // setModalData(record)
                }} className="bg-yellow text-white p-2 rounded">
                    <IoEyeOutline size={20} />
                </button>
            ),
        },
    ];

  return (
    <div>FinancialApplied</div>
  )
}

export default FinancialApplied