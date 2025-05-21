// import React, { useState } from 'react';
// import { Form, Input, Button, Card, Typography, message } from 'antd';
// import { PhoneOutlined, MailOutlined, MessageOutlined } from '@ant-design/icons';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// const { Title, Text } = Typography;
// const { TextArea } = Input;

// const Support = () => {
//   const [loading, setLoading] = useState(false);

//   const onFinish = async (values) => {
//     try {
//       setLoading(true);
//       // Simulate API call
//       await new Promise((res) => setTimeout(res, 1000));
//       message.success('Your message has been sent!');
//     } catch (error) {
//       message.error('Failed to send message. Try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div style={{ padding: '40px 5%', maxWidth: 800, margin: '0 auto' }}>
//         <Title level={2} style={{ textAlign: 'center' }}>🛠 Support</Title>
//         <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: 30 }}>
//           We're here to help. Fill out the form and we'll get back to you as soon as possible.
//         </Text>

//         <Card>
//           <Form layout="vertical" onFinish={onFinish}>
//             <Form.Item
//               label="Full Name"
//               name="name"
//               rules={[{ required: true, message: 'Please enter your name' }]}
//             >
//               <Input placeholder="Enter your name" />
//             </Form.Item>

//             <Form.Item
//               label="Email Address"
//               name="email"
//               rules={[
//                 { required: true, message: 'Please enter your email' },
//                 { type: 'email', message: 'Please enter a valid email' },
//               ]}
//             >
//               <Input placeholder="example@domain.com" />
//             </Form.Item>

//             <Form.Item
//               label="Message"
//               name="message"
//               rules={[{ required: true, message: 'Please enter your message' }]}
//             >
//               <TextArea rows={5} placeholder="Describe your issue or question..." />
//             </Form.Item>

//             <Form.Item>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 loading={loading}
//                 block
//                 icon={<MessageOutlined />}
//               >
//                 Submit Request
//               </Button>
//             </Form.Item>
//           </Form>

//           <div style={{ marginTop: 40, borderTop: '1px solid #f0f0f0', paddingTop: 20 }}>
//             <Title level={4}>Contact Info</Title>
//             <Text>
//               <PhoneOutlined /> +91 12345 67890
//             </Text>
//             <br />
//             <Text>
//               <MailOutlined /> support@ctutracker.in
//             </Text>
//           </div>
//         </Card>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Support;




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
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />

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
                  label="Full Name"
                  name="name"
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input size="large" placeholder="Enter your name" />
                </Form.Item>

                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' },
                  ]}
                >
                  <Input size="large" placeholder="example@domain.com" />
                </Form.Item>

                <Form.Item
                  label="Message"
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
                <Text strong>+91 12345 67890</Text>
              </Paragraph>
              <Paragraph>
                <MailOutlined style={{ marginRight: 8 }} />
                <Text strong>support@ctutracker.in</Text>
              </Paragraph>
              <Paragraph>
                Our support team is available Mon-Fri, 9 AM to 6 PM.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Content>

      <Footer />
    </Layout>
  );
};

export default Support;
