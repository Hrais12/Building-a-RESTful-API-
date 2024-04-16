const express = require("express");
const router = express.Router();

const foods =  require ("../data/food")


router
.route("/")
.get((req,res)=>{
    res.json(foods);
})
.post((req, res) => {
    if (req.body.name && req.body.price && req.body.description) {
      if (foods.find((f) => f.name == req.body.name)) {
        res.json({ error: "already exist" });
        return;
      }

      const food = {
        id: foods[foods.length - 1].id + 1,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      };

      foods.push(food);
      res.json(foods[foods.length - 1]);
    } else res.json({ error: "Insufficient Data" });
  });

  router
  .route("/:id")
  .get((req, res, next) => {
    const food = foods.find((f) => f.id == req.params.id);
    if (food) res.json(food);
    else next();
  })
  .patch((req, res, next) => {
    const food = foods.find((f, i) => {
      if (f.id == req.params.id) {
        for (const key in req.body) {
            foods[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (food) res.json(food);
    else next();
  })
  .delete((req, res, next) => {
    const food = foods.find((f, i) => {
      if (f.id == req.params.id) {
        foods.splice(i, 1);
        return true;
      }
      
    });

    if (food) res.json(food);
    else next();
  });






module.exports = router;