import PropTypes from "prop-types"
import Button from "./Button"

const Header = ({title, onAdd, showAdd}) => {
    return(
        <header className="header">
            <h1>{title}</h1>
            <Button color={showAdd ? "red":"green"} text={showAdd ? "Close":"Add"} onClick={onAdd}/>
        </header>
    )
}

//this is if there's nothing else to display
Header.defaultProps = {
    title: "Task Tracker",
}

//what we want to actually display
Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header

//way of referencing colour in Javascript to JSX
// const HeadingStyle = {
//  color: "red", 
//  backgroundColor:"black"
// }
