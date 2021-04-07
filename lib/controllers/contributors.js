const { Router } = require('express');
const Contributor = require('../models/Contributor');

module.exports = Router()
	.post('/', (req, res, next) => {
		Contributor
			.insert(req.body)
			.then(contributor => res.send(contributor))
			.catch(next);
	})