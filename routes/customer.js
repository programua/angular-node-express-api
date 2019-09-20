var express = require("express");
var router = express.Router();
var CustomerService = require("../services/service.customer");

// routes
router.get('/', async function(req, res, next) {
  res.json({ error: "Invalid Customer UID." });
});

router.post('/', async (req, res, next) => {
  const body = req.body;

  try {
    if (body.guid != null) {
      CustomerService.guid = body.guid;
    }
    res.cookie('guid', customer.guid, { maxAge: 900000, httpOnly: true });
    return res.status(201).json({ customer: customer });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    return next(err);
  }
});

router.get(":/id", async (req, res, next) => {
  try {
    const customer = await CustomerService.retrieve(req.params.id);
    return res.json({ customer: customer });
  } catch(err) {
    return next(err);
  }
});

router.put(':/id', async (req, res, next) => {
  try {
    const customer = await CustomerService.update(req.params.id, req.body);
    return res.json({ customer: customer });
  } catch(err) {
    return next(err);
  } 
});

router.delete('/:id', async (req, res, next) => {
  try {
    const customer = await CustomerService.delete(req.params.id);
    return res.json({  success: true  })
  } catch (err) {
    return next(err);
  }
});

module.exports = router;