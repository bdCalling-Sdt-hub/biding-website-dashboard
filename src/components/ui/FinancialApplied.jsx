import React, { useState } from "react";
import { Table, Button, Avatar, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";

// Mock data (replace with real data)
const data = [
    {
        key: "1",
        slNo: "#12333",
        userName: "Kathryn Murp",
        email: "bockely@att.com",
        contact: "(201) 555-0124",
        product: "iPhone 13 Pro Max",
        totalFee: "$24.00",
        months: 12,
        perMonthFee: "$4.00",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        key: "2",
        slNo: "#12333",
        userName: "Devon Lane",
        email: "csilvers@rizon.com",
        contact: "(219) 555-0114",
        product: "Samsung Smart TV",
        totalFee: "$20.00",
        months: 6,
        perMonthFee: "$2.00",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    // Add more data objects similarly as per your data
];

// Column configuration for the table
const FinancialApplied = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Function to handle showing the modal with user details
    const showModal = (record) => {
        setSelectedUser(record);
        setIsModalVisible(true);
    };

    // Function to handle closing the modal
    const handleClose = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };

    const columns = [
        {
            title: "SL no.",
            dataIndex: "slNo",
            key: "slNo",
        },
        {
            title: "User's Name",
            dataIndex: "userName",
            key: "userName",
            render: (text, record) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar src={record.image} style={{ marginRight: "10px" }} />
                    {text}
                </div>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Contact Number",
            dataIndex: "contact",
            key: "contact",
        },
        {
            title: "Winning Product",
            dataIndex: "product",
            key: "product",
        },
        {
            title: "Total Fee",
            dataIndex: "totalFee",
            key: "totalFee",
        },
        {
            title: "Available Months",
            dataIndex: "months",
            key: "months",
        },
        {
            title: "Per Month Fee",
            dataIndex: "perMonthFee",
            key: "perMonthFee",
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Button
                    icon={<EyeOutlined />}
                    style={{ backgroundColor: "#ECB206", color: "white" }}
                    onClick={() => showModal(record)}
                >
                </Button>
            ),
        },
    ];

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 11 }}
                rowKey="key"
                style={{ margin: "20px" }}
            />

            {/* Modal to show detailed user information */}
            <Modal
                title={selectedUser ? selectedUser.userName : ""}
                visible={isModalVisible}
                onCancel={handleClose}
                footer={null}
                centered
            >
                {selectedUser && (
                    <div className="text-center p-5">
                        <Avatar
                            size={80}
                            src={selectedUser.image}
                            className="mx-auto mb-4"
                        />

                        {/* User Name */}
                        <h3 className="text-lg font-semibold mb-2">{selectedUser.userName}</h3>

                        {/* User Information */}
                        <div className="text-left space-y-2">
                            <p className="flex justify-between items-center gap-2"><strong>Email:</strong> {selectedUser.email}</p>
                            <p className="flex justify-between items-center gap-2"><strong>Phone number:</strong> {selectedUser.contact}</p>
                            <p className="flex justify-between items-center gap-2"><strong>Winning Product:</strong> {selectedUser.product}</p>
                            <p className="flex justify-between items-center gap-2"><strong>Total Fee:</strong> {selectedUser.totalFee}</p>
                            <p className="flex justify-between items-center gap-2"><strong>Finance Available For:</strong> {selectedUser.months} Months</p>
                            <p className="flex justify-between items-center gap-2"><strong>Per Month Fee:</strong> {selectedUser.perMonthFee}</p>
                        </div>

                        {/* Action buttons */}
                        <div className="flex justify-between mt-6">
                            <button
                        
                                className="bg-[#D9000A] text-white w-40 h-10 rounded-lg font-semibold hover:bg-red-700"
                            >
                                Decline
                            </button>
                            <button
                                className="bg-yellow text-white w-40 h-10 rounded-lg font-semibold hover:bg-yellow-600"
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default FinancialApplied;
