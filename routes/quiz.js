const express = require("express");
const router = express.Router();

const questions = [
  {
    question: "Which company created Node.js?",
    options: ["Google", "Microsoft", "Joyent", "Facebook"],
    answer: 2,
  },
  {
    question: "Which command initializes a Node project?",
    options: ["node init", "npm start", "npm init", "node start"],
    answer: 2,
  },
  {
    question: "Which module is used to create a server?",
    options: ["http", "fs", "path", "os"],
    answer: 0,
  },
  {
    question: "Which keyword exports a module?",
    options: ["require", "export", "module.exports", "include"],
    answer: 2,
  },
  {
    question: "Which environment variable defines the port?",
    options: ["PORT", "NODE_PORT", "SERVER_PORT", "APP_PORT"],
    answer: 0,
  },
];

router.get("/", (req, res) => {
  req.session.score = 0;
  req.session.current = 0;
  res.render("index");
});

router.get("/quiz", (req, res) => {
  const current = req.session.current;

  if (current >= questions.length) {
    return res.redirect("/result");
  }

  res.render("quiz", {
    question: questions[current],
    questionNumber: current + 1,
    total: questions.length,
  });
});

router.post("/quiz", (req, res) => {
  const selected = parseInt(req.body.option);
  const current = req.session.current;

  if (selected === questions[current].answer) {
    req.session.score++;
  }

  req.session.current++;
  res.redirect("/quiz");
});

router.get("/result", (req, res) => {
  res.render("result", {
    score: req.session.score,
    total: questions.length,
  });
});

router.post("/restart", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;