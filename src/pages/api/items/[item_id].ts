
import { NextApiRequest, NextApiResponse } from "next";

import ItemModel, { IItem } from "../../../db/item/schema";
import { connectDB } from "../../../db/init";




export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await connectDB()


    switch (req.method) {
        case "GET":
            
            const item: IItem | null = await ItemModel.findOne({
                _id: req.query.item_id
            })

            if (!item) {
                res.status(404).json("item_not_found")
            }else {
                res.status(200).json({
                    id: item._id,
                    name: item.name,
                    category: item.category,
                    price: item.price,
                    content: item.content.map((item) => {
                        return {
                            name: item
                        }
                    })
                })
            }

            break;

        default:
            res.status(404).json("route_not_found")
            break;
    }
}