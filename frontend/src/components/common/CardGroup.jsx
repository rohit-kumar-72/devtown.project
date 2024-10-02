import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '../ui/button'
import { Edit, X } from 'lucide-react'

function CardGroup({ data, style, controls, handleEdit, handleDel }) {
    return (
        <div className="flex flex-col gap-4 md:flex-row flex-wrap items-center mx-auto w-full">
            {data.map((item, index) => (
                <Card className={`${style} hover:bg-gray-50 shadow-sm border max-w-full w-full md:max-w-[300px]`} key={index}>
                    <CardHeader>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col space-y-2">

                            {/* Due Date Section */}
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-700">Due Date: </span>
                                <span className="text-gray-500"> {item.dueDate.substring(0, 10)}</span>
                            </div>

                            {/* Priority Section */}
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-700">Priority:</span>
                                <span className={`font-semibold ${item.priority === "Low" ? "text-yellow-500" : (item.priority === "High" ? "text-red-600" : "text-green-600")}`}>{item.priority}</span>
                            </div>

                            {/* Status Section */}
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-700">Status:</span>
                                <span className={`${item.status === "Completed" && "text-green-600"} font-semibold`}>{item.staus}</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className={"block"}>
                        <p className='text-sm text-gray-400 italic text-right'>created by - @{item.createdBy.fullname}</p>
                        {
                            controls && (
                                <div className="flex items-center justify-between mt-2">
                                    <Button variant="outline" size="icon" onClick={() => handleEdit(item._id)}><Edit /></Button>
                                    <Button variant="destructive" size="icon" onClick={() => handleDel(item._id)}><X /></Button>
                                </div>
                            )
                        }
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default CardGroup