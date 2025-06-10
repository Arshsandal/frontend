import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography, Tag, Spin, message } from 'antd';
import {
  CalendarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const { Title, Text } = Typography;

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace this with actual logged-in user ID or token
  const userId = '123'; // Example only

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/bookings/user/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch bookings');
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error(err);
        message.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'green';
      case 'Pending':
        return 'orange';
      case 'Completed':
        return 'blue';
      default:
        return 'default';
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px 5%' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>
          🧾 My Bookings
        </Title>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 50 }}>
            <Spin size="large" />
          </div>
        ) : bookings.length > 0 ? (
          <Row gutter={[24, 24]}>
            {bookings.map((booking) => (
              <Col xs={24} sm={12} lg={8} key={booking.id}>
                <Card
                  hoverable
                  title={
                    <span>
                      🚌 Route <strong>{booking.route_number}</strong>
                    </span>
                  }
                  extra={<Tag color={getStatusColor(booking.status)}>{booking.status}</Tag>}
                  style={{
                    borderRadius: 16,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  }}
                >
                  <Text>
                    <EnvironmentOutlined /> From: <strong>{booking.from}</strong>
                  </Text>
                  <br />
                  <Text>
                    <EnvironmentOutlined /> To: <strong>{booking.to}</strong>
                  </Text>
                  <br />
                  <Text>
                    <CalendarOutlined /> Date: {booking.date}
                  </Text>
                  <br />
                  <Text>
                    <ClockCircleOutlined /> Time: {booking.time}
                  </Text>
                  <br />
                  {booking.via?.length > 0 && (
                    <Text type="secondary">🛣️ Via: {booking.via.join(', ')}</Text>
                  )}
                  <br />
                  <Text type="secondary">Booking ID: {booking.id}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <CheckCircleOutlined style={{ fontSize: 48, color: '#52c41a' }} />
            <Title level={4} style={{ marginTop: 16 }}>
              No bookings found.
            </Title>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyBookings;
