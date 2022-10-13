function handleInternalErrors(err, req, res, next) {
  res.status(500).send({ msg: "server error" });
}

function handleCustomErrors(err, req, res, next) {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
}

module.exports = { handleInternalErrors, handleCustomErrors };
