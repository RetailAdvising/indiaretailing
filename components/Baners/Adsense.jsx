import { useEffect } from 'react';

const Adsense = ({ adSlot, adFormat = 'auto', adClient, adStyle }) => {
    useEffect(() => {
        try {
            if (typeof window !== "undefined") {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (e) {
            console.error("Adsbygoogle error", e);
        }
    }, []);

    //         data-ad-format={adFormat}
    return (
        <>
            <script async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                crossorigin="anonymous"></script>
            <ins
                className="adsbygoogle"
                style={adStyle}
                //   style={{ display: 'block' }}
                data-ad-client={adClient}
                data-ad-slot={adSlot}
            ></ins>
            <script>
                (window.adsbygoogle = window.adsbygoogle || []).push({ });
            </script>
        </>
    );
};

export default Adsense;
