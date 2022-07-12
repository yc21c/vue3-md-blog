import{_ as y,r as k,o as l,c,a as S,w as v,b as r,d as b,P as M,i as B,e as E,f as V,t as O,g as f,h as p,F as C,j as $,n as h,k as I,l as w}from"./index.fb6766f5.js";import{b as N}from"./blog_config.bd5f3422.js";var R="/assets/logo.03d6d6da.png";const L={},T={class:"text-center my-5"},U=r("p",{class:"display-3"},"APPRZ",-1),H=r("img",{alt:"Vue logo",src:R},null,-1);function j(e,t){const o=k("router-link");return l(),c("div",T,[S(o,{to:"/",class:"text-reset"},{default:v(()=>[U,H]),_:1})])}var G=y(L,[["render",j]]);const F=(e,t=1,o=10,d=10)=>{const a=Math.ceil(e/o);t<1?t=1:t>a&&(t=a);let n,i;if(a<=d)n=1,i=a;else{const g=Math.floor(d/2),P=Math.ceil(d/2)-1;t<=g?(n=1,i=d):t+P>=a?(n=a-d+1,i=a):(n=t-g,i=t+P)}const u=(t-1)*o,_=Math.min(u+o-1,e-1),s=Array.from(Array(i+1-n).keys()).map(g=>n+g);return{totalItems:e,currentPage:t,pageSize:o,totalPages:a,startPage:n,endPage:i,startIndex:u,endIndex:_,pages:s}},{VUE_APP_POSTS_PER_PAGE:X,VUE_APP_MAIN_BG_CSS_COLOR:D,VUE_APP_MAIN_TEXT_CSS_COLOR:Z}=N,q=b({components:{PatchMeta:M,BlogHeader:G},props:{section:{type:String,default:""}},setup(e){const t=B("postsIndex",[]),o=E({currentPage:1}),d=V(()=>{const a=e.section?t.filter(({section:m})=>m===e.section):t,{startPage:n,endPage:i,startIndex:u,endIndex:_}=F(a.length,o.currentPage,X),s=o.currentPage-1>=n?o.currentPage-1:0,g=o.currentPage+1<=i?o.currentPage+1:0,P=[s,o.currentPage,g].filter(m=>m>n&&m<i),A=a.slice(u,_+1);return{startPage:n,midPages:P,endPage:i,visiblePosts:A}});return{...O(o),pageStatus:d,VUE_APP_MAIN_BG_CSS_COLOR:D,VUE_APP_MAIN_TEXT_CSS_COLOR:Z}}}),z={key:0},J={key:1,class:"text-center display-4 text-capitalize my-5"},K={class:"text-left m-0 p-0"},Q={class:"m-0 p-0 text-right font-weight-bold"},W={class:"font-weight-light mt-1"},Y={key:2,class:"pagination justify-content-center mb-5 pb-5",style:{cursor:"pointer"}},x={class:"page-link"},ee=["onClick"],te={class:"page-link"},se={class:"page-link"};function oe(e,t,o,d,a,n){const i=k("PatchMeta"),u=k("BlogHeader"),_=k("router-link");return l(),c(C,null,[S(i,{title:e.section?e.section:"Minimal Vue3 + Markdown blog engine"},null,8,["title"]),r("div",{style:I(`background-color: ${e.VUE_APP_MAIN_BG_CSS_COLOR}; color: ${e.VUE_APP_MAIN_TEXT_CSS_COLOR};`)},[S(u,{class:"mb-5"}),e.section?(l(),c("hr",z)):f("",!0),e.section?(l(),c("p",J,p(e.section),1)):f("",!0),(l(!0),c(C,null,$(e.pageStatus.visiblePosts,s=>(l(),c("div",{key:s.id,class:"container markdown-body p-3 p-md-4"},[S(_,{to:`/${s.section}/${s.id}`,class:"text-reset"},{default:v(()=>[r("h3",K,p(s.title),1)]),_:2},1032,["to"]),r("p",{class:h(["font-weight-light font-italic m-0 p-0",e.section?"mb-3":"text-right"])},p(s.date),3),e.section?f("",!0):(l(),w(_,{key:0,to:`/${s.section}`,class:"text-reset"},{default:v(()=>[r("h6",Q," #"+p(s.section),1)]),_:2},1032,["to"])),r("p",W,p(s.description),1)]))),128)),e.pageStatus.endPage>e.pageStatus.startPage?(l(),c("ul",Y,[r("li",{class:h(["page-item",e.currentPage==e.pageStatus.startPage?"active":""]),onClick:t[0]||(t[0]=s=>e.currentPage=e.pageStatus.startPage)},[r("a",x,p(e.pageStatus.startPage),1)],2),(l(!0),c(C,null,$(e.pageStatus.midPages,(s,g)=>(l(),c("li",{key:g,class:h(["page-item",e.currentPage==s?"active":""]),onClick:P=>e.currentPage=s},[r("a",te,p(s),1)],10,ee))),128)),r("li",{class:h(["page-item",e.currentPage==e.pageStatus.endPage?"active":""]),onClick:t[1]||(t[1]=s=>e.currentPage=e.pageStatus.endPage)},[r("a",se,p(e.pageStatus.endPage),1)],2)])):f("",!0)],4)],64)}var ie=y(q,[["render",oe]]);export{ie as default};
