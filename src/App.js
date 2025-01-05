import React from 'react';
import './App.css';
import Box from '@mui/material/Box';

import line37 from './images/line37.png'
import background from './images/bg.webp'
import logo from './images/logo-2.png'

import Form from './components/Form';
import Spin from './components/Spin';
import Thanks from './components/Thanks';

function App() {
  const isSubmited = sessionStorage.getItem('submited');
  return (
  <>
    <Box sx={{backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
      <Box sx={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', minHeight: '97vh', display: 'flex'}}>
        <Box sx={{margin: '1rem'}}>
          <a href='https://vhu.edu.vn'><img src={logo} alt="" height="50px" /></a>
        </Box>
        <Box 
          sx={{
            backgroundColor: "#ffffff", 
            border: '1px solid #dee2e6', 
            borderRadius: '0.5rem', 
            borderColor: '#0d6efd', 
            width: {xs: '85%', md: '50%'}, 
            marginBottom: '45px'
          }}
        >
          <Box sx={{alignItems: 'center', justifyContent: 'center', height: '100%'}}>
          {isSubmited?
            <Spin />:
            // <Thanks />:
            <Form />
          }
          </Box>
        </Box>
      </Box>
      <img src={line37} alt="" width="100%"/>
    </Box>
    
  </>
  );
}

export default App;