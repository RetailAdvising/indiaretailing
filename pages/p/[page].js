
import Builder from "@/components/Builders/Builder";
import RootLayout from '@/layouts/RootLayout';
function Page () {
    return ( <>
       <RootLayout>
          <Builder/>
       </RootLayout>
    </> );
}

export async function getServerSideProps({ params }){
      let Id = await params?.page;
      let value = await newsLanding(page);
      let data = value.message;
    
      return {
        props: { data }, revalidate: 50,
      }
}
export default Page;