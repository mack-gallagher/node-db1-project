const { getAll, getById } = require('./accounts-model');

exports.checkAccountPayload = (req, res, next) => {
  
  if (!req.body.hasOwnProperty('name') || !req.body.hasOwnProperty('budget')) {
    res.status(400).json({ message: 'name and budget are required' });
    return;
  } else if (req.body.name.trim().length < 3 || req.body.name.trim().length > 100) {
    res.status(400).json({ message: 'name of account must be between 3 and 100' });
    return;
  } else if (!req.body.budget || req.body.budget+0 != req.body.budget) {
    res.status(400).json({ message: 'budget must be a number' });
    return;
  } else if (req.body.budget < 0 || req.body.budget > 1000000) {
    res.status(400).json({ message: 'budget of account is too large or too small' });
    return;
  }

  req.body.name = req.body.name.trim();
  next();
}

exports.checkAccountNameUnique = (req, res, next) => {
  getAll()
    .then(results => {
      if (results.filter(x => x.name === req.body.name.trim()).length > 0) {
        res.status(400).json({ message: 'that name is taken' });
        return;
      }

      next();
    })
}

exports.checkAccountId = (req, res, next) => {
  getById(req.params.id)
    .then(result => {
      if (!result) {
        res.status(404).json({ message: 'account not found' });
        return;
      }

      next();
    })
}
