import "./form";
import './submit';

import Logo from '../images/logo.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.png';
import Logo1 from '../images/logo1.jpg';
import { initDb } from './database';

window.addEventListener('load', function() {
    initDb();
    document.getElementById('logo').src = Logo1;
    document.getElementById('bearThumbnail').src = Bear;
    document.getElementById('dogThumbnail').src = Dog;

});

import "../css/index.css";

import { Tooltip, Toast, Popover} from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';