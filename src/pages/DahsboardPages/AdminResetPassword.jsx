import { Form, Input } from 'antd'
import React from 'react'
import Button from '../../components/ui/Button'

const AdminResetPassword = () => {
    const onFinish = (values)=>{
        console.log(values);
    }
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-[#fbe2b5] '>
            <div className='bg-white rounded-md p-10   min-w-[500px]'>
                <h1 className='text-[24px] font-medium text-center'>Forget Password?</h1>
                <p className='text-[14px] text-center mb-5'>Please enter your email to get verification code</p>
                <Form
                        onFinish={onFinish}
                        layout="vertical"
                    >
                       
                        <Form.Item
                            label="New Password"
                            name='password'
                        >
                            <Input.Password placeholder='Enter your new password' />
                        </Form.Item>
                        <Form.Item
                            label="Confirm New Password"
                            name='confirmPassword'
                        >
                            <Input.Password placeholder='Confirm your new password' />
                        </Form.Item>
                       
                        <Form.Item

                        >
                            <Button type="primary" className='w-[100%] mt-4 bg-yellow  custom-button' htmlType="submit">
                                Reset Password
                            </Button>
                        </Form.Item>
                    </Form>
            </div>
        </div>
  )
}

export default AdminResetPassword