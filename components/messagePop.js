const MessagePop = ({ setMessage, message }) => {

    return (
        <div className="error-container">
            <div className="error-details-container">
                <p className="error-close" onClick={() => setMessage(false)}>X</p>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default MessagePop;