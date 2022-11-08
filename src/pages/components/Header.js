import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

//Import Globlas & Tools
import Globals from "../../Globals";
import Validator from '../../tool/Validator';
import AxiosRest from '../../tool/AxiosRest';

//Import GameCore
import Player from '../../gamecore/Player';

//Import Images
import capivaralogo from '../assets/images/capivaralogo.svg'
import userIconYoshi from '../assets/images/user-yoshi-icon.svg'
import userIconMale from '../assets/images/user-male-icon.svg'
import userIconFemale from '../assets/images/user-female-icon.svg'
import userIconEnemy from '../assets/images/user-enemy-icon.svg'


export default class Header extends Component {

    constructor(props) {
        super(props);
    }

    getUserIconByPropsUserType = (userTypeText) => {
        userTypeText = this.props.userNick === 'tiago' ? 'Y' : userTypeText;
        
        switch (userTypeText) {
            case "Y":
                return userIconYoshi

            case "M":
                return userIconMale

            case "F":
                return userIconFemale
          
            default:
                return userIconEnemy
        }
    }

    render() {

        // Globals.criarPartida();

        return (
            <div>
                <div id="logo-inicial">
                    <img src={capivaralogo} alt="logo capivara wars" />
                </div>

                {
                    this.props.isLoginOk &&
                    <div className="user-area">
                        <div className="user-area-nick">
                            {this.props.userNick}
                        </div>
                        <div>
                            <img src={this.getUserIconByPropsUserType(this.props.userType)} alt="user foto" />
                        </div>
                        <div>
                            <Link to="/">
                                <button className="form-button">logout</button>
                            </Link>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
