import { Form, Input, Modal, Table } from 'antd';
import React, { useState } from 'react'
import { MdDragHandle } from 'react-icons/md';
import img from '../../assets/phone1.png'
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Button from './Button';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
const AddCategory = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState()
    const props = {
        name: 'file',
        multiple: true,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const columns = [
        {
            title: 'SL no',
            dataIndex: 'key',
            key: 'key',
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
                    <a href="#delete" onClick={() => {
                        setModalData(record)
                        setIsModalOpen(true)
                    }} className="bg-yellow text-white p-1 rounded-sm"><CiEdit size={20} /></a>
                    <a href="#delete" className="bg-[#D9000A] text-white p-1 rounded-sm"><RiDeleteBin6Line size={20} /></a>
                </div>
            ),
        },
    ];


    // Columns data
    const data = [
        {
            key: '1',
            categoryName: "Electronics",
            imageUrl: img,
        },
        {
            key: '2',
            categoryName: "Fashion",
            imageUrl: img,
        },


    ];
    return (
        <div className='pl-5 pt-5'>
            <Table columns={columns} dataSource={data}
                pagination={false}

            />

            {/* Edit category Modal */}
            <Modal open={isModalOpen} centered footer={false} onCancel={() => setIsModalOpen(false)}  >
                <h1 className='text-center font-medium mb-5'>Edit Category</h1>
                <Form
                    layout='vertical'
                >
                    <Form.Item
                        label="Category Name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                banned files.
                            </p>
                        </Dragger>
                    </Form.Item>
                    <div className='flex justify-between  gap-3'>
                        <Form.Item className='w-full' >
                            <Button className='w-full'>Save</Button>
                        </Form.Item>
                        <Form.Item className='w-full' >
                            <button className='bg-[#d9000a] text-white w-full p-1 rounded-md' onClick={()=> setIsModalOpen(false)} >cancel</button>
                        </Form.Item>
                       
                    </div>
                </Form>
            </Modal>
        </div>


    )
}

export default AddCategory