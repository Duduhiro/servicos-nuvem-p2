import { BookmarkMinus, BookmarkPlus } from "lucide-react";
import { Button } from "./button";

export function AddButton({onClick}: {onClick: () => void}) {

    return (
        <div>
            <Button onClick={onClick} variant="outline" size="sm" className="h-8 px-2">
                <BookmarkPlus className="h-4 w-4" />
                Add to List
            </Button>
        </div>
    )
}

export function RemoveButton({onClick}: {onClick: () => void}) {

    return (
        <div>
            <Button onClick={onClick} variant="outline" size="sm" className="h-8 px-2">
                <BookmarkMinus className="h-4 w-4" />
                Remove from list
            </Button>
        </div>
    )
}