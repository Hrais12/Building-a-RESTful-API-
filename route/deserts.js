const express = require("express");
const router = express.Router();

const deserts = require("../data/deserts");




router
.route("/")
.get((req,res)=>{
    res.json(deserts);
})
.post((req, res) => {
    if (req.body.name && req.body.price && req.body.description) {
      if (deserts.find((u) => u.name == req.body.name)) {
        res.json({ error: "already exist" });
        return;
      }

      const desert = {
        id: deserts[deserts.length - 1].id + 1,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      };

      deserts.push(desert);
      res.json(deserts[deserts.length - 1]);
    } else res.json({ error: "Insufficient Data" });
  });

  router
  .route("/:id")
  .get((req, res, next) => {
    const desert = deserts.find((u) => u.id == req.params.id);
    if (desert) res.json(desert);
    else next();
  })
  .patch((req, res, next) => {
    const desert = deserts.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          deserts[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (desert) res.json(desert);
    else next();
  })
  .delete((req, res, next) => {
    const desert = deserts.find((u, i) => {
      if (u.id == req.params.id) {
        deserts.splice(i, 1);
        return true;
      }
      
    });

    if (desert) res.json(desert);
    else next();
  });




module.exports = router;