import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Row, Space, Spin, Table, Col, Descriptions } from 'antd';
import { isMobile } from 'react-device-detect';
import theme from '../utils/theme';

const icon = require('../images/SolarSolution.png');

const Solution = (props) => {
    const { loading, name, price, savings, totals, differences } = props;
    const { Title, Text } = Typography;

    if (loading){
        return <Spin size="large" style={{ paddingTop: 25, color: theme.colors.accentDark }} />;
    }

    if (!name){
        return (<img src={icon} alt={'solar solution'} style={{ width: '100%'}}/>);
    }

    return (
        <div style={{ width: '100%' }}>
            <Row style={{ width: '100%' }} align='middle' justify='center'>
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        backgroundColor: theme.colors.primary,
                        borderBottomLeftRadius: '50%',
                        borderBottomRightRadius: '50%',
                        whiteSpace: 'nowrap',
                        textAlign: 'center',
                    }}
                >
                    <Space direction='vertical' justify='center' align='middle' style={{ width: '100%' }} >
                        <Title level={5} style={{ fontFamily: theme.typefaces.poppins.semiBold, margin: 0, marginTop: 15 }}>We recommend our</Title>
                        <Title level={isMobile ? 3 : 1} style={{ fontFamily: theme.typefaces.poppins.extraBold, margin: 0, marginTop: -10 }}>{`${name} Solution`}</Title>
                        <Title level={isMobile ? 3 : 1} style={{ fontFamily: theme.typefaces.poppins.extraBold, margin: 0 }}>{`R${price}`}</Title>
                        <Title level={5} style={{ fontFamily: theme.typefaces.poppins.semiBold, marginTop: -10, paddingBottom: 25 }}>per month</Title>
                    </Space>
                </div>
            </Row>

            <Row style={{ width: '100%', paddingTop: 25 }} gutter={16}>
                <Col span={isMobile ? 24 : 12}>
                    <Text strong>Pricing based on average usage</Text>
                    <Descriptions bordered size='small'>
                        <Descriptions.Item label="Savings" span={3}>{`R ${Math.round(savings.average)}`}</Descriptions.Item>
                        <Descriptions.Item label="Total Cost" span={3}>{`R ${Math.round(totals.average)}`}</Descriptions.Item>
                        <Descriptions.Item label="Difference" span={3}>{`R ${Math.round(differences.average)}`}</Descriptions.Item>
                    </Descriptions>
                </Col>
                <Col span={isMobile ? 24 : 12}>
                    <Text strong>Pricing if you adjust your habits slightly</Text>
                    <Descriptions bordered size='small'>
                        <Descriptions.Item label="Savings" span={3}>{`R ${Math.round(savings.adjustments)}`}</Descriptions.Item>
                        <Descriptions.Item label="Total Cost" span={3}>{`R ${Math.round(totals.adjustments)}`}</Descriptions.Item>
                        <Descriptions.Item label="Difference" span={3}>{`R ${Math.round(differences.adjustments)}`}</Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </div>
    );
};

Solution.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    savings: PropTypes.object.isRequired,
    totals: PropTypes.object.isRequired,
    differences: PropTypes.object.isRequired,
    loading: PropTypes.bool,
};

Solution.defaultProps = {
    loading: false,
};

export default Solution;