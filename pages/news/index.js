import { useRouter } from "next/router";
import { useEffect } from "react";


function News() {
    const router = useRouter()
    useEffect(()=>{
       navigate()
    },[])
    const navigate=()=>{
        router.push("/")
    }
    return<></>
    
}

export default News;