import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import val from '@/libs/bookdetails'
import RootLayout from '@/layouts/RootLayout';
import Card from '@/components/Bookstore/Card';
import Title from '@/components/common/Title';
import AdsBaner from '@/components/Baners/AdsBaner';
import { useRouter } from 'next/router';
import { getProductDetail, insertCartItems, insertSubscription, subscriptionPlans } from '@/libs/api';
import { check_Image } from '@/libs/common';
import Modal from '@/components/common/Modal';
import { WhatsappShareButton, LinkedinShareButton, TwitterShareButton, FacebookShareButton } from 'react-share'

export default function Bookstoredetail({ value, res }) {
  const [subs, setSubs] = useState();
  const [indexs, setIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [data, setData] = useState();
  const ref = useRef(null)
  const icons = [{ icon: "/bookstore/linkedin.svg", name: 'Linkedin' }, { icon: "/bookstore/FB.svg", name: 'Facebook' }, { icon: "/bookstore/twitter.svg", name: 'Twitter' }, { icon: "/bookstore/whatsapp.svg", name: 'Whatsapp' }]

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  });

  // Modal Popup
  const [modal, setModal] = useState('login')
  const [visible, setVisible] = useState(false)

  function show() {
    setVisible(!visible);
  }

  function hide() {
    setVisible(!visible)
    if (localStorage['apikey']) {
      router.reload();
    }
  }

  // Active Plans
  const handleSubs = (data, e, i) => {
    if (data) {
      data.map((res, index) => {
        if (index == i) {
          res['active'] = res['active'] ? false : true;
          setIndex(i);
          setOpen(!open)
        }
      })
    }
  }

  useEffect(() => {
    if (value) {
      console.log(value);
      setData(value)
    }
    if (res && res.length != 0) {
      setSubs(res)
    }


    const handleClickOutside = (event) => {
      let el = document.getElementById('dropdown').classList;
      let classs = Array.from(el);
      let out = classs.find(res => res == 'dropdown-menu-active');
      if (ref.current && !ref.current.contains(event.target) && out) {
        el.remove('dropdown-menu-active')
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };

  }, [router.query])

  async function addToCart() {
    if (localStorage['apikey']) {

      let val = subs.find(res => res.active == true)

      if (val) {
        let param = {
          party: localStorage['customer_id'],
          party_name: localStorage['userid'],
          subscription_plan: val.name
        };
        const resp = await insertSubscription(param)

      } else {
        data['count'] = 1;
        let param = {
          item_code: data.name,
          qty: data.count,
          qty_type: "",
          rate: data.price,
          cartType: "Shopping Cart",
          customer: localStorage['customer_id']
        };
        const resp = await insertCartItems(param);
        if (resp.message) {
          router.push('/cart');
        }
      }
    } else {
      setVisible(!visible)
      setModal('login')
    }

  }

  const [sort, setSort] = useState(false);
  function share() {
    setSort(!sort);
    let element = document.getElementById('dropdown');
    sort ? element.classList.add('dropdown-menu-active') : element.classList.remove('dropdown-menu-active');
  }

  // async function getCustomerInfo(){
  //   // let param = {
  //   //   "doctype":"Customers",
  //   // "name":"EVT-00001",
  //   // }
  // }


  return (
    <>
      <RootLayout>
        {/* <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7092137020289904641" height="725" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe> */}
        {(data && Object.keys(data).length != 0) && <div className='container'>
          <div className={`flex justify-between flex-wrap gap-[15px] p-[30px]`}>
            <div className={`flex-[0_0_calc(40%_-_10px)] md:hidden flex flex-col md:pt-[20px] md:flex-[0_0_calc(100%_-_10px)]`}>
              {/* flex-[0_0_calc(100%_-_10px)] */}
              <div className={``}>
                {(data.images && data.images.length != 0) ? <Image className={`w-full h-[665px]`} src={check_Image((data.images[1] && data.images[1].detail_image) ? data.images[1].detail_image : data.images[0].detail_image)} height={200} width={300} alt={data.item_title} /> :
                  <Image className={`w-full h-[665px]`} src={check_Image(data.image)} height={200} width={300} alt={data.item_title} />}
              </div>
              <div className='text-center pt-[15px]'>
                <button className={`w-full h-[40px] border`}>Preview</button>
              </div>
            </div>


            {/* p-[20px] */}
            <div className={`flex flex-col justify-between flex-[0_0_calc(60%_-_10px)] lg:p-[20px] md:flex-[0_0_calc(100%_-_10px)]`}>
              <div className={`flex gap-5 h-[40px]`}>
                <h6 className={`text-[20px] font-semibold`}>{data.item_title}</h6>
                <div className='dropdowns w-[130px] cursor-pointer pr-[40px]'>
                  <Image onClick={share} ref={ref} className={`dropdowns transition-all delay-500`} src={'/share.svg'} height={10} width={15} alt={'share'} />
                  <div className={`dropdown-menu p-[20px] grid justify-center`} style={{ borderRadius: '10px', width: '190px' }} id='dropdown'>
                    {icons && icons.map((res, index) => {
                      return (
                        <div key={index}>
                          {res.name == 'Linkedin' && <LinkedinShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                            <Image src={res.icon} className='h-[23px] w-[21px]' height={40} width={40} alt={'imgs'} />
                            <p>{res.name}</p>
                          </LinkedinShareButton>}
                          {res.name == 'Facebook' && <FacebookShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                            <Image src={res.icon} className='h-[25px] w-[15px]' height={40} width={40} alt={'imgs'} />
                            <p>{res.name}</p>
                          </FacebookShareButton>}
                          {res.name == 'Twitter' && <TwitterShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                            <Image src={res.icon} className='h-[20px] w-[18px]' height={40} width={40} alt={'imgs'} />
                            <p>{res.name}</p>
                          </TwitterShareButton>}
                          {res.name == 'Whatsapp' && <WhatsappShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                            <Image src={res.icon} className='h-[23px] w-[21px]' height={40} width={40} alt={'imgs'} />
                            <p>{res.name}</p>
                          </WhatsappShareButton>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className={`flex lg:hidden flex-col`}>
                {/* flex-[0_0_calc(100%_-_10px)] */}
                <div className={``}>
                  {(data.images && data.images.length != 0) ? <Image className={`w-full h-[665px]`} src={check_Image((data.images[1] && data.images[1].detail_image) ? data.images[1].detail_image : data.images[0].detail_image)} height={200} width={300} alt={data.item_title} /> :
                    <Image className={`w-full h-[665px]`} src={check_Image(data.image)} height={200} width={300} alt={data.item_title} />}
                </div>
                <div className='text-center pt-[15px]'>
                  <button className={`w-full h-[40px] border`}>Preview</button>
                </div>
              </div>

              <div className={`flex items-center pt-[10px] gap-5`}>
                <p className={`p-[5px] border rounded-[10px] cursor-pointer`}>pdf</p>
                <p className={`text-[20px] text-red font-semibold`}>{formatter.format(data.price)}</p>
              </div>
              {/* p-[20px] */}
              {(subs && subs.length != 0) && <div className={`grid grid-cols-3 gap-[10px] lg:p-[20px] md:p-[10px_0] justify-between`}>

                {subs.map((item, index) => {
                  return (
                    <div className={`border cursor-pointer ${(index == indexs && open) ? 'activeBorder' : ''} flex flex-col justify-between text-center p-[10px] rounded-[10px] lg:h-[130px] md:h-[110px]`} onClick={() => handleSubs(res, item, index)} key={index}>
                      <p className='lg:text-[16px] md:text-[13px] font-semibold'>{item.plan_name}</p>
                      <p className='text-[20px] md:text-[13px] font-semibold'>{formatter.format(item.total_amount)}</p>
                      {item.features && item.features.map((f, index) => {
                        return (<p key={index} className='lg:text-[14px] md:text-[13px]'>{f.features}</p>)
                      })}
                      {/* <p className='text-[14px]'>{res.issues}</p> */}
                    </div>
                  )
                })}
              </div>}

              <div className={`text-center pt-[20px] border_bottom pb-[40px] mb-[20px]`}><button onClick={addToCart} className={`primary_btn inline-flex justify-center items-center h-[45px] w-[50%] rounded-[5px] gap-[15px]`}><Image className={``} height={10} width={20} alt={'add cart'} src={'/bookstore/addtocart.svg'} />{open ? 'Subscribe' : 'Add to Cart'}</button></div>

              <Modal modal={modal} show={show} visible={visible} hide={hide} />

              <div className='px-[10px] border_bottom pb-[10px] mb-[10px]'>
                <h6 className='pb-[10px] font-semibold'>This Issue</h6>
                {/* <div className='line-clamp-[10]' dangerouslySetInnerHTML={{__html:data.full_description}} ></div> */}
                <div className='line-clamp-[8]' dangerouslySetInnerHTML={{ __html: data.full_description }} />
                {/* <p className='font-semibold'>Read More...</p> */}
              </div>

              <div className='grid grid-cols-3 gap-[10px] pt-[10px]'>
                <div className='flex cursor-pointer items-center gap-[10px]'><p><Image height={15} className='h-full w-[30px]' width={15} alt={''} src={'/bookstore/digital.svg'} /></p><span> Digital Subscription</span></div>
                <div className='flex cursor-pointer items-center gap-[10px]'><p><Image height={15} className='h-full w-[30px]' width={15} alt={''} src={'/bookstore/cancel.svg'} /></p><span> Cancel Anytime</span></div>
                <div className='flex cursor-pointer items-center gap-[10px]'><p><Image height={15} className='h-full w-[30px]' width={15} alt={''} src={'/bookstore/payment.svg'} /></p><span> Secure Payment</span></div>
              </div>

            </div>

          </div>

          {/* Section - 2 */}

          {data.related_products && <div className={`p-[30px]`}>
            <Title data={{ title: 'Previous Issues' }} seeMore={true} />
            <div className={`grid gap-[20px] grid-cols-5 md:grid-cols-2 `}><Card category={router.query.list} check={true} data={data.related_products.slice(0, 5)} boxShadow={true} /></div>
          </div>}

          {/* Section - 3 */}

          {data.related_products && <div className={`p-[30px] flex-wrap flex gap-[20px] justify-between`}>
            <div className='flex-[0_0_calc(70%_-_20px)] md:flex-[0_0_calc(100%_-_10px)]'>
              <Title data={{ title: 'Other Magazines' }} seeMore={true} />
              <div className={`flex gap-[20px] flex-wrap `}><Card category={router.query.list} flex={'flex-[0_0_calc(25%_-_20px)] md:flex-[0_0_calc(50%_-_10px)]'} data={data.related_products.slice(0, 4)} check={true} boxShadow={true} /></div>
            </div>
            <div className='flex-[0_0_calc(30%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]'>
              <AdsBaner data={val.section_3.col_2} />
            </div>
          </div>}

          {/* Section - 4 */}

          {(data.other_group_items && data.other_group_items.data && data.other_group_items.data.length != 0) && <div className={`p-[30px]`}>
            <Title data={data.other_group_items} seeMore={true} />
            <div className={`grid gap-[20px] grid-cols-5 md:grid-cols-2 `}><Card category={router.query.list} check={true} data={data.other_group_items.data.slice(0, 5)} boxShadow={true} /></div>
          </div>}
        </div>}

      </RootLayout>

    </>
  )
}


export async function getServerSideProps({ query }) {
  // let Id = await params?.id;
  let Id = await query?.id;
  // console.log(query);
  // let Id = 'beauty-wellness';
  let param = {
    "Product": Id,
    "customer": ""
  }
  let resp = await getProductDetail(param);
  let value = resp.message;
  // let value = {};

  let subscription = await subscriptionPlans();
  const res = subscription.message;
  // const res = [];

  return {
    props: { value, res }
  }
}