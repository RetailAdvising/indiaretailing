import Head from 'next/head'
import React from 'react'
import { domain } from '@/libs/config/siteConfig'

// export const metadata = {
//     title: "IndiaRetailing",
//     openGraph: {
//         title: "Home",
//         image: '/ads_baner.png'
//     }
// }
const DEFAULT_OG_IMAGE = '/indiaretail.png'
export default function SEO({ title = "India Reatiling",
    description = "This is IndiaRetailing and its about news and articles based on the popular site.",
    siteName = "https://indiaretail.vercel.app/",
    canonical = 'https://indiaretail.vercel.app/',
    ogImage = DEFAULT_OG_IMAGE,
    ogType = "website",
    twitterHandle = "@d__indiaRetail" }) {
    return (
        <>
            {/* <html> */}
                <Head>
                    <title key="title">{`${title} – ${siteName}`}</title>
                    <meta name="description" content={description} />
                    <meta key="og_type" property="og:type" content={ogType} />
                    <meta key="og_title" property="og:title" content={title} />
                    <meta key="og_description" property="og:description" content={description} />
                    <meta key="og_locale" property="og:locale" content="en_IE" />
                    <meta key="og_site_name" property="og:site_name" content={siteName} />
                    <meta key="og_url" property="og:url" content={canonical ?? domain} />
                    <meta key="og_site_name" property="og:site_name" content={siteName} />
                    <meta
                        key="og_image"
                        property="og:image"
                        content={ogImage ?? DEFAULT_OG_IMAGE}
                    />
                    <meta
                        key="og_image:alt"
                        property="og:image:alt"
                        content={`${title} | ${siteName}`}
                    />
                    <meta key="og_image:width" property="og:image:width" content="1200" />
                    <meta key="og_image:height" property="og:image:height" content="630" />

                    <meta name="robots" content="index,follow" />

                    <meta
                        key="twitter:card"
                        name="twitter:card"
                        content="summary_large_image"
                    />
                    <meta
                        key="twitter:site"
                        name="twitter:site"
                        content={twitterHandle}
                    />
                    <meta
                        key="twitter:creator"
                        name="twitter:creator"
                        content={twitterHandle}
                    />
                    <meta
                        key="twitter:title"
                        property="twitter:title"
                        content={title}
                    />
                    <meta
                        key="twitter:description"
                        property="twitter:description"
                        content={description}
                    />

                    <link rel="canonical" href={canonical ?? domain} />

                    <link rel="shortcut icon" href="/ir_2023.png" />
                </Head>
            {/* </html> */}
        </>
    )
}
