import Image from "next/image"
import { Card, CardContent } from "./card"
import { Star, BookmarkPlus } from "lucide-react"
import { Button } from "./button"

interface MovieCardProps {
    id: number
    title: string
    image: string
    description: string
    rating: number
    watched: boolean
}

export default function MovieFeatured({ id, title, image, description, rating, watched = false}: MovieCardProps) {

    return (
        <Card className="overflow-hidden w-full bg-background p-0">
            <CardContent className="relative p-0">
                <div className="relative h-[300px] w-full overflow-hidden">
                    <Image 
                        src={image || "/placeholder_h.png"} 
                        alt={title} 
                        fill 
                        className="object-cover w-full transition-transform hover:scale-105" 
                    />
                    <div className="absolute bottom-0 left-0 p-6">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{rating}/5</span>
                      </div>
                    </div>
                    <h3 className="mt-2 text-2xl font-bold sm:text-3xl md:text-4xl">{title}</h3>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground sm:text-base">{description}</p>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" className="gap-2">
                        <BookmarkPlus className="h-4 w-4" />
                        Add to List
                      </Button>
                    </div>
                  </div>
                </div>
            </CardContent>
        </Card>
    )

}