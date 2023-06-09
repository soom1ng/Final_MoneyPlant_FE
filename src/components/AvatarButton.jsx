import * as React from 'react';

import styled from "styled-components";
import Avatar from '@mui/material/Avatar';
import AuthAxiosAPI from "../api/AuthAxiosAPI";
import UserAxiosAPI from "../api/UserAxiosAPI";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";


const AvatarButton = () => {
    const navigate = useNavigate();
    const [name, setName] = useState(null);

    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const response = await UserAxiosAPI.getUserInfo();
                if (response.status === 200) {
                    const userName = response.data.name.split(" ")[0];
                    setName(userName);
                }
            } catch (error) {
                console.log('getNameError : '+ error);
            }
        };

        fetchUserName();
    }, []);

    const onClickLogOut = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthAxiosAPI.logout();
            if (response.status === 200) {
                console.log("logout successful");
                navigate("/");
                setName(null);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            {name ? (
                <>
                <Avatar {...stringAvatar(name)} onClick={onClickLogOut} />
                {view && (
                    <MenuDiv>
                      <>
                        <DropDown onClick={onclickManage}>
                          <MenuImg src={manage} />
                          <h3 className="manage">권한 넘기기</h3>
                        </DropDown>
                        <DropDown onClick={onclickBan}>
                          <MenuImg src={ban} />
                          <h3 className="ban">멤버강퇴</h3>
                        </DropDown>
                      </>
                    </MenuDiv>
                  )}
                  </>

            ) : (
                <Avatar
                    sx={{
                        fontWeight: 'bold',
                        fontSize: 13,
                        width: 50,
                        height: 50,
                        margin: 11 / 8 // 1당 8px
                    }}
                    onClick={() => navigate("/login")} />
            )}
        </>
    );
};

// 색상 랜덤하게 바꿔줌
const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        const adjustedValue = Math.max(value, 50); // Minimum threshold (adjust as needed)
        color += `00${adjustedValue.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
};


// 배경색을 바꿔줌
const stringAvatar = (name) => {
    if (!name || typeof name !== 'string') {
        return null
    }

    const initials = name
        .split('')
        .map((char) => char.charCodeAt(0))
        .join('')

    return {
        sx: {
            bgcolor: stringToColor(initials),
            fontWeight: 'bold',
            fontSize: 13,
            width: 50,
            height: 50,
            margin: 11 / 8 // 1당 8px
        },
        children: name,
    };
};


export default AvatarButton;

const MenuDiv = styled.div`
background-color: white;
position: absolute;
top: 50px;
right: 0px;
text-decoration-line: none;
width: 140px;
border-radius: 5px;
box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
`;

const DropDown = styled.li`
display: flex;
justify-content: center;
align-items: center;
flex-direction: row;
font-size: 1.3rem;
text-decoration: none;
list-style: none;
top: 30px;
margin: 10px;
text-decoration-line: none;
align-items: center;
cursor: pointer;