const express = require("express");
const router = express.Router();


const drinks = require ("../data/drinks")



router
.route("/")
.get((req,res)=>{
    res.json(drinks);
})
.post((req, res) => {
    if (req.body.name && req.body.price && req.body.description) {
      if (drinks.find((d) => d.name == req.body.name)) {
        res.json({ error: "already exist" });
        return;
      }

      const drink = {
        id: drinks[drinks.length - 1].id + 1,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      };

      drinks.push(drink);
      res.json(drinks[drinks.length - 1]);
    } else res.json({ error: "Insufficient Data" });
  });

  router
  .route("/:id")
  .get((req, res, next) => {
    const drink = drinks.find((d) => d.id == req.params.id);
    if (drinks) res.json(drink);
    else next();
  })
  .patch((req, res, next) => {
    const drink = drinks.find((d, i) => {
      if (d.id == req.params.id) {
        for (const key in req.body) {
            drinks[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (drink) res.json(drink);
    else next();
  })
  .delete((req, res, next) => {
    const drink = drinks.find((d, i) => {
      if (d.id == req.params.id) {
        drinks.splice(i, 1);
        return true;
      }
      
    });

    if (drink) res.json(drink);
    else next();
  });




module.exports = router;



module.exports = router;