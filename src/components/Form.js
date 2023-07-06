import React, { useState } from 'react';
import {Box, TextField, Button} from '@mui/material';
import * as Realm from 'realm-web';

const realmapp = new Realm.App({id: "xo-so-vhu-ermdi"});
const credentials = Realm.Credentials.anonymous();

var ss = sessionStorage;

function Form(props){
    const [data, setData] = useState({});
    const [errorText, setErrorText] = useState("");

    function changeData(e){
        var tag = e.target.id;
        var val = e.target.value;
        setData({...data, [tag]: val});
    }

    function changePhone(e){
        var tag = e.target.id;
        var val = e.target.value;
        setData({...data, [tag]: val});
        // eslint-disable-next-line eqeqeq
        if(val[0] != 0){
            console.log(val[0]);
            setErrorText("Sai định dạng số điện thoại");
        }else{
            setErrorText("");
            if(val.match(/\(?([0-9]{4})\)?([ .-]?)([0-9]{3})\2([0-9]{3})/) && val.length === 10){
                setErrorText("");
            }else{
                if(val.length > 10) setErrorText("Dư só");
                else setErrorText("Thiếu số");
            }
        }
    }

    function invalid(e){
        if(e.target.id === "email")
        e.target.setCustomValidity("Email không đúng định dạng");
        else
        e.target.setCustomValidity("Vui lòng nhập thông tin");
    }

    function input(e){
        e.target.setCustomValidity("");
    }

    async function submit(e){
        e.preventDefault();
        if(errorText !== ""){
            alert("Số điện thoại chưa đúng định dạng");
        }else{
            const realmUser = await realmapp.logIn(credentials);
            // const rs = await realmUser.callFunction('getHistory', {phoneNumber: data.phoneNumber});
            const rs = await realmUser.callFunction('getHistoryHEB', {phoneNumber: data.phoneNumber});
            if(rs.length === 0){
                const rs1 = await realmUser.callFunction('addHistoryHEB', data);
                ss.setItem("ratingAction", "done "+ rs1.id);
                ss.setItem("phoneNumber", data.phoneNumber);
                ss.setItem("submited", "true");
                ss.setItem("spin", 1);
                window.location.href = "/";
            }else{
                alert("Số điện thoại đã đăng ký");
            }
        }
    }

    return(
    <>
    <Box sx={{minHeight: "100%", padding: 2}}>
        <h1 style={{color: "#0098FA", textAlign: "center", fontWeight:"bolder", fontSize:"20px"}}>
            Bạn hãy nhập thông tin để đến với vòng quay may mắn nhé!
        </h1>
        <form onSubmit={submit} style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'relative', display: 'flex'}}>
            <TextField 
                fullWidth 
                required 
                margin="dense" 
                onChange={changeData} 
                onInvalid={invalid} 
                onInput={input} 
                id="fullName" 
                label="Họ và tên"
                size="small"
            />
            <TextField 
                fullWidth 
                required 
                margin="dense" 
                onChange={changePhone} 
                helperText={errorText}
                error={(errorText.length === 0) ? false : true }
                onInvalid={invalid} 
                onInput={input} 
                id="phoneNumber" 
                label="Số điện thoại"
                type="number"
                size="small"
            />
            <TextField 
                fullWidth 
                required 
                margin="dense" 
                onChange={changeData} 
                onInvalid={invalid} 
                onInput={input} 
                id="email" 
                label="Email"
                type="email"
                size="small"
            />
            <TextField 
                fullWidth 
                required 
                margin="dense" 
                onChange={changeData} 
                onInvalid={invalid} 
                onInput={input} 
                id="diaChi" 
                label="Địa chỉ nhà của bạn"
                size="small"
            />
            <TextField 
                fullWidth 
                required 
                margin="dense" 
                onChange={changeData} 
                onInvalid={invalid} 
                onInput={input} 
                id="favoriteMajor" 
                label="Ngành học bạn yêu thích"
                size="small"
            />
            <TextField 
                fullWidth 
                required 
                margin="dense" 
                onChange={changeData} 
                onInvalid={invalid} 
                onInput={input} 
                id="currentSchool" 
                label="Trường bạn đang theo học"
                size="small"
            />
            {/* <TextField 
                fullWidth 
                required 
                margin="dense" 
                onChange={changeData} 
                onInvalid={invalid} 
                onInput={input} 
                id="favoriteSchool" 
                label="Trường Đại học yêu thích"
                size="small"
            /> */}
            <Button type="submit" sx={{marginTop: "20px"}} variant="contained" color="info">Xác Nhận</Button>
        </form>
    </Box>
    </>
    );
}
export default Form;