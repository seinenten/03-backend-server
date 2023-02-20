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

const ActualizarHospital = async(req, res = response) => {

    const id = req.params.id
    //tenemos el uid por que pasamos por la verificacion de jwt
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById( id );

        if( !hospital ){
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por id'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findOneAndUpdate( id, cambiosHospital, { new: true } );



        res.json({
            ok: true,
            hospital: hospitalActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarHospital = async(req, res = response) => {

    const id = req.params.id

    try {

        const hospital = await Hospital.findById( id );

        if( !hospital ){
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por id'
            });
        }

        await Hospital.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
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
    getHospitales,
    CrearHospital,
    ActualizarHospital,
    eliminarHospital
}