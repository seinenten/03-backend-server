const { response } = require("express");

const Hospital = require('../models/hospital');


const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find()
                                //obtener el nombre del usuario que creo el hospital, y sus otras propiedades
                                .populate('usuario', 'nombre img');

    res.status(200).json({
        ok: true,
        hospitales
    });
}

const CrearHospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    } );

    try {

        const hospitalDB = await hospital.save();
        
        res.status(200).json({
            ok: true,
            hospital: hospitalDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

const ActualizarHospital = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'Actualizar Hospital'
    });
}

const eliminarHospital = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'borrar Hospital'
    });
}



module.exports = {
    getHospitales,
    CrearHospital,
    ActualizarHospital,
    eliminarHospital
}