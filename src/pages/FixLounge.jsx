import React from 'react';
import {
  Layout,
  Typography,
  Row,
  Col,
  Card,
  Form,
  Input,
  DatePicker,
  Button,
  Collapse,
  message,
} from 'antd';
import {
  WifiOutlined,
  CoffeeOutlined,
  PoweroffOutlined,
  StarOutlined,
  SmileOutlined,
  DesktopOutlined,
} from '@ant-design/icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Copyright from '../components/Copyright';

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const iconMap = {
  'Premium Seating': <DesktopOutlined />,
  'Free Wi-Fi': <WifiOutlined />,
  'Refreshments': <CoffeeOutlined />,
  'Power Stations': <PoweroffOutlined />,
  'Lounge Ambiance': <SmileOutlined />,
  'VIP Access': <StarOutlined />,
};

const services = [
  { title: 'Premium Seating', desc: 'Ergonomic seating designed for long waits.' },
  { title: 'Free Wi-Fi', desc: 'Stream, browse, or work with high-speed internet.' },
  { title: 'Refreshments', desc: 'Snacks and beverages, always complimentary.' },
  { title: 'Power Stations', desc: 'Charge all your devices without hassle.' },
  { title: 'Lounge Ambiance', desc: 'Lighting and music curated for calmness.' },
  { title: 'VIP Access', desc: 'Quiet zones and enhanced services for VIPs.' },
];

const faqs = [
  {
    q: 'How can I book a spot at the Fix Lounge?',
    a: 'Use the booking form below, and we’ll send you a confirmation email.',
  },
  {
    q: 'What services are included?',
    a: 'Everything from seating to snacks, power to peace.',
  },
  {
    q: 'Is the lounge open to everyone?',
    a: 'Yes! VIP zones are just an upgrade away.',
  },
];

const FixLounge = () => {
  const handleBooking = () => {
    message.success('Lounge spot reserved successfully!');
  };

  return (
    <>
      <Navbar />
    <Layout style={{ minHeight: '100vh' }}>
      <Content
        style={{
          padding: '60px 8%',
          background: 'linear-gradient(to right, #e6f7ff, #f0fff0)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <Title style={{ fontSize: '3rem', color: '#2f855a' }}>
            Relax & Recharge at the Fix Lounge
          </Title>
          <Paragraph style={{ fontSize: '1.2rem', color: '#595959' }}>
            Where comfort meets convenience — your perfect wait starts here.
          </Paragraph>
        </div>

        {/* Lounge Services */}
        <Row gutter={[24, 24]}>
          {services.map((service, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card
                hoverable
                bordered={false}
                style={{
                  borderRadius: 20,
                  background: 'rgba(255, 255, 255, 0.75)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s ease',
                  height: '100%',
                }}
                bodyStyle={{ minHeight: 180 }}
              >
                <div style={{ fontSize: 36, marginBottom: 16, color: '#52c41a' }}>
                  {iconMap[service.title]}
                </div>
                <Title level={4} style={{ color: '#1a1a1a' }}>
                  {service.title}
                </Title>
                <Paragraph>{service.desc}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Booking Form */}
        <Card
          style={{
            marginTop: 60,
            background: 'linear-gradient(to top left, #f0fff0, #e6f7ff)',
            borderRadius: 16,
            boxShadow: '0 12px 32px rgba(0,0,0,0.05)',
          }}
          title={<Title level={3} style={{ margin: 0, color: '#389e0d' }}>Book Your Lounge Spot</Title>}
        >
          <Form layout="vertical" onFinish={handleBooking}>
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item label={<span className="text-black">Your Name</span>} name="name" rules={[{ required: true }]} >
                  <Input size="large" placeholder="John Doe" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label={<span className="text-black">Email</span>}
                  name="email"
                  rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                >
                  <Input size="large" placeholder="john@example.com" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label={<span className="text-black">Preferred Date</span>}
                  name="date"
                  rules={[{ required: true, message: "Please select a preferred date" }]}
                >
                  <DatePicker size="large" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label={<span className="text-black">Special Requests</span>}
                  name="notes"
                >
                  <Input.TextArea rows={1} placeholder="Optional" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{
                    backgroundColor: '#52c41a',
                    borderColor: '#52c41a',
                    width: '100%',
                    borderRadius: 8,
                  }}
                >
                  Reserve My Spot
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>

        {/* FAQs */}
        <div style={{ marginTop: 80 }}>
          <Title level={3} style={{ color: '#237804' }}>Frequently Asked Questions</Title>
          <Collapse
            accordion
            bordered={false}
            style={{
              background: 'none',
              marginTop: 20,
            }}
          >
            {faqs.map((item, index) => (
              <Panel
                header={<b>{item.q}</b>}
                key={index}
                style={{
                  background: '#ffffff',
                  borderRadius: 12,
                  marginBottom: 12,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                }}
              >
                <p>{item.a}</p>
              </Panel>
            ))}
          </Collapse>
        </div>

        <div style={{ marginTop: 60 }}>
          <Copyright />
        </div>
      </Content>

      
    </Layout>
    <Footer />
    </>
  );
};

export default FixLounge;
