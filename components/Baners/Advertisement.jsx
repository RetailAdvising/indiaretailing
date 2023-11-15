import ImageLoader from '../ImageLoader'
import { useEffect, useState } from 'react';
import { checkMobile } from '@/libs/api'
export default function Advertisement({ data,imgClass,divClass }) {

    let [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile)
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, [])


    const checkIsMobile = async () => {
        let is_mobile = await checkMobile();
        isMobile = is_mobile
        setIsMobile(isMobile);
    }

    return (
        <>
            {
                data && Object.keys(data).length != 0 &&
                <div onClick={() => window.open(data.ad_link, '_blank')} className={`${divClass ? divClass : ''} ${data.position == 'Header' || data.position == 'Footer' ? 'h-[90px] w-[728px]' : ''}`}>
                    <ImageLoader style={`${imgClass ? imgClass : ''} h-full w-full`} src={isMobile ? data.mobile_image : data.web_image} title={data.title ? data.title : 's'} />
                </div >
            }
        </>
    )
}