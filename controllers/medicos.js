const { response } = require("express");

const Medico = require('../models/medico');


const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
                    //obtener el nombre del usuario que creo el hospital, y sus otras propiedades
                    .populate('usuario', 'nombre img')
                    .populate('hospital', 'nombre img');
                                
                                

    res.status(200).json({
        ok: true,
        medicos
    })
}

const CrearMedico = async(req, res = response) => {

    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body
    });


    try {

        const medicoDB = await medico.save();
        
        res.status(200).json({
            ok: true,
            medico: medicoDB
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }) 
        
    }
    
}

const ActualizarMedico = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'Actualizar Medico'
    })
}

const eliminarMedico = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'borrar Medico'
    })
}



module.exports = {
    getMedicos,
    CrearMedico,
    ActualizarMedico,
    eliminarMedico
}