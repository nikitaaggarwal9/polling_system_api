const express = require('express');

const router = express.Router();

const optionsApi = require("../../../controllers/api/v1/options_api");

router.post('/:id/options/create', optionsApi.create);
router.delete('/:id/delete', optionsApi.delete);
router.post('/:id/add_vote', optionsApi.addVote);

module.exports = router;