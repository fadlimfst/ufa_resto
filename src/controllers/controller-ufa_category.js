const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    // Ambil data semua ufa_category
    getDataUfa_category(req,res){
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM ufa_category;
                `
            , function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data Category',
                    data: results 
                });
            });
            connection.release();
        })
    },
    // Ambil data ufa_category berdasarkan ID
    getDataUfa_categoryByID(req,res){
        let id = req.params.id;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM ufa_category WHERE category_id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil ambil data Category',
                    data: results
                });
            });
            connection.release();
        })
    },
    // Simpan data ufa_category
    addDataUfa_category(req,res){
        let data = {
            category_name : req.body.category_name,
            is_active : req.body.is_active
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO ufa_category SET ?;
                `
            , [data],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil tambah data Category',
                });
            });
            connection.release();
        })
    },
    // Update data ufa_category
    editDataUfa_category(req,res){
        let dataEdit = {
            category_name : req.body.category_name,
            is_active : req.body.is_active
        }
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE ufa_category SET ? WHERE category_id = ?;
                `
            , [dataEdit, id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil edit data Category',
                });
            });
            connection.release();
        })
    },
    // Delete data ufa_category
    deleteDataUfa_category(req,res){
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM ufa_category WHERE category_id = ?;
                `
            , [id],
            function (error, results) {
                if(error) throw error;  
                res.send({ 
                    success: true, 
                    message: 'Berhasil hapus data Category'
                });
            });
            connection.release();
        })
    }
}