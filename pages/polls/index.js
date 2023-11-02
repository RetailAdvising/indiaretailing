import { getList,getPollsList,get_ip } from '@/libs/api'
import RootLayout from '@/layouts/RootLayout';
import Poll from '@/components/Poll/Poll';
import { useEffect, useState } from 'react';

export default function index() {
    const [ipAddress, setIpAddress] = useState(null);
    const [pollList, setPollList] = useState(null);
    
    useEffect(() => {
        get_polls()
      }, []);

      const get_polls=async()=>{
        let ip_address = await get_ip()
        console.log(ip_address);
        let param = {
            ip_address : ip_address
          }
        const resp = await getPollsList(param); 
        setPollList(resp.message)
      }
    return (
        <RootLayout>
        {pollList && pollList.length != 0 ?      
        <div className='w-[85%] m-auto py-[20px] flex gap-[20px]'>
         <Poll data={pollList} ipAddress={ipAddress}/>
        </div>
        : <Skeleton />}
        </RootLayout>
    )
}
const Skeleton = () => {
    return (
        <>
            {[0, 1].map((res, index) => {
                return (
                    <div key={index} className='mb-5'>
                        <div className='grid grid-cols-3 gap-[20px] container pt-[20px]'>
                            {[0, 1, 2].map(i => {
                                return (
                                    <div key={i} className='border rounded-[10px] lg:h-[380px] md:h-[300px]'>
                                        <div className='bg-[#E5E4E2] h-[210px] w-full rounded-[5px_5px_0_0]'></div>
                                        <div className='p-[10px]'>
                                            <p className={`bg-[#E5E4E2] h-[10px] w-full my-[10px] rounded-[5px]`}></p>
                                            <p className={`bg-[#E5E4E2] h-[10px] w-full mb-[20px] rounded-[5px]`}></p>
                                            <p className={`bg-[#E5E4E2] h-[7px] w-full my-[10px] rounded-[5px]`}></p>
                                            <p className={`bg-[#E5E4E2] h-[7px] w-full mb-[10px] rounded-[5px]`}></p>
                                            <p className='flex my-[15px] gap-[10px] items-center'><span className='bg-[#E5E4E2] h-[6px] w-[100px] rounded-[5px]'></span><span className='bg-[#E5E4E2] h-[6px] w-[100px] rounded-[5px]'></span></p>
                                            <p className={`bg-[#E5E4E2] h-[7px] w-[150px] mt-[10px] rounded-[5px]`}></p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}

        </>
    )
}