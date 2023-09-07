import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import val from '@/libs/bookdetails'
import RootLayout from '@/layouts/RootLayout';
import Card from '@/components/Bookstore/Card';
import Title from '@/components/common/Title';
import AdsBaner from '@/components/Baners/AdsBaner';
import { useRouter } from 'next/router';
import { getProductDetail, insertCartItems, insertSubscription,insert_member_subscription, insert_cart_items, updateCartItems, getCartItem, deleteCartItems, load_razorpay, get_razorpay_settings, subscriptionPlans, get_subscription_plans } from '@/libs/api';
import { check_Image } from '@/libs/common';
import Modal from '@/components/common/Modal';
import { WhatsappShareButton, LinkedinShareButton, TwitterShareButton, FacebookShareButton } from 'react-share'
import LoaderButton from '@/components/common/LoaderButton';
import styles from '@/styles/checkout.module.scss';

export default function Bookstoredetail({ value, res }) {

  const [subs, setSubs] = useState();
  const [indexs, setIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [data, setData] = useState();
  const ref = useRef(null);
  const [loader,setLoader] = useState(false)

  const icons = [{ icon: "/bookstore/linkedin.svg", name: 'Linkedin' }, { icon: "/bookstore/FB.svg", name: 'Facebook' }, { icon: "/bookstore/twitter.svg", name: 'Twitter' }, { icon: "/bookstore/whatsapp.svg", name: 'Whatsapp' }]

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  });

  // Modal Popup
  const [modal, setModal] = useState('login')
  const [visible, setVisible] = useState(false)
  let [cart_items, setCartItems] = useState({});

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
    // console.log('data,',data)
    if (data) {
      data.map((res, index) => {
        if (index == i) {
          // res['active'] = true;
          res['active'] = res['active'] ? false : true;
          res['active'] ? setIndex(i) : setIndex(-1);
          setOpen(!open)
        }else{
          res['active'] = false;
        }
      })
    }
  }

  useEffect(() => {
    getCarts('');
    get_razorpay_settings()
    if (value) {
      console.log(res);
      if(value.vendor_price_list && value.vendor_price_list.length != 0){     
        if(value.has_variants == 1){
            value.price = value.vendor_price_list[0].default_variant.product_price;
            value.attribute_ids = value.vendor_price_list[0].default_variant.attribute_id;
            value.business = value.vendor_price_list[0].business;
            value.attribute = value.vendor_price_list[0].default_variant.variant_text;
        } else{
          value.price = value.vendor_price_list[0].product_price;
          value.attribute_ids = value.vendor_price_list[0].attribute_id ? value.vendor_price_list[0].attribute_id : '';
          value.business = value.vendor_price_list[0].business;
          value.attribute =  value.vendor_price_list[0].variant_text ? value.vendor_price_list[0].variant_text : '';
        }
      }
      setData(value);
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
    setLoader(true);
    if (localStorage['apikey']) {

      let val = subs.find(res => res.active == true)

      if (val) {
        // console.log(val)
        // load_razorpay(val.total_amount,val.name,'Subscription');
        // setLoader(false);
        insert_subscription(val)
      } else {
        data['count'] = 1;
        if(data['quantity'] == 0) {
          insert_cart(data,'buy_now')
        }else{
          updateCart(data,'inc')
        }

      }
    } else {
      setVisible(!visible);
      setLoader(false);
      setModal('login')
    }

  }

  async function insert_subscription(checked_plans){
    let params = {
        "party": localStorage['customer_id'],
        "subscription_plan": checked_plans.plan_name,
        "item":data['name'],
        "subscription_type":"item"
    }
    const resp = await insert_member_subscription(params);
    console.log(resp);
    setLoader(false);
    //   if (resp && resp.message && resp.message.page_content && resp.message.page_content != 0) {
    //       let datas = resp.message.page_content
    //       setpageContent(datas);
    //   } 
  }

  const [sort, setSort] = useState(false);

  async function share() {
    await setSort(!sort);
    let element = document.getElementById('dropdown');
    sort ? element.classList.add('dropdown-menu-active') : element.classList.remove('dropdown-menu-active');
  }


  const updateCart = async (dataValue, type) => {

  setLoader(true);

  if(type == 'dec' && dataValue['quantity'] == 1){
    let param = { name: dataValue.cart_id,}
    const resp = await deleteCartItems(param);
      if (resp.message.status == 'success') {
          dataValue['quantity'] = 0
          getCarts('');
          setLoader(false);
      }
   }else  if(dataValue['quantity'] > 0){
     update_cart(dataValue,type);
   }
    
}

async function insert_cart(dataValue,type){
  // console.log('dataValue',dataValue)
  let param = {
    "item_code": dataValue.name,
    "qty": 1,
    "qty_type": "",
    "cart_type": "Shopping Cart",
    "customer": localStorage['customer_id'],
    "attribute": dataValue.attribute ? dataValue.attribute : '',
    "attribute_id": dataValue.attribute_ids ? dataValue.attribute_ids : '',
    "business": dataValue.business ? dataValue.business : ''
}

  const resp = await insert_cart_items(param);
  if (resp.message && resp.message.marketplace_items) {
      type == 'buy_now' ? router.push('/cart') : null;
      getCarts('');
      setLoader(false);
  }else if(resp.message && resp.message.status == 'Failed'){
    setLoader(false)
  }
}

async function update_cart(dataValue,type){

  let param = {
    name: dataValue.cart_id,
    // qty: check_count(dataValue['quantity'],type),
    qty: type == 'inc' ? (dataValue['quantity'] + 1) : (dataValue['quantity'] - 1),
    "business": dataValue.business ? dataValue.business : '',
    qty_type: ""
  }

  const resp = await updateCartItems(param);
  if (resp.message.status == 'success') {
      router.push('/cart')
      getCarts('');
      setLoader(false)
  }else{
     setLoader(false)
  }
}



const  getCarts = async (type) => {
  cart_items = await getCartItem();
  setCartItems(cart_items);
  if(cart_items && cart_items.marketplace_items && cart_items.marketplace_items.length != 0){
    if(value.has_variants == 1){
      let getValue = cart_items.marketplace_items.find(res=>{ return res.attribute_ids == value.attribute_ids})
      value.quantity = getValue ? getValue.quantity : 0;

       if(getValue){
        value.cart_id = getValue.name;
       }

    }else{
      let getValue = cart_items.marketplace_items.find(res=>{ return res.product == value.name});
      value.quantity = getValue ? getValue.quantity : 0;

       if(getValue){
         value.cart_id = getValue.name;
       }

    }

  }else{
    value.quantity = 0
  }
}
  // async function getCustomerInfo(){
  //   // let param = {
  //   //   "doctype":"Customers",
  //   // "name":"EVT-00001",
  //   // }
  // }

  const [currentVariantIndex, setVariantsIndex] = useState(-1);

  const selectMethod = (e,index) =>{
    setVariantsIndex(index);
    data.attribute_ids = e.attribute_id;
    data.attribute = e.variant_text ;
    data.price = e.product_price;
    setData(data);
    getCarts('');

    if(subs && subs.length != 0){
      setIndex(-1);
      subs.map((res)=>{
        res['active'] = false
      }) 
      
      setSubs(subs);
    }
  };

  return (
    <>
      <RootLayout>
        {data ?  <Skeleton /> :
          (data && Object.keys(data).length != 0) && <div className='container'>
          <div className={`flex justify-between flex-wrap gap-[15px] py-8`}>
            <div className={`flex-[0_0_calc(40%_-_10px)] md:p-[10px] md:hidden flex flex-col md:pt-[20px] md:flex-[0_0_calc(100%_-_0px)]`}>
              {/* flex-[0_0_calc(100%_-_10px)] */}
              <div className={``}>
                {(data.images && data.images.length != 0) ? <Image className={`w-full h-[665px]`} src={check_Image((data.images[1] && data.images[1].detail_image) ? data.images[1].detail_image : data.images[0].detail_image)} height={200} width={300} alt={data.item_title} /> :
                  <Image className={`w-full h-[665px]`} src={check_Image(data.image)} height={200} width={300} alt={data.item_title} />}
              </div>
              <div className='text-center pt-[15px]'>
                <button className={`w-full h-[40px] border`}>Preview</button>
              </div>
            </div>


            {/* p-[20px] flex flex-col justify-between*/}
            <div className={` flex-[0_0_calc(60%_-_10px)] md:p-[10px] lg:p-[20px] md:flex-[0_0_calc(100%_-_0px)]`}>
              <div className={`flex md:p-[10px] lg:gap-5 md:gap-[5px] lg:h-[40px] md:pb-[10px]`}>
                <h6 className={`md:text-[16px] line-clamp-2 lg:text-[20px] md:w-[calc(90%_-_10px)] md:mr-[10px] font-semibold`}>{data.item_title}</h6>
                <div className='dropdowns md:w-[calc(10%_-_0px)] lg:w-[130px] md:h-[15px] md:relative cursor-pointer lg:pr-[40px] md:justify-end md:flex'>
                  <Image onClick={share} ref={ref} className={`dropdowns transition-all delay-500`} src={'/share.svg'} height={10} width={15} alt={'share'} />
                  {/* {sort && */}
                    <div className={`md:absolute md:right-0 dropdown-menu p-[10px] grid justify-center`} style={{ borderRadius: '10px', width: '150px' }} id='dropdown'>
                      {icons && icons.map((res, index) => {
                        return (
                          <div key={index}>
                            {res.name == 'Linkedin' && <LinkedinShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                              <span className='h-[18px] w-[18px]'><Image src={res.icon} className='h-[18px] object-contain' height={40} width={40} alt={'imgs'} /></span>
                              <p>{res.name}</p>
                            </LinkedinShareButton>}
                            {res.name == 'Facebook' && <FacebookShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                              <span className='h-[18px] w-[18px]'><Image src={res.icon} className='h-[18px] object-contain' height={40} width={40} alt={'imgs'} /></span>
                              <p>{res.name}</p>
                            </FacebookShareButton>}
                            {res.name == 'Twitter' && <TwitterShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                              <span className='h-[18px] w-[18px]'><Image src={res.icon} className='h-[18px] object-contain' height={40} width={40} alt={'imgs'} /></span>
                              <p>{res.name}</p>
                            </TwitterShareButton>}
                            {res.name == 'Whatsapp' && <WhatsappShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                              <span className='h-[18px] w-[18px]'><Image src={res.icon} className='h-[18px] object-contain' height={40} width={40} alt={'imgs'} /></span>
                              <p>{res.name}</p>
                            </WhatsappShareButton>}
                          </div>
                        )
                      })}
                    </div>
                  {/* } */}
                </div>
              </div>

              <div className={`flex md:p-[0_10px_10px_10px] lg:hidden flex-col`}>
                {/* flex-[0_0_calc(100%_-_10px)] */}
                <div className={`md:h-[430px] md:p-[0px_10px_10x_10px]`}>
                  {(data.images && data.images.length != 0) ? 
                    <Image className={`w-full lg:h-[665px] md:h-[425px] object-contain`} src={check_Image((data.images[1] && data.images[1].detail_image) ? data.images[1].detail_image : data.images[0].detail_image)} height={200} width={300} alt={data.item_title} /> :
                    <Image className={`w-full lg:h-[665px] md:h-[425px] object-contain`} src={check_Image(data.image)} height={200} width={300} alt={data.item_title} />}
                </div>
                <div className='text-center pt-[15px]'>
                  <button className={`w-full h-[40px] border`}>Preview</button>
                </div>
              </div>

              <div className={`flex md:p-[10px] items-center pt-[10px] gap-5`}>
                {/* <p className={`p-[5px_12px] border rounded-[10px] cursor-pointer`}>PDF</p> */}
                <p className={`text-[20px] text-red font-semibold`}>{formatter.format(data.price)}</p>
              </div>

              {data.vendor_price_list && data.vendor_price_list[0] && data.vendor_price_list[0].variants && data.vendor_price_list[0].variants.length != 0 &&
                 <div className='flex gap-[10px] lg:m-[18px_0px_0_0px] md:m-[18px_10px_0_10px] items-center'>
                    {data.vendor_price_list[0].variants.map((vendor,index)=>{
                      return(
                        <div key={index} onClick={() => selectMethod(vendor,index)} className={`flex ${styles.payment_sec} ${(data.attribute_ids == vendor.attribute_id && (indexs < 0)) ? 'active_border' : null} h-[45px] cursor-pointer gap-[5px] items-center border rounded-[5px] p-[4px_8px] `}>
                          <input className={styles.input_radio} checked={data.attribute_ids == vendor.attribute_id && (indexs < 0)} type="radio"/>
                          <p className='text-[12px]'>{vendor.variant_text}</p>
                        </div>
                      )
                      }) 
                    }
                  </div> 
              }

              {/* p-[20px] */}
              {(subs && subs.length != 0) && <div className={`grid grid-cols-3 md:gap-[10px] md:p-[10px] lg:gap-[30px] lg:w-[570px] lg:m-[0_auto] lg:p-[20px] justify-between`}>

                {subs.map((item, index) => {
                  return (
                    <div className={`border cursor-pointer ${(index == indexs) ? 'activeBorder' : ''} flex flex-col justify-center text-center p-[10px_8px] rounded-[10px] lg:h-[130px] md:h-[85px]`} onClick={() => handleSubs(res, item, index)} key={index}>
                      <p className='lg:text-[12px] md:text-[10px] font-semibold'>{item.plan_name}</p>
                      <p className='lg:py-[6px] md:p-[2px] text-[20px] md:text-[16px] font-semibold'>{formatter.format(item.total_amount)}</p>
                      {item.features && item.features.map((f, index) => {
                        return (<p key={index} style={{fontWeight:'400'}} className='lg:text-[10px] sub_title md:text-[10px]'>{f.features}</p>)
                      })}
                      {/* <p className='text-[14px]'>{res.issues}</p> */}
                    </div>
                  )
                })}
              </div>}

              <div className={`md:p-[10px] text-center md:p-[10px_0_30px_0] lg:p-[20px_0_40px_0] border_bottom mb-[20px]`}>

                {/* (value.quantity == 0 || indexs >= 0) &&  */}

                <LoaderButton loader={loader} width={'lg:w-[60%] md:w-[85%]'} image_left={indexs >= 0 ? '/bookstore/subscribe.svg' :'/bookstore/addtocart.svg'} button_name={indexs >= 0 ? 'Subscribe' : 'Add to Cart'} buttonClick={addToCart} />
               

                {/* {(value.quantity > 0 && indexs < 0) &&
                 <div className='flex items-center justify-between p-[10px] border border-slate-100 rounded-[5px] h-[30px] w-[85px] gap-[10px]'>
                  <Image onClick={() => loader ? null : updateCart(value, 'dec')} className='h-[20px] cursor-pointer w-[10px]' src={'/cart/_.svg'} height={20} width={20} alt='minus' />
                  {loader ? <div class="animate-spin rounded-full h-[15px] w-[15px] border-l-2 border-t-2 border-black"></div> : <p className='font-semibold'>{value.quantity}</p>}
                  <Image onClick={() => loader ? null :  updateCart(value, 'inc')} className='h-[20px] cursor-pointer w-[10px]' src={'/cart/+.svg'} height={20} width={20} alt='plus' />
                 </div>
                }  */}
                

              </div>

              <Modal modal={modal} show={show} visible={visible} hide={hide} />

              {data.full_description &&
                <div className='px-[10px] border_bottom pb-[10px] mb-[10px]'>
                  <h6 className='pb-[10px] font-semibold'>This Issue</h6>
                  {/* <div className='line-clamp-[10]' dangerouslySetInnerHTML={{__html:data.full_description}} ></div> */}
                  <div className='line-clamp-[8]' dangerouslySetInnerHTML={{ __html: data.full_description }} />
                  {/* <p className='font-semibold'>Read More...</p> */}
                </div>
              }
              <div className='grid grid-cols-3 md:p-[0_10px_10px_10px] md:gap-[5px] lg:gap-[10px] lg:pt-[10px]'>
                <div className='flex cursor-pointer items-center gap-[10px]'><p><Image height={15} className='h-full lg:w-[30px] md:w-[20px]' width={15} alt={''} src={'/bookstore/digital.svg'} /></p><span style={{fontWeight:'600'}} className='md:text-[12px] sub_title'> Digital Subscription</span></div>
                <div className='flex cursor-pointer items-center gap-[10px]'><p><Image height={15} className='h-full lg:w-[30px] md:w-[20px]' width={15} alt={''} src={'/bookstore/cancel.svg'} /></p><span style={{fontWeight:'600'}} className='md:text-[12px] sub_title'> Cancel Anytime</span></div>
                <div className='flex cursor-pointer items-center gap-[10px]'><p><Image height={15} className='h-full lg:w-[30px] md:w-[20px]' width={15} alt={''} src={'/bookstore/payment.svg'} /></p><span style={{fontWeight:'600'}} className='md:text-[12px] sub_title'> Secure Payment</span></div>
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
          </div>
         }
      </RootLayout>

    </>
  )
}


export async function getServerSideProps({ params }) {

  let Id = await params.detail;

  let param = {
    "route": Id,
    // "customer": ""
  }
  let resp = await getProductDetail(param);
  let value = resp.message;

  // let cart_items = await getCartItem();

  // console.log('cart_items',cart_items);
 
  //   if(cart_items && cart_items.marketplace_items && cart_items.marketplace_items.length != 0){
  //     let getValue = cart_items.marketplace_items.find(res=>{ return res.product == value.name})
  //     value.quantity = getValue.quantity
  //   }else{
  //     value.quantity = 0
  //   }

  // let subscription = await subscriptionPlans();
  // const res = subscription;

  let data = {"res_type":"item"}
  const subscription = await get_subscription_plans(data);
  let res =[]
  if (subscription && subscription.message && subscription.message.status && subscription.message.status == 'success') {
      res = subscription.message.message;
  } 

  return {
    props: { value, res }
  }
}



const Skeleton = () => {
  return (
    <>
      <div class="p-4 bg-white shadow-md rounded-md">
        <div class="animate-pulse">
          <div class="h-4 bg-slate-300 rounded w-3/4 mb-2"></div>
          <div class="h-4 bg-slate-300 rounded w-2/4 mb-2"></div>
          <div class="h-4 bg-slate-300 rounded w-4/4"></div>
        </div>
      </div>
    </>
  )}