import{h as i}from"./index.c17962c1.js";import{C as p,B as x,o as r,e as c,g as e,F as m,h as g,K as _,t as d}from"./vendor.2872f71b.js";import{_ as u}from"./plugin-vue_export-helper.5a098b48.js";const h={setup(){const s=p([]),a=x(),n=a.state.role==="student"?"student":"teacher";return i.get(`/${n}/admin-messages`).then(o=>{s.value=o,a.commit("setUnreadAdmin",0)}),{data:s}}},f={class:"flex flex-col"},y={class:"-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"},w={class:"py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"},v={class:"shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"},b={class:"min-w-full divide-y divide-gray-200"},k=e("thead",{class:"bg-gray-50"},[e("tr",null,[e("th",{scope:"col",class:"w-10 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}," Id "),e("th",{scope:"col",class:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}," Message "),e("th",{scope:"col",class:"w-20 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"}," Created at ")])],-1),B={class:"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"},$={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-500"},j={class:"px-6 py-4 whitespace-nowrap text-sm text-gray-500"};function C(s,a,n,o,F,S){return r(),c("div",f,[e("div",y,[e("div",w,[e("div",v,[e("table",b,[k,e("tbody",null,[(r(!0),c(m,null,g(o.data,(t,l)=>(r(),c("tr",{key:t.id,class:_(l%2==0?"bg-white":"bg-gray-50")},[e("td",B,d(t.id),1),e("td",$,d(t.message),1),e("td",j,d(t.created_at),1)],2))),128))])])])])])])}var E=u(h,[["render",C]]);export{E as default};