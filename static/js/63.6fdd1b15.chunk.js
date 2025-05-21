"use strict";(self.webpackChunkportfolio_website=self.webpackChunkportfolio_website||[]).push([[63],{63:(e,t,r)=>{r.r(t),r.d(t,{default:()=>_});var i=r(43),n=r(472);const o=(0,r(64).Wp)({apiKey:"AIzaSyCUD71QNdj1eSt-elHLS_NXNtIoTOgn97A",authDomain:"portfolio-website-db.firebaseapp.com",projectId:"portfolio-website-db",storageBucket:"portfolio-website-db.firebasestorage.app",messagingSenderId:"243971231959",appId:"1:243971231959:web:a0e5110d3353a756fde092",measurementId:"G-RVTE4D6LX1"}),a=(0,n.aU)(o);var s=r(464),l=r(772),d=r(467),p=r(821),c=r(422);const m=s.Ay.div`
  overflow: hidden;
  max-height: ${e=>{let{open:t}=e;return t?"2000px":"0"}};
  opacity: ${e=>{let{open:t}=e;return t?1:0}};
  margin-top: ${e=>{let{open:t}=e;return t?"0.2rem":"0"}};
  transition:
    max-height 0.4s ease,
    opacity    0.4s ease,
    margin-top 0.4s ease;

  @media ${l.j.desktop} {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    flex-direction: ${e=>{let{flip:t}=e;return t?"row-reverse":"row"}};
  }
`;var g=r(579);const h=s.Ay.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;

  li {
    background: ${e=>{let{theme:t}=e;return t.colors.highlight}};
    color: ${e=>{let{theme:t}=e;return t.colors.primary}};
    padding: 0.35rem 0.9rem;
    border-radius: 9999px;
    font-size: 0.85rem;
    white-space: nowrap;
  }
`,x=e=>{let{items:t=[]}=e;return(0,g.jsx)(h,{children:t.map(((e,t)=>(0,g.jsx)("li",{children:e},t)))})},u=s.Ay.div`
  border-bottom: 1px solid #ddd;
  padding: 1.5rem 0;
  cursor: ${e=>e.collapsed?"pointer":"default"};
`,f=s.Ay.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  user-select:none;
`,j=s.Ay.h2`
  font-size:1.6rem;
  margin:0;
  color:${e=>e.theme.colors.text};

  @media ${l.j.desktop}{ font-size:2rem; }
`,b=s.Ay.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.4rem;
  font-size: 0.9rem;

  a { font-weight: 600; }

  @media ${l.j.desktop} { display: none; }
`,y=s.Ay.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.3rem;
  font-size: 0.9rem;

  @media ${l.j.desktop} { display: none; }
`,k=s.Ay.div`
  display: none;

  @media ${l.j.desktop} {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
    font-size: 0.9rem;
    a { font-weight: 600; }
  }
`,w=s.Ay.span`
  color:#888;
`,$=s.Ay.span`
  font-size:1.2rem;
  transition: transform 0.3s ease;
  margin-left:0.25rem;
  ${e=>e.open&&s.AH`transform: rotate(180deg);`}
  cursor:pointer;
`,A=s.Ay.div` flex:1; `,v=s.Ay.div`
  margin-top:1.5rem;
  img{ max-width:100%; border-radius:8px; box-shadow:0 6px 12px rgba(0,0,0,0.1); }
  @media ${l.j.desktop}{ flex:0 0 40%; margin-top:0; }
`,D=s.Ay.div`
  margin-top: 1rem;
  @media ${l.j.desktop} {
    margin-top: 1.2rem;
  }
`,U=e=>e?e.toDate().toLocaleString("default",{month:"short",year:"numeric"}):"Present",C=e=>{let{title:t,description:r,technologies:n,githubUrl:o,projectWebsiteUrl:a,documentUrl:s,imageUrl:l,startDate:h,endDate:C,flip:z=!1}=e;const[S,_]=(0,i.useState)(!1),I=(0,i.useCallback)((()=>{_(!S)}),[S]),G=e=>{e.stopPropagation(),_((e=>!e))},M=e=>e.stopPropagation();return(0,g.jsxs)(u,{collapsed:!S,onClick:I,children:[(0,g.jsxs)(f,{children:[(0,g.jsx)(j,{children:t}),(0,g.jsxs)(k,{children:[(0,g.jsxs)(w,{children:[U(h)," \u2013 ",U(C)]}),o&&(0,g.jsx)(c.A,{to:o,target:"_blank",onClick:M,children:"GitHub"}),a&&(0,g.jsx)(c.A,{to:a,target:"_blank",onClick:M,children:"Site"}),s&&(0,g.jsx)(c.A,{to:s,target:"_blank",onClick:M,children:"Doc"}),(0,g.jsx)($,{onClick:G,open:S,children:"\u25bc"})]})]}),(0,g.jsxs)(b,{children:[o&&(0,g.jsx)(c.A,{to:o,target:"_blank",onClick:M,children:"GitHub"}),a&&(0,g.jsx)(c.A,{to:a,target:"_blank",onClick:M,children:"Site"}),s&&(0,g.jsx)(c.A,{to:s,target:"_blank",onClick:M,children:"Doc"})]}),(0,g.jsxs)(y,{children:[(0,g.jsxs)(w,{children:[U(h)," \u2013 ",U(C)]}),(0,g.jsx)($,{onClick:G,open:S,children:"\u25bc"})]}),(0,g.jsxs)(m,{open:S,flip:z,children:[(0,g.jsx)(A,{children:(0,g.jsx)(p.A,{children:r})}),l&&(0,g.jsx)(v,{children:(0,g.jsx)(d.A,{src:l,alt:`Project ${t}`})})]}),(null===n||void 0===n?void 0:n.length)>0&&(0,g.jsx)(D,{children:(0,g.jsx)(x,{items:n})})]})};var z=r(406),S=r(549);const _=()=>{const{projects:e,loading:t}=(()=>{const[e,t]=(0,i.useState)([]),[r,o]=(0,i.useState)(!0);return(0,i.useEffect)((()=>{(async()=>{const e=(0,n.P)((0,n.rJ)(a,"projects"),(0,n.My)("startDate","desc")),r=(await(0,n.GG)(e)).docs.map((e=>({id:e.id,...e.data()})));t(r),o(!1)})()}),[]),{projects:e,loading:r}})();return t?(0,g.jsx)(z.A,{}):(0,g.jsx)(S.A,{children:e.map(((e,t)=>(0,g.jsx)(C,{title:e.title,description:e.description,githubUrl:e.githubUrl,imageUrl:e.imageUrl,projectWebsiteUrl:e.projectWebsiteUrl,documentUrl:e.documentUrl,startDate:e.startDate,endDate:e.endDate,technologies:e.technologies,flip:t%2!==0},e.id)))})}},467:(e,t,r)=>{r.d(t,{A:()=>s});r(43);var i=r(464),n=r(579);const o=i.Ay.div`
  text-align: center;
  margin: 1rem 0;
`,a=i.Ay.img`
  max-width: 100%;
  height: auto;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`,s=e=>{let{src:t,alt:r,width:i,height:s,...l}=e;return(0,n.jsx)(o,{children:(0,n.jsx)(a,{src:t,alt:r,width:i,height:s,...l})})}},549:(e,t,r)=>{r.d(t,{A:()=>o});var i=r(464),n=r(772);const o=i.Ay.section`
  ${e=>{let{max:t}=e;return`max-width: ${t||"1400px"};`}}
  ${e=>{let{padM:t}=e;return`padding: ${t||"0.5rem 0.5rem"};`}}
  margin: auto;

  @media ${n.j.desktop} {
    ${e=>{let{padD:t}=e;return`padding: ${t||"3rem"};`}}
  }

  /* optional centered flex layout */
  ${e=>{let{center:t}=e;return t&&`\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      gap: 2rem;\n\n      @media ${n.j.desktop} {\n        flex-direction: row;\n        gap: 3rem;\n        align-items: center;\n      }\n    `}}
`},821:(e,t,r)=>{r.d(t,{A:()=>o});var i=r(464),n=r(772);const o=i.Ay.p`
  width: 100%;
  text-align: justify;  
  font-size: ${e=>{let{sizeMobile:t}=e;return t||"1rem"}};
  line-height: ${e=>{let{lhMobile:t}=e;return t||"1.6"}};
  margin-bottom: ${e=>{let{mbMobile:t}=e;return t||"1rem"}};
  color: ${e=>{let{theme:t,color:r}=e;return r||t.colors.text}};

  @media ${n.j.desktop} {
    font-size: ${e=>{let{sizeDesktop:t}=e;return t||"1.2rem"}};
    line-height: ${e=>{let{lhDesktop:t}=e;return t||"1.8"}};
    margin-bottom: ${e=>{let{mbDesktop:t}=e;return t||"1.5rem"}};
  }
`}}]);
//# sourceMappingURL=63.6fdd1b15.chunk.js.map