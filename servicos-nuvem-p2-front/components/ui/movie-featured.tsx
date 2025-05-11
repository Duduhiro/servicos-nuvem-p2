import Image from "next/image"
import { Card, CardContent } from "./card"
import { Star, BookmarkPlus } from "lucide-react"
import { Button } from "./button"
import { AddButton, RemoveButton } from "./addToList"

interface MovieCardProps {
    id: number
    title: string
    image: string
    description: string
    rating: number
    inWatchlist: boolean
    onToggle: () => void
}

export default function MovieFeatured({ id, title, image, description, rating, inWatchlist, onToggle}: MovieCardProps) {

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
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                        <div className="flex items-center gap-2 text-sm">
                            <div className="flex items-center">
                                <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{parseFloat(rating.toFixed(1))}/10</span>
                            </div>
                        </div>
                        <h3 className="mt-2 text-2xl font-bold sm:text-3xl md:text-4xl">{title}</h3>
                        <p className="mt-2 max-w-md text-sm text-muted-foreground sm:text-base">{description}</p>
                        <div className="mt-4 flex gap-2">
                            {
                                !inWatchlist ? (
                                    <AddButton onClick={onToggle}/>
                                ) : (
                                    <RemoveButton onClick={onToggle} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )

}