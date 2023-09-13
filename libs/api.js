import { domain } from "./config/siteConfig"

const methodUrl = `https://${domain}/api/method/`;
const resourceUrl = `https://${domain}/api/resource/`;
const domainUrl = `india_retailing.india_retailing.api.`;
const ecomUrl = `ecommerce_business_store.ecommerce_business_store.api.`;
const ecomUrlV2 = `ecommerce_business_store.ecommerce_business_store.v2.`;
const subscription = `subscription.subscription.api.`;
const app_name = 'India Retail';

// let apikey;
// let secret;
let razorpay_settings;
let r_pay_color ='#e21b22';

// const router = useRouter();


// if (typeof window !== 'undefined') {
//     // Perform localStorage action
//     // apikey = localStorage['apikey'] ? localStorage['apikey'] : "955e1e58eaa8a8e";
//     // secret = localStorage['secret'] ? localStorage['secret'] : "6b5ba30c64e937e";
//     apikey = localStorage['apikey'] ? localStorage['apikey'] : undefined;
//     secret = localStorage['secret'] ? localStorage['secret'] : undefined;
// }

export const checkMobile = () => {
    if (window.innerWidth < 767) {
        return true;
    } else if (window.innerWidth > 767) {
        return false;
    }
}

export async function getCartItem(){
    const resp = await get_cart_items();
      if (resp && resp.message && resp.message.status == 'success') {
          let data = resp.message.cart
          return data;
        //   setCartItems(data)
      }
  }

//   export async function check_count(quantity,type){
//     let count = quantity
//     if (type == 'inc') {
//       count = quantity + 1;
//     } else if (type == 'dec') {
//       count = quantity - 1;
//     }
  
//     return count;
//   }

export function stored_customer_info(){
    let users = {}
    users.cust_email = localStorage['userid'] ? localStorage['userid'] : undefined;
    users.cust_name = localStorage['full_name'] ? localStorage['full_name'] : undefined;
    users.customer_id = localStorage['customer_id'] ? localStorage['customer_id'] : undefined;
    return users;
}

export const check_Image = (Image) => {
    let baseUrl = `https://${domain}`
    if (Image) {
        if (Image.indexOf('https') == -1) {
            return baseUrl + Image;
        } else if (Image.indexOf('https') == 0) {
            return Image;
        }
    }else{
        return '/empty_state.svg'
    }
}


export async function get_razorpay_settings() {
    const resp = await get_razorpaysetting();
    if (resp && resp.message) {
       return razorpay_settings = resp.message;
    }
}


export function getColor(value){
  if(value == 'Paid' || value == 'success' || value == 'Active'){
    return '#02b290'
  }else if(value == 'Pending' || value == 'Cancelled' || value == 'Unpaid'){
    return '#ff0000a3'
  }else if(value == 'Shipped' || value == 'Placed'){
    return '#e0d9cec2'
  }else if(value == 'Order Delivered'){
    return '#02b290'
  }else if(value == 'Pending'){
    return '#ff0000a3'
  }else{
    return '#ddd'
  }
}


// export async function load_razorpay(amount,description,type) {
export const load_razorpay = async (amount,description,type,router) => {
    var options = {
      "key": razorpay_settings.api_key,
      "amount": (amount * 100).toString(),
      "currency": "INR",
      "name": app_name,
      "description": "Payment for" + description,
      "image": (razorpay_settings.site_logo ? check_Image(razorpay_settings.site_logo) : null),
      "prefill": {
          "name": localStorage['full_name'],
          "email": localStorage['userid'],
      },
      "theme": {
          "color": r_pay_color
      },
      "modal": {
        "backdropclose": false,
        "ondismiss": () => {  payment_error_callback(description,'error') }
      },
      "handler" : async (response, error) => {
        if(response){
        //   await razorpay_payment_id(response.razorpay_payment_id)
        if(response.razorpay_payment_id){
            return response
        }
        //   let data = { response : { amount : amount,description : description,razorpay_payment_id : response.razorpay_payment_id }}
        //   payment_Success_callback(data,description,type,router);
        } else if(error){
          payment_error_callback(description,error)
        }

      }
    };

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      const rzp = new window.Razorpay(options);
      rzp.open();
    };

    document.body.appendChild(script);

    // return () => {
    //   document.body.removeChild(script);
    // };
}


async function razorpay_payment_id(razorpay_payment_id){
    return  razorpay_payment_id
}

function payment_Success_callback(data,order_id,type,router){

    if(type == 'Subscription'){
        createSubscription(order_id)
    }else if(type == 'Order'){
        order_payment_capture(data['response']['razorpay_payment_id'],data['response']['description'],router);
    }
    
}




function payment_error_callback(description,error){
    order_payment_capture(undefined,description);
}

export async function order_payment_capture(id,order_id,router) {
    var updatedate = {  'order_id': order_id,  'transaction_id': id  }
    const resp = await update_order_status(updatedate);
    if (resp) {
        router.push('/bookstore')
        // router.push('/thankyou?order_id=' + order_id)
    }
}

export async function createSubscription(order_id) {
    let param = {
        party: localStorage['customer_id'],
        party_name: localStorage['userid'],
        subscription_plan: order_id
    };
    const resp = await insertSubscription(param);
    console.log(resp);
}



export async function postMethod(api, payload) {
    let apikey;
    let secret;
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        // apikey = localStorage['apikey'] ? localStorage['apikey'] : "955e1e58eaa8a8e";
        // secret = localStorage['secret'] ? localStorage['secret'] : "6b5ba30c64e937e";
        apikey = localStorage['apikey'] ? localStorage['apikey'] : undefined;
        secret = localStorage['secret'] ? localStorage['secret'] : undefined;
    }
    const myHead = new Headers((apikey && secret) ? { "Authorization": 'token ' + apikey + ':' + secret, "Content-Type": "application/json" } : { "Content-Type": "application/json" })
    // const myHead = new Headers()
    // myHead.append('Content-Type', 'application/json');
    const response = await fetch(methodUrl + api,
        // cache: 'force-cache'
        { method: 'POST', headers: myHead, body: JSON.stringify(payload), })
    const data = await response.json();
    return data;
}

export async function GET(api) {
    let apikey;
    let secret;
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        // apikey = localStorage['apikey'] ? localStorage['apikey'] : "955e1e58eaa8a8e";
        // secret = localStorage['secret'] ? localStorage['secret'] : "6b5ba30c64e937e";
        apikey = localStorage['apikey'] ? localStorage['apikey'] : undefined;
        secret = localStorage['secret'] ? localStorage['secret'] : undefined;
    }
    const myHead = new Headers((apikey && secret) ? { "Authorization": 'token ' + apikey + ':' + secret, "Content-Type": "application/json" } : { "Content-Type": "application/json" })
    // const myHead = new Headers()
    // myHead.append('Content-Type', 'application/json');
    const response = await fetch(methodUrl + api,
        // cache: 'force-cache'
        { method: 'GET', headers: myHead,  })
    const data = await response.json();
    return data;
}

export async function HomePage(data){
    let api = 'go1_cms.go1_cms.api.get_page_content';
    return await postMethod(api,data)
}

export async function getTagsList(data){
    const api = domainUrl + 'get_article_news_by_tag';
    return await postMethod(api,data)
}

export async function get_subscription_plans(data){
    let api = 'subscription.subscription.api.get_subscription_plans';
    return await postMethod(api,data)
}

export async function getList(data) {
    let api = domainUrl + 'get_list';
    return await postMethod(api, data);
}

export async function getDetails(data) {
    let api = domainUrl + "doc_detail";
    return await postMethod(api, data)
}

// Category Landing 
export async function getCategoryList(data) {
    let api = domainUrl + 'list_with_categories';
    return await postMethod(api, data)
}

// Articles Detail
export async function articlesDetail(data) {
    let api = domainUrl + 'article_details';
    return await postMethod(api, data)
}
export async function articleNewsDetail(data) {
    let api = domainUrl + 'news_details';
    return await postMethod(api, data)
}


export async function like(data){
    let api = domainUrl + 'like_dislike';
    return await postMethod(api,data)
}

export async function dislike(data){
    let api = domainUrl + '_toggle_dislike';
    return await postMethod(api,data)
}

export async function report(data){
    let api = domainUrl + 'report_update_the_comment';
    return await postMethod(api,data)
}

// Prime Landing
export async function primeLanding(data){
    let api = domainUrl + 'ir_prime_content';
    return await postMethod(api,data);
}
// Login

export async function logIn(data) {
    let api = domainUrl + 'login';
    return await postMethod(api, data)
}

export async function signUp(data) {
    let api = domainUrl + 'user_registration';
    return await postMethod(api, data)
}

export async function forget_password(data){
    let api = domainUrl + 'forget_password';
    return await postMethod(api,data)
}


export async function insert_doc(data){
    let datas = {data:data}
    let api =  domainUrl +'insert_doc';
    return await postMethod(api,datas)
}

// Event List
export async function eventList(data) {
    let api = domainUrl + 'event_list';
    return await postMethod(api, data)
}

export async function commentList(data){
    let api = domainUrl + 'comment_list';
    return await postMethod(api,data)
}

export async function addComment(data){
    let api = domainUrl + 'add_comments';
    return await postMethod(api,data)
}


// E-com (Bookstore)
export async function booksLanding(){
    let api = domainUrl + 'magazine_list_with_categories';
    return await GET(api)
}

export async function getCategories(){
    let api = ecomUrl + 'get_parent_categories';
    let data = {domain: domain , show_count: 1}
    return await postMethod(api,data);
}

export async function getCategoryProduct(data){
    let api = domainUrl + `magazines`;
    return await postMethod(api,data)
}

export async function getProductDetail(data){
    let api = ecomUrlV2 + `product.get_product_details`;
    return await postMethod(api,data)
}

export async function getAds(data){
    let api = domainUrl + 'ad_list';
    return await postMethod(api,data)
}

// export async function get_cart_items(data) {
//     let api = domainUrl + 'ecommerce_business_store.ecommerce_business_store.v2.cart.get_cart_items';
//     return await postMethod(api, data)
// }

export async function get_cart_items(){
    let api = ecomUrlV2 + 'cart.get_cart_items';
    return await GET(api)
}

export async function subscriptionPlans(){
    let api = subscription + `list_subscription_plans`;
    return await GET(api)
}

export async function insertSubscription(data){
    let api = subscription + 'insert_subscription';
    return await postMethod(api,data)
}

export async function insert_member_subscription(data){
    // let api = subscription + 'insert_member_subscription';
    let api = subscription + 'create_subscription';
    return await postMethod(api,data)
}

export async function make_payment_entry(data){
    let api = subscription + 'make_payment_entry';
    return await postMethod(api,data)
}

export async function sliders(data){
    let api='go1_cms.go1_cms.api.sliders';
    return await postMethod(api,data)
}

export async function getCartItems(data){
    let api = ecomUrl + 'get_cartItems';
    return await postMethod(api,data)
}

export async function insertCartItems(data){
    // let param = {
    //     item_code: data.item,
    //     qty: data.count,
    //     qty_type: "",
    //     rate: data.price,
    //     cartType: "Shopping Cart",
    //     // "customer": "GC-00294"
    // }
    const api = ecomUrlV2 + 'cart.insert_cartItems';
    return await postMethod(api,data)
}

export async function insert_cart_items(data){
    const api = ecomUrlV2 + 'cart.insert_cart_items';
    return await postMethod(api,data)
}

export async function updateCartItems(data){
    const api = ecomUrlV2 + 'cart.update_cartitem';
    return await postMethod(api,data)
}

export async function deleteCartItems(data){
    const api = ecomUrlV2 + 'cart.delete_cart_items';
    return await postMethod(api,data)
}

export async function news_list(data){
    let api = domainUrl + 'news_list'
    return await postMethod(api,data)
}

//podcast
export async function podcastLanding(data){
    let api = domainUrl + 'podcast_list_with_categoies';
    return await postMethod(api,data)
}

export async function podcast_list(data){
    let api = domainUrl + 'podcast_list';
    return await postMethod(api,data)
}

export async function podcast_details(data){
    let api = domainUrl + 'podcast_details';
    return await postMethod(api,data)
}

// Newsletter
export async function newsLanding(data){
    let api = domainUrl + 'newsletter_list_with_categories';
    return await postMethod(api,data)
}

export async function newsDetail(data){
    let api = domainUrl + 'newsletter_details';
    return await postMethod(api,data)
}

export async function get_all_newsletter(data){
    let api = domainUrl + 'get_all_newsletter';
    return await postMethod(api,data)
}

export async function newsSubscribe(data){
    let api = domainUrl + 'subscribe_newsletter';
    return await postMethod(api,data)
}

export async function get_country_list(){
    let api = 'ecommerce_business_store.ecommerce_business_store.mobileapi.get_country_list';
    return await GET(api)
}

export async function get_country_states(data){
    let api = 'ecommerce_business_store.ecommerce_business_store.api.get_country_states?country=' + data;
    return await GET(api)
}

export async function get_customer_info(data){
    let api = 'ecommerce_business_store.ecommerce_business_store.api.get_customer_info';
    return await postMethod(api,data)
}

export async function get_payment_method(){
    let data = { domain : domainUrl}
    let api = 'ecommerce_business_store.ecommerce_business_store.api.get_payment_method';
    return await postMethod(api,data)
}

export async function insert_address(data) {
    let datas = {data :JSON.stringify(data)}
    let api = 'ecommerce_business_store.ecommerce_business_store.api.insert_address'
    return await postMethod(api,datas)
}

export async function update_address(data) {
    let datas = {data :JSON.stringify(data)}
    let api = 'ecommerce_business_store.ecommerce_business_store.api.update_address'
    return await postMethod(api,datas)
}

export async function insertOrder(data) {
    let datas = {data :JSON.stringify(data)}
    // let api = 'ecommerce_business_store.ecommerce_business_store.api.insert_order'
    let api = 'ecommerce_business_store.ecommerce_business_store.v2.orders.insert_order'
    return await postMethod(api,datas)
}

export async function delete_address(data) {
    let api = 'ecommerce_business_store.ecommerce_business_store.api.delete_address'
    return await postMethod(api,data)
}

export async function update_order_status(data) {
    let api = 'ecommerce_business_store.ecommerce_business_store.mobileapi.update_order_status'
    return await postMethod(api,data)
}

export async function get_razorpaysetting(data){
    let api = 'ecommerce_business_store.ecommerce_business_store.api.razor_pay_settings'
    return await GET(api)
}

export async function send_otp(data){
    let api = 'ecommerce_business_store.ecommerce_business_store.v2.customer.send_otp'
    return await postMethod(api,data)
}

export async function verify_otp(data){
    let api = 'ecommerce_business_store.ecommerce_business_store.v2.customer.verify_otp'
    return await postMethod(api,data)
}

export async function update_user_password(data){
    let api = 'india_retailing.india_retailing.api.update_user_password'
    return await postMethod(api,data)
}


// Videos
export async function video_list_with_categoies(data){
    let api = domainUrl + 'video_list_with_categoies'
    return await postMethod(api,data)
}

export async function video_list(data){
    let api = domainUrl + 'video_list'
    return await postMethod(api,data)
}

export async function video_details(data){
    let api = domainUrl + 'video_details'
    return await postMethod(api,data)
}

export async function search_product(data){
    let api = 'ecommerce_business_store.ecommerce_business_store.v2.whoosh.search_product'
    return await postMethod(api,data)
}

export async function get_customer_order_list(data){
    let api = 'ecommerce_business_store.ecommerce_business_store.v2.customer.get_customer_order_list'
    return await postMethod(api,data)
}

export async function get_order_info(data){
    let api = 'ecommerce_business_store.ecommerce_business_store.v2.customer.get_order_info'
    return await postMethod(api,data)
}

export async function update_password(data){
    let api = 'ecommerce_business_store.ecommerce_business_store.api.update_password'
    return await postMethod(api,data)
}

export async function get_customer_plan_based_subscritpions(data){
    let api = 'subscription.subscription.api.get_customer_plan_based_subscritpions'
    return await postMethod(api,data)
}