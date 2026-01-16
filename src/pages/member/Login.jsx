import React from 'react';
import axios from 'axios';
import '../../css/page.css';

function Login() {
    return (
        <div className='login-container'>
            <h2 className='login-title'>로그인</h2>
            <form className='login-form'>
                <div className='form-group'>
                    <input type='text' id='username' name='username' className='login-input' placeholder='아이디' required />
                </div>
                <div className='form-group'>
                    <input type='password' id='password' name='password' className='login-input' placeholder='비밀번호' required />
                </div>
                <button type='submit' className='login-button'>로그인</button>
                <div className='login-links'>
                    <a href='/member/agreement' className='join-link'>회원가입</a>
                    <a href='/member/find_id' className='find-id-link'>아이디/비밀번호 찾기</a>
                </div>
            </form>
        </div>
    )
}
export default Login;