import { useEffect } from "react";

const GoogleAds = (props) => {

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (err) {
                // console.log(err,"err");
            }

            // Load ads individually
            loadAd(props.adId);
        }
    }, [props])

    function setAdHeight(adElement, position) {
        // Determine dynamic height based on the position or other logic
        let el = adElement.parentElement;
        console.log(el,"el parent")
        // let el = document.querySelector('.scripts');
        if (el) {
            el.style.height = position == 'high' ? '90px' : '250px';  // Example: Set background color
        }

        if (position === 'high') {
            dynamicHeight = '90px';  // Example height for high position
        } else {
            dynamicHeight = '250px';  // Default height
        }

        // Set the custom property --adheight dynamically
        adElement.style.setProperty('--adheight', dynamicHeight);
    }


    function checkAdStatus(adId) {
        var adElement = document.getElementById(adId);
        var adStatus = adElement.getAttribute('data-ad-status');
        if (adStatus === 'unfilled') {
            console.log("Ad unfilled for:", adId);
            setAdHeight(adElement, props.position)
            // adElement.style.minHeight = '90px';  // Set a minimum height to prevent collapsing
            // Optionally display a fallback message or alternative content
            // adElement.innerHTML = "<p>Ad not available</p>";
        }
    }

    function loadAd(adId) {
        var adElement = document.getElementById(adId);
        if (adElement) {
            setTimeout(function () {
                checkAdStatus(adId);
            }, 1000);
        } else {
            console.log("Ad element not found for:", adId);
        }
    }



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

            {/* <script
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`}
            ></script> */}

            {props.script && <div className={`${props.style} scripts`} dangerouslySetInnerHTML={{ __html: props.script }} />}


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