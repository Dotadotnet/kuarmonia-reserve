"use client"
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function Loading() {
    const [url, setUrl] = useState('none')
    useEffect(() =>{
        if(document.getElementById('_rht_toaster')){
            toast.remove()
        }
        if(url == 'none'){
            setInterval(() => {
                document.querySelectorAll('a').forEach((link) =>{
                    if(link.href){
                        link.onclick = () =>{
                            toast.loading("صبر کنید ...");
                        }
                    }
                   })   
                     if(window.location.href !== url){
                        setUrl(window.location.href)
                     }
            }, 500);
        }
    },[url])
  return (<></>);
}