import { Form, Input, Modal, Popconfirm, Table, Upload, message } from 'antd';
import React, { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Button from './Button';
import { PlusOutlined } from '@ant-design/icons';
import { useDeleteCategoryMutation } from '../../redux/api/dashboardApi';
import { toast } from 'sonner';

const AddCategory = ({ getAllCategory }) => {
    const [deleteCategory] = useDeleteCategoryMutation()
    const [fileList, setFileList] = useState([]);
    const [form] = Form.useForm()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);

    // handle upload image 
    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    /** Delete category  */
    const handleDeleteCategory = (id) => {
        deleteCategory(id).unwrap()
            .then((payload) => toast.success(payload?.message))
            .catch((error) => toast.error(error?.data?.message));
    }

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
            render: (text, record) => <img src={record.imageUrl} alt={record.categoryName} style={{ width: 50, height: 50 }} />,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <div className="flex items-center gap-2">
                    <a
                        href="#edit"
                        onClick={() => {
                            setModalData(record);
                            setIsModalOpen(true);
                        }}
                        className="bg-yellow text-white p-1 rounded-sm"
                    >
                        <CiEdit size={20} />
                    </a>
                    <Popconfirm
                        placement="topRight"
                        title="Are you sure to delete this category?"
                        onConfirm={() => handleDeleteCategory(record?.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a href="#delete" className="bg-[#D9000A] text-white p-1 rounded-sm">
                            <RiDeleteBin6Line size={20} />
                        </a>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    // Format the data for the table
    const categoryFormattedData = getAllCategory?.data?.map((category, i) => ({
        id: category?._id,
        key: i + 1,
        categoryName: category?.name,
        imageUrl: category?.image,
    }));

    return (
        <div className="pl-5 pt-5">
            <Table columns={columns} dataSource={categoryFormattedData} pagination={false} />

            {/* Edit category Modal */}
            <Modal
                open={isModalOpen}
                centered
                footer={false}
                onCancel={() => setIsModalOpen(false)}
            >
                <h1 className="text-center font-medium mb-5">Edit Categorysss</h1>
                <Form
                    layout="vertical"
                    initialValues={{
                        name: modalData?.categoryName,
                    }}
                >
                    <Form.Item label="Category Namesss" name="name">
                        <Input defaultValue={modalData?.categoryName} />
                    </Form.Item>

                    <Form.Item label="Image" style={{ width: '100%' }}>
                        <div style={{ width: '100%' }}>
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onChange={handleUploadChange}
                                beforeUpload={() => false}
                                multiple
                                className="upload-full-width"
                            >
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Add Image</div>
                                </div>
                            </Upload>
                        </div>
                    </Form.Item>

                    <div className="flex justify-between gap-3">
                        <Form.Item className="w-full">
                            <Button className="w-full">Save</Button>
                        </Form.Item>
                        <Form.Item className="w-full">
                            <button
                                className="bg-[#d9000a] text-white w-full p-1 rounded-md"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default AddCategory;
