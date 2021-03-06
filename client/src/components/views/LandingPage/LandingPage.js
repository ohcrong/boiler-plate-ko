import React, {useEffect} from 'react'
import axios from 'axios'


function LandingPage(props) {

    useEffect(() => {
        axios.get('/api.hello')
        .then(response => console.log(response.data))
    }, [])

    const onClickHandler = () => {
        axios.get(`/api/users/logout`)
        .then(response=> {
            if (response.data.success) {
                props.history.push('/login')
            } else {
                alert('failed to log out:(')
            }
        })
    }

    return (
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center',
            width:'100%', height:'100vh'
        }}>
            LandingPage

            <br />

            <button onClick={onClickHandler}>
                log out
            </button>
        </div>
    )
}

export default LandingPage
