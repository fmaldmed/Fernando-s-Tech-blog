const router = require("express").Router();
const { Comment, Post, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postdata = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    // Serialize data so the template can read it and reverse order so newest posts show near top
    const posts = postdata.map((post) => post.get({ plain: true })).reverse();
    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
      userName: req.session.userName
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



  router.get('/logout', withAuth, (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    })
  })