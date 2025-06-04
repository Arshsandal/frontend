import React, { useState } from "react";
import { Form, Input, DatePicker, Upload, Button, Card, message } from "antd";
import { UploadOutlined, UserOutlined, CalendarOutlined } from "@ant-design/icons";

const Settings = () => {
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (info) => {
    const file = info.file.originFileObj;
    if (!file.type.startsWith("image/")) {
      message.error("Please upload a valid image file!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const disabledFutureDate = (current) => {
    return current && current > new Date();
  };

  const onFinish = (values) => {
    console.log("Updated profile values:", {
      ...values,
      dob: values.dob?.format("YYYY-MM-DD"), // formatted output from DatePicker
    });
    message.success("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">Update Profile</h2>

        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-500 shadow-md mb-3">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl">
                No Image
              </div>
            )}
          </div>
          <Upload
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleImageUpload}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />} type="primary" size="small">
              Upload Profile Picture
            </Button>
          </Upload>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            name: "",
            dob: null,
          }}
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your full name" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[{ required: true, message: "Please select your date of birth" }]}
          >
            <DatePicker
              className="w-full"
              placeholder="Select your birth date"
              disabledDate={(current) => current && current > new Date()}
              suffixIcon={<CalendarOutlined />}
            />
          </Form.Item>

          <Form.Item className="text-center">
            <Button type="primary" htmlType="submit" className="px-8 py-2 rounded-xl">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Settings;
