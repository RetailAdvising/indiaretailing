import Script from "next/script";
import { useEffect } from "react";

const GoogleAds = (props) => {

    // useEffect(() => {
    //     // console.log(props.script,"script")
    //     if (typeof window !== 'undefined' && window.adsbygoogle) {
    //         try {
    //             (window.adsbygoogle = window.adsbygoogle || []).push({});
    //         } catch (err) {
    //             console.log(err, "err");
    //         }
    //     }
    // }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const checkAdsByGoogle = () => {
                if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
                    try {
                        window.adsbygoogle.push({});
                    } catch (err) {
                        console.error("Adsbygoogle error:", err);
                    }
                } else {
                    console.log("Adsbygoogle is not ready yet.");
                }
            };

            // Use a small delay to ensure adsbygoogle script is ready
            const timeoutId = setTimeout(checkAdsByGoogle, 1000);
            return () => clearTimeout(timeoutId); // Clean up the timeout on component unmount
        }
    }, [props.position]);

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

            {/* {props.script && <div className={`${props.style}`} dangerouslySetInnerHTML={{ __html: props.script }} />} */}

            {/* {props.position == "high" ?
                <ins class="adsbygoogle"
                    style="display:inline-block;width:728px;height:90px;"
                    data-ad-client="ca-pub-9354161551837950"
                    data-ad-slot="8257587929"
                >
                </ins> :
                props.position == "medium" ?
                    <ins class="adsbygoogle"
                        style="display:inline-block;width:500px;height:90px;"
                        data-ad-client="ca-pub-9354161551837950"
                        data-ad-slot="6101971529"
                    >
                    </ins> :
                    <ins class="adsbygoogle"
                        style="display:inline-block;width:300px;height:250px;"
                        data-ad-client="ca-pub-9354161551837950"
                        data-ad-slot="6101971529"
                    >
                    </ins>} */}

            {/* <Script async src="//pagead2.googlesyndication.com/pagead/show_ads.js" /> */}

            {/* < Script
                id="adsbygoogle-script"
                strategy="afterInteractive"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                onLoad={() => {
                    if (typeof window !== 'undefined' && window.adsbygoogle) {
                        try {
                            (window.adsbygoogle = window.adsbygoogle || []).push({});
                        } catch (err) {
                            console.error("Adsbygoogle error on load", err);
                        }
                    }
                }}
            /> */}


            {/* && props.data-ad-slot */}
            {/* {
                (!props.script) && <div className="ad">
                    <ins
                        data-ad-slot={props.adSlot}
                        data-ad-format={"responsive"}
                        data-full-width-responsive={true}
                        data-ad-client={props.adClient}
                        {...props}
                    />
                </div>
            } */}




            {props.position == "high" ? (
                <ins
                    className="adsbygoogle"
                    style={{ display: "inline-block", width: "728px", height: "90px" }}
                    data-ad-client="ca-pub-9354161551837950"
                    data-ad-slot="8257587929"
                />
            ) : props.position == "medium" ? (
                <ins
                    className="adsbygoogle"
                    style={{ display: "inline-block", width: "500px", height: "90px" }}
                    data-ad-client="ca-pub-9354161551837950"
                    data-ad-slot="6101971529"
                />
            ) : (
                <ins
                    className="adsbygoogle"
                    style={{ display: "inline-block", width: "300px", height: "250px" }}
                    data-ad-client="ca-pub-9354161551837950"
                    data-ad-slot="6101971529"
                />
            )}

            <Script
                id="adsbygoogle-script"
                strategy="afterInteractive"
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                onLoad={() => {
                    try {
                        if (typeof window !== 'undefined' && window.adsbygoogle) {
                            (window.adsbygoogle = window.adsbygoogle || []).push({});
                        }
                    } catch (err) {
                        console.error("Adsbygoogle error on load:", err);
                    }
                }}
            />


        </>
    )
}

export default GoogleAds;