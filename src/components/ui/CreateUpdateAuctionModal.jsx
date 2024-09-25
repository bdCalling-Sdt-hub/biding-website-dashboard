import { Form, Input, Modal, Upload } from 'antd';
import React, { useState } from 'react'
import Button from './Button';
import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

const CreateUpdateAuctionModal = ({isModalOpen, setIsModalOpen}) => {
    const [fileList, setFileList] = useState([]);


    const handleUploadChange = ({ fileList: newFileList }) => {
      setFileList(newFileList);
    };
  
    const handleRemove = (file) => {
      setFileList(fileList.filter((item) => item.uid !== file.uid));
    }
  return (
    <div>
         <Modal centered
        open={isModalOpen}
        footer={false}
        onCancel={() => setIsModalOpen(false)}
      >
        <h1 className='text-center font-medium text-[20px]'>Edit Auction</h1>


        <Form
          layout='vertical'
        >
          <div className='flex  justify-between items-center gap-2 mt-5'>
            <Form.Item
              label="Item Name"
              className='w-full'
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Category"
              className='w-full'
            >
              <Input />
            </Form.Item>
          </div>
          <div className='flex  justify-between items-center gap-2 '>
            <Form.Item
              label="Reserved Bid"
              className='w-full'
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Increment Value"
              className='w-full'
            >
              <Input />
            </Form.Item>
          </div>
          <div className='flex justify-between items-center gap-2 '>
            <Form.Item
              label="Starting Date"
              className='w-full'
            >
              <Input type='date' />
            </Form.Item>
            <Form.Item
              label="Starting Time"
              className='w-full'
            >
              <Input type='time' />
            </Form.Item>
          </div>
          <Form.Item
            label="Description"
          >
            <TextArea />
          </Form.Item>


          <Form.Item label="Upload Images">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleUploadChange}
              onRemove={handleRemove}
              beforeUpload={() => false}
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

          <div className='flex justify-between  gap-3'>
            <Form.Item className='w-full' >
              <Button className='w-full'>Save</Button>
            </Form.Item>
            <Form.Item className='w-full' >
              <button className='bg-[#d9000a] text-white w-full p-1 rounded-md' onClick={() => setIsModalOpen(false)} >cancel</button>
            </Form.Item>

          </div>
        </Form>


      </Modal>
    </div>
  )
}

export default CreateUpdateAuctionModal