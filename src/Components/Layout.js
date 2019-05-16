import React from 'react'
import io from 'socket.io-client'
import { USER_CONNECTED, LOGOUT } from '../Events'
import ChatContainer from './chats/ChatContainer'

const socketUrl = "http://localhost:3231"

const Layout = (props) => {

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

        useState([socket]) 
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