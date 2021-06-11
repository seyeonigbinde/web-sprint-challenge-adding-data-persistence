const express = require('express');
const helpers = require('./model');

const router = express.Router();

router.get('/resources', (req, res, next) => {
  helpers.getResources()
    .then(resources => {
      res.status(200).json(resources);
    })
    .catch(next); 
});

router.post('/resources', (req, res, next) => { 
  helpers.createResource(req.body)
    .then(resource => {
      res.status(201).json(resource);
    })
    .catch(next);
});


module.exports = router;
