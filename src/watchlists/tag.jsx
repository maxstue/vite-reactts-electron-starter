import React from "react";

export default function Tag (props) {
    return <span className="text-xs inline-flex items-center font-semibold leading-sm uppercase px-2 py-1 bg-pink-200 text-pink-700 rounded-full">{props.children}</span>
}