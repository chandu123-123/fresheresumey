const { Schema, model, default: mongoose } = require("mongoose");


const userloginschema = new Schema(
  { username: {type:String,required:true,},
    email: {type:String,required:true,},
    password: {type:String,required:true,},
    paid:{type:Boolean,default:false}

  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);
const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
});

// export const Payment = mongoose.model("Payment", paymentSchema);

export const userpayment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema)
export const userlogin =
  mongoose.models.User || new mongoose.model("User", userloginschema);

