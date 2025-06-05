import React, { useState } from 'react';
import {
  Layout,
  Typography,
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  message,
} from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const Support = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 1000));
      message.success('Your message has been sent!');
    } catch (error) {
      message.error('Failed to send message. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
    <Layout style={{ minHeight: '100vh' }}>

      <Content
        style={{
          padding: '60px 8%',
          background: 'linear-gradient(to right, #f0f9ff, #f0fff4)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <Title style={{ fontSize: '3rem', color: '#2f855a' }}>🛠 Support</Title>
          <Paragraph style={{ fontSize: '1.2rem', color: '#595959' }}>
            We're here to help! Fill out the form and we’ll get back to you shortly.
          </Paragraph>
        </div>

        <Row gutter={32}>
          <Col xs={24} md={14}>
            <Card
              style={{
                borderRadius: 16,
                background: '#ffffffcc',
                boxShadow: '0 12px 32px rgba(0,0,0,0.05)',
              }}
              title={<Title level={4} style={{ marginBottom: 0 }}>Send Us a Message</Title>}
            >
              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item 
                 label={<span className="text-black">Your Name</span>}
                  name="name"
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input size="large" placeholder="Enter your name" />
                </Form.Item>

                <Form.Item
                  label={<span className="text-black">Email Address</span>}
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' },
                  ]}
                >
                  <Input size="large" placeholder="example@domain.com" />
                </Form.Item>

                <Form.Item
                 label={<span className="text-black">Message</span>}
                  name="message"
                  rules={[{ required: true, message: 'Please enter your message' }]}
                >
                  <TextArea rows={5} placeholder="Describe your issue or question..." />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    size="large"
                    block
                    icon={<MessageOutlined />}
                    style={{
                      backgroundColor: '#52c41a',
                      borderColor: '#52c41a',
                      borderRadius: 8,
                    }}
                  >
                    Submit Request
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col xs={24} md={10}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                background: '#ffffffcc',
                boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              }}
            >
              <Title level={4} style={{ color: '#2f855a' }}>Contact Info</Title>
              <Paragraph>
                <PhoneOutlined style={{ marginRight: 8 }} />
                <Text strong>020 3054 4361</Text>
              </Paragraph>
              <Paragraph>
                <MailOutlined style={{ marginRight: 8 }} />
                <Text strong>TflAccessibility@tfl.gov.uk</Text>
              </Paragraph>
              <Paragraph>
                Our support team is available Mon-Fri, 9 AM to 6 PM.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Content>

    </Layout>
      <Footer />
    </>
  );
};

export default Support;
