(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,n){e.exports=n(20)},19:function(e,t,n){},20:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),a=n(6),l=n.n(a),c=(n(19),n(2));const i=c.c.div`
  position: relative;
  display: inline-block;
`,s=c.c.button`
  background-color: #fff;
  border: 1px solid #ccc;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  padding: 10px 14px;
  border-radius: 4px;
  color: #333;
  /* Slight shadow around the toggle button */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);

  /* Down caret icon */
  &:after {
    content: '';
    display: inline-block;
    margin-left: 8px;
    vertical-align: middle;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #333;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`,d=c.c.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  transform: scaleY(${e=>e.isOpen?"1":"0"});
  transform-origin: top;
  opacity: ${e=>e.isOpen?"1":"0"};
  pointer-events: ${e=>e.isOpen?"auto":"none"};
  transition: transform 0.3s ease, opacity 0.3s ease;
  background-color: #fff;
  /* More pronounced shadow around the dropdown */
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  border-radius: 4px;
`,u=c.c.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`,m=c.c.li`
  a {
    display: block;
    padding: 10px 14px;
    text-decoration: none;
    color: #333;
    &:hover {
      background-color: #f1f1f1;
    }
  }
`;var p=e=>{let{title:t,items:n}=e;const[a,l]=Object(o.useState)(!1),c=Object(o.useRef)(null);return Object(o.useEffect)(()=>{const e=e=>{c.current&&!c.current.contains(e.target)&&l(!1)};return document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}},[]),r.a.createElement(i,{ref:c},r.a.createElement(s,{onClick:()=>l(!a)},t),r.a.createElement(d,{isOpen:a},r.a.createElement(u,null,n.map((e,t)=>r.a.createElement(m,{key:t},r.a.createElement("a",{href:e.href},e.label))))))};const f=c.c.header`
  background-color: ${e=>e.theme.colors.headerBackground};
  color: #fff;
  padding: 1rem;
`,h=c.c.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;var g=()=>{return r.a.createElement(f,null,r.a.createElement(h,null,r.a.createElement(p,{title:"Contents",items:[{href:"/",label:"Home"},{href:"/about",label:"About"},{href:"/projects",label:"Projects"},{href:"/contact",label:"Contact"}]})))};var b=()=>r.a.createElement("footer",null,r.a.createElement("p",null,"\xa9 ",(new Date).getFullYear()," Manan Jain. All rights reserved."));var E=e=>{let{children:t}=e;return r.a.createElement("main",null,t)};const w={colors:{primary:"#e0f7fa",headerBackground:"#0077cc",text:"#333"},fonts:{main:"'Montserrat', sans-serif"}},x=c.b`
  /* Import Montserrat from Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

  body {
    margin: 0;
    background-color: ${e=>e.theme.colors.primary};
    color: ${e=>e.theme.colors.text};
    font-family: ${e=>e.theme.fonts.main};
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }
`;var v=()=>r.a.createElement(c.a,{theme:w},r.a.createElement(x,null),r.a.createElement("div",{className:"App"},r.a.createElement(g,null),r.a.createElement(E,null,r.a.createElement("h1",null,"Welcome to My Portfolio"),r.a.createElement("p",null,"This is the main section where you can introduce yourself or your work.")),r.a.createElement(b,null)));var y=e=>{e&&e instanceof Function&&n.e(3).then(n.bind(null,21)).then(t=>{let{getCLS:n,getFID:o,getFCP:r,getLCP:a,getTTFB:l}=t;n(e),o(e),r(e),a(e),l(e)})};l.a.createRoot(document.getElementById("root")).render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(v,null))),y()}},[[10,1,2]]]);
//# sourceMappingURL=main.8a445676.chunk.js.map