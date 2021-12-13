import PropTypes from "prop-types"

const Button = ({ color, text, onClick}) => {
    return(
        <button 
        className="btn"
         onClick={onClick} 
         style={{background:color}}>{text}</button>
    )
}

Button.defaultProps = {//is normal Prop.
    color: "steelBlue"
}

Button.propTypes = {//text and color are string but onclick is an event function.
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}
export default Button