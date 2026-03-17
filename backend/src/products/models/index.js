import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Product name is required"],
            trim: true,
            minlength: [3, "Product name must be at least 3 characters"],
            maxlength: [100, "Product name must be less than 100 characters"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            minlength: [10, "Description must be at least 10 characters"],
            maxlength: [2000, "Description must be less than 2000 characters"],
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true,
        },
        brand: {
            type: String,
            trim: true,
            maxlength: [50, "Brand name must be less than 50 characters"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price cannot be negative"],
        },
        productPrice: {
            type: Number,
            required: true,
            min: [0, "Product price cannot be negative"],
            validate: {
                validator: function (value) {
                    return value > this.discountPrice;
                },
                message: "Product price should be greater than the discount price",
            },
        },
        discountPrice: {
            type: Number,
            min: [0, "Discount price cannot be negative"],
            validate: {
                validator: function (value) {
                    return value < this.productPrice;
                },
                message: "Discount price should be less than the original price",
            },
        },
        stock: {
            type: Number,
            required: [true, "Stock quantity is required"],
            min: [0, "Stock cannot be negative"],
        },
        unit: {
            type: String,
            enum: ["kg", "liters", "pcs", "dozen", "meter", "grams", "pack"],
            default: "pcs",
        },
        sku: {
            type: String,
            // unique: true,
            default: "",
            trim: true,
            match: [/^[a-zA-Z0-9_-]+$/, "Invalid SKU format"],
        },
        images: [{
            url: {
                type: String,
                required: true,
                match: [/^https?:\/\/.+/, "Invalid image URL"]
            },
            public_id: {
                type: String,
                required: true
            }
        }],
        video: {
            type: String,
            match: [
                /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
                "Invalid YouTube URL",
            ],
        },
        averageRating: {
            type: Number,
            default: 0,
            min: [0, "Rating cannot be negative"],
            max: [5, "Rating cannot exceed 5"],
        },
        totalReviews: {
            type: Number,
            default: 0,
            min: [0, "Total reviews cannot be negative"],
        },
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Seller ID is required"],
        },
        shippingCost: {
            type: Number,
            min: [0, "Shipping cost cannot be negative"],
        },
        shippingTime: {
            type: String,
            match: [/^\d+\s(days|weeks)$/, "Invalid shipping time format"],
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
        tags: {
            type: [String],
            validate: {
                validator: function (value) {
                    return value.length <= 10;
                },
                message: "A maximum of 10 tags are allowed",
            },
        },
        warranty: {
            type: String,
            maxlength: [100, "Warranty information must be under 100 characters"],
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
