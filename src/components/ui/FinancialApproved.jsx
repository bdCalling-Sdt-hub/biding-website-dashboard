import React, { useState } from "react";
import { Table, Button, Avatar, Tag, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";

// Mock data (replace with real data)
const data = [
  {
    key: "1",
    slNo: "#12333",
    userName: "Kathryn Murp",
    email: "bockely@att.com",
    contact: "(201) 555-0124",
    item: "iPhone 13 Pro Max",
    totalFee: "$24.00",
    months: 12,
    perMonthFee: "$4.00",
    lastPayment: "12/06/24",
    status: "Due",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    address: "Royal Ln. Mesa, New Jersey",
    orderId: "#3456364573245",
    winningPrice: "$436",
  },
  {
    key: "2",
    slNo: "#12333",
    userName: "Devon Lane",
    email: "csilvers@rizon.com",
    contact: "(219) 555-0114",
    item: "Samsung Smart TV",
    totalFee: "$20.00",
    months: 6,
    perMonthFee: "$2.00",
    lastPayment: "10/06/24",
    status: "Paid",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    address: "1234 Elm St, Springfield",
    orderId: "#876543234556",
    winningPrice: "$300",
  },
  // Add more data objects similarly as per your data
];

const FinancialApproved = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Show the modal and pass the selected user data
  const showModal = (record) => {
    setSelectedUser(record);
    setIsModalVisible(true);
  };

  // Handle modal close
  const handleClose = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  // Column configuration for the table
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
      title: "Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Total Fee",
      dataIndex: "totalFee",
      key: "totalFee",
    },
    {
      title: "Months",
      dataIndex: "months",
      key: "months",
    },
    {
      title: "Per Month Fee",
      dataIndex: "perMonthFee",
      key: "perMonthFee",
    },
    {
      title: "Last Payment",
      dataIndex: "lastPayment",
      key: "lastPayment",
    },
    {
      title: "Monthly Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Paid" ? "green" : "volcano"}>{status}</Tag>
      ),
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
          View
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

      {/* Modal Component */}
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
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone number:</strong> {selectedUser.contact}</p>
              <p><strong>Address:</strong> {selectedUser.address}</p>
              <p><strong>Order ID:</strong> {selectedUser.orderId}</p>
              <p><strong>Winning Product:</strong> {selectedUser.item}</p>
              <p><strong>Winning Price:</strong> {selectedUser.winningPrice}</p>
              <p><strong>Finance Available For:</strong> {selectedUser.months} Months</p>
              <p><strong>Per Month Fee:</strong> {selectedUser.perMonthFee}</p>
            </div>

            <div className="flex justify-between mt-6">
              <Button
                danger
                className="bg-red-600 text-white w-40 h-10 rounded-lg font-semibold hover:bg-red-700"
              >
                Decline
              </Button>
              <Button
                type="primary"
                className="bg-yellow-500 text-white w-40 h-10 rounded-lg font-semibold hover:bg-yellow-600"
              >
                Accept
              </Button>
            </div>
          </div>

        )}
      </Modal>
    </>
  );
};

export default FinancialApproved;