const ErrorNotification = ({message}) => {

    const boxStyle = {
        fontSize: '40px',
        border: '2px solid black',
        borderRadius: '10px',
        padding: '10px',
        textAlign: 'center',
        display: 'inline'
    }       

    if (message == null) {
        return null;
    }else {
        return (
        <div style={boxStyle}>
            {message}
        </div>
    )
    }
}

export default ErrorNotification;