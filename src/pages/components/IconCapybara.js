import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

//Import Globlas & Tools
import Globals from "../../Globals";
import Validator from '../../tool/Validator';
import AxiosRest from '../../tool/AxiosRest';

//Import GameCore
import Player from '../../gamecore/Player';

//Import Images
import capiiBrown from '../assets/images/capii-icon-brown.svg'
import capiiBlue from '../assets/images/capii-icon-blue.svg'
import capiiGreen from '../assets/images/capii-icon-green.svg'
import capiiRed from '../assets/images/capii-icon-red.svg'
import capiiYellow from '../assets/images/capii-icon-yellow.svg'
import capiiPurple from '../assets/images/capii-icon-purple.svg'
import capiiPink from '../assets/images/capii-icon-pink.svg'
import capiiBlack from '../assets/images/capii-icon-black.svg'
import capiiWhite from '../assets/images/capii-icon-white.svg'
import capiiHotdog from '../assets/images/capii-icon-hotdog.svg'


export default class IconCapybara extends Component {

    constructor(props) {
        super(props);
    }

    getImageByPropsTextColor = (text) => {
        switch (text) {
            case "brown":
                return capiiBrown
        
            case "blue":
                return capiiBlue
        
            case "green":
                return capiiGreen
        
            case "red":
                return capiiRed
        
            case "yellow":
                return capiiYellow
        
            case "purple":
                return capiiPurple
        
            case "pink":
                return capiiPink
        
            case "black":
                return capiiBlack
        
            case "white":
                return capiiWhite
        
            case "hotdog":
                return capiiHotdog
                
            default:
                return capiiBrown
        }
    }

    render() {
        return (
            <span>

                <img src={this.getImageByPropsTextColor(this.props.color)}
                    className={this.props.specialClass} alt="capivara icon" />

            </span>
        );
    }
}
