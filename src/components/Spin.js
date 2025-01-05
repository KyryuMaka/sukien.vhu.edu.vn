import React, {useState} from 'react';
import { animated, useSpring, easings } from 'react-spring';
import {Box, Button,Stack} from '@mui/material'
import * as Realm from 'realm-web';

import circle from '../images/spin.png'
import imageTick1 from '../images/tick1.png'
import imageTick2 from '../images/tick2.png'

var ss = sessionStorage;

const realmapp = new Realm.App({id: "xo-so-vhu-ermdi"});
const credentials = Realm.Credentials.anonymous();

const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/xo-so-vhu-ermdi/endpoint/prize?secret=WxhdWCXkRqodJ3WurJFonxJP";
const rules=[
    [910,930],      // 0 Thư pháp
    [730,750],      // 1 Thư pháp
    [775,795],      // 2 Balo
    [820,840],      // 3 Sổ tay
    [865,885],      // 4 Nón bảo hiểm
    [955,975],      // 5 Gấu
    [1045,1065],    // 6 Bình giữ nhiệt
    [1000,1020],    // 7 Hẹn gặp lại
]


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function Spin(props){
    const [style , action] = useSpring(() => ({ transform: "rotate(90deg)" }));
    const [runAnimation, setrunAnimation] = useState(false);
    const [isDone, setIsDone] = useState(false);

    function quaySo(){
        setIsDone(true)
        if(!runAnimation && parseInt(ss.getItem("spin")) === 1){
            fetch(url)
            .then(response => response.json()) // parse JSON from request
            .then(resultData => {
                ss.setItem("prize", resultData.number);
                var current = rules[resultData.number];
                // alert(resultData.number)
                setrunAnimation(true)
                action.start({transform: `rotate(${getRandomInt(current[1]-current[0])+current[0]+2160}deg)`,config:{duration:10000,easing: easings.easeOutExpo}})
                // action.start({transform: `rotate(${getRandomInt(1065-1065)+1065+2160}deg)`,config:{duration:10000,easing: easings.easeOutExpo}})
                setTimeout(submit(resultData.number), 11000);
                setTimeout(notifi,10000);
            })
            ss.setItem("spin", 1);
        }
    }

    async function submit(props){
        const realmUser = await realmapp.logIn(credentials);
        const rs = await realmUser.callFunction('updatePrize', {phoneNumber: ss.phoneNumber}, {$set:{prize: props}});
        sessionStorage.setItem("ratingAction", "done "+ rs.id);
    }

    function notifi(){
        var prize = parseInt(sessionStorage.prize);
        var result;
        switch(prize){
            case 0: 
            case 1: 
                result = "Liễn thư pháp";
                break;
            case 2: 
                result = "Balo"; 
                break;
            case 3: 
                result = "Sổ tay";
                break;
            case 4: 
                result = "Nón bảo hiểm";
                break;
            case 5: 
                result = "Gấu đại sứ";
                break;
            case 6: 
                result = "Bình giữ nhiệt";
                break;
            default: 
                break;
        }
        if(prize !== 7){
            document.getElementById("result").innerHTML = `Chúc mừng bạn đã trúng 1 ${result} VHU! <br /> Hãy chụp ảnh màn hình và đến quầy Đại học Văn Hiến để nhận quà nhé!`;
        }else{
            document.getElementById("result").innerHTML = "Hẹn gặp bạn tại VHU! <br /> Hãy chụp ảnh màn hình và đến quầy Đại học Văn Hiến để nhận quà nhé!";
        }
    }

    return(
    <>
        <Box sx={{minHeight: "100%", mb: "20px"}}>      
            <div style={{marginBottom: "30px"}}>
                <h1 style={{color: "#0098FA", textAlign: "center", fontWeight:"bolder", fontSize:"20px", marginBottom: "10px"}}>CHÀO MỪNG ĐẾN VỚI VÒNG QUAY MAY MẮN</h1>
                <h1 id="result" style={{color: "#0098FA", textAlign: "center", fontWeight:"bolder", fontSize:"15px"}}>BẠN NHẬN ĐƯỢC {ss.getItem("spin")} LƯỢT QUAY <br/>CHÚC BẠN MAY MẮN NHÉ!</h1>
            </div>
            <Stack sx={{transform: "rotate(0.25turn)", position:'relative'}} justifyContent="center" alignItems="center">
                <img alt="" src={imageTick1} style={{position:'absolute',top:0,height:'17%'}} />
                <img alt="" src={imageTick2} style={{position:'absolute',top:0,zIndex:9,height:'18%'}} />
                <animated.img src={circle} style={{
                    ...{
                    ...style,
                    padding:20,
                    height:"250px",
                    }
                }}/>
            </Stack>
            <Box textAlign="center">
                {(isDone)?
                <Button sx={{marginTop: "20px"}} href="https://ts.vhu.edu.vn/" variant="contained" color="info">Đi đến trang tuyển sinh</Button>:
                // <Button sx={{marginTop: "20px"}} onClick={quaySo} variant="contained" color="info">Quay thưởng</Button>:
                <Button sx={{marginTop: "20px"}} onClick={quaySo} variant="contained" color="info">Quay thưởng</Button>}
            </Box>
        </Box>
    </>
    );
}
export default Spin;