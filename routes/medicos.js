// ruta: /routes/medicos

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    ActualizarMedico,
    CrearMedico,
    eliminarMedico,
    getMedicos,
    getMedicoById
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
        validarJWT,
        check('nombre','El nombre del medico es necesario').not().isEmpty(),
        check('hospital','El hospital id debe de ser valido').isMongoId(),
        validarCampos
    ], 
    ActualizarMedico 
);

router.delete( '/:id' , validarJWT ,eliminarMedico );

router.get( '/:id'  ,getMedicoById );



module.exports = router;