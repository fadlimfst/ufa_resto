const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    // Ambil data semua ufa_payment_type
    getDataUfa_payment_type(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM ufa_payment_type;
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data Payment Type',
                    data: results 
                });
            });
            connection.release();
        })
    },
    // Ambil data ufa_payment_type berdasarkan ID
    getDataUfa_payment_typeByID(req,res){
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM ufa_payment_type WHERE payment_type_id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data Payment Type',
                    data: results
                });
            });
            connection.release();
        })
    },
    // Simpan data ufa_payment_type
    addDataUfa_payment_type(req,res){
        let data = {
            payment_type_name : req.body.payment_type_name
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO ufa_payment_type SET ?;
                `
            , [data],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil tambah data Payment Type',
                });
            });
            connection.release();
        })
    },
    // Update data ufa_payment_type
    editDataUfa_payment_type(req,res){
        let dataEdit = {
            payment_type_name : req.body.payment_type_name
        }
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE ufa_payment_type SET ? WHERE payment_type_id = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil edit data Payment Type',
                });
            });
            connection.release();
        })
    },
    // Delete data ufa_payment_type
    deleteDataUfa_payment_type(req,res){
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM ufa_payment_type WHERE payment_type_id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil hapus data Payment Type'
                });
            });
            connection.release();
        })
    }
}