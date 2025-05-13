"use strict";(self.webpackChunkportfolio_website=self.webpackChunkportfolio_website||[]).push([[825],{467:(e,t,r)=>{r.d(t,{A:()=>n});r(43);var i=r(464),o=r(579);const s=i.Ay.div`
  text-align: center;
  margin: 1rem 0;
`,a=i.Ay.img`
  max-width: 100%;
  height: auto;
  border-radius: 50%; /* Makes it circular - remove if not desired */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`,n=e=>{let{src:t,alt:r,width:i,height:n,...d}=e;return(0,o.jsx)(s,{children:(0,o.jsx)(a,{src:t,alt:r,width:i,height:n,...d})})}},825:(e,t,r)=>{r.r(t),r.d(t,{default:()=>k});var i=r(43),o=r(472);const s=(0,r(64).Wp)({apiKey:"AIzaSyCUD71QNdj1eSt-elHLS_NXNtIoTOgn97A",authDomain:"portfolio-website-db.firebaseapp.com",projectId:"portfolio-website-db",storageBucket:"portfolio-website-db.firebasestorage.app",messagingSenderId:"243971231959",appId:"1:243971231959:web:a0e5110d3353a756fde092",measurementId:"G-RVTE4D6LX1"}),a=(0,o.aU)(s);var n=r(464),d=r(772),l=r(467),c=r(422),p=r(579);const m=n.Ay.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  margin-bottom: 2rem;
  border-bottom: 1px solid #ddd;

  @media ${d.j.desktop} {
    flex-direction: ${e=>e.flip?"row-reverse":"row"};
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }
`,g=n.Ay.div`
  flex: 1;
`,h=n.Ay.h2`
  font-size: 1.8rem;
  color: ${e=>e.theme.colors.text};
  margin-bottom: 0.5rem;

  @media ${d.j.desktop} {
    font-size: 2rem;
  }
`,f=n.Ay.p`
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 0.8rem;
`,x=n.Ay.p`
  font-size: 1.1rem;
  line-height: 1.5;
  color: #555;

  @media ${d.j.desktop} {
    font-size: 1.2rem;
  }
`,b=n.Ay.ul`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;

  li {
    background: #f0f0f0;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    font-size: 0.9rem;
  }
`,u=n.Ay.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;

  a {
    font-weight: 600;
    font-size: 1rem;
  }
`,j=n.Ay.div`
  margin-top: 1.5rem;

  img {
    border-radius: 8px;
    max-width: 100%;
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  }

  @media ${d.j.desktop} {
    flex: 0 0 40%;
    margin-top: 0;
  }
`,w=e=>{if(!e)return"Present";return e.toDate().toLocaleString("default",{month:"short",year:"numeric"})},y=e=>{let{title:t,description:r,technologies:i,githubUrl:o,imageUrl:s,projectWebsiteUrl:a,documentUrl:n,startDate:d,endDate:y,flip:A}=e;return(0,p.jsxs)(m,{flip:A,children:[(0,p.jsxs)(g,{children:[(0,p.jsx)(h,{children:t}),(d||y)&&(0,p.jsxs)(f,{children:[w(d)," - ",w(y)]}),(0,p.jsx)(x,{children:r}),i&&(0,p.jsx)(b,{children:i.map(((e,t)=>(0,p.jsx)("li",{children:e},t)))}),(0,p.jsxs)(u,{children:[o&&(0,p.jsx)(c.A,{to:o,target:"_blank",children:"GitHub"}),a&&(0,p.jsx)(c.A,{to:a,target:"_blank",children:"Project Website"}),n&&(0,p.jsx)(c.A,{to:n,target:"_blank",children:"Documentation"})]})]}),s&&(0,p.jsx)(j,{children:(0,p.jsx)(l.A,{src:s,alt:`Project ${t}`})})]})};var A=r(406);const k=()=>{const{projects:e,loading:t}=(()=>{const[e,t]=(0,i.useState)([]),[r,s]=(0,i.useState)(!0);return(0,i.useEffect)((()=>{(async()=>{const e=(0,o.P)((0,o.rJ)(a,"projects"),(0,o.My)("startDate","desc")),r=(await(0,o.GG)(e)).docs.map((e=>({id:e.id,...e.data()})));t(r),s(!1)})()}),[]),{projects:e,loading:r}})();return t?(0,p.jsx)(A.A,{}):(0,p.jsx)("section",{children:e.map(((e,t)=>(0,p.jsx)(y,{title:e.title,description:e.description,githubUrl:e.githubUrl,imageUrl:e.imageUrl,projectWebsiteUrl:e.projectWebsiteUrl,documentUrl:e.documentUrl,startDate:e.startDate,endDate:e.endDate,technologies:e.technologies,flip:t%2!==0},e.id)))})}}}]);
//# sourceMappingURL=825.d027a647.chunk.js.map