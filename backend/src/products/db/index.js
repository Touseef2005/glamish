import ProductModel from "../models/index.js";

const getAll = async ({ limit, skip, search }) => await ProductModel.find(search).limit(limit).skip(skip);

const getPublicProduct = async ({ limit, skip, search }) => await ProductModel.find({ isPublished: true, ...search }).limit(limit).skip(skip);

const getUnpublishedProducts = async ({ limit, skip, search }) => await ProductModel.find({ isPublished: false, ...search }).limit(limit).skip(skip);

const addData = (data) => new ProductModel(data).save().then((user) => user.toObject());

const deleteById = async (id) => await ProductModel.findByIdAndDelete(id);

const updateById = async (id, data) => await ProductModel.findByIdAndUpdate(id, data, { new: true });

const getById = async (id) => await ProductModel.findById({ _id: id });

export {
    getAll,
    getPublicProduct,
    getUnpublishedProducts,
    addData,
    deleteById,
    updateById,
    getById
}