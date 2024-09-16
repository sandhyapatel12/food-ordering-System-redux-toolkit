const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")('sk_test_51PxqP9P5gS7us9VDrf0MB7TGZzRD0PsGvnwUtQJeM4uh8tRkFE2NmeIYY86eRx2KSt3UxE9KhyAiAOyhpZ6aQbmg00CgP8Bf61');  //stripe secret key

app.use(express.json());
app.use(cors());

// checkout api
app.post("/create-checkout-session", async (req, res) => {
  try {
    //destructure product from req.body(req.body includes all cart food items)
    const { products } = req.body;
    // console.log(products);
    
   const lineItems = products.map((product) => ({
      price_data: {
        currency: "inr",  //currency type(here use indian rupees)

        //here all product details come from db.json file(where we create fake api)
        product_data: {
          name: product.name,  //food name
          images: [product.img],  //food img
        },
        unit_amount: product.price * 100,  //food price
      },
      quantity: product.qty,  //food qty
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",  //if payment success then redirect at success page
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

app.listen(7000, () => {
  console.log("Server started on port 7000");
});