import React, { useEffect, useState } from 'react';
import { List, Avatar, Typography, Badge, Card, Spin, message, Empty } from 'antd';
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  BellOutlined,
} from '@ant-design/icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const { Title, Text } = Typography;

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
    case 'warning':
      return <ExclamationCircleOutlined style={{ color: '#faad14' }} />;
    case 'info':
    default:
      return <InfoCircleOutlined style={{ color: '#1890ff' }} />;
  }
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Example: Replace with actual logged-in user ID or context
  const userId = '123';

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/notifications/user/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch notifications');
        const data = await res.json();
        setNotifications(data);
      } catch (err) {
        console.error(err);
        message.error('Failed to load notifications');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px 5%' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>
          🔔 Notifications
        </Title>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 50 }}>
            <Spin size="large" />
          </div>
        ) : notifications.length > 0 ? (
          <Card
            style={{
              borderRadius: 16,
              boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={notifications}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor:
                            item.type === 'success'
                              ? '#f6ffed'
                              : item.type === 'warning'
                              ? '#fffbe6'
                              : '#e6f7ff',
                        }}
                        icon={getIcon(item.type)}
                      />
                    }
                    title={<Text strong>{item.title}</Text>}
                    description={
                      <>
                        <Text>{item.description}</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {item.time}
                        </Text>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        ) : (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <Empty
              image={<BellOutlined style={{ fontSize: 40, color: '#d9d9d9' }} />}
              description={<Text>No notifications available.</Text>}
            />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Notifications;
