import { useEffect } from "react";

const GoogleAds = (props) => {

    // useEffect(() => {
    //     try {
    //         (window.adsbygoogle = window.adsbygoogle || []).push({});
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }, [])

    return (
        <>
            {props.script && <div dangerouslySetInnerHTML={{ __html: props.script }} />}


{/* && props.data-ad-slot */}
            {(!props.script ) && <div className="bg-black">
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