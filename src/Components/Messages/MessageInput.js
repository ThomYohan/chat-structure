import React from 'react'

function MessageInput(props) {

    const [message, setMessage] = useState()

    const [isTyping, setIsTyping] = useState(false)

    handleSubmit = (e) => {
        e.preventDefault()
        sendMessage()
        useState([message = ""])
    }

    sendMessage = () => {
        props.sendMessage(setMessage)
    }

    useEffect(() => {
        stopCheckingTyping()
    }, [])

    sendTyping = () => {
        lastUpdateTime = Date.now()
        if(!setIsTyping) {
            setIsTyping(isTyping = true)
            props.sendTyping(true)
            startCheckingTyping()
        }
    }

    startCheckingTyping = () => {
        typingInterval = setInterval(() => {
            if((Date.now() - lastUpdateTime) > 300) {
                setIsTyping(isTyping = false)
                stopCheckingTyping()
            }
        })
    }

    stopCheckingTyping = () => {
        if(typingInterval) {
            clearInterval(typingInterval)
            props.sendTyping(false)
        }
    }
}

// export defualt MessageInput