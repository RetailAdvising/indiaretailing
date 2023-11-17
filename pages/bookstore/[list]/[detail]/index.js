import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import RootLayout from '@/layouts/RootLayout';
import Card from '@/components/Bookstore/Card';
import Title from '@/components/common/Title';
import AdsBaner from '@/components/Baners/AdsBaner';
import { useRouter } from 'next/router';
import { getProductDetail, insertCartItems, insertSubscription,insert_member_subscription, make_payment_entry, insert_cart_items, updateCartItems, getCartItem, deleteCartItems , get_razorpay_settings, subscriptionPlans, get_subscription_plans,update_no_of_shares,getAdvertisements } from '@/libs/api';
import { check_Image } from '@/libs/common';
import Modal from '@/components/common/Modal';
import { WhatsappShareButton, LinkedinShareButton, TwitterShareButton, FacebookShareButton } from 'react-share'
import LoaderButton from '@/components/common/LoaderButton';
import styles from '@/styles/checkout.module.scss';
import AlertUi from '@/components/common/AlertUi';
import SEO from '@/components/common/SEO';
import Sliders from '@/components/Sliders/index'
import Dropdowns from '@/components/common/Dropdowns'
// import PageFlip from 'react-pageflip';
// import { Document, Page } from 'react-pdf';
// import BreadCrumb from '@/components/common/BreadCrumb';
// import Razorpay from 'razorpay';
import { Nunito } from 'next/font/google'
const nunito = Nunito({
    weight: ["300","400","500","600","700"],
    display: "block",
    preload: true,
    style: 'normal',
    subsets: ["latin"],
    variable: '--font-inter',
  })
export default function Bookstoredetail({ value, res,ads }) {

  const [subs, setSubs] = useState();
  const [indexs, setIndex] = useState(-1);
  const [imageIndex, setIndexImage] = useState(-1);
  const [Onetime, setOnetime] = useState(-1);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [data, setData] = useState();
  const [razorpay_settings, setRazorpay_settings] = useState({}) ;

  const ref = useRef(null);
  const [loader,setLoader] = useState(false)
  // const [variants,setVariants] = useState([{'name':'PDF','selected':true},{'name':'PRINT','selected':false}])
  const [enableModal,setEnableModal] = useState(false)
  const [alertMsg,setAlertMsg] = useState({})
  let content_type = 'PDF';

  const icons = [{ icon: "/bookstore/linkedin.svg", name: 'Linkedin' }, { icon: "/bookstore/FB.svg", name: 'Facebook' }, { icon: "/bookstore/twitter.svg", name: 'Twitter' }, { icon: "/bookstore/whatsapp.svg", name: 'Whatsapp' }]
  
  let [breadCrumbs,setBreadCrumbs] = useState([{name:'Home',route:'/'}])

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



  useEffect(() => {
    if(typeof window !== 'undefined'){
      getCarts('');
      get_razor_pay_values();
      if (value) {
        // console.log(value,'before');
        // console.log(res);
        check_main_image(value)
        let routPath = router.asPath.split('/')
        if(routPath && routPath.length != 0){
          routPath.map((res,i)=>{
            if(i > 0){
              setBreadCrumbs((d)=> d = [...d,{name:res,route:'/'+ res}]);
            }
          })
        }
        // if(value.vendor_price_list && value.vendor_price_list.length != 0){     
        //   if(value.has_variants == 1){
        //       value.price = value.vendor_price_list[0].default_variant.product_price;
        //       value.old_price = value.vendor_price_list[0].default_variant.old_price;
        //       value.attribute_ids = value.vendor_price_list[0].default_variant.attribute_id;
        //       value.business = value.vendor_price_list[0].business;
        //       value.attribute = value.vendor_price_list[0].default_variant.variant_text;
        //   } else{
        //     value.price = value.vendor_price_list[0].product_price;
        //     value.old_price = value.vendor_price_list[0].old_price;
        //     value.attribute_ids = value.vendor_price_list[0].attribute_id ? value.vendor_price_list[0].attribute_id : '';
        //     value.business = value.vendor_price_list[0].business;
        //     value.attribute =  value.vendor_price_list[0].variant_text ? value.vendor_price_list[0].variant_text : '';
        //   }
        // }

        if(value.product_variant_group && value.product_variant_group.length != 0){
          if(value.has_variants == 1){
            value.attribute_ids = value.product_variant_group[0].attribute_id;
            value.business = value.restaurant;
            value.attribute = value.product_variant_group[0].attribute;

            // setPlans(value.product_variant_group[0]);
            value.product_variant_group[0].attribute && setSubs(value.product_variant_group[0].value);
            // setTimeout(() => {
              value.product_variant_group[0].attribute && setOnetimeAsDefault(value.product_variant_group[0].value);
            // }, 200);
          }else{
            // value.price = value.vendor_price_list[0].product_price;
            //     value.old_price = value.vendor_price_list[0].old_price;
            //     value.attribute_ids = value.vendor_price_list[0].attribute_id ? value.vendor_price_list[0].attribute_id : '';
            //     value.business = value.vendor_price_list[0].business;
            //     value.attribute =  value.vendor_price_list[0].variant_text ? value.vendor_price_list[0].variant_text : '';
          }
        }

        // console.log(value,'After');
        setData(value);
      }
  
      // if (res && res.length != 0) {
      //   setOnetimeAsDefault();
      //   setPlans(content_type);
      // }
  
  
      // const handleClickOutside = (event) => {
      //   let el = document.getElementById('dropdown').classList;
      //   let classs = Array.from(el);
      //   let out = classs.find(res => res == 'dropdown-menu-active');
      //   if (ref.current && !ref.current.contains(event.target) && out) {
      //     el.remove('dropdown-menu-active')
      //   }
      // };
      // document.addEventListener('click', handleClickOutside, true);
      // return () => {
      //   document.removeEventListener('click', handleClickOutside, true);
      // };
    }

  }, [router.query])

  async function addToCart() {
    setLoader(true);
    // console.log(localStorage['apikey']);
    if (localStorage && localStorage['apikey']) {

      let val = subs && subs.length != 0 ? subs.find(res => res.active == true) : undefined;
      if(val.stock > 0){
        if (val && val.is_subscription == 1) {
          if(val.stock > 0){
            insert_subscription(val)
          }else{
            setAlertMsg({message: 'No stock for this book'});
            setEnableModal(true)
            setLoader(false);
          }
        } else {
          data['count'] = 1;
          if(data['quantity'] == 0) {
            insert_cart(data,'buy_now',val ? val : undefined)
          }else{
            updateCart(data,'inc')
          }
  
        }
      }else{
        setAlertMsg({message: 'No stock for this book'});
          setEnableModal(true)
          setLoader(false);
      }
      // val.item__type != "Onetime Purchase"
    } else {
      setVisible(!visible);
      setLoader(false);
      setModal('login')
    }

  }

  function check_main_image(value){
    if(value.images && value.images.length != 0){
     let image = value.images.find(res=>{ return res.is_primary == 1})
     if(image){
       value.selected_image = image.detail_image
     }else{
      value.selected_image = value.images[0].detail_image
     }
    }
  }

  function changeMainImage(index,value){
     value.images.map((res,i)=>{ 
       if(index == i){
        value.selected_image = res.detail_image;
        res.is_primary = 1
       }else{
        res.is_primary = 0
       }
     })
     setIndexImage(imageIndex + 1);
  }
    


  async function get_razor_pay_values(){
    let razorpay = await get_razorpay_settings();
    setRazorpay_settings(razorpay);
  }

  async function insert_subscription(checked_plans){
    let params = {
        "party": localStorage['customer_id'],
        // "subscription_plan": checked_plans.plan_name,
        "subscription_plan": checked_plans.subscription_plan,
        "item":data['name'],
        "subscription_type":"item",
        "content_type":content_type,
        // "price":data['price'],
        "price":checked_plans['price'],
    }
    const resp = await insert_member_subscription(params);
    setLoader(false);
    if (resp && resp.message && resp.message.status && resp.message.status == 'success') {
    // load_razorpay(checked_plans.total_amount,checked_plans.plan_name,resp.message.data[0].document_name)
    load_razorpay(checked_plans.price,checked_plans.subscription_plan,resp.message.data[0].document_name)

      // if(subs && subs.length != 0){
      //     setIndex(-1);
      //     subs.map((res)=>{
      //       res['active'] = false
      //     }) 
      //     setSubs(subs);
      //  }


    }else{
      setAlertMsg({message:resp.message.message});
      setEnableModal(true)
    }
  }

  function payment_error_callback(error){
    setAlertMsg({message: 'Payment failed'});
    setEnableModal(true);
  }

  async function payment_Success_callback(response,amount,order_id){
    let params = {
      "customer_id": localStorage['customer_id'],
      "payment_method": "PAY-M00001",
      "amount":amount,
      "remarks":"paid",
      "transaction_id":response.razorpay_payment_id,
      "order_id":order_id,
      "payment_method_name":"Razor Pay"
    }
    const resp = await make_payment_entry(params);
    if(resp && resp.message && resp.message.status && resp.message.status == 'success'){
     setAlertMsg({message:'Subscription created successfully'});
     setEnableModal(true);
    }
  }

 const load_razorpay = async (amount,description,order_id) => { 
  // console.log(razorpay_settings.api_key)
    let r_pay_color ='#e21b22';
    const app_name = 'India Retail';
    var options = {
      "key": razorpay_settings.api_key,
      "amount": (amount * 100).toString(),
      "currency": "INR",
      "name": app_name,
      "description": "Payment for" + description,
      "image": (razorpay_settings.site_logo ? check_Image(razorpay_settings.site_logo) : null),
      "prefill": { "name": localStorage['full_name'],"email": localStorage['userid']},
      "theme": { "color": r_pay_color },
      "modal": { "backdropclose": false, "ondismiss": () => {  payment_error_callback(description) } },
      "handler" : async (response, error) => {
        if(response){
          payment_Success_callback(response,amount,order_id)
          // response.razorpay_payment_id
        } else if(error){
           payment_error_callback(error)
          //  console.log(error);
        }
      }
    };

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {const rzp = new window.Razorpay(options); rzp.open();};
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };

  }

  const [sort, setSort] = useState(false);

  // async function share() {
  //   await setSort(!sort);
  //   let element = document.getElementById('dropdown');
  //   sort ? element.classList.add('dropdown-menu-active') : element.classList.remove('dropdown-menu-active');
  // }


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

async function insert_cart(dataValue,type,value){
  // console.log('dataValue',dataValue)
  // console.log(value)
  
  let param = {
    "item_code": dataValue.name,
    "qty": 1,
    "qty_type": "",
    "cart_type": "Shopping Cart",
    "customer": localStorage['customer_id'],
    // "attribute": dataValue.attribute ? dataValue.attribute : '',
    "attribute": value && value.attribute ? value.attribute : '',
    // "attribute_id": dataValue.attribute_ids ? dataValue.attribute_ids : '',
    "attribute_id": value && value.attribute_id ? value.attribute_id : '',
    "business": dataValue.restaurant ? dataValue.restaurant : 'BS-00001'
}
  if(!value){
    delete param.attribute
    delete param.attribute_id
  }
  const resp = await insert_cart_items(param);
  if (resp.message && resp.message.marketplace_items) {
      type == 'buy_now' ? router.push('/cart') : null;
      getCarts('');
      setLoader(false);
  }else if(resp.message && resp.message.status == 'Failed'){
    setLoader(false);
    setAlertMsg({message:resp.message.message});
    setEnableModal(true);
  }else{
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
     setLoader(false);
     setAlertMsg({message:resp.message.message ? resp.message.message : 'Something went wrong try again later'});
     setEnableModal(true);
  }
}



const  getCarts = async (type) => {
  if(localStorage && localStorage['apikey']){
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
}
  // async function getCustomerInfo(){
  //   // let param = {
  //   //   "doctype":"Customers",
  //   // "name":"EVT-00001",
  //   // }
  // }

  const [currentVariantIndex, setVariantsIndex] = useState(0);

  // const selectMethod = (e,index) =>{
  //   setVariantsIndex(index);
  //   if(subs && subs.length != 0){
  //       setIndex(-1);
  //       subs.map((res)=>{
  //         res['active'] = false
  //       }) 
  //       setSubs(subs);
  //   }
  //   content_type = e['name'];
  //   setPlans(content_type)
  // };

 const setOnetimeAsDefault = (val) =>{
  // res.map((e,i)=>{if(e.item__type == "Onetime Purchase"){ handleSubs(res,e,i) }})
  if(val && val.length != 0){
    let isTrue = false
    // console.log(val)
    val.map((res,i)=> {
      if(res.is_subscription != 1){
        isTrue = true
         handleSubs(val,res,i)
          // Modified john 26-11-23
         return -1; 
        }
    })
 // Modified john 26-11-23
 !isTrue && handleSubs(val,val[0],0)
  }
 } 

  const selectMethod = (e,index,subs) =>{
    // Modified john 26-11-23
    // setOnetimeAsDefault(e.value);
    // setVariantsIndex(index);
    // data.attribute_ids = e.attribute_id;
    // data.attribute = e.variant_text ;
    // data.price = e.product_price;
    // data.old_price = e.old_price;

    data.attribute_ids = e.attribute_id;
    data.attribute = e.attribute ;
    // data.price = e.price;
    // data.old_price = e.old_price;

    setData(data);
    getCarts('');

    // if(subs && subs.length != 0){
    //   // setIndex(-1);
    //   // setOnetime(-1)
    //   subs.map((res)=>{
    //     res['active'] = false
    //   }) 
      
    //   setSubs(subs);
    // }

    if(e.value && e.value.length != 0){
      //  setIndex(-1);
       setOnetime(1)
      e.value.map(res=>{
        res['active'] = false;
      })

      setSubs(e.value);
    }

     // Modified john 26-11-23
    setOnetimeAsDefault(e.value);
    setVariantsIndex(index);
    
    // if(e.variant_text){
    //   let data_1 = e.variant_text.toUpperCase().includes("PDF");
    //   let data_2 = e.variant_text.toUpperCase().includes("PRINT");
    //   if(data_1 || data_2){
    //     content_type = data_1 ? 'PDF' : 'PRINT';
    //     setPlans(content_type)
    //   }
    // }



  };

  function setPlans(val){
    let data = res.filter((res)=>{ return (res.item__type && (res.item__type == val || res.item__type == 'Onetime Purchase')) })
    // console.log(data)
    setSubs(data)
  }

    // Active Plans
  const handleSubs = (data, e, i) => {
    if (data) {
      data.map((res, index) => {
        if (index == i) {
          // res['active'] =! res['active'];
          res['active'] = true
          res['active'] ? setIndex(i) : setIndex(-1);

          // if(res.item__type == "Onetime Purchase"){
          //   res['active'] ? setOnetime(i) : setOnetime(-1);
          // }else{
          //   setOnetime(-1)
          // }

          if(res.is_subscription != 1){
            res['active'] ? setOnetime(i) : setOnetime(-1);
          }else{
            setOnetime(-1)
          }

        }else{
          res['active'] = false;
        }
      })

      setSubs(data)
    }
  }
  const [preview_screen,setPreview_screen] = useState(false)

  async function preview(pdfUrl){
    setPreview_screen(true);
    // console.log(pdfUrl);

   if(pdfUrl){
    pdfUrl = check_Image(pdfUrl)
    // console.log(pdfUrl)
    window.open(pdfUrl, '_blank');
   }

  }

  async function closeModal(value){
    setEnableModal(false);
  }

  // useEffect(() => {
  //   $("#lightgallery").lightGallery();
  //   $("#lightgallery").on('click', 'a', function() {
  //     $(this).lightGallery();
  //   });
  // }, []);

  useEffect(() => {

    if(typeof window !== 'undefined'){
      setTimeout(()=>{

        const $lightGallery = $("#lightgallery");
        $lightGallery.lightGallery();
    
        return () => {
          $lightGallery.data('lightGallery').destroy(true);
        };

        const $lightGallery1 = $("#lightgallery1");
        $lightGallery1.lightGallery();
    
        return () => {
          $lightGallery1.data('lightGallery1').destroy(true);
        };
        
        // $("#lightgallery").lightGallery();
  
        // $("#lightgallery").on('click', 'a, img', function () {
        //   $(this).lightGallery();
        // });

        // $("#lightgallery1").lightGallery();
  
        // $("#lightgallery1").on('click', 'a, img', function () {
        //   $(this).lightGallery();
        // });

      },800)
    }

  }, []);

  // useEffect(() => {
  //   // Initialize LightGallery
  //   const $lightGallery = $("#lightgallery");
  //   $lightGallery.lightGallery();

  //   // Clean up LightGallery when the component unmounts
  //   return () => {
  //     $lightGallery.data('lightGallery').destroy(true);
  //   };
  // }, []);

  const openLightGallery = async (imageSrc) => {
    imageSrc = check_Image(imageSrc);
    // console.log(imageSrc)
    $.fn.lightGallery.call($('<a href="' + imageSrc + '">'), {
      dynamic: true,
      dynamicEl: [{ src: imageSrc }]
    });
  };

  const updateShare = async (data) => {
    // console.log(data,'share');
    const param = {
      doc_id: data.name,
      doctype:'Product'
    }

    const resp = await update_no_of_shares(param);
    if(resp.message == 'Success'){
      // console.log(resp)

    }
  }

  return (
    <>
      <RootLayout homeAd={ads ? ads : null}>
      { value && <SEO title={value.meta_title ? value.meta_title : value.item_title} ogImage={check_Image(value.image)} siteName={'India Reatiling'} ogType={value.meta_keywords ? value.meta_keywords : value.item_title} description={value.meta_description ? value.meta_description : value.item_title}/>}
      {/* <div className='md:hidden'>
        <BreadCrumb BreadCrumbs={breadCrumbs} cssClass={'pb-[10px]'}/>
      </div> */}
    
    { enableModal && <AlertUi isOpen={enableModal} closeModal={(value)=>closeModal(value)} headerMsg={'Alert'} button_2={'Ok'} alertMsg={alertMsg} />}
        
    {!data ?  <Skeleton /> :
      (data && Object.keys(data).length != 0) && 
      <div className='container'>
        <div className={`lg:flex justify-between flex-wrap gap-[15px] py-0`}>
          <div className={`flex-[0_0_calc(40%_-_10px)]  md:p-[10px] md:hidden flex md:pt-[20px] md:flex-[0_0_calc(100%_-_0px)]`}>
             
            <div className='flex sticky top-[15px] bottom-0 z-1 h-[450px] bg-white'>
              <div  className={`mr-[10px]`}>
                {(data.images && data.images.length != 0) &&
                  data.images.map((res,index)=>{
                  return (
                    <a onMouseEnter={()=>changeMainImage(index,data)} key={index} className={`${res.is_primary == 1 ? 'border-black' : null} h-[100px] w-[100px] cursor-pointer mb-[10px] border rounded-[5px] p-[5px] flex-items-center justify-center flex`}>
                      {/* <a href={check_Image(res.detail_image)}> */}
                      <img className={`h-[90px] object-contain`} src={check_Image(res.detail_thumbnail)} alt={res.title} height={90} width={90}  />
                        {/* <Image className={`h-[90px] object-contain`} src={check_Image(res.detail_thumbnail)} height={90} width={90} alt={data.item_title} /> */}
                      {/* </a> */}
                    </a>
                  )
                })}
              </div> 

              <div className='w-full'>
                <div id="lightgallery" className={`bg-[#f1f1f14f] py-[5px]`}>
                  {(data.images && data.images.length != 0) ? data.images.map((res,index)=>{
                   return (
                     <a href={check_Image(res.detail_image)}>
                        <img className={`w-full h-[400px] object-contain ${res.is_primary == 0 ? 'hidden' : ''}`} src={check_Image(res.detail_image)} height={200} width={300} alt={res.title} />
                     </a>
                    )
                   }) : <Image
                   className={'w-full h-[465px]'}
                   height={200} width={300} alt={res.title}
                   src="/empty_state.svg"
                   
               />
                  }
                  {/* // <a href={check_Image(data.selected_image)}>
                  //  <img className={`w-full h-[465px] object-contain`} src={check_Image(data.selected_image)} height={200} width={300} alt={data.title} />
                  // </a> */}
                </div>
                <div className='text-center pt-[15px]'>
                  <button onClick={() => preview(data.custom_product_preview)} className={`w-full h-[40px] border`}>Preview</button>
                </div>
              </div>  

            </div>
          </div>


            {/* p-[20px] flex flex-col justify-between*/}
            <div className={` flex-[0_0_calc(60%_-_10px)] md:p-[10px] lg:p-[20px] md:flex-[0_0_calc(100%_-_0px)]`}>
              <div className={`flex md:p-[10px] lg:gap-5 md:gap-[5px] lg:h-[40px] md:pb-[10px]`}>
                <h6 className={`lg:min-h-[60px] md:text-[16px] line-clamp-2 leading-[1.5] lg:text-[20px] md:w-[calc(90%_-_10px)] md:mr-[10px] font-[700] ${nunito.className}`}>{data.item_title}</h6>
                {/* {route: router.asPath.split('/')[2]+'/'+data.route} */}
                {icons && <Dropdowns share={true} updateShare={(data) => updateShare(data)} link={data} width={'w-[170px]'} btnClass={'md:w-[32px]'} data={icons} type={'books'} />}

                {/* <div className='dropdowns md:w-[calc(10%_-_0px)] lg:w-[130px] md:h-[15px] md:relative cursor-pointer lg:pr-[40px] md:justify-end md:flex'>
                  <Image onClick={share} ref={ref} className={`dropdowns transition-all delay-500 lg:pt-[6px]`} src={'/share.svg'} height={10} width={15} alt={'share'} /> */}
                  {/* {sort && */}
                    {/* <div className={`md:absolute md:right-0 dropdown-menu p-[10px] grid justify-center`} style={{ borderRadius: '10px', width: '150px' }} id='dropdown'>
                      {icons && icons.map((res, index) => {
                        return (
                          <div key={index} className='hover:bg-[#FDF5F5] p-[0_8px] rounded'>
                            {res.name == 'Linkedin' && <LinkedinShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                              <span className='h-[18px] w-[18px]'><Image src={res.icon} className='h-[18px] w-[18px] object-contain' height={40} width={40} alt={'imgs'} /></span>
                              <p>{res.name}</p>
                            </LinkedinShareButton>}
                            {res.name == 'Facebook' && <FacebookShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                              <span className='h-[18px] w-[18px]'><Image src={res.icon} className='h-[18px] w-[18px] object-contain' height={40} width={40} alt={'imgs'} /></span>
                              <p>{res.name}</p>
                            </FacebookShareButton>}
                            {res.name == 'Twitter' && <TwitterShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                              <span className='h-[18px] w-[18px]'><Image src={res.icon} className='h-[18px] w-[18px] object-contain' height={40} width={40} alt={'imgs'} /></span>
                              <p>{res.name}</p>
                            </TwitterShareButton>}
                            {res.name == 'Whatsapp' && <WhatsappShareButton url={router.asPath} className='flex items-center gap-[10px]'>
                              <span className='h-[18px] w-[18px]'><Image src={res.icon} className='h-[18px] w-[18px] object-contain' height={40} width={40} alt={'imgs'} /></span>
                              <p>{res.name}</p>
                            </WhatsappShareButton>}
                          </div>
                        )
                      })}


                    </div> */}
                  {/* } */}
                {/* </div> */}
              </div>

              <div className={`lg:flex md:p-[5px_0px_15px_0px] lg:hidden flex-col`}>
                {/* flex-[0_0_calc(100%_-_10px)] */}
                {/* <div className={`md:h-[430px] md:p-[0px_10px_10x_10px]`}>
                  {(data.images && data.images.length != 0) ? 
                    <Image className={`w-full lg:h-[500px] md:h-[425px] object-contain`} src={check_Image((data.images[1] && data.images[1].detail_image) ? data.images[1].detail_image : data.images[0].detail_image)} height={200} width={300} alt={data.item_title} /> :
                    <Image className={`w-full lg:h-[500px] md:h-[425px] object-contain`} src={check_Image(data.image)} height={200} width={300} alt={data.item_title} />
                  }
                </div> */}

               <div className="zero-gap">
                 {data.images && data.images.length != 0 ? <Sliders imgClass={'h-[330px] object-contain w-full'} event={true} data={data.images} perView={1} className='gap-0' /> :  <Image
                   className={'w-full h-[465px]'}
                   height={200} width={300} alt={res.title}
                   src="/empty_state.svg"
                   
               />}
                </div>
                <div className='text-center pt-[15px]'>
                  <button onClick={()=>preview(data.custom_product_preview)} className={`w-full h-[40px] border`}>Preview</button>
                </div>
              </div>

              <div className={`flex md:p-[0px_0px_15px_5px] items-center lg:pt-[25px] md:pt-[2px] gap-5`}>
                {/* <p className={`p-[5px_12px] border rounded-[10px] cursor-pointer`}>PDF</p> */}
                <p className={`md:text-[16px] lg:text-[20px] text-red font-semibold`}>{formatter.format(data.price)}</p>
                {(data.old_price != 0)  && <p className={`md:text-[12px] lg:text-[16px] line-through gray_color`}>{formatter.format(data.old_price)}</p>}
              </div>

              {/* {data.vendor_price_list && data.vendor_price_list[0] && data.vendor_price_list[0].variants && data.vendor_price_list[0].variants.length != 0 &&
                 <div className='flex gap-[10px] lg:m-[12px_0px_0_0px] md:m-[0] md:pb-[12px] items-center'>
                    {data.vendor_price_list[0].variants.map((vendor,index)=>{
                      return(
                        // && (indexs < 0)
                        <div key={index} onClick={() => selectMethod(vendor,index)} className={`flex ${styles.payment_sec} ${(data.attribute_ids == vendor.attribute_id ) ? 'active_border' : null} lg:h-[45px] md:h-[40px] cursor-pointer gap-[5px] items-center border rounded-[5px] p-[4px_12px] `}>
                          <input className={styles.input_radio} checked={data.attribute_ids == vendor.attribute_id} type="radio"/>
                          <p className='text-[12px]'>{vendor.variant_label_}</p>
                        </div>
                      )
                      }) 
                    }
                  </div> 
              } */}

              {data.product_variant_group && data.product_variant_group.length != 0 && 
              
              <div className='flex gap-[10px] lg:m-[12px_0px_0_0px] md:m-[0] md:pb-[12px] items-center'>
             { data.product_variant_group.map((res,index)=>{
                return(
                  <div key={index}>
                 {res.attribute && <div onClick={() => selectMethod(res,index,res.value)} className={`flex ${styles.payment_sec} ${(data.attribute_ids == res.attribute ) ? 'active_border' : null} lg:h-[45px] md:h-[40px] cursor-pointer gap-[5px] items-center border rounded-[5px] p-[4px_12px] `}>
                    <input className={styles.input_radio} checked={res.attribute == data.attribute} type="radio"/>
                    <p className='text-[12px]'>{res.attribute}</p>
                  </div>}
                  </div>
                )
              })}
              </div>}
              {/* <div className='flex gap-[10px] lg:m-[18px_0px_0_0px] md:m-[3px_10px_8px_10px] items-center'>
                    {variants.map((vendor,index)=>{
                      return(
                        <div key={index} onClick={() => selectMethod(vendor,index)} className={`flex ${styles.payment_sec} ${(currentVariantIndex == index) ? 'active_border' : null} lg:h-[40px] md:h-[35px] cursor-pointer gap-[5px] items-center border rounded-[5px] p-[4px_15px_4px_8px] `}>
                          <input className={styles.input_radio} checked={currentVariantIndex == index} type="radio"/>
                          <p className='text-[12px]'>{vendor.name}</p>
                        </div>
                      )
                      }) 
                    }
              </div>  */}
              


              {/* p-[20px] lg:m-[0_auto]*/ }
              {(subs && subs.length != 0) && 
              
              <>
                            <h6 className={`md:text-[16px] line-clamp-2 lg:text-[18px] lg:p-[20px_0px_0px_0px] font-[700] ${nunito.className}`}>Subscription Plans</h6>

              
              <div className={`md:hidden grid grid-cols-3 md:gap-[10px] md:p-[10px] lg:gap-[10px] lg:w-[570px]  lg:p-[20px_0px] justify-between`}>

                    {/* {subs.map((item, index) => {
                      return (
                        <div className={`border cursor-pointer ${(index == indexs) ? 'activeBorder' : ''} flex flex-col justify-center text-center p-[10px_8px] rounded-[10px] lg:h-[130px] md:h-[85px]`} onClick={() => handleSubs(subs, item, index)} key={index}>
                          <p className='lg:text-[12px] md:text-[10px] font-semibold'>{item.plan_name}</p>
                          <h6 className='lg:py-[6px] md:p-[2px] text-[20px] md:text-[16px] font-semibold'>{formatter.format(item.total_amount)}</h6>
                          {item.features && item.features.map((f, index) => {
                            return (<p key={index} style={{ fontWeight: '400' }} className='lg:text-[10px] sub_title md:text-[10px]'>{f.features}</p>);
                          })}
                        </div>
                      );
                    })} */}

                    {subs.map((item, index) => {
                      return (
                        <div className={`border cursor-pointer ${(index == indexs) ? 'activeBorder' : ''} flex flex-col justify-center text-center p-[10px_8px] rounded-[10px] lg:h-[130px] md:h-[85px]`} onClick={() => handleSubs(subs, item, index)} key={index}>
                          <p className='lg:text-[12px] md:text-[10px] font-semibold'>{item.is_subscription && item.subscription_plan ? item.subscription_plan : 'One time purchase'}</p>
                          {/* <p className='lg:text-[12px] md:text-[10px] font-semibold'>{item.attribute}</p> */}
                          <h6 className='lg:py-[6px] md:p-[2px] text-[20px] md:text-[16px] font-semibold'>{formatter.format(item.price)}</h6>
                          {/* {item.features && item.features.map((f, index) => {
                            return (<p key={index} style={{ fontWeight: '400' }} className='lg:text-[10px] sub_title md:text-[10px]'>{f.features}</p>);
                          })} */}
                          {/* <p className='text-[14px]'>{res.issues}</p> */}
                        </div>
                      );
                    })}
                  </div>
                  <div className={`lg:hidden p-[16px_0_8px_0]`}>

                      {/* {subs.map((item, index) => {
                        return (
                        <div key={index} onClick={() => handleSubs(subs, item, index)} className={`flex cursor-pointer gap-[5px] pb-[7px] last:pb-[0px] items-center`}>
                          <input className={styles.input_radio} checked={index == indexs} type="radio"/>
                          <p className='text-[13px]'>{item.plan_name}</p>
                          <p className='text-[13px] font-semibold'>({formatter.format(item.total_amount)})</p>
                        </div>
                        );
                      })} */}

                    {subs.map((item, index) => {
                      return (
                        <div key={index} onClick={() => handleSubs(subs, item, index)} className={`flex cursor-pointer gap-[5px] pb-[7px] last:pb-[0px] items-center`}>
                          <input className={styles.input_radio} checked={index == indexs} type="radio"/>
                          <p className='text-[13px] font-semibold'>{item.is_subscription && item.subscription_plan ? item.subscription_plan : 'One time purchase'}</p>
                          {/* <p className='lg:text-[12px] md:text-[10px] font-semibold'>{item.attribute}</p> */}
                          <p className='text-[13px] font-semibold'>({formatter.format(item.price)})</p>
                        </div>
                        // <div className={`border cursor-pointer ${(index == indexs) ? 'activeBorder' : ''} flex flex-col justify-center text-center p-[10px_8px] rounded-[10px] lg:h-[130px] md:h-[85px]`} onClick={() => handleSubs(subs, item, index)} key={index}>
                        //   <p className='lg:text-[12px] md:text-[10px] font-semibold'>{item.subscription_plan}</p>
                        //   <p className='lg:text-[12px] md:text-[10px] font-semibold'>{item.attribute}</p>
                        //   <h6 className='lg:py-[6px] md:p-[2px] text-[20px] md:text-[16px] font-semibold'>{formatter.format(item.price)}</h6>
                         
                        // </div>
                      );
                    })}
                  </div>
                </>
              
              }

             {(subs && subs.length != 0) && <div className='border_bottom mb-[20px]'>
               <div className={`md:p-[10px] lg:w-[570px] text-center md:p-[10px_0_20px_0] lg:p-[0px_0_20px_0]`}>
                <LoaderButton loader={loader} cssclass={'lg:w-[250px] md:w-[100%] md:h-[40px] m-0'} image_left={(indexs >= 0 && Onetime < 0)  ? '/bookstore/subscribe.svg' 
                : (Onetime >= 0 ? '/bookstore/cart.svg' : '/bookstore/cart.svg')} 
                 button_name={(indexs >= 0 && Onetime < 0) ? 'Subscribe' 
                : (Onetime >= 0 ? 'Buy Now' : 'Add to Cart')} buttonClick={addToCart} />
               </div>
              </div>}

              <Modal modal={modal} show={show} visible={visible} hide={hide} />

              {data.full_description &&
                <div className={`px-[10px] border_bottom pb-[20px] mb-[20px] ${(subs && subs.length != 0) ? '' : 'mt-5'}`}>
                  <h6 className={`pb-[10px] font-[700] ${nunito.className}`}>This Issue</h6>
                  {/* <div className='line-clamp-[10]' dangerouslySetInnerHTML={{__html:data.full_description}} ></div> */}
                  <div className='' dangerouslySetInnerHTML={{ __html: data.full_description }} />
                  {/* <p className='font-semibold'>Read More...</p> */}
                </div>
              }
              <div className='grid grid-cols-3 md:p-[0_0px_10px_0px] md:gap-[5px] lg:gap-[8px]'>
                <div className='flex md:block md:text-center cursor-pointer items-center gap-[10px]'><span className='h-[25px] flex items-center justify-center'><Image height={25} className='object-contain lg:h-[20px] md:h-[16px] md:m-auto' width={25} alt={''} src={'/bookstore/digital.svg'} /></span><span style={{fontWeight:'600'}} className={`md:text-[12px] sub_title md:text-center  ${nunito.className}`}> Digital Subscription</span></div>
                <div className='flex md:block md:text-center cursor-pointer items-center gap-[10px]'><span className='h-[25px] flex items-center justify-center'><Image height={25} className='object-contain lg:h-[20px] md:h-[16px] md:m-auto' width={25} alt={''} src={'/bookstore/cancel.svg'} /></span><span style={{fontWeight:'600'}} className={`md:text-[12px] sub_title md:text-center  ${nunito.className}`}> Cancel Anytime</span></div>
                <div className='flex md:block md:text-center cursor-pointer items-center gap-[10px]'><span className='h-[25px] flex items-center justify-center'><Image height={25} className='object-contain lg:h-[20px] md:h-[16px] md:m-auto' width={25} alt={''} src={'/bookstore/payment.svg'} /></span><span style={{fontWeight:'600'}} className={`md:text-[12px] sub_title md:text-center  ${nunito.className}`}> Secure Payment</span></div>
              </div>

            </div>

        </div>

          {/* Section - 2 */}

          {/* {(data.previous_edition && data.previous_edition && data.previous_edition.length != 0) && 
            <div className={`p-[30px]`}>
              <Title data={{ title: 'Previous Issues' }} route={'/bookstore/'+router.asPath.split('/')[2]} seeMore={true} />
              <div className={`grid gap-[20px] grid-cols-5 md:grid-cols-2 `}><Card category={router.query.list} check={true} data={data.previous_edition.slice(0, 5)} boxShadow={true} /></div> 
            </div>
          } */}

          {data.previous_edition && data.previous_edition.length != 0 && <div className={`lg:p-[30px] md:p-[15px]`}>
            <Title data={{ title: 'Previous Issues' }} seeMore={true} route={'/bookstore/'+router.asPath.split('/')[2]} />
            <div className={`grid gap-[20px] grid-cols-5 md:grid-cols-2 `}><Card imgClass={'lg:h-[300px] md:h-[225px] mouse'} category={router.query.list} check={true} data={data.previous_edition.slice(0, 5)} boxShadow={true} /></div></div>
          }

          {data.related_products && data.related_products.length != 0 && <div className={`lg:p-[30px] md:p-[15px]`}>
            <Title data={{ title: 'Related Products' }} seeMore={true} route={'/bookstore/'+data.related_products[0].category_route} />
            <div className={`grid gap-[20px] grid-cols-5 md:grid-cols-2 `}><Card imgClass={'lg:h-[300px] md:h-[225px] mouse'} category={data.related_products[0].category_route} check={true} data={data.related_products.slice(0, 5)} boxShadow={true} /></div></div>
          }

          {/* Section - 3 */}

          {/* {data.related_products && <div className={`p-[30px] flex-wrap flex gap-[20px] justify-between`}>
            <div className='flex-[0_0_calc(70%_-_20px)] md:flex-[0_0_calc(100%_-_10px)]'>
              <Title data={{ title: 'Other Magazines' }} seeMore={true} />
              <div className={`flex gap-[20px] flex-wrap `}><Card imgClass={'lg:h-[300px] md:h-[225px] mouse'} category={router.query.list} flex={'flex-[0_0_calc(25%_-_20px)] md:flex-[0_0_calc(50%_-_10px)]'} data={data.related_products.slice(0, 4)} check={true} boxShadow={true} /></div>
            </div>
            <div className='flex-[0_0_calc(30%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]'>
              <AdsBaner data={val.section_3.col_2} />
            </div>
          </div>} */}

          {/* Section - 4 */}

         
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


  let data = {"res_type":"item"}
  const subscription = await get_subscription_plans(data);
  let res =[]
  if (subscription && subscription.message && subscription.message.status && subscription.message.status == 'success') {
      res = subscription.message.message;
   
  } 

  let para = { page: 'Books', page_type: 'List' }
    let response = await getAdvertisements(para)
    let ads = response.message;


  return {
    props: { value, res,ads }
  }
}



const Skeleton = () => {
  return (
    <>
        <div className="container lg:py-0 md:p-[10px] flex lg:gap-[30px] md:flex-col animate-pulse">

          <div className="lg:flex-[0_0_calc(40%_-_10px)]">
            <div className='h-[455px] lg:w-[510px] bg-slate-100 rounded'></div>
            <div className='h-[45px] w-full my-[20px] bg-slate-300 rounded'></div>
          </div>
             
          <div className="lg:flex-[0_0_calc(40%_-_10px)]">
           <div className='h-[40px] w-[75%] bg-slate-300 rounded'></div>
           <div className='h-[40px] w-[15%] my-[20px] bg-slate-300 rounded'></div>
           <div className='flex mb-[20px] gap-[10px]'>
               <div className='h-[40px] w-[140px] bg-slate-300 rounded'></div>
               <div className='h-[40px] w-[140px] bg-slate-300 rounded'></div>
           </div>
           <div className='flex mb-[20px] gap-[10px]'>
               <div className='h-[120px] w-[130px] bg-slate-300 rounded'></div>
               <div className='h-[120px] w-[130px] bg-slate-300 rounded'></div>
               <div className='h-[120px] w-[130px] bg-slate-300 rounded'></div>
           </div>

           <div className='h-[40px] mb-[20px] w-[60%] bg-slate-300 rounded'></div>

           <div className='h-[40px] mb-[20px] w-[100px] bg-slate-300 rounded'></div>

           <div className='h-[20px] mb-[8px] w-full bg-slate-300 rounded'></div>
           <div className='h-[20px] mb-[8px] w-full bg-slate-300 rounded'></div>
           <div className='h-[20px] mb-[8px] w-full bg-slate-300 rounded'></div>
           <div className='h-[20px] mb-[8px] w-full bg-slate-300 rounded'></div>
           <div className='h-[20px] mb-[8px] w-full bg-slate-300 rounded'></div>
           <div className='h-[20px] mb-[8px] w-[75%] bg-slate-300 rounded'></div>



          </div>
        </div>
    </>
  )}

  // const Alert = (alertMsg) => {

  //   const [enableModal,setEnableModal] = useState(true)

  //   async function closeModal(value){
  //     setEnableModal(false);
  //   }

  //   return (
  //     <>
  //       <AlertUi isOpen={enableModal} closeModal={(value)=>closeModal(value)} headerMsg={'Alert'} button_2={'Ok'} alertMsg={alertMsg} /> 
  //     </>
  //   )
  // }