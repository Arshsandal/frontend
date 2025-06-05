import React, { useState } from 'react';
import {
  Form,
  Input,
  DatePicker,
  Button,
  Upload,
  message,
  Card,
  Row,
  Col,
} from 'antd';
import {
  UploadOutlined,
  SaveOutlined,
  ReloadOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import dayjs from 'dayjs';

const ProfileSettings = () => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log('Form values:', values);
    message.success('Profile updated successfully!');
  };

  const handleReset = () => {
    form.resetFields();
    message.info('Form reset.');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#121212] py-12 px-4 flex justify-center items-center">
        <Card
          title="Profile Settings"
          className="w-full max-w-3xl border border-gray-700"
          headStyle={{ fontSize: '20px', fontWeight: 600, backgroundColor: '#1e1e1e', color: '#fff' }}
          bodyStyle={{ backgroundColor: '#1e1e1e', color: '#fff' }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            initialValues={{
              fullName: 'John Doe',
              email: 'john@example.com',
              phone: '+44 1234 567890',
              dob: dayjs('1995-01-01'),
              address: '123 Baker Street, London',
            }}
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Full Name"
                  name="fullName"
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Full Name" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    { type: 'email', message: 'Enter a valid email' },
                    { required: true, message: 'Please enter your email' },
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Email Address" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[{ required: true, message: 'Enter your phone number' }]}
                >
                  <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Date of Birth"
                  name="dob"
                  rules={[{ required: true, message: 'Please select your DOB' }]}
                >
                  <DatePicker className="w-full" />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[{ required: true, message: 'Please enter your address' }]}
                >
                  <Input.TextArea rows={3} prefix={<HomeOutlined />} placeholder="Your address" />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item label="Upload Profile Picture" name="upload">
                  <Upload beforeUpload={() => false} maxCount={1}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>

              <Col xs={24} className="flex justify-end gap-4">
                <Button icon={<ReloadOutlined />} onClick={handleReset}>
                  Reset
                </Button>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                  Save Changes
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default ProfileSettings;
