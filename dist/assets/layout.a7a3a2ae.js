import{D as V,p as L,q as P,M as S,s as T,v as E,x as O,y as R,z as U,A as W,B as X,C as q,G as z,H as F,r as o,o as r,e as d,f as n,w as a,g as e,F as f,h,I as u,J as _,t as c,K as m,L as H,T as J}from"./vendor.2872f71b.js";import{R as p,r as G}from"./index.c17962c1.js";import{_ as K}from"./plugin-vue_export-helper.5a098b48.js";const Q={name:"Tom Cook",email:"tom@example.com",imageUrl:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"},Y={components:{Disclosure:V,DisclosureButton:L,DisclosurePanel:P,Menu:S,MenuButton:T,MenuItem:E,MenuItems:O,BellIcon:R,MenuIcon:U,XIcon:W},setup(){const l=X(),i=q([]),x=z(),t=l.state.role;return t===p.Student?i.value=[{name:"home",href:"/student/home"},{name:"admin-message",href:"/student/admin-message"}]:t===p.Principal?i.value=[{name:"home",href:"/principal/home"},{name:"invitations",href:"/principal/invitations"},{name:"admin-message",href:"/principal/admin-message"}]:t===p.Normal&&(i.value=[{name:"home",href:"/normal/home",current:!0},{name:"admin-message",href:"/normal/admin-message"}]),G(),l.dispatch("checkAdminMessages"),{user:Q,unreadAdmin:F(()=>l.state.unreadAdmin),email:l.state.user.email,navigation:i,handleLogout(){l.dispatch("logout")},toAdminMessages(){x.push(`/${t}/admin-message`)}}}},Z={class:"min-h-screen bg-white"},$={class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"},ee={class:"flex justify-between h-16"},se={class:"flex"},te=e("div",{class:"flex-shrink-0 flex items-center"},[e("img",{class:"block lg:hidden h-8 w-auto",src:"https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg",alt:"Workflow"}),e("img",{class:"hidden lg:block h-8 w-auto",src:"https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg",alt:"Workflow"})],-1),oe={class:"hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8"},ne={class:"hidden sm:ml-6 sm:flex sm:items-center"},ae=e("span",{class:"sr-only"},"View notifications",-1),re={key:0,class:"w-5 h-5 text-white bg-red-700 rounded-full text-xs flex justify-center items-center absolute top-0 right-0 -m-1"},ie=e("span",{class:"sr-only"},"Open user menu",-1),le=["src"],ce={class:"-mr-2 flex items-center sm:hidden"},de=e("span",{class:"sr-only"},"Open main menu",-1),ue={class:"pt-2 pb-3 space-y-1"},me={class:"pt-4 pb-3 border-t border-gray-200"},ge={class:"flex items-center px-4"},fe={class:"flex-shrink-0"},he=["src"],_e={class:"ml-3"},pe={class:"text-base font-medium text-gray-800"},xe={class:"text-sm font-medium text-gray-500"},ye={type:"button",class:"ml-auto bg-white flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"},ve=e("span",{class:"sr-only"},"View notifications",-1),be={class:"mt-3 space-y-1"},we={class:"py-10"},ke={class:"max-w-7xl mx-auto sm:px-6 lg:px-8"},Me=e("h1",{class:"text-xl font-bold"},"Student",-1),Ie={class:"px-4 py-8 sm:px-0"},Be={class:"border-4 border-dashed border-gray-200 rounded-lg p-5"};function De(l,i,x,t,Ae,Ce){const g=o("router-link"),y=o("BellIcon"),b=o("MenuButton"),v=o("MenuItem"),w=o("MenuItems"),k=o("Menu"),M=o("MenuIcon"),I=o("XIcon"),B=o("DisclosureButton"),D=o("DisclosurePanel"),A=o("Disclosure"),C=o("router-view");return r(),d("div",Z,[n(A,{as:"nav",class:"bg-white border-b border-gray-200"},{default:a(({open:j})=>[e("div",$,[e("div",ee,[e("div",se,[te,e("div",oe,[(r(!0),d(f,null,h(t.navigation,s=>(r(),u(g,{key:s.name,to:s.href,class:m([s.href===l.$route.path?"border-indigo-500 text-gray-900":"border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700","inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"]),"aria-current":s.current?"page":void 0},{default:a(()=>[_(c(s.name),1)]),_:2},1032,["to","class","aria-current"]))),128))])]),e("div",ne,[e("a",{type:"button",class:"bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative cursor-pointer",onClick:i[0]||(i[0]=(...s)=>t.toAdminMessages&&t.toAdminMessages(...s))},[ae,n(y,{class:"h-6 w-6","aria-hidden":"true"}),t.unreadAdmin?(r(),d("div",re,c(t.unreadAdmin),1)):H("",!0)]),n(k,{as:"div",class:"ml-3 relative"},{default:a(()=>[e("div",null,[n(b,{class:"max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"},{default:a(()=>[ie,e("img",{class:"h-8 w-8 rounded-full",src:t.user.imageUrl,alt:""},null,8,le)]),_:1})]),n(J,{"enter-active-class":"transition ease-out duration-200","enter-from-class":"transform opacity-0 scale-95","enter-to-class":"transform opacity-100 scale-100","leave-active-class":"transition ease-in duration-75","leave-from-class":"transform opacity-100 scale-100","leave-to-class":"transform opacity-0 scale-95"},{default:a(()=>[n(w,{class:"origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"},{default:a(()=>[n(v,null,{default:a(({active:s})=>[e("div",{class:m([s?"bg-gray-100":"","block px-4 py-2 text-sm text-gray-700"])},c(t.email),3)]),_:1}),n(v,null,{default:a(({active:s})=>[e("a",{onClick:i[1]||(i[1]=(...N)=>t.handleLogout&&t.handleLogout(...N)),class:m([s?"bg-gray-100":"","block px-4 py-2 text-sm text-gray-700"])}," logout ",2)]),_:1})]),_:1})]),_:1})]),_:1})]),e("div",ce,[n(B,{class:"bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"},{default:a(()=>[de,j?(r(),u(I,{key:1,class:"block h-6 w-6","aria-hidden":"true"})):(r(),u(M,{key:0,class:"block h-6 w-6","aria-hidden":"true"}))]),_:2},1024)])])]),n(D,{class:"sm:hidden"},{default:a(()=>[e("div",ue,[(r(!0),d(f,null,h(t.navigation,s=>(r(),u(g,{key:s.name,to:s.href,class:m([s.current?"bg-indigo-50 border-indigo-500 text-indigo-700":"border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800","block pl-3 pr-4 py-2 border-l-4 text-base font-medium"]),"aria-current":s.current?"page":void 0},{default:a(()=>[_(c(s.name),1)]),_:2},1032,["to","class","aria-current"]))),128))]),e("div",me,[e("div",ge,[e("div",fe,[e("img",{class:"h-10 w-10 rounded-full",src:t.user.imageUrl,alt:""},null,8,he)]),e("div",_e,[e("div",pe,c(t.user.name),1),e("div",xe,c(t.user.email),1)]),e("button",ye,[ve,n(y,{class:"h-6 w-6","aria-hidden":"true"})])]),e("div",be,[(r(!0),d(f,null,h(l.userNavigation,s=>(r(),u(g,{key:s.name,to:s.href,class:"block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"},{default:a(()=>[_(c(s.name),1)]),_:2},1032,["to"]))),128))])])]),_:1})]),_:1}),e("div",we,[e("main",null,[e("div",ke,[Me,e("div",Ie,[e("div",Be,[n(C)])])])])])])}var Le=K(Y,[["render",De]]);export{Le as default};