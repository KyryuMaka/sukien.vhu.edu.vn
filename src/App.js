import React from 'react';
import './App.css';
import Box from '@mui/material/Box';

import line73 from './images/line73.png'
// import background from './images/bg.webp'
import background from './images/bgHEB.webp'

import Form from './components/Form';
import Spin from './components/Spin';

function App() {
  const isSubmited = sessionStorage.getItem('submited');
  return (
  <>
    <Box sx={{backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
      <Box sx={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', minHeight: '97vh', display: 'flex'}}>
        <Box sx={{margin: '1rem'}}>
          {/* <a href='https://vhu.edu.vn'><img src="https://vhu.edu.vn/Resources/Images/SubDomain/HomePage/Logo/1Logo_VHU.png" alt="" height="50px" /></a> */}
          <a href='https://aurora.edu.vn/'><img src="https://aurora.edu.vn/wp-content/uploads/2022/10/logo-heb-vi.png" alt="" height="100px" /></a>
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
            <Form />
          }
          </Box>
        </Box>
      </Box>
      <img src={line73} alt="" width="100%"/>
    </Box>
    
  </>
  );
}

export default App;