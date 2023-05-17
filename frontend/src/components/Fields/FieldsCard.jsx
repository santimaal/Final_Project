import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useState } from "react"
import ReserveModal from "../Reserve/ReserveModal"
import "./Fields.scss"
import AuthContextProvider from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function FieldsCard({ field }) {
    const navigate = useNavigate();
    const { user } = useContext(AuthContextProvider)
    return (
        <>
            <div className="card-list" data-bs-toggle="modal" data-backdrop="static" data-bs-target={`#exampleModal${field.slug}`} onClick={(e) => user ? console.log(user) : navigate('signin')}>
                <article className="card card-article">
                    <figure className="card-image">
                        <img src={field.img} alt="An orange painted blue, cut in half laying on a blue background" />
                    </figure>
                    <div className="card-header_">
                        <a href="#">{field.sport} {field.slug}</a>
                    </div>
                    <div className="card-footer">
                        <div className="card-meta card-meta--views">
                            <FontAwesomeIcon icon="fa-solid fa-dollar-sign" />
                            {field.pfh}
                        </div>
                        <div className="card-meta card-meta--date">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" display="block" id="Calendar">
                                <rect x="2" y="4" width="20" height="18" rx="4" />
                                <path d="M8 2v4" />
                                <path d="M16 2v4" />
                                <path d="M2 10h20" />
                            </svg>
                            8h to 21h
                        </div>
                    </div>
                </article>
            </div>
            <ReserveModal data={field} />
        </>
    )
}