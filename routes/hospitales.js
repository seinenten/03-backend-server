// ruta: /routes/hospitales

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getHospitales,
    CrearHospital,
    ActualizarHospital,
    eliminarHospital
} = require('../controllers/hospitales')

const router = Router();


router.get( '/'  ,getHospitales );

router.post( '/', 
    [  
        validarJWT,
        check('nombre', 'el nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    CrearHospital
);

router.put( '/:id', 
    [

    ], 
    ActualizarHospital 
);

router.delete( '/:id' , eliminarHospital );



module.exports = router;