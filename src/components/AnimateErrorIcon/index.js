import React from 'react';
import './AnimateErrorIcon.css';

export default function AnimatedErrorIcon(props) {
    return (
        <div className="swal2-icon swal2-error swal2-animate-error-icon" style={{display: "flex"}}>
            <span className="swal2-x-mark">
            <span className="swal2-x-mark-line-left"/>
                <span className="swal2-x-mark-line-right"/>
            </span>
        </div>
    )
}