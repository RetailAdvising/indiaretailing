import { domain } from "./config/siteConfig"

const methodUrl = `https://${domain}/api/method/`;
const resourceUrl = `https://${domain}/api/resource/`;
const domainUrl = `india_retailing.india_retailing.api.`;
const ecomUrl = `ecommerce_business_store.ecommerce_business_store.api.`;
const subscription = `subscription.subscription.api.`;

let apikey;
let secret;

if (typeof window !== 'undefined') {
    // Perform localStorage action
    // apikey = localStorage['apikey'] ? localStorage['apikey'] : "955e1e58eaa8a8e";
    // secret = localStorage['secret'] ? localStorage['secret'] : "6b5ba30c64e937e";
    apikey = localStorage['apikey'] ? localStorage['apikey'] : undefined;
    secret = localStorage['secret'] ? localStorage['secret'] : undefined;
}

export async function postMethod(api, payload) {
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
    const myHead = new Headers((apikey && secret) ? { "Authorization": 'token ' + apikey + ':' + secret, "Content-Type": "application/json" } : { "Content-Type": "application/json" })
    // const myHead = new Headers()
    // myHead.append('Content-Type', 'application/json');
    const response = await fetch(methodUrl + api,
        // cache: 'force-cache'
        { method: 'GET', headers: myHead,  })
    const data = await response.json();
    return data;
}

export async function getExclusives() {
    const myHead = new Headers()
    myHead.append('Content-Type', 'application/json');
    let datas = {
        application_type: "web",
        domain: "indiaretailing.go1cms.com",
        route: "p/exclusives"
    }
    const response = await fetch(methodUrl + 'go1_cms.go1_cms.api.get_page_content',
        { method: 'POST', headers: myHead, body: JSON.stringify(datas) });
    const data = await response.json();
    return await data;
}


export async function placeHolder() {
    const myHead = new Headers()
    myHead.append('Content-Type', 'application/json');
    const resp = await fetch('https://jsonplaceholder.typicode.com/photos', { method: 'GET', headers: myHead });
    const data = await resp.json();
    return data;
}

export async function Blogs() {
    const myHead = new Headers()
    myHead.append('Content-Type', 'application/json');
    const resp = await fetch(resourceUrl + 'Articles?fields=["*"]', { method: 'GET', headers: myHead });
    const data = await resp.json();
    return data;
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
    let api = ecomUrl + `get_category_products`;
    return await postMethod(api,data)
}

export async function getProductDetail(data){
    let api = `ecommerce_business_store.ecommerce_business_store.mobileapi.get_product_details`;
    return await postMethod(api,data)
}

export async function subscriptionPlans(){
    let api = subscription + `list_subscription_plans`;
    return await GET(api)
}

export async function insertSubscription(data){
    let api = subscription + 'insert_subscription';
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
    const api = ecomUrl + 'insert_cartItems';
    return await postMethod(api,data)
}

export async function updateCartItems(data){
    const api = ecomUrl + 'update_cartitem';
    return await postMethod(api,data)
}

export async function deleteCartItems(data){
    const api = 'ecommerce_business_store.ecommerce_business_store.v2.cart.delete_cart_items';
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