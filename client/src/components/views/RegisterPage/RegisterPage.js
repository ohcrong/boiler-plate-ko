import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { registerUser } from '../../../_actions/user_action'

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name,setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert('비밀번호를 다시 확인해주세요.')
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }

        dispatch(registerUser(body))
            .then(response => {
                //payload값은 server/index의 json 명칭으로
                if (response.payload.success) {
                    props.history.push('/login')
                } else {
                    alert('failed to sign up:(')
                }
            })
    }
    return (
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center',
            width:'100%', height:'100vh'
        }}>
            <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={onSubmitHandler}>
                <label>email</label>
                <input type= 'email' value={Email} onChange={onEmailHandler} />

                <label>name</label>
                <input type= 'text' value={Name} onChange={onNameHandler} />

                <label>password</label>
                <input type= 'password' value={Password} onChange={onPasswordHandler} />

                <label>confirm password</label>
                <input type= 'password' value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

                <br />
                <button type='submit'> 
                    sign up
                </button>
            </form>
        </div>
    )
}

//export default RegisterPage
export default withRouter(RegisterPage)