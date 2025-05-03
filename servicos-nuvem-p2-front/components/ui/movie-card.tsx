import Image from "next/image"
import { Card, CardContent, CardFooter } from "./card"
import { Star } from "lucide-react"
import { Button } from "./button"

interface MovieCardProps {
    id: number
    title: string
    image: string
    rating: number
    watched: boolean
}

export default function MovieCard({ id, title, image, rating, watched = false}: MovieCardProps) {

    return (
        <Card className="overflow-hidden max-w-2xs min-w-3xs gap-2 bg-background p-0">
            <CardContent className="p-0">
                <div className="relative aspect-[2/3] w-full overflow-hidden">
                    <Image 
                        src={image || "/placeholder.png"} 
                        alt={title} 
                        fill 
                        className="object-cover w-full transition-transform hover:scale-105" 
                    />
                    <div className="absolute right-2 top-2 flex items-center rounded-full bg-black/70 px-2 py-1 text-xs z-10">
                        <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {/* {rating} */}
                        4.8
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start p-4">
                <div>
                    <h2 className="line-clamp-1 text-lg font-semibold">{title}</h2>
                </div>
                <div className="mt-2 flex w-full items-center justify-between">
                    <div>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                            Details
                        </Button>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )

}