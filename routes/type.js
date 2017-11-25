const router = require('express').Router();
const Type = require('./../models/Type');

router.get('/:type', (req, res) => {
	Type.findOne({name: req.params.type}).populate('pokemons').then(type => {
		if (!type) return res.status(404).send('Type introuvable, peut-être sensible à la casse?');
		res.render('types/show.html', {type, pokemons: type.pokemons})
	});
});

module.exports = router;
