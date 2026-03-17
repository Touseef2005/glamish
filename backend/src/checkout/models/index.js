import mongoose from "mongoose";

const productInfoSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Product ID is required'],
        ref: 'products' // Assuming you have a Product model
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        maxlength: [100, 'Product name must be less than 100 characters']
    }
}, { _id: false });

const orderSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        maxlength: [50, 'First name must be less than 50 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
        maxlength: [50, 'Last name must be less than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Please enter a valid email address'
        }
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function (v) {
                return /^[0-9]{10,15}$/.test(v);
            },
            message: 'Please enter a valid phone number (10-15 digits)'
        }
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
        maxlength: [200, 'Address must be less than 200 characters']
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
        maxlength: [50, 'City name must be less than 50 characters']
    },
    postalCode: {
        type: String,
        required: [true, 'Postal Code is required'],
        validate: {
            validator: function (v) {
                return /^[0-9]{5}$/.test(v);
            },
            message: 'Please enter a valid postal code (5 digits)'
        }
    },
    total: {
        type: Number,
        required: [true, 'Total amount is required'],
        min: [0, 'Total amount cannot be negative']
    },
    productInfo: {
        type: [productInfoSchema],
        required: [true, 'Product information is required'],
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'At least one product must be included'
        }
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment method is required'],
        enum: {
            values: ['cod', 'easypaisa', 'card'],
            message: 'Please select a valid payment method (cod, easypaisa, or card)'
        }
    },
}, {
    timestamps: true
});


const Order = mongoose.model('Order', orderSchema);

export default Order;