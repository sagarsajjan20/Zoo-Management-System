const express = require("express");
const {
  get1,
  getting,
  update,
  posting,
  aggregate,
  del
} = require("../Controllers/controller");
const {protect,authorize}=require('../Controllers/authcontroller')

const router = express.Router();

router.route("/agg").get(aggregate);
router.route("/").get(getting).post(posting);
router.route("/:x").get(protect,get1).patch(update).delete(protect,authorize('admin','lead-guide'),del);


module.exports = router;
