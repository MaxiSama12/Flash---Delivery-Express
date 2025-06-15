import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            <h1>Error 404!</h1>
            <p>Page Not Found</p>
            <p>Lo sentimos, la página que estás buscando no existe.</p>
            <p>Por favor, verifica la URL o vuelve a la página de <Link to="/">Inicio</Link>.</p>   
            <p>Si necesitas ayuda, contacta con el soporte técnico.</p>
            <p>Gracias por tu comprensión.</p>
        </div>
    );
};

export default NotFound;