"use strict";(self.webpackChunkportfolio_website=self.webpackChunkportfolio_website||[]).push([[825],{467:(e,t,i)=>{i.d(t,{A:()=>a});i(43);var r=i(464),o=i(579);const s=r.Ay.div`
  text-align: center;
  margin: 1rem 0;
`,n=r.Ay.img`
  max-width: 100%;
  height: auto;
  border-radius: 50%; /* Makes it circular - remove if not desired */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`,a=e=>{let{src:t,alt:i,width:r,height:a,...l}=e;return(0,o.jsx)(s,{children:(0,o.jsx)(n,{src:t,alt:i,width:r,height:a,...l})})}},821:(e,t,i)=>{i.d(t,{A:()=>s});var r=i(464),o=i(772);const s=r.Ay.p`
  width: 100%;
  text-align: justify;  
  font-size: ${e=>{let{sizeMobile:t}=e;return t||"1rem"}};
  line-height: ${e=>{let{lhMobile:t}=e;return t||"1.6"}};
  margin-bottom: ${e=>{let{mbMobile:t}=e;return t||"1rem"}};
  color: ${e=>{let{theme:t,color:i}=e;return i||t.colors.text}};

  @media ${o.j.desktop} {
    font-size: ${e=>{let{sizeDesktop:t}=e;return t||"1.2rem"}};
    line-height: ${e=>{let{lhDesktop:t}=e;return t||"1.8"}};
    margin-bottom: ${e=>{let{mbDesktop:t}=e;return t||"1.5rem"}};
  }
`},825:(e,t,i)=>{i.r(t),i.d(t,{default:()=>C});var r=i(43),o=i(472);const s=(0,i(64).Wp)({apiKey:"AIzaSyCUD71QNdj1eSt-elHLS_NXNtIoTOgn97A",authDomain:"portfolio-website-db.firebaseapp.com",projectId:"portfolio-website-db",storageBucket:"portfolio-website-db.firebasestorage.app",messagingSenderId:"243971231959",appId:"1:243971231959:web:a0e5110d3353a756fde092",measurementId:"G-RVTE4D6LX1"}),n=(0,o.aU)(s);var a=i(464),l=i(772),d=i(467),c=i(821),p=i(422),m=i(579);const h=a.Ay.div`
  border-bottom: 1px solid #ddd;
  padding: 1.5rem 0;
  cursor: ${e=>e.collapsed?"pointer":"default"};   /* click anywhere when collapsed */
`,g=a.Ay.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  user-select:none;
`,x=a.Ay.h2`
  font-size:1.8rem;
  margin:0;
  color:${e=>e.theme.colors.text};

  @media ${l.j.desktop}{ font-size:2rem; }
`,f=a.Ay.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.4rem;
  font-size: 0.9rem;

  a { font-weight: 600; }

  @media ${l.j.desktop} { display: none; }   /* hide on desktop */
`,u=a.Ay.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.3rem;
  font-size: 0.9rem;

  @media ${l.j.desktop} { display: none; }   /* hide on desktop */
`,b=a.Ay.div`
  display: none;

  @media ${l.j.desktop} {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
    font-size: 0.9rem;
    a { font-weight: 600; }
  }
`,j=a.Ay.span`
  color:#888;
`,k=a.Ay.span`
  font-size:1.2rem;
  transition: transform 0.3s ease;
  margin-left:0.25rem;
  ${e=>e.open&&a.AH`transform: rotate(180deg);`}
  cursor:pointer;
`,y=a.Ay.div`
  overflow: hidden;
  max-height: ${e=>e.open?"2000px":"0"};
  opacity: ${e=>e.open?1:0};
  margin-top: ${e=>e.open?"1.2rem":"0"};
  transition:
    max-height 0.4s ease,
    opacity    0.4s ease,
    margin-top 0.4s ease;

  @media ${l.j.desktop} {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    flex-direction: ${e=>e.flip?"row-reverse":"row"};
  }
`,w=a.Ay.div` flex:1; `,A=a.Ay.ul`
  margin:0; padding:0; display:flex; flex-wrap:wrap; gap:0.5rem; list-style:none;
  li{
    background:#f0f0f0; padding:0.4rem 0.8rem; border-radius:4px; font-size:0.9rem;
  }
`,$=a.Ay.div`
  margin-top:1.5rem;
  img{ max-width:100%; border-radius:8px; box-shadow:0 6px 12px rgba(0,0,0,0.1); }
  @media ${l.j.desktop}{ flex:0 0 40%; margin-top:0; }
`,v=e=>e?e.toDate().toLocaleString("default",{month:"short",year:"numeric"}):"Present",D=e=>{let{title:t,description:i,technologies:o,githubUrl:s,projectWebsiteUrl:n,documentUrl:a,imageUrl:l,startDate:D,endDate:U,flip:C=!1}=e;const[z,S]=(0,r.useState)(!1),_=(0,r.useCallback)((()=>{z||S(!0)}),[z]),I=e=>{e.stopPropagation(),S((e=>!e))},G=e=>e.stopPropagation();return(0,m.jsxs)(h,{collapsed:!z,onClick:_,children:[(0,m.jsxs)(g,{children:[(0,m.jsx)(x,{children:t}),(0,m.jsxs)(b,{children:[(0,m.jsxs)(j,{children:[v(D)," \u2013 ",v(U)]}),s&&(0,m.jsx)(p.A,{to:s,target:"_blank",onClick:G,children:"GitHub"}),n&&(0,m.jsx)(p.A,{to:n,target:"_blank",onClick:G,children:"Site"}),a&&(0,m.jsx)(p.A,{to:a,target:"_blank",onClick:G,children:"Doc"}),(0,m.jsx)(k,{onClick:I,open:z,children:"\u25bc"})]})]}),(0,m.jsxs)(f,{children:[s&&(0,m.jsx)(p.A,{to:s,target:"_blank",onClick:G,children:"GitHub"}),n&&(0,m.jsx)(p.A,{to:n,target:"_blank",onClick:G,children:"Site"}),a&&(0,m.jsx)(p.A,{to:a,target:"_blank",onClick:G,children:"Doc"})]}),(0,m.jsxs)(u,{children:[(0,m.jsxs)(j,{children:[v(D)," \u2013 ",v(U)]}),(0,m.jsx)(k,{onClick:I,open:z,children:"\u25bc"})]}),(0,m.jsxs)(y,{open:z,flip:C,children:[(0,m.jsxs)(w,{children:[(0,m.jsx)(c.A,{children:i}),(null===o||void 0===o?void 0:o.length)>0&&(0,m.jsx)(A,{children:o.map(((e,t)=>(0,m.jsx)("li",{children:e},t)))})]}),l&&(0,m.jsx)($,{children:(0,m.jsx)(d.A,{src:l,alt:`Project ${t}`})})]})]})};var U=i(406);const C=()=>{const{projects:e,loading:t}=(()=>{const[e,t]=(0,r.useState)([]),[i,s]=(0,r.useState)(!0);return(0,r.useEffect)((()=>{(async()=>{const e=(0,o.P)((0,o.rJ)(n,"projects"),(0,o.My)("startDate","desc")),i=(await(0,o.GG)(e)).docs.map((e=>({id:e.id,...e.data()})));t(i),s(!1)})()}),[]),{projects:e,loading:i}})();return t?(0,m.jsx)(U.A,{}):(0,m.jsx)("section",{children:e.map(((e,t)=>(0,m.jsx)(D,{title:e.title,description:e.description,githubUrl:e.githubUrl,imageUrl:e.imageUrl,projectWebsiteUrl:e.projectWebsiteUrl,documentUrl:e.documentUrl,startDate:e.startDate,endDate:e.endDate,technologies:e.technologies,flip:t%2!==0},e.id)))})}}}]);
//# sourceMappingURL=825.97865a02.chunk.js.map