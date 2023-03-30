import { useState } from "react"
import { useFields } from "../../hooks/useField"
import FieldsCard from "../Fields/FieldsCard"

export default function ReserveListComponent() {
    const { fields } = useFields()
    const [field, setField] = useState({slug :'test', pfh:2,sport:'test'})

    return (
        <>
            <div className="fields_list flex flex-wrap gap-3 w-full justify-center pt-8">
                {
                    fields.map((item, id) => {
                        return <FieldsCard field={item} key={id} />
                    })
                }
            </div>
        </>
    )
}
