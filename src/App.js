import { useEffect } from 'react';

//CSS FILES
import './pages/assets/css/normalize.css';
import './pages/assets/css/geral.css';

//Routes
import RoutesCustom from './RoutesCustom'

//Others
import AxiosRest from './tool/AxiosRest';
import Validator from './tool/Validator';


export default function App() {
    useEffect(() => {
        AxiosRest.addApiConnection(`https://capivarawars-player-service.herokuapp.com/api/v1/playerservice`, 'playerService');
        // AxiosRest.addApiConnection(`http://${window.location.hostname}:8082/api/v1/playerservice`, 'playerService');
        AxiosRest.addApiConnection(`http://${window.location.hostname}:8083/api/v1/capybaraservice`, 'capybaraService');

    });    

    return (
        <RoutesCustom />
    );
}