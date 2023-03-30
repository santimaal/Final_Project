import { useFields } from "../../hooks/useField"
import FieldsCard from "../Fields/FieldsCard"

export default function ReserveComponent() {
    const { fields } = useFields()

    return (
        <>
            <div className="fields_list flex flex-wrap gap-5 w-full justify-center pt-8">
                {
                    fields.map((item, id) => {
                        return <FieldsCard field={item} key={id} />
                    })
                }
            </div>
        </>
    )
}