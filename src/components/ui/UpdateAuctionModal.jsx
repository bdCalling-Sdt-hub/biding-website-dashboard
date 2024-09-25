import { Form, Input, Modal, Upload } from 'antd';
import React, { useState, useEffect } from 'react';
import Button from './Button';
import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { toast } from 'sonner';
import { useUpdateAuctionMutation } from '../../redux/api/dashboardApi';

const UpdateAuctionModal = ({ isModalOpen, setIsModalOpen, singleAuction }) => {
    const [updateAuction] = useUpdateAuctionMutation()
    const [fileList, setFileList] = useState([]);

    const [form] = Form.useForm();
    // Handle upload image 
    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handleRemove = (file) => {
        setFileList(fileList.filter((item) => item.uid !== file.uid));
    };

    // Update auction product
    const onFinish = (values) => {
        const id = singleAuction?.id;
        const data = {
            ...values,
            incrementValue: Number(values?.incrementValue),
            reservedBid: Number(values?.reservedBid),
        };
    
        // Separate previously uploaded images (URLs) and new images (files)
        const existingImages = fileList
            .filter(file => file.url) 
            .map(file => file.url); 
    
        const newImages = fileList.filter(file => file.originFileObj); 
    
        // If there are new images, append them to FormData
        const formData = new FormData();
        formData.append('data', JSON.stringify({
            ...data,
            images: existingImages, 
        }));
    
        newImages.forEach((file) => {
            formData.append('image', file.originFileObj);
        });
    
        // Send the formData to the server
        updateAuction({ formData, id }).unwrap()
            .then((payload) => {
                toast.success(payload?.message);
                setIsModalOpen(false);
                form.resetFields();
                setFileList([]);
            })
            .catch((error) => {
                toast.error(error?.data?.message);
            });
    };
    

    // Set initial values when singleAuction changes
    useEffect(() => {
        if (singleAuction) {
            form.setFieldsValue({
                name: singleAuction.name,
                category: singleAuction.category,
                reservedBid: singleAuction.reservedBid,
                incrementValue: singleAuction.incrementValue,
                startingDate: singleAuction.statingAndEndTime.split('-at-')[0],
                startingTime: singleAuction.statingAndEndTime.split('-at-')[1].trim(),
                description: singleAuction.description || '',
            });

            // If there are images, set them in the fileList
            if (singleAuction.img && singleAuction.img.length > 0) {
                const images = singleAuction.img.map((url, index) => ({
                    uid: index,
                    name: `image-${index}.png`,
                    status: 'done',
                    url: url,
                }));
                setFileList(images);
            }
        }
    }, [singleAuction, form]);

    return (
        <div>
            <Modal
                centered
                open={isModalOpen}
                footer={false}
                onCancel={() => {
                    setIsModalOpen(false);
                    form.resetFields();
                    setFileList([]);
                }}
            >
                <h1 className='text-center font-medium text-[20px]'>Update Auction</h1>

                <Form form={form} onFinish={onFinish} layout='vertical'>
                    <div className='flex justify-between items-center gap-2 mt-5'>
                        <Form.Item
                            label="Item Name"
                            name="name"
                            className='w-full'
                            rules={[{ required: true, message: 'Please input item name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Category"
                            name="category"
                            className='w-full'
                            rules={[{ required: true, message: 'Please input category!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className='flex justify-between items-center gap-2'>
                        <Form.Item
                            label="Reserved Bid"
                            name='reservedBid'
                            className='w-full'
                            rules={[{ required: true, message: 'Please input reserved bid!' }]}
                        >
                            <Input type='number' />
                        </Form.Item>
                        <Form.Item
                            label="Increment Value"
                            name='incrementValue'
                            className='w-full'
                            rules={[{ required: true, message: 'Please input increment value!' }]}
                        >
                            <Input type='number' />
                        </Form.Item>
                    </div>
                    <div className='flex justify-between items-center gap-2'>
                        <Form.Item
                            label="Starting Date"
                            name='startingDate'
                            className='w-full'
                            rules={[{ required: true, message: 'Please select starting date!' }]}
                        >
                            <Input type='date' />
                        </Form.Item>
                        <Form.Item
                            label="Starting Time"
                            name='startingTime'
                            className='w-full'
                            rules={[{ required: true, message: 'Please select starting time!' }]}
                        >
                            <Input type='time' />
                        </Form.Item>
                    </div>
                    <Form.Item
                        label="Description"
                        name='description'
                        rules={[{ required: true, message: 'Please enter a description!' }]}
                    >
                        <TextArea />
                    </Form.Item>

                    <Form.Item label="Upload Images">
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onChange={handleUploadChange}
                            onRemove={handleRemove}
                            beforeUpload={() => false} // Prevent auto upload
                            multiple
                        >
                            {fileList.length >= 4 ? null : (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Add Image</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <div className='flex justify-between gap-3'>
                        <Form.Item className='w-full'>
                            <Button className='w-full'>Save</Button>
                        </Form.Item>
                        <Form.Item className='w-full'>
                            <button
                                type="button"
                                className='bg-[#d9000a] text-white w-full p-1 rounded-md'
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

export default UpdateAuctionModal;
