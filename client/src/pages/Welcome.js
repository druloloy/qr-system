import PosterImage from '../res/poster-image.svg';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar';

const Welcome = () => (

    <div className="welcome-page">
        <Navbar path="/findmyqr" title="Find my QR"/>
        <div className="main-container">
            <h1>Welcome to QR-Based Attendance System</h1>
            <p>You will need to fill out the form to get your personal QR code</p>
            <Link className="btn btn-green" to="/form">
                continue
            </Link>
        </div>

        <div className="poster">
            <img src={PosterImage} alt="Poster" />
        </div>
    </div>
)

export default Welcome
