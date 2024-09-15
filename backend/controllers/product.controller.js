import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        return res.status(200).json({success: true, data: products})
    } catch (error) {
        console.log(`error: ${error?.message}`)
        return res.status(500).json({success: false, message: "No products found"})
    }
}

export const addProduct = async(req, res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: "Please input all fields"})
    }

    try {
        const newProduct = await Product.create(req.body); 
        return res.json({success: true, data: newProduct});
    } catch (error) {
        console.error(`error: ${error?.message}`);
        return res.status(500).json({ success: false, message: error?.message });
    }
}

export const deleteProduct = async(req, res) => {
    const {id} = req.params;
    console.log("id: ", id);

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({success: false, message: "Product not found"})
    }
    
    try {
        await Product.findByIdAndDelete(id);
        return res.status(200).json({success: true, message: "Product deleted"})
    } catch (error) {
        console.error(`error: ${error?.message}`);
        return res.status(500).json({ success: false, message: error?.message });
    }
}

export const updateProduct = async(req, res) => {
    const {id} = req.params;

    const product = req.body;

    if(!product.name || !product.price || !product.image) {
        return res.status(500).json({success: false, message: "Please provide all fields."})
    }

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({success: false, message: "Product not found"})
    }
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true, runValidators: true}).exec();
        res.status(200).json({success: true, data: updatedProduct})
    } catch (error) {
        console.log(`error: ${error?.message}`);
        res.status(500).json({success: false, message: "Internal server error"})
    }
}