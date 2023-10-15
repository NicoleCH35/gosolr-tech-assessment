import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Row, Space, Spin, Col, Table, Descriptions } from 'antd';
import { isMobile } from 'react-device-detect';
import theme from '../utils/theme';

const icon = require('../images/SolarSolution.png');

const Solution = (props) => {
    const { loading, spend, name, price, savings, totals, differences } = props;
    const { Title, Text } = Typography;

    if (loading){
        return <Spin size="large" style={{ paddingTop: 25, color: theme.colors.accentDark }} />;
    }

    if (!name){
        return (<img src={icon} alt={'solar solution'} style={{ width: isMobile ? '70vw' : ''}}/>);
    }

    return (
        <div style={{ width: '100%' }}>
            <Row style={{ width: '100%' }} align='middle' justify='center'>
                <div
                    style={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
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
                {
                    isMobile ? (
                        <>
                            <Col span={24} style={{ paddingBottom: 10}}>
                                <Text strong>Current Solution</Text>
                                <Descriptions bordered size='small'>
                                    <Descriptions.Item label="Savings" span={3}>{`R ${Math.round(savings.average)}`}</Descriptions.Item>
                                    <Descriptions.Item label="Total Cost" span={3}>{`R ${Math.round(totals.average)}`}</Descriptions.Item>
                                    <Descriptions.Item label="Difference" span={3}>{`R ${Math.round(differences.average)}`}</Descriptions.Item>
                                </Descriptions>
                            </Col>
                            <Col span={24} style={{ paddingBottom: 10}}>
                                <Text strong>Recommended Solution (Average)</Text>
                                <Descriptions bordered size='small'>
                                    <Descriptions.Item label="Savings" span={3}>{`R ${Math.round(savings.average)}`}</Descriptions.Item>
                                    <Descriptions.Item label="Total Cost" span={3}>{`R ${Math.round(totals.average)}`}</Descriptions.Item>
                                    <Descriptions.Item label="Difference" span={3}>{`R ${Math.round(differences.average)}`}</Descriptions.Item>
                                </Descriptions>
                            </Col>
                            <Col span={24} style={{ paddingBottom: 10}}>
                                <Text strong>Recommended Solution (Adjustments)</Text>
                                <Descriptions bordered size='small'>
                                    <Descriptions.Item label="Savings" span={3}>{`R ${Math.round(savings.adjustments)}`}</Descriptions.Item>
                                    <Descriptions.Item label="Total Cost" span={3}>{`R ${Math.round(totals.adjustments)}`}</Descriptions.Item>
                                    <Descriptions.Item label="Difference" span={3}>{`R ${Math.round(differences.adjustments)}`}</Descriptions.Item>
                                </Descriptions>
                            </Col>
                        </>
                    ) : (
                    <Table
                        pagination={false}
                        columns={[
                            {
                                title: '',
                                dataIndex: 'key',
                                rowScope: 'row',
                            },
                            {
                                title: 'Current Solution',
                                dataIndex: 'current_solution',
                            },
                            {
                                title: 'Recommended Solution (Average)',
                                dataIndex: 'receommeded_solution_average',
                            },
                            {
                                title: 'Recommended Solution (Adjustments)',
                                dataIndex: 'receommeded_solution_adjustment',
                            },
                        ]}
                        dataSource={[
                            {
                                key: 'Description',
                                current_solution: 'Below you will see how your current solution compares to our recommended solution.',
                                receommeded_solution_average: 'Keep using your electricity exactly as you are and we can offer you our recommended solution based on average electricity usage.',
                                receommeded_solution_adjustment: 'Make a few adjustments to the way you use electricity and we could offer you the package below.',
                            },
                            {
                                key: 'Load Shedding',
                                current_solution: <Text>Yes</Text>,
                                receommeded_solution_average: <Text>No</Text>,
                                receommeded_solution_adjustment: <Text>No</Text>,
                            },
                            {
                                key: 'Total Cost',
                                current_solution: `R ${Math.round(spend)}`,
                                receommeded_solution_average: (
                                    <Text
                                        style={{ color: spend < totals.average ? theme.colors.danger : theme.colors.success }}
                                    >
                                        {`R ${Math.round(totals.average)}`}
                                    </Text>
                                ),
                                receommeded_solution_adjustment: (
                                    <Text
                                        style={{ color: spend < totals.adjustments ? theme.colors.danger : theme.colors.success }}
                                    >
                                        {`R ${Math.round(totals.adjustments)}`}
                                    </Text>
                                ),
                            },
                            {
                                key: 'Savings with GoSolr',
                                current_solution: '-',
                                receommeded_solution_average: (
                                    <Text>
                                        {`R ${Math.round(savings.average)}`}
                                    </Text>
                                ),
                                receommeded_solution_adjustment: (
                                    <Text>
                                        {`R ${Math.round(savings.adjustments)}`}
                                    </Text>
                                ),
                            },
                            {
                                key: 'Difference',
                                current_solution: '-',
                                receommeded_solution_average: (
                                    <Text
                                        style={{ color: differences.average > 0 ? theme.colors.danger : theme.colors.success }}
                                    >
                                        {`R ${Math.round(Math.abs(differences.average))}`}
                                    </Text>
                                ),
                                receommeded_solution_adjustment: (
                                    <Text
                                        style={{ color: differences.adjustments > 0 ? theme.colors.danger : theme.colors.success }}
                                    >
                                        {`R ${Math.round(Math.abs(differences.adjustments))}`}
                                    </Text>
                                ),
                            },
                        ]}
                    />)
                }
            </Row>
        </div>
    );
};

Solution.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    spend: PropTypes.number.isRequired,
    savings: PropTypes.object.isRequired,
    totals: PropTypes.object.isRequired,
    differences: PropTypes.object.isRequired,
    loading: PropTypes.bool,
};

Solution.defaultProps = {
    loading: false,
};

export default Solution;