import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)
// console.log("Secret_Key:",process.env.STRIPE_SECRET_KEY);
// console.log("URL:", process.env.FRONTEND_URL);

export const payment = async(req, res) => {
// console.log(req.body);
// res.send({message: "Payment gateway...", success: true})
 try{
      const params = {
          submit_type : 'pay',
          mode : "payment",
          payment_method_types : ['card'],
          billing_address_collection : "auto",
          shipping_options : [{shipping_rate : "shr_1PtBdz04KMpMkoEQ6JjZhPOd"}],

          line_items : req.body.map((item)=>{
            return{
              price_data : {
                currency : "inr",
                product_data : {
                  name : item.name,
                //   images : [item.image]
                },
                unit_amount : item.price * 100,
              },
              adjustable_quantity : {
                enabled : true,
                minimum : 1,
              },
              quantity : item.qty
            }
          }),

          success_url : `${process.env.FRONTEND_URL}/success`,
          cancel_url : `${process.env.FRONTEND_URL}/cancel`,
      }
 
      const session = await stripe.checkout.sessions.create(params)
      console.log("session:", session);
      res.status(200).json(session.id)
     }
     catch (err){
        res.status(err.statusCode || 500).json(err.message)
     }
}