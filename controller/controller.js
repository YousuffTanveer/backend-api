const {
  selectCategories,
  selectReviewById,
  selectUsers,
  updateReviewById,
} = require("../models/models");

/*exports.getCategories = (req, res) => {
  selectCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch((err) => {
      console.log(err);
    });
};
*/

exports.getCategories = (req, res, next) => {
  selectCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch(next);
};

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;

  selectReviewById(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.patchReviewById = (req, res, next) => {
  const { review_id } = req.params;
  const { votes } = req.body;
  updateReviewById(review_id, votes)
    .then((updatedReview) => {
      res.status(200).send({ updatedReview });
    })
    .catch(next);
};
