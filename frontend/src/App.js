import React, { useCallback } from 'react';
import { ConfigProvider, Row, Col } from 'antd';
import theme from './utils/theme';
import './App.css';
import { Header, SolutionCalculator, particleOptions } from './components';
import Particles from 'react-tsparticles';
import { loadSlim } from "tsparticles-slim";
import { isMobile } from 'react-device-detect';

const styles = {
  formContainer: {
    height: '100vh',
    backgroundColor: theme.colors.accentDark
  },
};


function App() {
  // Particles Background
  const initParticles = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: theme.colors.primary,
          colorInfo: theme.colors.primary,
          fontFamily: theme.typefaces.poppins.regular,
        }
      }}
    >
      <Row align='middle' justify='center' style={{ height: '100%', width: '100%'}}>
        <Col span={isMobile ? 24 : 12}>
          <Header heading={'Which solution best suits your needs?'} subHeading={'We aim to recommend a solution that best aligns with your needs based on your current electricity spend per month.'} />
        </Col>
        <Col span={isMobile ? 24 : 12}>
          <div style={isMobile ? { width: '100%', ...styles.formContainer } : { width: '100%', ...styles.formContainer }}>
            <Row
              align={isMobile ? 'top' : 'middle'}
              justify='center'
              style={{ height: '100%', width: '100%'}}
            >
              <SolutionCalculator />
            </Row>
          </div>
        </Col>
      </Row>
      <div style={{position: 'absolute', zIndex: -1}}>
        <Particles
          id="tsParticles"
          init={initParticles}
          options={{
              ...particleOptions,
          }}
        />
      </div>
     </ConfigProvider>
  );
}

export default App;
