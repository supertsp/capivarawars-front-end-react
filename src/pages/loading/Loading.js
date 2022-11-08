import React, { Component } from "react";

//Import Globlas & Tools
import Globals from "../../Globals";
import Validator from '../../tool/Validator';
import AxiosRest from '../../tool/AxiosRest';
import withRouter from "../../withRouter";

//Import GameCore
import Player from '../../gamecore/Player';

//Import Components
import Header from '../components/Header';

//Import Images
import imgLoading from '../assets/images/loading.svg'

class Loading extends Component {



    render() {
        return (
            <div>

                <Header />

                <div className="container-area-loading">

                    <img src={imgLoading} className="" alt="loading icon" />

                </div>

            </div>
        );
    }
}

//export and allow redirect by "this.props.history"
export default withRouter(Loading);
