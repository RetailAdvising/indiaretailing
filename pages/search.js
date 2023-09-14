import { useRouter } from 'next/router'
import React, { useRef, useEffect, useState } from 'react'
import { search_product, checkMobile } from '@/libs/api';
import RootLayout from '@/layouts/RootLayout';
import Cards from '@/components/common/Cards';
import Image from 'next/image'
import { check_Image } from '@/libs/common'
import BreadCrumb from '@/components/common/BreadCrumb';

export default function search({searchTxt}) {
    
    
    // Search
    let [enableSearch, setEnableSearch] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    let [searchValue, setSearchValue] = useState("");
    let [isMobile, setIsmobile] = useState();
    let [breadCrumbs,setBreadCrumbs] = useState([
      {name:'Home',route:'/'},
      {name:'Search',route:'/search/searchText='},
    ])

    const router = useRouter();
    let cardref = useRef();
    let page_no = 1
    let no_product = false;

    useEffect(()=>{
        if(searchTxt && searchTxt != ""){
            searchValue = searchTxt;
            setSearchValue(searchTxt)
            searchText(searchTxt)
            enableSearch = false;
            setEnableSearch(false)
            //  let array_values = breadCrumbs.push({name:searchValue})
            setBreadCrumbs((d)=> d = [...d,{name:searchValue}]);

        }else{
           setSearchResult([]);
           setEnableSearch(true)
        }

        const intersectionObserver = new IntersectionObserver(entries => {

          if (entries[0].intersectionRatio <= 0) return;
          
          if(!no_product && !enableSearch){
              page_no > 1 ? searchText(searchValue) : null
              page_no = page_no + 1
          }
       });

       intersectionObserver.observe(cardref?.current);

       return () => {
          cardref?.current && intersectionObserver.unobserve(cardref?.current)
       }

    },[router.query])  

    async function searchText(eve){
     let value = eve;
      if(value){
        let params = {search_txt:value, page_no: page_no, page_length: 10}
        const resp = await search_product(params);
        // console.log(resp);
         if(resp && resp.status == 'success'){
           if(resp.data.length != 0){ 
            setSearchResult((d) => d = page_no == 1 ? resp.data : [...d, ...resp.data]);
           }else{
            no_product = true;
           }
         }else{
           setSearchResult([]);
         }
      } 

      checkIsMobile();
        window.addEventListener('resize',checkIsMobile)
        return () => {
          window.removeEventListener('resize', checkIsMobile);
      };
    } 

    
    const  checkIsMobile = async () => {
      isMobile = await checkMobile();
      setIsmobile(isMobile);
    }

    async function searchText_1(eve){
      let value = eve.target.value;
      searchText(value);
    }

    const clearSearch = (data) => {
      let element = document.getElementById(data).value = '';
      setSearchResult([]);
    }

    const navigateSearchScreen = (data) =>{
      let element = document.getElementById(data).value;
      if(element && element != ''){
        setSearchResult([]);
        router.push('/search?searchText='+ element);
      }
    }

    return (
      <>
        <RootLayout>
        {/* onKeyPress={()=>{navigateSearchScreen('search')}} */}
        {enableSearch &&
           <div className={'p-[10px]'}>
              <div className={`flex border  rounded-[10px]`}>
                <input id='search' className={'border-[0px] p-[10px] w-full rounded-[10px]'}  onChange={searchText_1}  type="text" placeholder='Search here...' name="search"></input>
                {searchValue && <div onClick={()=>{clearSearch('search')}} className='cursor-pointer flex items-center justify-center px-[10px] h-[45px]'><Image height={20} priority width={20} alt='search' src={'/cart/close.svg'} className="h-[24]"></Image></div>}
                <div onClick={()=>{navigateSearchScreen('search')}} className='border-l-[1px] p-[10px] cursor-pointer border-l-slate-100 flex items-center justify-center'><Image style={{ objectFit: 'contain' }} height={60} priority width={24} alt='search' src={'/search.svg'} className=""></Image></div>
              </div>
              <div className='h-[calc(100vh_-_150px)] overflow-auto scrollbar-hide' >
              {searchResult && searchResult.length == 0 ? <EmptySection searchValue ={searchValue} /> :   
                searchResult.map((res, index) => {
                  return (
                    <div onClick={()=>{navigateDetail(res)}} className='flex items-center justify-between cursor-pointer border-b-[1px] border-b-slate-100 last-child:border-b-[0px]  p-[10px]'>
                      <div className='flex items-center gap-[8px]'>
                          <div className='flex items-center justify-center h-[55px]'><Image className='h-[50px]' src={check_Image(res.product_image)} height={50} width={50} alt={res.title} /></div>
                          <h6 className='text-[15px] line-clamp-1 font-semibold'>{res.title}</h6>
                      </div>
                      <div className='flex items-center justify-center'><Image height={8} priority width={8} alt='search' src={'/forwardIcon.svg'} className="opacity-50"></Image></div>
                    </div>
                  )
                })}
              </div>

            </div>
        }

       {!enableSearch &&
         <>
         {!isMobile && <BreadCrumb BreadCrumbs={breadCrumbs}/>}
          <div className='lg:min-h-[400px] md:min-h-[500px] grid md:grid-cols-2 grid-cols-5 gap-[15px] container py-[20px] md:px-[10px]'>
            {searchResult && searchResult.length == 0 ? <EmptySection searchValue ={searchValue} /> :    <Cards cardClass={"mb-[10px]"} noPrimaryText={true} borderRadius={"rounded-[10px_10px_0_0]"} height={"lg:h-[180px] m-[0px_auto] object-contain p-[10px] md:h-[150px]"} searchNavigation={true} check={true} isBorder={true} data={searchResult} />}
          </div>
         </>
        } 

        <div className='more' ref={cardref}></div>

        </RootLayout> 
      </>
    )
}

export async function getServerSideProps({ query }) {
    let searchTxt = query.searchText
    return {
     props : { searchTxt }
    }
 }

 const EmptySection = ({searchValue} ) => {
  return (
    <>
     <div className='h-[calc(100vh_-_140px)] flex flex-col items-center justify-center'>
      <div className='h-[75px]'>
        <Image className='h-[60px]' height={66} priority width={200} alt=''src={searchValue ? '/empty_states/no-news.svg' : '/empty_states/no-comment.svg'}></Image>
      </div>
      <h6 className='text-[15px] font-semibold py-[10px]'>{searchValue ? 'No new found' : 'Enter the text to search a latest news'}</h6>
     </div>
    </>
  )
} 
