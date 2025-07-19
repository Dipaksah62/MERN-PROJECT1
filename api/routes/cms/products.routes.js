const { Router } = require("express");
const { Cms } = require("@/controllers");
const { upload } = require("@/library/middlewares");

const router = Router();

router
  .route("/")
  .get(Cms.ProductCtrl.index)
  .post(upload().array("images"), Cms.ProductCtrl.create)

router
  .route("/:id")
  .get(Cms.ProductCtrl.show)
  .put(upload().array("images"), Cms.ProductCtrl.update)
  .patch(upload().array("images"), Cms.ProductCtrl.update)
  .delete(Cms.ProductCtrl.destroy)



  router.delete('/:id/image/:filename',Cms.ProductCtrl.image)





// router.route('/')
//     .get(Cms.ProductCtrl.index)
//     .post(Cms.ProductCtrl.create)

// router.route('/:id')
//     .get(Cms.ProductCtrl.show)
//     .put(Cms.ProductCtrl.update)
//     .patch(Cms.ProductCtrl.update)
//     .delete(Cms.ProductCtrl.destroy)


module.exports = router;
