import React, { useState } from 'react';
import { InputNumber, Button, Row, Col, Card, Typography, Divider, Space, Form, message } from 'antd';
import theme from '../utils/theme';
import { isMobile } from 'react-device-detect';
import { useFormik } from 'formik';
import * as yup from 'yup';

const icon = require('../images/SolarSolution.png');

const styles = {
    row: {
        padding: 50,
        width: '100%',
        justifyContent: 'center',
        textAlign: 'center',
    }
};

const validationSchema = yup.object({
    spend: yup
        .number()
        .required('Electricity spend is required.')
        .test('Positive number', 'Electricity spend must be a positive number.', (v) => v >= 0),
});

const SolutionCalculator = ({}) => {
    const [loading, setLoading] = useState(false);
    const [solution, setSolution] = useState({});

    const { Title } = Typography;
    const [messageApi, contextHolder] = message.useMessage();
    
    const getRecommededSolution = (spend) => {
        setLoading(true);
        fetch(`/getRecommededSolution/${spend}`)
            .then(async (res) => {
                const body = await res.json();
                console.log('getRecommededSolution', body);
            })
            .catch((e) => {
                console.log('the error', e);
                messageApi.open({
                    type: 'error',
                    content: 'This is an error message',
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
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema,
        onSubmit: (values) => {
            console.log('values', values);
            formik.validateForm('spend')
            .then((r) => {
                console.log('r', r);
            });
            // getRecommededSolution(values.spend);
        },
    });

    return (
        <Card bordered={false} style={isMobile ? { margin: 15, width: '80%' } : {width: '80%', height: '80%'} }>
            {contextHolder}
            <Row align="middle" justify={'center'}>
                <Form name="electricitySpendForm" onFinish={formik.handleSubmit} layout='vertical'>
                    <Col align="middle" justify={'center'}>
                        <Space direction='vertical'>
                            <Title level={isMobile ? 5 : 4} style={{ marginTop: 5, width: '70%' }}>How much do you currently spend on electricity per month?</Title>
                            <Form.Item name='spend'>
                                <InputNumber
                                    min={0}
                                    size='large'
                                    addonBefore="R"
                                    style={{width: '70%'}}
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
                <Divider style={{ backgroundColor: theme.colors.accentDark, height: 2 }} />
                {<img src={icon} alt={'solar solution'} style={{ width: '100%'}}/>}
            </Row>
        </Card>
    );
};

SolutionCalculator.propTypes = {
};

SolutionCalculator.defaultProps = {
};

export default SolutionCalculator;