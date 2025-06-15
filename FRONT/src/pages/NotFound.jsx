import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import '../styles/NotFound.css';
import notfound from '../assets/notFound/notfound.png';

const NotFound = () => {
    return (
        <div>
            <Navbar />
            <main className="not-found-content">
                <div className="content-wrapper">
                    <img src={notfound} alt="Error 404" className="not-found-image" />
                    <div className="text-content">
                        <h1>Error 404!</h1>
                        <p>Page Not Found</p>
                        <p>Lo sentimos, la página que estás buscando no existe.</p>
                        <p>Por favor, verifica la URL o vuelve a la página de <Link to="/">Inicio</Link>.</p>
                        <p>Si necesitas ayuda, contacta con el soporte técnico.</p>
                        <p>Gracias por tu comprensión.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default NotFound;