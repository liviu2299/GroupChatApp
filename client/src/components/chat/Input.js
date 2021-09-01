import './Input.css'

export default function Input(props) {
    return (
        <form className="form">
            <input 
                className="input"
                type="text"
                value={props.message}
                placeholder="Send a message..."
                onChange={(event) => props.setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? props.sendMessage(event) : null}/>
        </form>
    )
}
