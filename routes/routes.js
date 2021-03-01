const { Router } = require('express');
const router = Router();


router.get('/botones', async (req, res) => {
    res.render('botones');
  });



module.exports = router;