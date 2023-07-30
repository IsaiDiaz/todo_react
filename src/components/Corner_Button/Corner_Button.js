import React from "react";
import styles from "./Corner_Button.module.css";
import PropTypes from 'prop-types';

class Corner_Button extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <button className={styles.corner_button} onClick={this.props.action}>{this.props.text}</button>
            </div>
        );
    }
}

Corner_Button.propTypes = {
    text: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
};

export default Corner_Button;