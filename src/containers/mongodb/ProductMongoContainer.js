
const mongoose = require("mongoose");


class ProductMongoContainer {
    constructor(collection, schema) {
        this.collection = mongoose.model(collection, schema);
    }

    save = async (element) => {
        try {
            element.timestamp = new Date().toISOString();
            element.codigo = Date.now();
            const newElement = new this.collection(element);
            const result = await newElement.save();
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    getAll = async () => {
        try {
            return await this.collection.find({});
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) return null;
            else return await this.collection.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateById(id, element) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) return null;
            else return await this.collection.findByIdAndUpdate({ _id: id }, element);
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteById(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) return null;
            else return await this.collection.findByIdAndDelete({ _id: id });
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteAll() {
        try {
            return await this.collection.deleteMany({});
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = ProductMongoContainer;