const express = require("express");
const Post = require("../models/post");

const router = express.Router();

router.post("", (req, res, next) => {
  const post = new Post(req.body);
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});

router.get('', (req, res, next) => {
  Post.find().then(documents => {
    return res.status(200).json({
      message: "posts fetched successfully",
      data: documents
    });
  });
});

router.delete('/:post_id', (req, res, next) => {
  //console.log(req.params.post_id);
  Post.deleteOne({
    _id: req.params.post_id
  }).then(result => {
    //console.log(result)
    res.status(200).json({
      message: "Post deleted!"
    });
  });
});

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({
    _id: req.params.id
  }, post).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Update successful!"
    });
  });
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "Post not found"
      })
    }
  });
});

module.exports = router;