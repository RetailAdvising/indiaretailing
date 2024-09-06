import ImageLoader from '../ImageLoader'
import { useEffect, useState } from 'react';
import { checkMobile } from '@/libs/api'
// import GoogleAds from './GoogleAds';
import dynamic from 'next/dynamic'
const GoogleAds = dynamic(() => import('./GoogleAds'), { ssr: false })
export default function Advertisement({ data, imgClass, divClass, insStyle, position }) {

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
                </div>
            }

            {/* data-ad-format="auto"
                        data-full-width-responsive="true" */}
            {/* style="display:inline-block;width:728px;height:90px;" */}

            {/* <script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script> */}
            {/* {insStyle && ((data && Object.keys(data).length == 0) || !(data)) && <GoogleAds style={divClass} script={`
                    <ins class="adsbygoogle ${divClass}"
                        style="${insStyle}"
                        data-ad-client="ca-pub-9354161551837950"
                        data-ad-slot="${script ? "6101971529" : "8257587929"}"
                        data-ad-format="auto"
                        ></ins>
                        `} />} */}
            {/* <script>
                            (adsbygoogle = window.adsbygoogle || []).push({});
                        </script> */}

            {/* {((data && Object.keys(data).length == 0) || !(data)) && <GoogleAds style={insStyle} position={position} />} */}
            {((data && Object.keys(data).length == 0) || !(data)) && <GoogleAds style={insStyle} position={position} script={`
                
                <div className="text-center">
                    <script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script>
                    <ins
                        className="adsbygoogle"
                        style="${insStyle}"
                        data-ad-client="ca-pub-9354161551837950"
                        data-ad-slot="${position == 'high' ? '8257587929' : '6101971529'}"
                    />
                    <script>
                        (adsbygoogle = window.adsbygoogle || []).push({ });
                    </script>
                </div>
                
                `} />}

            {/* <script>
                (adsbygoogle = window.adsbygoogle || []).push({ });
            </script> */}





            {/* <script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" crossorigin="anonymous" async></script> */}
            {/* <script>
                // GPT slots
                var gptAdSlots = []; // Created the Array To Get BrowserSize,Ad Size
                googletag.cmd.push(function()
                {
                var mapping = googletag.sizeMapping().
                //addSize is the browser size and each subsequent dimension is an ad size addSize([Browser Width,Browser Height],[Ad Width,Ad Height]).
                build();

                slot1=googletag.defineSlot('/21631575671/IR-728x90-Leaderboard', [[320, 50], [728, 90], [970, 250]], 'div-gpt-ad-1617096742911-0').setTargeting("test", "refresh").
                defineSizeMapping(mapping).
                addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
                });
            </script> */}

        </>
    )
}