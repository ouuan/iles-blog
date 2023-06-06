import{d as m,i as _,a as p,u,b as h,c as d,e as g,f as n,g as t,t as o,h as a,F as f,r as v,n as x,j as y,o as i,k as b,l as N,m as k,p as P,q as w,_ as S}from"./index-d8cc9cdf.js";import{N as V}from"./NoteDisplay-cf183cc7.js";const j={class:"m-4"},L={class:"mb-10"},T={class:"text-4xl font-bold mt-2"},B={class:"opacity-50"},C={class:"text-lg"},D={class:"font-bold flex gap-2"},H={class:"opacity-50"},z=t("div",{class:"flex-auto"},null,-1),F={key:0,class:"border-gray-400/50 mb-8"},M=m({__name:"PresenterPrint",setup(q){_(p),u(`
@page {
  size: A4;
  margin-top: 1.5cm;
  margin-bottom: 1cm;
}
* {
  -webkit-print-color-adjust: exact;
}
html,
html body,
html #app,
html #page-root {
  height: auto;
  overflow: auto !important;
}
`),h({title:`Notes - ${d.title}`});const r=g(()=>y.slice(0,-1).map(s=>{var l;return(l=s.meta)==null?void 0:l.slide}).filter(s=>s!==void 0&&s.noteHTML!==""));return(s,l)=>(i(),n("div",{id:"page-root",style:x(a(w))},[t("div",j,[t("div",L,[t("h1",T,o(a(d).title),1),t("div",B,o(new Date().toLocaleString()),1)]),(i(!0),n(f,null,v(a(r),(e,c)=>(i(),n("div",{key:c,class:"flex flex-col gap-4 break-inside-avoid-page"},[t("div",null,[t("h2",C,[t("div",D,[t("div",H,o(e==null?void 0:e.no)+"/"+o(a(b)),1),N(" "+o(e==null?void 0:e.title)+" ",1),z])]),k(V,{"note-html":e.noteHTML,class:"max-w-full"},null,8,["note-html"])]),c<a(r).length-1?(i(),n("hr",F)):P("v-if",!0)]))),128))])],4))}}),R=S(M,[["__file","/home/ouuan/courses/2022-2023-2/digital-design/digital-design-grp-12/slides/node_modules/.pnpm/@slidev+client@0.40.14_postcss@8.4.23_react-dom@16.14.0_react@16.14.0_vite@4.3.1/node_modules/@slidev/client/internals/PresenterPrint.vue"]]);export{R as default};
