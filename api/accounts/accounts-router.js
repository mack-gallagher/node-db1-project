const router = require('express').Router();

const { getAll, 
        getById, 
        create, 
        updateById, 
        deleteById } = require('./accounts-model');

const { checkAccountPayload, 
        checkAccountNameUnique, 
        checkAccountId } = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  getAll()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      next(err);
    })
})

router.get('/:id', checkAccountId, (req, res, next) => {
  getById(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      next(err);
    })
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  create(req.body)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      next(err);
    })
})

router.put('/:id', checkAccountPayload, checkAccountId, (req, res, next) => {
  updateById(req.params.id, req.body)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      next(err);
    })
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  deleteById(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      next(err);
    })
})

router.use((err, req, res, next) => { // eslint-disable-line
  console.error(err);

  res.status(500).json({ message: 'internal server error' });
})

module.exports = router;
