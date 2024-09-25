import { Table } from 'antd';
import React from 'react'
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';
import img from '../../assets/phone1.png'
import { MdDragHandle } from 'react-icons/md';

const AddBanner = () => {
    const columns = [
        {
            title: 'Change Order',
            dataIndex: 'changeOrder',
            key: 'changeOrder',
        },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName',

        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text, record) => <img src={record.imageUrl} alt={record.name} style={{ width: 50, height: 50 }} />,
        },
        
        
        
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <div className="flex items-center gap-2">
                    <a href="#delete" className="bg-[#D9000A] text-white p-1 rounded-sm"><RiDeleteBin6Line size={20} /></a>
                </div>
            ),
        },
    ];


     // Columns data
     const data = [
        {
            changeOrder: <MdDragHandle size={20} />,
            categoryName : "Electronics",
            imageUrl: img,
        },
        {
            changeOrder: <MdDragHandle size={20} />,
            categoryName : "Fashion",
            imageUrl: img,
        },
       

    ];
    return (
        <div className='pl-5 pt-5'>
         <Table columns={columns} dataSource={data} 
            pagination={false}
            
            />
    </div>
    )
}

export default AddBanner