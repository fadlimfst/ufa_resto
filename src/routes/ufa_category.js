const router = require('express').Router();
const { ufa_category } = require('../controllers');

// GET localhost:8080/ufa_category => Ambil data semua ufa_category
router.get('/ufa_category', ufa_category.getDataUfa_category);

// GET localhost:8080/ufa_category/2 => Ambil data semua ufa_category berdasarkan id = 2
router.get('/ufa_category/:id', ufa_category.getDataUfa_categoryByID);

// POST localhost:8080/ufa_category/add => Tambah data ufa_category ke database
router.post('/ufa_category/add', ufa_category.addDataUfa_category);

// POST localhost:8080/ufa_category/2 => Edit data ufa_category
router.post('/ufa_category/edit', ufa_category.editDataUfa_category);

// POST localhost:8080/ufa_category/delete => Delete data ufa_category
router.post('/ufa_category/delete/', ufa_category.deleteDataUfa_category);

module.exports = router;