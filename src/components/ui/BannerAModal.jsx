import {  Form, Input, Modal } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import React, { useState } from 'react'
import Button from './Button';
import { InboxOutlined } from '@ant-design/icons';


const BannerModal = ({setOpenBannerModal,openBannerModal}) => {
    // const [isModalOpen, isModalOpen] = useState(false);

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

    return (
        <Modal open={openBannerModal} centered footer={false} onCancel={() => setOpenBannerModal(false)}  >
            <h1 className='text-center font-medium mb-5'>Add Banner</h1>
            <Form
                layout='vertical'
            >
                <Form.Item
                    label="View Order"
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
                        <button className='bg-[#d9000a] text-white w-full p-1 rounded-md' onClick={() => setOpenBannerModal(false)} >cancel</button>
                    </Form.Item>

                </div>
            </Form>
        </Modal>
    )
}

export default BannerModal