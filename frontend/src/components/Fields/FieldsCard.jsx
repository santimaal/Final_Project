import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import ReserveModal from "../Reserve/ReserveModal"
import "./Fields.scss"

export default function FieldsCard({ field }) {
    return (
        <>
            <div className="card-list" data-bs-toggle="modal" data-backdrop="static" data-bs-target={`#exampleModal${field.slug}`}>
                <article className="card">
                    <figure className="card-image">
                        <img src={field.img} alt="An orange painted blue, cut in half laying on a blue background" />
                    </figure>
                    <div className="card-header_">
                        <a href="#">{field.sport} {field.slug}</a>
                        <button className="icon-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" display="block" id="Heart">
                                <path d="M7 3C4.239 3 2 5.216 2 7.95c0 2.207.875 7.445 9.488 12.74a.985.985 0 0 0 1.024 0C21.125 15.395 22 10.157 22 7.95 22 5.216 19.761 3 17 3s-5 3-5 3-2.239-3-5-3z" />
                            </svg>

                        </button>
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