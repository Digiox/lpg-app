
import { NextApiRequest, NextApiResponse } from "next";

import ItemModel, { IItem } from "../../../db/item/schema";
import { connectDB } from "../../../db/init";




export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await connectDB()


    switch (req.method) {
        case "GET":
            console.log(req.query.category);
            var items;
            if (req.query.category) {
                items = await ItemModel.find({
                    category: req.query.category
                })
            } else {
                items = await ItemModel.find()
            }
            if (items) {
                res.setHeader('X-Total-Count', items.length.toString());
                res.status(200).json(items.map((item: IItem) => {
                    return {
                        id: item._id,
                        name: item.name,
                        content: item.content,
                        category: item.category,
                        price: item.price
                    }
                }))
                break;
            }
            else {
                res.status(404).json("no_items_found")
                break;
            }
        case "POST":



            const item: IItem = {
                name: req.body.name,
                price: req.body.price,
                content: req.body.content,
                category: req.body.category
            }
            if (!item.name || !item.price || !item.content || item.content.length === 0 || !item.category) {
                res.status(400).json("wrong_parameters")
                break;
            }



            const newItem = new ItemModel({
                ...item
            })

            await newItem.save()

            res.status(200).json(newItem)




        default:
            res.status(404).json("route_not_found")
            break;
    }
}