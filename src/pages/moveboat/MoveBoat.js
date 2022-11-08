import React, { Component } from 'react';

//Import Globlas & Tools
import Globals from "../../Globals";
import Validator from '../../tool/Validator';
import AxiosRest from '../../tool/AxiosRest';
import PushNotification from "../../tool/PushNotification";
import withRouter from "../../withRouter";

//Import GameCore
import Player from '../../gamecore/Player';

//Import Pages
import Header from '../components/Header';

//Import Images
import borderBambooTitle from '../assets/images/borderbambootitle.svg'
import userIconYoshi from '../assets/images/user-yoshi-icon.svg'
import userIconMale from '../assets/images/user-male-icon.svg'
import userIconFemale from '../assets/images/user-female-icon.svg'
import userIconEnemy from '../assets/images/user-enemy-icon.svg'

class MoveBoat extends Component {

    state = {
        contPedacoCanoa: -1,
        contParteRio: -1,
        posicaoEscolhida: 0
    }

    constructor(props) {
        super(props);

        this.persistirLogin();

        if (Globals.hasJogadorLogado() && Globals.isIniciouPartida()) {
            // this.props.history.push('/');

        }
        else {
            this.state.jogadorLogado = Globals.getJogadorLogado();
        }

        this.setState.posicaoEscolhida = Globals.getJogadorLogado().getBoatPositionOnRiver();
    }

    componentDidMount() {
        this.setState({ posicaoEscolhida: Globals.getJogadorLogado().getBoatPositionOnRiver() });
        console.log(`${Globals.getPartida()}\n`);
    }

    persistirLogin = () => {
        if (!Globals.hasJogadorLogado()
            && !Validator.isUndefined(sessionStorage.getItem(Globals.getSessionKeyJogador()))) {

            Globals.setJogadorLogadoFromSession();
            this.state.jogadorLogado = Globals.getJogadorLogado();
        }

        if (!Globals.hasPartidaAtiva()) {
            Globals.setPartidaFromSession();
        }

        // this.debugPartida();
    }

    onSubmitHandler = async (event) => {
        event.preventDefault();
    }

    onClickMove = () => {
        Globals.moverCanoaDoJogadorAtual(this.state.posicaoEscolhida);
        // Globals.moverCanoaDoJogadorAtual(1);
        Globals.moverCanoaDoJogadorAtual(parseInt(Math.random() * 10));
        this.props.history.push('/moveaim');
    }

    onChangeRadio = (event) => {
        const posicaoInt = parseInt(event.target.value);

        Globals.getJogadorLogado().moveBoat(posicaoInt);
        this.setState({ posicaoEscolhida: posicaoInt });
    }

    getCheckedValue = (indexOfRiver) => {
        if (indexOfRiver >= Globals.getJogadorLogado().getBoatPositionOnRiver() &&
            indexOfRiver <
            (Globals.getJogadorLogado().getBoatPositionOnRiver() +
                Globals.getJogadorLogado().getBoatLength())) {

            return true;

        }

        return false;
    }

    onClickMinusButton = () => {
        let posicaoTemp = this.state.posicaoEscolhida;
        posicaoTemp--;
        posicaoTemp = posicaoTemp < 0 ? 0 : posicaoTemp;
        Globals.getJogadorLogado().moveBoat(posicaoTemp);
        this.setState({ posicaoEscolhida: posicaoTemp });
    }

    onClickPlusButton = () => {
        let posicaoTemp = this.state.posicaoEscolhida;
        posicaoTemp++;

        posicaoTemp =
            posicaoTemp <=
                (Globals.getJogadorLogado().getRiverLength() -
                    Globals.getJogadorLogado().getBoatLength()) ?
                posicaoTemp :
                (Globals.getJogadorLogado().getRiverLength() -
                    Globals.getJogadorLogado().getBoatLength())
            ;

        Globals.getJogadorLogado().moveBoat(posicaoTemp);
        this.setState({ posicaoEscolhida: posicaoTemp });
    }

    getCurrentPlayerIconByGender = (textGender) => {
        switch (textGender) {
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
        return (
            <div>

                <Header isLoginOk="true" userNick={Globals.getJogadorLogado().getNick()} userType={Globals.getJogadorLogado().getGender()} />

                <div className="container-area-moveboat">

                    <div className="container-bamboo-title">
                        <img src={borderBambooTitle} alt="título da área de conteúdo" />
                        <span>Move</span>
                    </div>

                    <div className="container-bamboo-border">
                        <form onSubmit={this.onSubmitHandler} className="container-bamboo-bg-color text-center padding-bottom-1">

                            <p>Choose a new position for your boat! <br />
                                Come on! Move! Move! Move!!!</p>

                            <div className="boat-area">

                                <input onClick={this.onClickMinusButton} type="button" className="form-button-back" value="-" />

                                <span className="boat-area-all-pieces">
                                    {
                                        Globals.getJogadorLogado().getRiverParts().map(
                                            (parte) =>
                                                this.getCheckedValue(this.getKeyParteAtual()) === true &&

                                                <label key={this.getKeyPedacoAtual()} className="boat-area-piece">
                                                    <input
                                                        onChange={this.onChangeRadio}
                                                        type="checkbox"
                                                        name="chosenMovement"
                                                        value={this.state.contParteRio}
                                                        checked />

                                                    <span className="boat-area-piece-box"></span>
                                                </label>

                                                ||

                                                <label key={this.getKeyPedacoAtual()} className="boat-area-piece">
                                                    <input
                                                        onChange={this.onChangeRadio}
                                                        type="checkbox"
                                                        name="chosenMovement"
                                                        value={this.state.contParteRio} />

                                                    <span className="boat-area-piece-box"></span>
                                                </label>
                                        )
                                    }
                                </span>

                                <input onClick={this.onClickPlusButton} type="button" className="form-button-back" value="+" />
                            </div>

                            <div className="statistics-area">

                                <div className="current-player-icon">
                                    <img src={this.getCurrentPlayerIconByGender(Globals.getJogadorLogado().getGender())} alt="user foto" />
                                </div>

                                <div className="current-area-boat">
                                    <div className="statistics-area-title">Your Boat Status</div>
                                    <span className="current-boat-size">
                                        {
                                            Globals.getJogadorLogado().getBoatPieces().map(
                                                (pedaco) =>
                                                    <span key={this.getKeyPedacoAtual()} className="current-boat-size-piece"></span>
                                            )
                                        }
                                    </span>
                                    <span className="current-boat-size-number">
                                        {Globals.getJogadorLogado().getBoatLength()}
                                    </span>
                                </div>
                            </div>

                            <div className="confirmation-area">

                                <button onClick={this.onClickMove} className="form-button" type="submit">Move!</button>

                            </div>


                        </form>
                    </div>

                </div>

            </div>
        );
    }

    debugPartida = () => {
        // console.log(`[MoveBoat] JogadorLogado\n>>${Globals.getJogadorLogado().getNick()}<<`);
        console.log(`[MoveBoat] JogadorLogado\n>>${Globals.getJogadorLogado()}<<`);
        // console.log(`[MoveBoat] JogadorLogado (json)\n>>${JSON.stringify(Globals.getJogadorLogado())}<<`);
        console.log(`[MoveBoat] Partida\n>>${Globals.getPartida()}<<`);

        // if (!Validator.isUndefined(Globals.getJogadorAtualNaPartida())) {
        console.log(`[MoveBoat] JogadorAtual\n>>${Globals.getJogadorAtualNaPartida()}<<`);
        // }
        // if (!Validator.isUndefined(Globals.getJogadorAtualNaPartida(Globals.getJogadorInimigo(0)))) {
        console.log(`[MoveBoat] JogadorInimigo\n>>${Globals.getJogadorInimigo(0)}<<`);
        // }
    }

    getKeyPedacoAtual = () => {
        let num = this.state.contPedacoCanoa;
        num++;
        this.state.contPedacoCanoa = num;
        return num;
    }

    getKeyParteAtual = () => {
        let num = this.state.contParteRio;
        num++;
        num = num % Globals.getJogadorLogado().getRiverLength();
        this.state.contParteRio = num;
        return num;
    }

}

//export and allow redirect by "this.props.history"
export default withRouter(MoveBoat);