import React from 'react'


function Messages(props) {

    const { messages, user, typingUsers } = props


    //weird error
    scrollDown() {
        const { container } = this.refs
        container.scrollTop = container.scrollHeight
    }

    useEffect(() => {
        scrollDOwn()
    })





    return (
        <div ref='container'
            className="thread-container">
            <div className="thread">
                {
                    messages.map((mes) => {
                        return (
                            <div
                                key={mes.id}
                                className={`message-container ${mes.sender === user.name && 'right'}`}
                            >
                                <div className="time">{mes.time}</div>
                                <div className="data">
                                    <div className="message">{mes.message}</div>
                                    <div className="name">{mes.sender}</div>
                                </div>
                            </div>

                        )
                    })
                }
                {
                    typingUsers.map((name) => {
                        return (
                            <div key={name} className="typing-user">
                                {`${name} is typing . . .`}
                            </div>
                        )
                    })
                }
            </div>


        </div>
    )
}

export default Messages