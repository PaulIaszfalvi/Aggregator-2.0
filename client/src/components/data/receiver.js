import React, { Component, useEffect, useState } from 'react'
import axios from "axios"

function Receiver() {

    const [data, setData] = useState(null);


    const fetchNotes = async () => {
        const { data } = await axios.get(`/info`);
        console.log(data)
    }

    useEffect(() => {
        fetchNotes()   
}, []); 




  return (
    <div>

       
      
    </div>
  )
}

export default Receiver;