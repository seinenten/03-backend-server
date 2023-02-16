const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {

    return new Promise( (resolve, reject) => {

        const payload = {
            uid,
        };
    
        jwt.sign( payload, process.env.SEED, {
            expiresIn: '24h'
        },  ( err, token ) => {
    
            if (err) {
                console.log(err);
                reject('No se pudo fenerar el JWT');
            }else {
                resolve( token );
            }
    
        });

    });

}

module.exports = {
    generarJWT,
}