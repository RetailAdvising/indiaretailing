import Script from "next/script";
import { useEffect } from "react";

const GoogleAds = (props) => {

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (err) {
                // console.log(err,"err");
            }
        }
    }, [props])

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

    // useEffect(() => {
    //     // Initialize GPT ad slots after the script is loaded
    //     // const initializeAds = () => {
    //     //   if (window.googletag) {
    //     //     let googletag = window.googletag
    //     //     const mapping = googletag.sizeMapping()
    //     //       .addSize([0, 0], [320, 50])
    //     //       .addSize([768, 0], [728, 90])
    //     //       .addSize([1024, 0], [970, 250])
    //     //       .build();

    //     //     googletag.cmd.push(() => {
    //     //       googletag.defineSlot('/21631575671/IR-728x90-Leaderboard', [[320, 50], [728, 90], [970, 250]], 'div-gpt-ad-1617096742911-0')
    //     //         .setTargeting("test", "refresh")
    //     //         .defineSizeMapping(mapping)
    //     //         .addService(googletag.pubads());

    //     //       googletag.pubads().enableSingleRequest();
    //     //       googletag.enableServices();
    //     //       googletag.display('div-gpt-ad-1617096742911-0');
    //     //     });
    //     //   } else {
    //     //     console.error('googletag is not defined');
    //     //   }
    //     // };

    //     // Wait for the GPT script to load and then initialize ads
    //     if(typeof window !== 'undefined'){
    //         if (window.googletag) {
    //           initializeAds();
    //         } else {
    //           window.googletag = window.googletag || { cmd: [] };
    //           window.googletag.cmd.push(initializeAds);
    //         }
    //     }
    //   }, []);

    return (
        <>
            {/* <Script
                id="gpt-script"
                src="https://www.googletagservices.com/tag/js/gpt.js"
                strategy="beforeInteractive"
            /> */}

            <Script
                // id="adsense-script"
                // data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
                strategy="beforeInteractive"
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`}
            />

            {props.script && <div className={`${props.style}`} dangerouslySetInnerHTML={{ __html: props.script }} />}


            {/* && props.data-ad-slot */}
            {(!props.script) && <div className="ad">
                <ins
                    data-ad-slot={props.adSlot}
                    data-ad-format={"responsive"}
                    data-full-width-responsive={true}
                    data-ad-client={props.adClient}
                    {...props}
                />
            </div>}


        </>
    )
}

export default GoogleAds;