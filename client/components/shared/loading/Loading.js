"use client"
import React, { useEffect, useState } from "react";
import Screen from "./Screen";

const Loading = () => {
    const [Loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(false) 
    })
    return (
''    );
};

export default Loading;
