import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { USER_CONNECTED, LOGOUT } from '../Events'
import ChatContainer from './chats/ChatContainer'

const socketUrl = "http://localhost:3231"

function Layout(props) {

    const [user, setUser] = useState(null)
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        initSocket()
    })

    initSocket = () => {

        const socket = io(socketUrl)

        socket.on('connect', () => {
            console.log("Connected")
        })
        useState([setSocket]) 

    }

    setUser = (user) => {
       socket.emit(USER_CONNECTED, user)
       useState([setUser]) 
    }

    logout = () => {
        socket.emit(LOGOUT)
        useState([setUser = null])
    }

    return (
        <div className="container">
				{
					!user ?	
					<LoginForm socket={socket} setUser={this.setUser} />
					:
					<ChatContainer socket={socket} user={user} logout={this.logout}/>
				}
			</div>
    )
}

export default Layout