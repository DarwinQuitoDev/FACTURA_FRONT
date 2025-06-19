import { Button } from "./button"
import { Eye, Pencil, Trash2 } from "lucide-react"

interface ActionButtonsProps {
  onEdit?: () => void
  onDelete?: () => void
  onView?: () => void
  hideEdit?: boolean
  hideDelete?: boolean
  hideView?: boolean
}

export function ActionButtons({
  onEdit,
  onDelete,
  onView,
  hideEdit = false,
  hideDelete = false,
  hideView = false,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-2">
      {!hideEdit && onEdit && (
        <Button variant="outline" size="icon" onClick={onEdit}>
          <Pencil className="h-4 w-4" />
        </Button>
      )}
      {!hideDelete && onDelete && (
        <Button variant="outline" size="icon" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
      {!hideView && onView && (
        <Button variant="outline" size="icon" onClick={onView}>
          <Eye className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
