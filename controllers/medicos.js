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

const getMedicoById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const medico = await Medico.findById( id )
                    //obtener el nombre del usuario que creo el hospital, y sus otras propiedades
                    .populate('usuario', 'nombre img')
                    .populate('hospital', 'nombre img');
        
        res.status(200).json({
            ok: true,
            medico
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
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

const ActualizarMedico = async(req, res = response) => {

    const id = req.params.id
    //tenemos el uid por que pasamos por la verificacion de jwt
    const uid = req.uid;

    try {
        const medico = await Medico.findById( id );

        if( !medico ){
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id'
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, { new: true } );

        res.json({
            ok: true,
            medico: medicoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarMedico = async(req, res = response) => {

    const id = req.params.id

    try {
        const medico = await Medico.findById( id );

        if( !medico ){
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id'
            });
        }

        await Medico.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Medico Eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}



module.exports = {
    getMedicos,
    CrearMedico,
    ActualizarMedico,
    eliminarMedico,
    getMedicoById
}