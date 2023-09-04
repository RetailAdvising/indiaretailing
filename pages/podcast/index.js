import RootLayout from '@/layouts/RootLayout'
import PageData from '@/libs/Podcast'
import HomePodcast from '@/components/Podcast/HomePodcast';

export default function Podcast() {

    return (
        <>
            <RootLayout>
                {(PageData && PageData.page_sections) && PageData.page_sections.map((res, index) => {
                    return (
                        <HomePodcast key={index} data={res} />
                    )
                })}
            </RootLayout>

        </>
    )
}