import React, { useState } from 'react';
import { InputNumber, Button, Row, Col, Card, Typography, Divider, Space, Form, message } from 'antd';
import theme from '../utils/theme';
import { isMobile } from 'react-device-detect';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Solution from './Solution';

const validationSchema = yup.object({
    spend: yup
        .number()
        .positive('Electricity spend must be a positive number.')
        .required('Electricity spend is required.')
});

const SolutionCalculator = () => {
    const [loading, setLoading] = useState(false);
    const [solution, setSolution] = useState({});

    const { Title } = Typography;
    const [messageApi, contextHolder] = message.useMessage();
    
    const getRecommededSolution = (spend) => {
        setLoading(true);
        setSolution({});
        fetch(`/getRecommededSolution/${spend}`)
            .then(async (res) => {
                const body = await res.json();
                if (body?.error){
                    messageApi.open({
                        type: 'error',
                        content: body?.message || 'An unknown error occurred.',
                    });
                    return;
                }
                setSolution(body);
            })
            .catch((e) => {
                messageApi.open({
                    type: 'error',
                    content: 'An unknown error occurred.',
                });
            })
            .then(() => {
                setLoading(false);
            });
    };

    const formik = useFormik({
        initialValues: {
            spend: 0,
        },
        validationSchema,
        onSubmit: (values) => {
            getRecommededSolution(values.spend);
        },
    });

    return (
        <Card bordered={false} style={isMobile ? { margin: 15, width: '80%' } : { width: '80%', height: '' } }>
            {contextHolder}
            <Row align="middle" justify={'center'}>
                <Form name="electricitySpendForm" onFinish={formik.handleSubmit} layout='vertical' initialValues={{ spend: 0 }}>
                    <Col align="middle" justify={'center'}>
                        <Space direction='vertical'>
                            <Title level={isMobile ? 5 : 4} style={{ marginTop: 5, width: '70%' }}>How much do you currently spend on electricity per month?</Title>
                            <Form.Item name="spend" extra={formik.submitCount > 0 && formik.errors.spend ? formik.errors.spend : ""}>
                                <InputNumber
                                    min={0}
                                    value={formik.values.spend}
                                    size='large'
                                    addonBefore="R"
                                    style={{width: '70%'}}
                                    name="spend"
                                    onChange={(value) => { formik.setFieldValue('spend', value); }}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    loading={loading}
                                    disabled={loading}
                                    type="primary"
                                    htmlType='submit'
                                    size='large'
                                    style={{
                                        marginTop: -10,
                                        background: 'black',
                                        borderColor: 'black',
                                        borderRadius: 50,
                                        width: '60%'
                                    }}
                                >
                                    Calculate
                                </Button>
                            </Form.Item>
                        </Space>
                    </Col>
                </Form>
                <Divider style={{ backgroundColor: theme.colors.tertiary, height: 2, margin: 10 }} />
                <Solution loading={loading} spend={formik.values.spend} name={solution.solution} price={solution.cost} savings={solution.savings_gosolr} differences={solution.difference} totals={solution.total_cost} />
            </Row>
        </Card>
    );
};

SolutionCalculator.propTypes = {
};

SolutionCalculator.defaultProps = {
};

export default SolutionCalculator;