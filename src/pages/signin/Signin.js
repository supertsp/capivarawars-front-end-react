import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PlayersList from '../components/PlayersList';

//Import Globlas & Tools
import Globals from "../../Globals";
import Validator from '../../tool/Validator';
import AxiosRest from '../../tool/AxiosRest';
import PushNotification from "../../tool/PushNotification";

//Import GameCore
import Player from '../../gamecore/Player';

//Import Components
import Header from '../components/Header';
import SigninStepNick from './SigninStepNick';
import SigninStepPass from './SigninStepPass';


class Signin extends Component {

    state = {
        player: '',
        formNick: '',
        formPassword: '',
        formNickError: false,
        formPasswordError: false,
        isNickChecked: false,
        isLoginCompleted: false
    }

    constructor(props) {
        super(props);

    }

    //qdo renderizado no início
    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        if (this.state.isLoginCompleted) {
            Globals.setJogadorLogado(this.state.player);

            //criando uma sessão
            sessionStorage.setItem(Globals.getSessionKeyNick(), this.state.player.nick);
            sessionStorage.setItem(Globals.getSessionKeyJogador(), JSON.stringify(this.state.player));

            this.props.history.push('/home');
        }
    }

    componentWillUnmount() {

    }

    onChangeFormNick = (valueFromChildComponent) => {
        //atribuição com this.setState() força um reload
        this.setState({ formNick: valueFromChildComponent });
    }

    onChangeFormPassword = (valueFromChildComponent) => {
        this.setState({ formPassword: valueFromChildComponent });
    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        if (!this.state.isLoginCompleted && !this.state.isNickChecked && !Validator.isStringEmpty(this.state.formNick)) {
            this.searchPlayerByNickOnApi();
        }

        if (!this.state.isLoginCompleted && this.state.isNickChecked && !Validator.isStringEmpty(this.state.formNick) && !Validator.isStringEmpty(this.state.formPassword)) {
            this.checkPlayerCredtentialsOnApi();
        }
    }

    searchPlayerByNickOnApi = async (event) => {
        const response = await AxiosRest.executeGET('playerService', `player/nick/${this.state.formNick}`);

        if (Validator.isAxiosResponseOkAndHasData(response)) {
            //Dar vários SETs ocasiona vários UPDATEs de tela
            //Boa prática dar apenas 1, pois ao mudar de tela
            //a atualização dessa tela não estará em processo de
            //update, fato esse que ocasiona erros no React
            this.setState({
                player: response.data,
                formNickError: false,
                isNickChecked: true
            });
        }
        else {
            this.setState({
                player: '',
                formNickError: true,
                isNickChecked: false
            });
        }
    }

    checkPlayerCredtentialsOnApi = async (event) => {
        const response = await AxiosRest.executePOST('playerService', `/player/check/credentials`, {
            nick: this.state.formNick,
            password: this.state.formPassword
        });

        if (Validator.isAxiosResponseOkAndHasData(response)) {
            this.setState({
                isLoginCompleted: true,
                formPasswordError: false
            });
        }
        else {
            this.setState({
                isLoginCompleted: false,
                formPasswordError: true
            });
        }
    }


    render() {
        return (
            <div>

                <Header />

                <div className="container-area-signin">

                    <div className="capii-silence-hat"></div>

                    <div className="container-bamboo-signin">

                        <div className="container-bamboo-title">
                            <img src={require('../assets/images/borderbambootitle.svg')} alt="título da área de conteúdo" />
                            <span>Sign in</span>
                        </div>

                        <div className="container-bamboo-border">
                            <form onSubmit={this.onSubmitHandler} className="container-bamboo-bg-color text-center padding-bottom-1">

                                {
                                    !this.state.isNickChecked &&
                                    <SigninStepNick parentAction={this.onChangeFormNick} nickErrorStatus={this.state.formNickError} /> ||
                                    <SigninStepPass parentAction={this.onChangeFormPassword} passwordErrorStatus={this.state.formPasswordError} />
                                }

                            </form>
                        </div>
                    </div>

                </div>

            </div >
        );
    }

    debugPartida = () => {
        //Debug Partida
        console.log(`[Signin] Jogador\n>>${this.state.player}<<`);
    }

}

//onClick={(event) => this.searchPlayerOnApi(event)}

//export and allow redirect by "this.props.history"
export default withRouter(Signin);