const express = require("express");

const upload = require("../multer");

const router = express.Router();

const Product = require("../models/Product");


// GET PRODUCT BY ID

router.get("/:id", async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    res.json(product);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: error.message || "Server error" });

  }

});


// GET ALL PRODUCTS

router.get("/", async (req, res) => {

  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: error.message || "Server error" });

  }

});


// CREATE PRODUCT

router.post(
  "/",
  upload.array("images", 10),

  async (req, res) => {

    try {

      console.log(req.body);

      console.log(req.files);

      const title = req.body.title;

      const bigCode = req.body.bigCode;

      const kidsCode = req.body.kidsCode;

      const price = Number(req.body.price);

      const discount = Number(req.body.discount);

      const description = req.body.description;

      const category = req.body.category;

      const finalPrice =
        price - (price * discount) / 100;

      let images = [];

      if (req.files && req.files.length > 0) {

        images = req.files.map((file) => {

          return `http://localhost:5000/uploads/${file.filename}`;

        });

      }

      const newProduct = new Product({

        title,

        bigCode,

        kidsCode,

        price,

        discount,

        finalPrice,

        description,

        category,

        images,

      });

      const savedProduct = await newProduct.save();

      res.status(201).json(savedProduct);

    } catch (error) {

      console.log(error);

      res.status(500).json(error);

    }

  }
);


// UPDATE PRODUCT

router.put(
  "/:id",
  upload.array("images", 10),

  async (req, res) => {

    try {

      const title = req.body.title;

      const bigCode = req.body.bigCode;

      const kidsCode = req.body.kidsCode;

      const price = Number(req.body.price);

      const discount = Number(req.body.discount);

      const description = req.body.description;

      const category = req.body.category;

      const finalPrice =
        price - (price * discount) / 100;

      let updateData = {

        title,

        bigCode,

        kidsCode,

        price,

        discount,

        finalPrice,

        description,

        category,

      };

      if (req.files && req.files.length > 0) {

        const images = req.files.map((file) => {

          return `http://localhost:5000/uploads/${file.filename}`;

        });

        updateData.images = images;

      }

      const updatedProduct =
        await Product.findByIdAndUpdate(
          req.params.id,
          updateData,
          { new: true }
        );

      res.json(updatedProduct);

    } catch (error) {

      console.log(error);

      res.status(500).json(error);

    }

  }
);


// DELETE PRODUCT

router.delete("/:id", async (req, res) => {

  try {

    await Product.findByIdAndDelete(req.params.id);

    res.json({

      message: "Product Deleted"

    });

  } catch (error) {

    res.status(500).json(error);

  }

});

// UPDATE PRODUCT

router.put("/:id", async (req, res) => {

  try {

    const updatedProduct =
      await Product.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
        }

      );

    res.json(updatedProduct);

  } catch (error) {

    res.status(500).json(error);

  }

});
module.exports = router;