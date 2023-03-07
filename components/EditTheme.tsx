import Button from "@/components/base/Button"
import { useDrawer } from "./drawer/useDrawer"

export default function EditTheme() {
    const { requestOpen } = useDrawer()
    return(
        <Button onClick={() => requestOpen('palette')}>Edit theme</Button>
    )
}