import React, { useEffect, useState } from 'react';
import { Input, Card, Spin, message, Row, Col, Typography, Tag } from 'antd';
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  CarOutlined,
} from '@ant-design/icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const { Title, Text } = Typography;
const { Search } = Input;

const SchedulesAndStops = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLiveSchedules = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://api.tfl.gov.uk/Line/24,73,159/Arrivals?sort=timeToStation'
      );
      const liveData = await response.json();
      setData(liveData);
      setFilteredData(liveData);
    } catch (error) {
      console.error(error);
      message.error('Failed to fetch live schedules');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveSchedules();
  }, []);

  const onSearch = (value) => {
    const filtered = data.filter(
      (item) =>
        item.lineName.toLowerCase().includes(value.toLowerCase()) ||
        item.stationName.toLowerCase().includes(value.toLowerCase()) ||
        item.towards.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px 5% 20px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>
          🚌 Live Bus Arrivals & Stops
        </Title>

        <div style={{ maxWidth: 500, margin: '0 auto', marginBottom: 30 }}>
          <Search
            placeholder="Search by line, stop, or destination..."
            enterButton
            size="large"
            onSearch={onSearch}
          />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 50 }}>
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                  <Card
                    hoverable
                    style={{
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    }}
                    bodyStyle={{ padding: 20 }}
                  >
                    <Title level={4} style={{ color: '#1890ff', marginBottom: 10 }}>
                      <CarOutlined /> Line: {item.lineName}
                    </Title>
                    <Text strong>
                      <EnvironmentOutlined /> Stop: {item.stationName}
                    </Text>
                    <br />
                    <Text>
                      🚏 Destination: <Tag color="blue">{item.towards}</Tag>
                    </Text>
                    <br />
                    <Text>
                      <ClockCircleOutlined style={{ color: '#52c41a' }} /> Arriving in:{' '}
                      <Tag color="green">{(item.timeToStation / 60).toFixed(1)} min</Tag>
                    </Text>
                  </Card>
                </Col>
              ))
            ) : (
              <Col span={24} style={{ textAlign: 'center' }}>
                <Text type="secondary">No live schedules found.</Text>
              </Col>
            )}
          </Row>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SchedulesAndStops;
