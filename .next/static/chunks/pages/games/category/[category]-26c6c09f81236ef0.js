(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[842],{7369:function(n,e,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/games/category/[category]",function(){return s(4698)}])},9750:function(n,e,s){"use strict";var t=s(5893);s(7294);var i=s(2003),a=s.n(i),l=s(1664),r=s.n(l),c=s(5675),o=s.n(c);e.Z=n=>{var e;let{game:s}=n;return(0,t.jsx)("div",{className:a().gameCard,children:(0,t.jsxs)(r(),{href:"/game/".concat(s.id),children:[(0,t.jsx)(o(),{className:a().gameImage,src:s.thumbnail,alt:s.title,width:134,height:120}),(0,t.jsxs)("div",{className:a().gameInfo,children:[(0,t.jsx)("h3",{className:a().gameTitle,children:s.title}),(0,t.jsx)("p",{className:a().gameDescription,children:s.short_description.length>70?s.short_description.substring(0,70)+"... ":s.short_description}),(0,t.jsxs)("div",{className:a().gameTags,children:[(0,t.jsx)("div",{className:a().tag,children:(0,t.jsx)("span",{className:a().tagText,children:s.genre})}),(0,t.jsx)("div",{children:(0,t.jsx)("span",{className:a().platformChip,children:"PC (Windows)"===(e=s.platform)?(0,t.jsx)(o(),{src:"windows.svg",alt:"Windows",width:20,height:20,className:a().platformIcon}):"Web Browser"===e?(0,t.jsx)(o(),{src:"/webBrowser.png",alt:"Web Browser",width:20,height:20,className:a().platformIcon}):e})})]})]})]})})}},2115:function(n,e,s){"use strict";s.d(e,{Z:function(){return l}});var t=s(5893);s(7294);var i=s(4719),a=s.n(i);function l(n){let e,s,{itemsPerPage:i,totalItems:l,paginate:r,currentPage:c}=n,o=[];for(let n=1;n<=Math.ceil(l/i);n++)o.push(n);return o.length<=5?(e=1,s=o.length):c<=Math.floor(2.5)+1?(e=1,s=5):c+Math.floor(2.5)>=o.length?(e=o.length-5+1,s=o.length):(e=c-Math.floor(2.5),s=c+Math.floor(2.5)),(0,t.jsx)("nav",{children:(0,t.jsxs)("ul",{className:a().pagination,children:[(0,t.jsx)("li",{children:(0,t.jsx)("button",{onClick:()=>r(c-1),disabled:1===c,className:a().navButton,children:"Prev"})}),e>1&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("li",{children:(0,t.jsx)("button",{onClick:()=>r(1),children:"1"})}),e>2&&(0,t.jsx)("li",{className:a().ellipsis,children:"..."})]}),o.slice(e-1,s).map(n=>(0,t.jsx)("li",{className:c===n?a().active:"",children:(0,t.jsx)("button",{onClick:()=>r(n),children:n})},n)),s<o.length&&(0,t.jsxs)(t.Fragment,{children:[s<o.length-1&&(0,t.jsx)("li",{className:a().ellipsis,children:"..."}),(0,t.jsx)("li",{children:(0,t.jsx)("button",{onClick:()=>r(o.length),children:o.length})})]}),(0,t.jsx)("li",{children:(0,t.jsx)("button",{onClick:()=>r(c+1),disabled:c===o.length,className:a().navButton,children:"Next"})})]})})}},4698:function(n,e,s){"use strict";s.r(e),s.d(e,{__N_SSP:function(){return o},default:function(){return h}});var t=s(5893),i=s(7294);s(5675);var a=s(2003),l=s.n(a);s(1664);var r=s(2115),c=s(9750),o=!0;function h(n){let{games:e}=n,[s,a]=(0,i.useState)(1),[o]=(0,i.useState)(10),h=s*o,d=e.slice(h-o,h);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("main",{className:l().container,children:d.map(n=>(0,t.jsx)(c.Z,{game:n},n.id))}),(0,t.jsx)(r.Z,{itemsPerPage:o,totalItems:e.length,paginate:n=>a(n),currentPage:s})]})}},4719:function(n){n.exports={pagination:"Pagination_pagination__TofOK",active:"Pagination_active__xaslx",navButton:"Pagination_navButton__AM3_S",ellipsis:"Pagination_ellipsis__46W5h"}}},function(n){n.O(0,[888,774,179],function(){return n(n.s=7369)}),_N_E=n.O()}]);