const express = require('express');
const {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
} = require('../controllers/medicineController');

const router = express.Router();

router.route('/')
  .get(getAllMedicines)
  .post(createMedicine);

router.route('/:id')
  .get(getMedicineById)
  .patch(updateMedicine)
  .delete(deleteMedicine);

module.exports = router;
