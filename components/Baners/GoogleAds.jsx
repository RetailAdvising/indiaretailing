import Script from "next/script";
import { useEffect } from "react";

const GoogleAds = (props) => {

    // useEffect(() => {
    //     try {
    //         (window.adsbygoogle = window.adsbygoogle || []).push({});
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }, [])

    // useEffect(() => {
    //     const gptInit = () => {
    //         const mapping = googletag.sizeMapping()
    //             .addSize([0, 0], [320, 50])
    //             .addSize([768, 0], [728, 90])
    //             .addSize([1024, 0], [970, 250])
    //             .build();

    //         googletag.cmd.push(function () {
    //             const slot1 = googletag.defineSlot('/21631575671/IR-728x90-Leaderboard', [[320, 50], [728, 90], [970, 250]], 'div-gpt-ad-1617096742911-0')
    //                 .setTargeting("test", "refresh")
    //                 .defineSizeMapping(mapping)
    //                 .addService(googletag.pubads());

    //             googletag.pubads().enableSingleRequest();
    //             googletag.enableServices();
    //             googletag.display('div-gpt-ad-1617096742911-0');
    //         });
    //     };

    //     if (window.googletag) {
    //         gptInit();
    //     } else {
    //         window.googletag = window.googletag || { cmd: [] };
    //         window.googletag.cmd.push(gptInit);
    //     }
    // }, []);

    return (
        <>
            <Script
                id="gpt-script"
                src="https://www.googletagservices.com/tag/js/gpt.js"
                strategy="beforeInteractive"
            />
            {props.script && <div dangerouslySetInnerHTML={{ __html: props.script }} />}

            <div id="div-gpt-ad-1617096742911-0" style={{ width: '100%', height: '250px' }}>
                {/* Ad will be rendered here */}
            </div>

            {/* && props.data-ad-slot */}
            {(!props.script) && <div className="bg-black">
                <ins
                    style={{
                        display: 'block',
                        overflow: 'hidden',
                    }}
                    data-ad-format={"responsive"}
                    data-full-width-responsive={true}
                    data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
                    {...props}
                />
            </div>}


        </>
    )
}

export default GoogleAds;