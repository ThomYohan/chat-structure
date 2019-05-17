import React, { useState, useRef, useEffect } from 'react'
import SideBar from './SIdeBar'
import { COMMUNITY_CHAT, MESSAGE_SENT, MESSAGE_RECEIVED, TYPING } from '../../Events'
import ChatHeading from './ChatHeading'
import Messages from '../messages/Messages'
import MessageInput from '../Messages/MessageInput'
import { SSL_OP_MSIE_SSLV2_RSA_PADDING } from 'constants';


function ChatContainer(props) {

    const { user, logout } = props
    const [activeChats, activeChat] = useState({activeChats})

    const [chats, setChats] = useState([])

    useEffect(() => {
        // const { socket } = props
        props.socket.emit(COMMUNITY_CHAT, this.resetChat)
    })

    resetChat = (chat) => {
        return this.addChat(chat, true)
    }

    addChat = (chat, reset) => {
        // const { socket } = this.props
        // const { chats } = useState([])

        const newChats = reset ? [chat] : [...chats, chat]
        setChats({ chats: newChats, activeChat: reset ? chat : useState(activeChat) })

        const messageEvent = `${MESSAGE_RECEIVED}-${chat.id}`
        const typingEvent = `${TYPING}-${chat.id}`

        props.socket.on(typingEvent, updateTypingInChat(chat.id))
        props.socket.on(messageEvent, addMessageToChat(chat.id))
    }

    addMessageToChat = (chatId) => {
        return message => {
            // const { chats}
            let newChats = chats.map((chat) => {
                if (chat.id === chatId)
                    chat.messages.push(message)
                return chat
            })

            useState({ chats: newChats })
        }
    }

    updateTypingInChat = (chatId) => {
        return ({ isTyping, user }) => {
            if (user !== props.user.name) {

                let newChats = chats.map((chat) => {
                    if (chat.id === chatID) {
                        if (isTyping && !chat.typingUsers.includes(user)) {
                            chat.typingUsers.push(user)
                        } else if (!isTyping && chat.typingUsers.includes(user)) {
                            chat.typingUsers = chat.typingUsers.filter(u => u !== user)
                        }
                    }
                    return chat
                })
                useState({chat:newChats})
            }
        }
    }


    sendMessage = (chatId, message) => {
        props.socket.emit(MESSAGE_SENT, {chatId, message} )
    }

    sendTyping = (chatId, isTyping) => {
        props.socket.emit(TYPING, {chatId, isTyping})
    }

    setActiveChat = (activeChat) => {
        useState({activeChat})
    }


    return (
        <>
        <SideBar
            logout={logout}
            chats={chats}
            user={user}
            activeChat={activeChat}
            setActiveChat={setActiveChat}
        />
        <>
        {
            activeChat !== null ? (

                <div>
                    <ChatHeading name={activeChat.name} />
                    <Messages 
                        messages={activeChat.messages}
                        user={user}
                        typingUser={activeChat.typingUser}
                    />
                    <MessageInput
                        sendMessage={
                            (message)=>{
                                sendMessage(activeChat.id, message)
                            }
                        }
                        sendTyping={
                            (isTyping)=>{
                                sendTyping(activeChat.id, isTyping)
                            }
                        }
                    />
                </div>
            ) : 
            <div>
                <h3>Choose a chat!</h3>
            </div>
        }
        </>
        </>
    )
}

export default ChatContainer