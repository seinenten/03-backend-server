// ruta: /routes/medicos

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    ActualizarMedico,
    CrearMedico,
    eliminarMedico,
    getMedicos
} = require('../controllers/medicos')

const router = Router();


router.get( '/'  ,getMedicos );

router.post( '/', 
    [  
        validarJWT,
        check('nombre', 'el nombre del medico es necesario').not().isEmpty(),
        check('hospital','El hospital id debe de ser valido').isMongoId(),
        validarCampos
    ],
    CrearMedico
);

router.put( '/:id', 
    [

    ], 
    ActualizarMedico 
);

router.delete( '/:id' , eliminarMedico );



module.exports = router;