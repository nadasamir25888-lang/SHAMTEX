const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const cookieParser = require("cookie-parser");

require("dotenv").config();

const path = require("path");

const productRoutes =
  require("./routes/productRoutes");

const shippingRoutes =
  require("./routes/shippingRoutes");

const orderRoutes =
  require("./routes/orderRoutes");

const authRoutes =
  require("./routes/authRoutes");

const app = express();

/* MIDDLEWARE */

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

/* UPLOADS */

app.use(
  "/uploads",

  express.static(
    path.join(
      __dirname,
      "uploads"
    )
  )
);

/* ROUTES */

app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/shipping",
  shippingRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

/* DATABASE */

mongoose
  .connect(
    process.env.MONGO_URI
  )

  .then(() => {

    console.log(
      "MongoDB Connected"
    );

  })

  .catch((err) => {

    console.log(
      "Mongo Error:"
    );

    console.log(err);

  });

/* HOME */

app.get("/", (req, res) => {

  res.send(
    "Sham Tex API Running"
  );

});

/* SERVER */

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server Running On ${PORT}`
  );

});