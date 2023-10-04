import { trending } from "@/libs/api";
import { useRouter } from "next/router";
function Tags({tags,count=2}) {

    const router = useRouter();

    if(tags)

    return ( 
        <>
        {(tags && tags.length!=0) && <p className={`light_text pt-[10px] flex gap-[5px]`}>{ tags.map((tag,index_no)=>{
                if(index_no < count){return (
                  <span onClick={($event)=>trending($event,tag,router)} key={index_no} className='text-[12px] max-w-[100px] line-clamp-1'>#{tag.tag}</span>
              )}
              })
              }
        </p>}
        </>
     )
}

export default Tags;