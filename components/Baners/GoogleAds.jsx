// import Script from "next/script";
// import { useEffect } from "react";

// const GoogleAds = (props) => {

//     // useEffect(() => {
//     //     // console.log(props.script,"script")
//     //     setTimeout(() => {
//     //         if (typeof window !== 'undefined' && window.adsbygoogle) {
//     //             try {
//     //                 (window.adsbygoogle = window.adsbygoogle || []).push({});
//     //             } catch (err) {
//     //                 // console.log(err, "err");
//     //             }
//     //         }
//     //     }, 4000);
//     // }, [])

//     // useEffect(() => {
//     //     // if (typeof window !== 'undefined') {
//     //     //     const checkAdsByGoogle = () => {
//     //     //         if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
//     //     //             try {
//     //     //                 window.adsbygoogle.push({});
//     //     //             } catch (err) {
//     //     //                 console.error("Adsbygoogle error:", err);
//     //     //             }
//     //     //         } else {
//     //     //             console.log("Adsbygoogle is not ready yet.");
//     //     //         }
//     //     //     };

//     //     //     // Use a small delay to ensure adsbygoogle script is ready
//     //     //     const timeoutId = setTimeout(checkAdsByGoogle, 1000);
//     //     //     return () => clearTimeout(timeoutId); // Clean up the timeout on component unmount
//     //     // }

//     //     const loadAds = () => {
//     //         if (typeof window !== 'undefined' && window.adsbygoogle) {
//     //             try {
//     //                 window.adsbygoogle.push({});
//     //                 console.log("Google Ads pushed successfully.");
//     //             } catch (err) {
//     //                 console.error("Adsbygoogle push error:", err);
//     //             }
//     //         } else {
//     //             console.log("Adsbygoogle is not ready yet.");
//     //         }
//     //     };

//     //     // Add a mutation observer to ensure ads are loaded properly
//     //     const observer = new MutationObserver((mutationsList, observer) => {
//     //         for (let mutation of mutationsList) {
//     //             if (mutation.type === 'childList') {
//     //                 loadAds();
//     //             }
//     //         }
//     //     });

//     //     if (typeof window !== 'undefined') {
//     //         const adsContainer = document.querySelector('.adsbygoogle');
//     //         if (adsContainer) {
//     //             observer.observe(adsContainer, { childList: true });
//     //         }
//     //     }

//     //     // Try loading ads with a timeout as a fallback
//     //     const timeoutId = setTimeout(loadAds, 1500); // Wait for 1.5 seconds before retrying

//     //     return () => {
//     //         clearTimeout(timeoutId);
//     //         observer.disconnect();
//     //     };
//     // }, [props.position]);


//     useEffect(() => {
//         const loadAds = () => {
//             if (typeof window !== 'undefined' && window.adsbygoogle) {
//                 try {
//                     const ads = document.querySelectorAll(`.adsbygoogle[data-ad-slot="${props.position == 'high' ? '8257587929' : '6101971529'}"]`);
//                     ads.forEach(ad => {
//                         if (!ad.hasAttribute('data-adsbygoogle-initialized')) {
//                             // window.adsbygoogle.push({});
//                             (window.adsbygoogle = window.adsbygoogle || []).push({})
//                             ad.setAttribute('data-adsbygoogle-initialized', 'true');
//                             console.log("Google ad pushed successfully for slot:", props.position);
//                         }
//                     });
//                 } catch (err) {
//                     console.error("Adsbygoogle push error:", props.position);
//                 }
//             } else {
//                 console.log("Adsbygoogle is not ready yet.");
//             }
//         };

//         // Set up a MutationObserver
//         // const observer = new MutationObserver(() => {
//         //     loadAds();

//         // });

//         const observer = new MutationObserver((mutationsList) => {
//             for (let mutation of mutationsList) {
//                 if (mutation.type === 'childList') {
//                     loadAds();
//                 }
//             }
//         });

//         if (typeof window !== 'undefined') {
//             const adsContainers = document.querySelectorAll('.adsbygoogle');
//             adsContainers.forEach(container => {
//                 observer.observe(container, { childList: true,subtree: true });
//             });
//         }

//         // Try loading ads with a timeout as a fallback
//         const timeoutId = setTimeout(loadAds, 5000);

//         return () => {
//             clearTimeout(timeoutId);
//             observer.disconnect();
//         };
//     }, [props.position]);


//     return (
//         <>
//             {/* <Script
//                 id="gpt-script"
//                 src="https://www.googletagservices.com/tag/js/gpt.js"
//                 strategy="beforeInteractive"
//             /> */}

//             {/* <script
//                 async
//                 src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`}
//             ></script> */}

//             {/* {props.script && <div className={`${props.style}`} dangerouslySetInnerHTML={{ __html: props.script }} />} */}

//             {/* {props.position == "high" ?
//                 <ins class="adsbygoogle"
//                     style="display:inline-block;width:728px;height:90px;"
//                     data-ad-client="ca-pub-9354161551837950"
//                     data-ad-slot="8257587929"
//                 >
//                 </ins> :
//                 props.position == "medium" ?
//                     <ins class="adsbygoogle"
//                         style="display:inline-block;width:500px;height:90px;"
//                         data-ad-client="ca-pub-9354161551837950"
//                         data-ad-slot="6101971529"
//                     >
//                     </ins> :
//                     <ins class="adsbygoogle"
//                         style="display:inline-block;width:300px;height:250px;"
//                         data-ad-client="ca-pub-9354161551837950"
//                         data-ad-slot="6101971529"
//                     >
//                     </ins>} */}

//             {/* <Script async src="//pagead2.googlesyndication.com/pagead/show_ads.js" /> */}

//             {/* < Script
//                 id="adsbygoogle-script"
//                 strategy="afterInteractive"
//                 src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
//                 onLoad={() => {
//                     if (typeof window !== 'undefined' && window.adsbygoogle) {
//                         try {
//                             (window.adsbygoogle = window.adsbygoogle || []).push({});
//                         } catch (err) {
//                             console.error("Adsbygoogle error on load", err);
//                         }
//                     }
//                 }}
//             /> */}


//             {/* && props.data-ad-slot */}
//             {/* {
//                 (!props.script) && <div className="ad">
//                     <ins
//                         data-ad-slot={props.adSlot}
//                         data-ad-format={"responsive"}
//                         data-full-width-responsive={true}
//                         data-ad-client={props.adClient}
//                         {...props}
//                     />
//                 </div>
//             } */}





//             <div className="text-center">
//                 {/* <script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script> */}

//                 {props.position == "high" ? (
//                     <ins
//                         className="adsbygoogle"
//                         style={{ display: "inline-block", width: "728px", height: "90px" }}
//                         data-ad-client="ca-pub-9354161551837950"
//                         data-ad-slot="8257587929"
//                     />
//                 ) : props.position == "medium" ? (
//                     <ins
//                         className="adsbygoogle"
//                         style={{ display: "inline-block", width: "500px", height: "90px" }}
//                         data-ad-client="ca-pub-9354161551837950"
//                         data-ad-slot="6101971529"
//                     />
//                 ) : (
//                     <ins
//                         className="adsbygoogle"
//                         style={{ display: "inline-block", width: "300px", height: "250px" }}
//                         data-ad-client="ca-pub-9354161551837950"
//                         data-ad-slot="6101971529"
//                     />
//                 )}
//                 {/* <script>
//                     (adsbygoogle = window.adsbygoogle || []).push({ });
//                 </script> */}
//             </div>

//             <Script
//                 strategy="lazyOnload"
//                 async
//                 crossOrigin="anonymous"
//                 src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
//                 // onLoad={() => {
//                 //     console.log("Google Ads script loaded.");
//                 //     try {
//                 //         if (typeof window !== 'undefined' && window.adsbygoogle) {
//                 //             (window.adsbygoogle = window.adsbygoogle || []).push({});
//                 //         }
//                 //     } catch (err) {
//                 //         console.error("Adsbygoogle error on load:", err);
//                 //     }
//                 // }}

//                 onLoad={() => {
//                     console.log("Google Ads script loaded.");
//                     try {
//                         if (typeof window !== 'undefined' && window.adsbygoogle) {
//                             const ads = document.querySelectorAll(`.adsbygoogle[data-ad-slot="${props.position == 'high' ? '8257587929' : '6101971529'}"]`);
//                             ads.forEach(ad => {
//                                 if (!ad.hasAttribute('data-adsbygoogle-initialized')) {
//                                     window.adsbygoogle.push({});
//                                     ad.setAttribute('data-adsbygoogle-initialized', 'true');
//                                 }
//                             });
//                         }
//                     } catch (err) {
//                         console.error("Adsbygoogle error on load:", err);
//                     }
//                 }}
//             />


//         </>
//     )
// }

// export default GoogleAds;



import { useEffect, useState } from 'react';
import Script from 'next/script';

const GoogleAds = (props) => {
    //   const [adSlotId, setAdSlotId] = useState(null);
    //   const [adStyle, setAdStyle] = useState(null);

    //   useEffect(() => {
    //     // Determine ad slot ID based on props.position
    //     if (props.position === 'high') {
    //       setAdSlotId('8257587929');
    //       setAdStyle({ display: "inline-block", width: "728px", height: "90px" })
    //     } else if (props.position === 'medium') {
    //       setAdSlotId('6101971529');
    //       setAdStyle({ display: "inline-block", width: "500px", height: "90px" })
    //     } else {
    //       setAdSlotId('6101971529'); // Default or handle other positions
    //       setAdStyle({ display: "inline-block", width: "300px", height: "250px" })
    //     }
    //   }, [props.position]);

    //   const handleAdsbygoogleLoaded = () => {
    //     if (typeof window !== 'undefined' && window.adsbygoogle) {
    //       window.adsbygoogle.push({});
    //       console.log("Google Ad script loaded and ad pushed.");
    //     } else {
    //       console.error("Adsbygoogle is not ready yet.");
    //     }
    //   };

    if (props.position == "high") {
        return (
            <div className="text-center">
                <script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script>
                <ins
                    className="adsbygoogle"
                    style="display: inline-block, width: 728px, height: 90px"
                    data-ad-client="ca-pub-9354161551837950"
                    data-ad-slot="8257587929"
                />
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({ });
                </script>
            </div>
        )
    }


    return (
        <div className="text-center">
            <script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script>
            <ins
                className="adsbygoogle"
                style="display: inline-block, width: 300px, height: 250px"
                data-ad-client="ca-pub-9354161551837950"
                data-ad-slot="6101971529"
            />
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({ });
            </script>
        </div>
    )




    // return (
    //     <>
    //         <div className="text-center">
    //             {/* {props.script && <div className={`${props.style}`} dangerouslySetInnerHTML={{ __html: props.script }} />} */}
    //             {/* {(adSlotId && adStyle) && ( */}
    //             {/* <script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script> */}
    //             {/* <ins
    //                 className="adsbygoogle"
    //                 style={props.insStyle}
    //                 data-ad-client="ca-pub-9354161551837950"
    //                 data-ad-slot={props.position === 'high' ? '8257587929' : '6101971529'}
    //             /> */}
    //             {/* )} */}

    //             {/* <script> */}
    //                 {/* (adsbygoogle = window.adsbygoogle || []).push({ }); */}
    //                 {/* (adsbygoogle = window.adsbygoogle || []).push({ });
    //                 (adsbygoogle = window.adsbygoogle || []).push({ });
    //                 (adsbygoogle = window.adsbygoogle || []).push({ }); */}
    //                 {/* [].forEach.call(document.querySelectorAll('.adsbygoogle'), function(){
    //                     // console.log('123 from GoogleAds dom',adsbygoogle)
    //                     (adsbygoogle = window.adsbygoogle || []).push({})
    //                 }); */}
    //             {/* </script> */}


    //             {}

    //         </div>
    //         {/* <Script
    //     strategy="lazyOnload"
    //     async
    //     crossOrigin="anonymous"
    //     src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"   
    //     onLoad={handleAdsbygoogleLoaded}
    //   /> */}
    //     </>
    // );
};

export default GoogleAds;