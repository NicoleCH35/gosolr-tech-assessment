import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Row, Space } from 'antd';
import { isMobile } from 'react-device-detect';
import theme from '../utils/theme';

const styles = {
    row: {
        padding: isMobile ? 50 : 100,
    },
    space: {
        textAlign: 'center',
    },
    heading: {
        fontFamily: theme.typefaces.poppins.semiBold,
        marginTop: 5,
        marginBottom: 5,
    },
    subHeading: {
        fontFamily: theme.typefaces.poppins.extraLight,
        marginTop: 5,
    },
};

const Header = (props) => {
    const { heading, subHeading } = props;
    const { Title } = Typography;

    return (
        <Row style={{ ...styles.row }} align='middle' justify='center'>
            <Space direction='vertical' style={{ ...styles.space }} >
                <Title level={isMobile ? 2 : 1} style={{ ...styles.heading }}>{heading}</Title>
                {subHeading && <Title level={isMobile ? 4 : 3} style={{ ...styles.subHeading }}>{subHeading}</Title>}
            </Space>
        </Row>
    );
};

Header.propTypes = {
    heading: PropTypes.string.isRequired,
    subHeading: PropTypes.string,
};

Header.defaultProps = {
    subHeading: '',
};

export default Header;