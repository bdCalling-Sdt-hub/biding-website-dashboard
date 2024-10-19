import React from "react";
import { Table, Button, Avatar } from "antd";
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
        render: () => (
            <Button icon={<EyeOutlined />} style={{ backgroundColor: "#ECB206", color: "white" }}>
           
            </Button>
        ),
    },
];


const FinancialApplied = () => {

    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 11 }}
            rowKey="key"
            style={{ margin: "20px" }}
        />
    );
};

export default FinancialApplied