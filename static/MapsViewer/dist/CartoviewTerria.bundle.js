!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("CartoviewTerria",[],t):"object"==typeof exports?exports.CartoviewTerria=t():e.CartoviewTerria=t()}(window,(function(){return function(e){function t(t){for(var l,u,o=t[0],i=t[1],c=t[2],s=0,f=[];s<o.length;s++)u=o[s],Object.prototype.hasOwnProperty.call(n,u)&&n[u]&&f.push(n[u][0]),n[u]=0;for(l in i)Object.prototype.hasOwnProperty.call(i,l)&&(e[l]=i[l]);for(d&&d(t);f.length;)f.shift()();return r.push.apply(r,c||[]),a()}function a(){for(var e,t=0;t<r.length;t++){for(var a=r[t],l=!0,o=1;o<a.length;o++){var i=a[o];0!==n[i]&&(l=!1)}l&&(r.splice(t--,1),e=u(u.s=a[0]))}return e}var l={},n={0:0},r=[];function u(t){if(l[t])return l[t].exports;var a=l[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,u),a.l=!0,a.exports}u.m=e,u.c=l,u.d=function(e,t,a){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},u.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(u.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)u.d(a,l,function(t){return e[t]}.bind(null,l));return a},u.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/static/MapsViewer/dist/";var o=window.webpackJsonp_name_=window.webpackJsonp_name_||[],i=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var d=i;return r.push(["tjUo",1]),a()}({"EJ/z":function(e,t,a){"use strict";a.r(t),t.default=a.p+"03a240394c6d0e370cafd88c14a7c01b.png"},GfvB:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("TTf+"),n=d(a("17x9")),r=d(a("q1tI")),u=d(a("Qh5t")),o=d(a("VPjX")),i=d(a("EJ/z")),c=a("DfQ9");function d(e){return e&&e.__esModule?e:{default:e}}var s=function(e){var t=e.classes,a=e.mapsView,n=e.handleChangeMapsView;return r.default.createElement(l.Toolbar,{disableGutters:!0},r.default.createElement(l.Link,{href:"/",onClick:function(e){return e.preventDefault()},className:t.navLink,title:"Home"},r.default.createElement("img",{src:i.default,alt:"Terria Maps list",className:t.media})),r.default.createElement(l.Typography,{variant:"h5",type:"title",color:"inherit",noWrap:!0,className:t.title},"Terria Map"),r.default.createElement(l.Hidden,{smDown:!0},r.default.createElement(u.default,{handleChangeMapsView:n,mapsView:a,className:t.toggle})))};s.propTypes={classes:n.default.object.isRequired,mapsView:n.default.string.isRequired,handleChangeMapsView:n.default.func.isRequired},t.default=(0,c.withStyles)(o.default)(s)},HYOj:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=I(a("QbLZ")),n=I(a("Yz+Y")),r=I(a("iCc5")),u=I(a("V7oC")),o=I(a("FYw3")),i=I(a("mRg0")),c=a("TTf+"),d=I(a("5qWs")),s=I(a("M4sF")),f=I(a("uXem")),m=I(a("ZDU4")),p=I(a("2yTz")),g=I(a("o6Jd")),b=I(a("AjCI")),h=I(a("RXNQ")),E=I(a("MVIV")),v=I(a("ZuSV")),y=I(a("X6bi")),w=I(a("kOQt")),C=I(a("17x9")),_=I(a("q1tI")),x=I(a("qlJ3")),k=I(a("KI6R")),T=I(a("+QRC")),M=I(a("Ifij")),R=a("DfQ9");function I(e){return e&&e.__esModule?e:{default:e}}var N=function(e){function t(e){(0,r.default)(this,t);var a=(0,o.default)(this,(t.__proto__||(0,n.default)(t)).call(this,e));return a.state={open:!1,anchorEl:null,openDialog:!1},a.handleToggle=function(){a.setState({open:!a.state.open})},a.handleClose=function(e){a.anchorRef.current&&a.anchorRef.current.contains(e.target)||a.setState({open:!1})},a.copyTo=function(e){var t=a.props.urls;(0,T.default)(t.getTerriaUrl(e))},a.handleDialogToggle=function(){a.setState({openDialog:!a.state.openDialog})},a.anchorRef=_.default.createRef(),a}return(0,i.default)(t,e),(0,u.default)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.classes,n=t.urls,r=this.props,u=r.map,o=r.openSnack;return _.default.createElement(c.Card,{className:a.card,title:"Open "+u.title+" map"},_.default.createElement(c.CardMedia,{className:a.media,image:u.thumbnail_url||"/static/MapsViewer/img/no-img.png",onClick:function(){return window.location.href=n.getTerriaUrl(u.id)}}),_.default.createElement(c.CardHeader,{avatar:_.default.createElement(d.default,{"aria-label":"Recipe",className:a.avatar},u.owner__username[0].toUpperCase()),action:_.default.createElement("div",null,_.default.createElement(g.default,{ref:this.anchorRef,"aria-label":"grid","aria-controls":this.state.open?"menu-grid-grow":void 0,onClick:this.handleToggle},_.default.createElement(v.default,null)),_.default.createElement(w.default,{open:this.state.open,anchorEl:this.anchorRef.current,placement:"bottom",transition:!0},(function(t){var r=t.TransitionProps,i=t.placement;return _.default.createElement(p.default,(0,l.default)({},r,{style:{transformOrigin:"bottom"===i?"center top":"center bottom"}}),_.default.createElement(y.default,null,_.default.createElement(s.default,{onClickAway:e.handleClose},_.default.createElement(E.default,{autoFocusItem:e.state.open,id:"menu-grid-grow"},_.default.createElement(h.default,null,_.default.createElement(g.default,{className:a.menuItemButton,onClick:function(){return window.open(n.getTerriaUrl(u.id),"_blank")},"aria-label":"Open in browser"},_.default.createElement(b.default,{className:a.menuItemIcon}),_.default.createElement(k.default,{variant:"subtitle2",className:a.menuItemText},"Open Terria Map"))),_.default.createElement(h.default,null,_.default.createElement(g.default,{className:a.menuItemButton,onClick:function(){e.copyTo(u.id),o()},"aria-label":"Share app URL"},_.default.createElement(x.default,{className:a.menuItemIcon}),_.default.createElement(k.default,{variant:"subtitle2",className:a.menuItemText},"Share app URL"))),_.default.createElement(h.default,null,_.default.createElement(g.default,{className:a.menuItemButton,onClick:e.handleDialogToggle,"aria-label":"Map description"},_.default.createElement(f.default,{className:a.menuItemIcon}),_.default.createElement(k.default,{variant:"subtitle2",className:a.menuItemText,"aria-haspopup":"true"},"Show map details"),_.default.createElement(m.default,{map:u,mapDetailsURL:n.getMapDetailsUrl(u.id),openDialog:e.state.openDialog,onDialogChange:e.handleDialogToggle})))))))}))),title:u.title,subheader:new Date(u.date).toDateString()}))}}]),t}(_.default.Component);N.propTypes={classes:C.default.object.isRequired,urls:C.default.object.isRequired,map:C.default.object.isRequired,openSnack:C.default.func.isRequired},t.default=(0,R.withStyles)(M.default)(N)},Ifij:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("yKYv");t.default=function(){return{card:{width:"100%",minHeight:290,height:300,boxShadow:"none",border:"1px solid #DFE1E5","&:hover":{border:"1px solid #3BBDD4",transform:"translateY(-10px)",boxShadow:"0 12px 19px -7px #3BBDD4"}},media:{height:194,cursor:"pointer"},avatar:{backgroundColor:l.cyan[500]},menuItemButton:{color:"#3BBDD4",padding:"1px 10px","&:hover":{backgroundColor:"transparent"}},menuItemIcon:{marginLeft:-16},menuItemText:{marginLeft:16},mapDescribtion:{padding:10}}}},ImGz:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=g(a("QbLZ")),n=g(a("sk9p")),r=a("TTf+"),u=a("q1tI"),o=g(u),i=g(a("1waj")),c=g(a("Vgje")),d=g(a("17x9")),s=g(a("F9wn")),f=g(a("XYSF")),m=g(a("MLef")),p=a("DfQ9");function g(e){return e&&e.__esModule?e:{default:e}}var b=function(e){var t=e.classes,a=e.sortMapsBy,d=e.handleChange,m=e.filterMapsBy,p=e.handleFilterChange,g=e.currentUsername,b=e.newMapURL,h=(0,u.useState)(!1),E=(0,n.default)(h,2),v=E[0],y=E[1],w=(0,u.useState)(!1),C=(0,n.default)(w,2),_=C[0],x=C[1],k=(0,u.useRef)(null),T=(0,u.useRef)(null),M=function(e){k.current&&k.current.contains(e.target)||y(!1)},R=function(e){T.current&&T.current.contains(e.target)||x(!1)};return o.default.createElement(r.Box,{className:t.settingWrapper},o.default.createElement(r.Chip,{icon:o.default.createElement(i.default,{className:t.sortIcon}),component:"a",label:"Create a new map",href:b,target:"_blank",className:t.newMapButton,clickable:!0}),o.default.createElement(r.Chip,{icon:o.default.createElement(c.default,{className:t.sortIcon}),label:"Filter",className:t.filterButton,onClick:function(){x((function(e){return!e}))},ref:T}),o.default.createElement(r.Popper,{open:_,anchorEl:T.current,role:void 0,transition:!0,disablePortal:!0},(function(e){var a=e.TransitionProps,n=e.placement;return o.default.createElement(r.Grow,(0,l.default)({},a,{style:{transformOrigin:"bottom"===n?"center top":"center bottom"}}),o.default.createElement(r.Paper,null,o.default.createElement(r.ClickAwayListener,{onClickAway:R},o.default.createElement(r.FormControl,{component:"fieldset"},o.default.createElement(r.RadioGroup,{"aria-label":"order by",name:"order by",value:m,onChange:p,className:t.radioGroup},o.default.createElement(r.FormControlLabel,{value:"",control:o.default.createElement(f.default,null),label:"All maps",className:t.formControlLabel}),o.default.createElement(r.FormControlLabel,{value:g,control:o.default.createElement(f.default,null),label:"My maps",className:t.formControlLabel}))))))})),o.default.createElement(r.Chip,{icon:o.default.createElement(s.default,{className:t.sortIcon}),label:"Sort By",className:t.sortButton,onClick:function(){y((function(e){return!e}))},ref:k}),o.default.createElement(r.Popper,{open:v,anchorEl:k.current,role:void 0,transition:!0,disablePortal:!0},(function(e){var n=e.TransitionProps,u=e.placement;return o.default.createElement(r.Grow,(0,l.default)({},n,{style:{transformOrigin:"bottom"===u?"center top":"center bottom"}}),o.default.createElement(r.Paper,null,o.default.createElement(r.ClickAwayListener,{onClickAway:M},o.default.createElement(r.FormControl,{component:"fieldset"},o.default.createElement(r.RadioGroup,{"aria-label":"order by",name:"order by",value:a,onChange:d,className:t.radioGroup},o.default.createElement(r.FormControlLabel,{value:"-date",control:o.default.createElement(f.default,null),label:"Most recent",className:t.formControlLabel}),o.default.createElement(r.FormControlLabel,{value:"date",control:o.default.createElement(f.default,null),label:"Less recent",className:t.formControlLabel}),o.default.createElement(r.FormControlLabel,{value:"title",control:o.default.createElement(f.default,null),label:"A - Z",className:t.formControlLabel}),o.default.createElement(r.FormControlLabel,{value:"-title",control:o.default.createElement(f.default,null),label:"Z - A",className:t.formControlLabel}))))))})))};b.propTypes={classes:d.default.object.isRequired,sortMapsBy:d.default.string.isRequired,handleChange:d.default.func.isRequired,filterMapsBy:d.default.string.isRequired,handleFilterChange:d.default.func.isRequired,currentUsername:d.default.string.isRequired,newMapURL:d.default.string.isRequired},t.default=(0,p.withStyles)(m.default)(b)},MLef:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l,n=a("YEIV"),r=(l=n)&&l.__esModule?l:{default:l};t.default=function(){return{settingWrapper:(0,r.default)({display:"flex",justifyContent:"flex-end",padding:10},"@media (max-width: 768px)",{justifyContent:"center"}),newMapButton:(0,r.default)({padding:5,backgroundColor:"#09274b",fontSize:15,color:"#fff","&:hover, &:focus":{backgroundColor:"#124e96"}},"@media (max-width: 768px)",{margin:"0px 14px"}),sortIcon:{color:"#fff"},sortButton:(0,r.default)({marginRight:"20px",padding:5,backgroundColor:"#09274b",fontSize:15,color:"#fff","&:hover, &:focus":{backgroundColor:"#124e96"}},"@media (max-width: 768px)",{margin:"0px 14px"}),filterButton:(0,r.default)({margin:"0px 10px",padding:5,backgroundColor:"#09274b",fontSize:15,color:"#fff","&:hover, &:focus":{backgroundColor:"#124e96"}},"@media (max-width: 768px)",{margin:"0px 14px"}),radioGroup:{margin:10},formControlLabel:{marginLeft:0,marginRight:6}}}},"Q/bC":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=c(a("YEIV")),n=a("TTf+"),r=c(a("HYOj")),u=c(a("17x9")),o=c(a("q1tI")),i=a("DfQ9");function c(e){return e&&e.__esModule?e:{default:e}}var d=function(e){var t=e.classes,a=e.maps,l=e.urls,u=e.handleSnackOpen;return o.default.createElement(n.Grid,{container:!0,direction:"row",className:t.rootGrid,spacing:4},a.map((function(e,a){return o.default.createElement(n.Grid,{key:a,item:!0,xs:12,sm:6,md:3,lg:3,className:t.cardGrid},o.default.createElement(r.default,{openSnack:u,urls:l,map:e}))})))};d.propTypes={classes:u.default.object.isRequired,maps:u.default.array.isRequired,urls:u.default.object.isRequired,handleSnackOpen:u.default.func.isRequired},t.default=(0,i.withStyles)((function(){return{rootGrid:{flexGrow:1,justifyContent:"center"},cardGrid:(0,l.default)({},"@media (max-width: 1024px)",{minWidth:"33.333333%"})}}))(d)},Qh5t:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=d(a("HEym")),n=d(a("17x9")),r=d(a("q1tI")),u=d(a("XOn0")),o=d(a("zO76")),i=d(a("rkiQ")),c=a("DfQ9");function d(e){return e&&e.__esModule?e:{default:e}}var s=function(e){var t=e.classes,a=e.mapsView,n=e.handleChangeMapsView;return r.default.createElement(o.default,{value:a,exclusive:!0,onChange:n,className:t.toggleWrapper},r.default.createElement(u.default,{value:"grid","aria-label":"grid"},r.default.createElement(l.default,null)),r.default.createElement(u.default,{value:"list","aria-label":"list"},r.default.createElement(i.default,null)))};s.propTypes={classes:n.default.object.isRequired,mapsView:n.default.string.isRequired,handleChangeMapsView:n.default.func.isRequired},t.default=(0,c.withStyles)((function(){return{toggleWrapper:{marginRight:20}}}))(s)},U4Gf:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(e){return{headline:{fontWeight:"bold",display:"flex",justifyContent:"flex-start",alignItems:"center"},icon:{marginRight:5},divider:{width:"100%",margin:"10px 0"},statisticsBoxWrapper:{display:"flex",alignItems:"center",justifyContent:"space-evenly"},statisticsBox:{margin:5},chip:{margin:e.spacing(.5),"&:hover":{backgroundColor:"#124e96"}}}}},VPjX:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l,n=a("YEIV"),r=(l=n)&&l.__esModule?l:{default:l};t.default=function(){return{navLink:{"&:hover":{transform:"translateY(-10px)"}},media:(0,r.default)({height:40,margin:"0px 20px"},"@media (max-width: 768px)",{margin:"0px 14px"}),title:{flexGrow:1}}}},XYSF:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=c(a("QbLZ")),n=c(a("jo6Y")),r=c(a("17x9")),u=c(a("cqHN")),o=c(a("q1tI")),i=a("DfQ9");function c(e){return e&&e.__esModule?e:{default:e}}var d=function(e){var t=e.classes,a=(0,n.default)(e,["classes"]);return o.default.createElement(u.default,(0,l.default)({className:t.root,disableRipple:!0,color:"default",checkedIcon:o.default.createElement("span",{className:[t.icon,t.checkedIcon].join(" ")}),icon:o.default.createElement("span",{className:t.icon})},a))};d.propTypes={classes:r.default.object.isRequired},t.default=(0,i.withStyles)((function(){return{root:{"&:hover":{backgroundColor:"transparent"}},icon:{borderRadius:"50%",width:16,height:16,boxShadow:"inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",backgroundColor:"#f5f8fa",backgroundImage:"linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))","$root.Mui-focusVisible &":{outline:"2px auto rgba(19,124,189,.6)",outlineOffset:2},"input:hover ~ &":{backgroundColor:"#ebf1f5"},"input:disabled ~ &":{boxShadow:"none",background:"rgba(206,217,224,.5)"}},checkedIcon:{backgroundColor:"#137cbd",backgroundImage:"linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))","&:before":{display:"block",width:16,height:16,backgroundImage:"radial-gradient(#fff,#fff 28%,transparent 32%)",content:'""'},"input:hover ~ &":{backgroundColor:"#106ba3"}}}}))(d)},Yurc:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=i(a("QbLZ")),n=a("DfQ9"),r=i(a("q7ey")),u=i(a("q1tI")),o=a("yKYv");function i(e){return e&&e.__esModule?e:{default:e}}var c=(0,n.createMuiTheme)({palette:{type:"light",primary:(0,l.default)({},o.cyan)}});t.default=function(){var e=globalURLs;return u.default.createElement(n.MuiThemeProvider,{theme:c},u.default.createElement(r.default,{urls:e}))}},ZDU4:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("n3Tx"),n=y(a("Ti5m")),r=y(a("uoyk")),u=y(a("FtsS")),o=y(a("//m8")),i=y(a("HhgX")),c=y(a("U4Gf")),d=y(a("Ahln")),s=y(a("17x9")),f=y(a("q1tI")),m=y(a("qlJ3")),p=y(a("5Wng")),g=y(a("aUVD")),b=y(a("e9YP")),h=y(a("KI6R")),E=y(a("7frF")),v=a("DfQ9");function y(e){return e&&e.__esModule?e:{default:e}}var w=(0,v.withStyles)({root:{color:"#fff",backgroundColor:"#09274b"}})(o.default),C=function(e){var t=e.classes,a=e.map,o=e.mapDetailsURL,c=e.openDialog,s=e.onDialogChange;return f.default.createElement(i.default,{open:c,onClose:s,"aria-labelledby":"customized-dialog-title",fullWidth:!0},f.default.createElement(l.DialogTitle,{id:"customized-dialog-title",onToggle:s},"Map details"),f.default.createElement(l.DialogContent,{dividers:!0},f.default.createElement(h.default,{variant:"h5",gutterBottom:!0},a.title),f.default.createElement(h.default,{variant:"body1",className:t.headline},f.default.createElement(p.default,{className:t.icon}),"Description:"),f.default.createElement(h.default,{gutterBottom:!0,variant:"body1"},""===a.abstract?"No Description":a.abstract),f.default.createElement(d.default,{light:!0,className:t.divider}),f.default.createElement(h.default,{variant:"body1",className:t.headline},f.default.createElement(b.default,{className:t.icon}),"Publication Date:"),f.default.createElement(h.default,{gutterBottom:!0,variant:"body1"},new Date(a.date).toDateString()),f.default.createElement(d.default,{light:!0,className:t.divider}),f.default.createElement(h.default,{variant:"body1",className:t.headline},f.default.createElement(n.default,{className:t.icon}),"Owner:"),f.default.createElement(h.default,{gutterBottom:!0,variant:"body1"},a.owner__username),f.default.createElement(d.default,{light:!0,className:t.divider}),f.default.createElement(r.default,{className:t.statisticsBoxWrapper},f.default.createElement("img",{alt:"Map Thumbnail",src:a.thumbnail_url||"/static/MapsViewer/img/no-img.png",title:a.title}),f.default.createElement("div",{className:t.statisticsBox},f.default.createElement(w,{className:t.chip,color:"primary",icon:f.default.createElement(E.default,null),label:a.popular_count,title:"Views count"}),f.default.createElement(w,{className:t.chip,color:"primary",icon:f.default.createElement(m.default,null),label:a.share_count,title:"Share count"}),f.default.createElement(w,{className:t.chip,color:"primary",icon:f.default.createElement(g.default,null),label:a.rating,title:"Rating count"})))),f.default.createElement(l.DialogActions,null,f.default.createElement(u.default,{onClick:function(){return window.location.href=o},color:"primary",title:"Open more details for "+a.title+" map"},"More details")))};C.propTypes={classes:s.default.object.isRequired,map:s.default.object.isRequired,mapDetailsURL:s.default.string.isRequired,openDialog:s.default.bool.isRequired,onDialogChange:s.default.func.isRequired},t.default=(0,v.withStyles)(c.default)(C)},n3Tx:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DialogActions=t.DialogContent=t.DialogTitle=void 0;var l=m(a("QbLZ")),n=m(a("jo6Y")),r=m(a("ZPUd")),u=m(a("o6Jd")),o=m(a("ti9b")),i=m(a("jlMd")),c=m(a("frSy")),d=m(a("q1tI")),s=m(a("KI6R")),f=a("DfQ9");function m(e){return e&&e.__esModule?e:{default:e}}var p=(0,f.withStyles)((function(e){return{root:{margin:0,padding:e.spacing(2)},closeButton:{position:"absolute",right:e.spacing(1),top:e.spacing(1),color:e.palette.grey[500]}}}))((function(e){var t=e.children,a=e.classes,o=e.onToggle,i=(0,n.default)(e,["children","classes","onToggle"]);return d.default.createElement(c.default,(0,l.default)({disableTypography:!0,className:a.root},i),d.default.createElement(s.default,{variant:"h6"},t),d.default.createElement(u.default,{"aria-label":"close",className:a.closeButton,onClick:o},d.default.createElement(r.default,null)))}));t.DialogTitle=p;t.DialogContent=(0,f.withStyles)((function(e){return{root:{padding:e.spacing(2)}}}))(i.default),t.DialogActions=(0,f.withStyles)((function(e){return{root:{margin:0,padding:e.spacing(1)}}}))(o.default)},ooEq:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("TTf+"),n=i(a("sez1")),r=i(a("17x9")),u=i(a("q1tI")),o=a("DfQ9");function i(e){return e&&e.__esModule?e:{default:e}}var c=function(e){var t=e.classes,a=e.maps,r=e.urls,o=e.openSnack;return u.default.createElement(l.TableContainer,null,u.default.createElement(l.Table,{className:t.table,"aria-label":"simple table"},u.default.createElement(l.TableHead,null,u.default.createElement(l.TableRow,null,u.default.createElement(l.TableCell,null,"Map"),u.default.createElement(l.TableCell,{align:"right"},"Owner"),u.default.createElement(l.TableCell,{align:"right"},"Publication Date"))),u.default.createElement(l.TableBody,null,a.map((function(e){return u.default.createElement(l.TableRow,{key:e.id,className:t.mapRow},u.default.createElement(n.default,{openSnack:o,urls:r,map:e}))})))))};c.propTypes={classes:r.default.object.isRequired,maps:r.default.array.isRequired,urls:r.default.object.isRequired,openSnack:r.default.func.isRequired},t.default=(0,o.withStyles)((function(){return{table:{minWidth:650},mapRow:{"&:hover":{backgroundColor:"#b0e4ed",transition:"all 0.2s ease-in-out",boxShadow:"0 9px 4px -6px #3bbdd4"}}}}))(c)},q3dr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l,n=a("YEIV"),r=(l=n)&&l.__esModule?l:{default:l};t.default=function(e){return{root:{width:"100%",height:"100%",zIndex:1,overflow:"hidden"},close:{width:e.spacing(4),height:e.spacing(4)},snackBarBg:{backgroundColor:"#09274b"},appFrame:{position:"relative",display:"flex",width:"100%",height:"100%"},appBar:{position:"absolute",transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},menuButton:{marginLeft:12,marginRight:20},content:(0,r.default)({width:"100%",flexGrow:1,padding:e.spacing(3),transition:e.transitions.create("margin",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),height:"calc(100% - 45px)",marginTop:45},e.breakpoints.up("sm"),{content:{height:"calc(100% - 64px)",marginTop:64}}),noMaps:{textAlign:"center"}}}},q7ey:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=h(a("sk9p")),n=a("TTf+"),r=a("q1tI"),u=h(r),o=h(a("ZPUd")),i=h(a("yYuw")),c=h(a("Q/bC")),d=h(a("ooEq")),s=h(a("ImGz")),f=h(a("GfvB")),m=h(a("17x9")),p=h(a("vDqi")),g=h(a("q3dr")),b=a("DfQ9");function h(e){return e&&e.__esModule?e:{default:e}}var E=function(e){var t=e.classes,a=e.urls,m=(0,r.useState)([]),g=(0,l.default)(m,2),b=g[0],h=g[1],E=(0,r.useState)(!0),v=(0,l.default)(E,2),y=v[0],w=v[1],C=(0,r.useState)("grid"),_=(0,l.default)(C,2),x=_[0],k=_[1],T=(0,r.useState)("-date"),M=(0,l.default)(T,2),R=M[0],I=M[1],N=(0,r.useState)(""),S=(0,l.default)(N,2),D=S[0],j=S[1],q=(0,r.useState)(!1),B=(0,l.default)(q,2),O=B[0],L=B[1],P=function(){return L(!0)},U=function(e,t){"clickaway"!==t&&L(!1)};(0,r.useEffect)((function(){!function(){y||w(!0);var e={order_by:R};""!==D?e.owner__username__in=D:"owner__username__in"in e&&delete e.owner__username__in,(0,p.default)(a.mapsApiUrl,{params:e}).then((function(e){h(e.data.objects),w(!1)}))}()}),[R,D]);return u.default.createElement("div",{className:t.root},u.default.createElement("div",{className:t.appFrame},u.default.createElement(n.AppBar,{className:t.appBar,position:"static"},u.default.createElement(f.default,{mapsView:x,handleChangeMapsView:function(e,t){k(t)}})),u.default.createElement("main",{className:t.content},u.default.createElement(s.default,{sortMapsBy:R,handleChange:function(e){I(e.target.value)},filterMapsBy:D,handleFilterChange:function(e){return j(e.target.value)},currentUsername:a.currentUsername,newMapURL:a.newMap}),y?u.default.createElement(i.default,null):u.default.createElement(n.Box,null,0!==b.length?u.default.createElement(r.Fragment,null,"grid"===x?u.default.createElement(c.default,{maps:b,handleSnackOpen:P,urls:a}):u.default.createElement(d.default,{maps:b,urls:a,openSnack:P}),u.default.createElement(n.Snackbar,{anchorOrigin:{vertical:"bottom",horizontal:"left"},open:O,onClose:U,autoHideDuration:3e3},u.default.createElement(n.SnackbarContent,{className:t.snackBarBg,"aria-describedby":"message-id",message:u.default.createElement("span",{id:"message-id"},"URL Copied to Clipboard"),action:[u.default.createElement(n.IconButton,{key:"close","aria-label":"Close",color:"inherit",className:t.close,onClick:U},u.default.createElement(o.default,null))]}))):u.default.createElement(n.Typography,{variant:"h3",gutterBottom:!0,className:t.noMaps},"There are no available maps")))))};E.propTypes={classes:m.default.object.isRequired,urls:m.default.object.isRequired},t.default=(0,b.withStyles)(g.default)(E)},sez1:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=v(a("QbLZ")),n=v(a("sk9p")),r=a("TTf+"),u=a("q1tI"),o=v(u),i=v(a("uXem")),c=v(a("ZDU4")),d=v(a("o6Jd")),s=v(a("AjCI")),f=v(a("ZuSV")),m=v(a("17x9")),p=v(a("qlJ3")),g=v(a("KI6R")),b=v(a("+QRC")),h=a("yKYv"),E=a("DfQ9");function v(e){return e&&e.__esModule?e:{default:e}}var y=function(e){var t=e.classes,a=e.urls,m=e.map,h=e.openSnack,E=(0,u.useRef)(),v=(0,u.useState)(!1),y=(0,n.default)(v,2),w=y[0],C=y[1],_=(0,u.useState)(!1),x=(0,n.default)(_,2),k=x[0],T=x[1],M=function(e){E.current&&E.current.contains(e.target)||C(!1)},R=function(){T(!k)};return o.default.createElement(u.Fragment,null,o.default.createElement(r.TableCell,{component:"th",scope:"row",title:"Open "+m.title+" map",onClick:function(){return window.location.href=a.getTerriaUrl(m.id)},className:t.mapTitle},m.title),o.default.createElement(r.TableCell,{align:"right"},o.default.createElement(r.Avatar,{"aria-label":"Recipe",className:t.avatar,title:m.owner__username},m.owner__username[0].toUpperCase())),o.default.createElement(r.TableCell,{align:"right"},new Date(m.date).toDateString()),o.default.createElement(r.TableCell,{align:"right"},o.default.createElement(d.default,{ref:E,"aria-label":"list","aria-controls":w?"menu-list-grow":void 0,onClick:function(){C(!w)}},o.default.createElement(f.default,null)),o.default.createElement(r.Popper,{open:w,anchorEl:E.current,placement:"bottom",transition:!0},(function(e){var n=e.TransitionProps,u=e.placement;return o.default.createElement(r.Grow,(0,l.default)({},n,{style:{transformOrigin:"bottom"===u?"center top":"center bottom"}}),o.default.createElement(r.Paper,null,o.default.createElement(r.ClickAwayListener,{onClickAway:M},o.default.createElement(r.MenuList,{autoFocusItem:w,id:"menu-list-grow"},o.default.createElement(r.MenuItem,null,o.default.createElement(d.default,{className:t.menuItemButton,onClick:function(){return window.open(a.getTerriaUrl(m.id),"_blank")},"aria-label":"Open in browser"},o.default.createElement(s.default,{className:t.menuItemIcon}),o.default.createElement(g.default,{variant:"subtitle2",className:t.menuItemText},"Open Terria Map"))),o.default.createElement(r.MenuItem,null,o.default.createElement(d.default,{className:t.menuItemButton,onClick:function(){var e;e=m.id,(0,b.default)(a.getTerriaUrl(e)),h()},"aria-label":"Share app URL"},o.default.createElement(p.default,{className:t.menuItemIcon}),o.default.createElement(g.default,{variant:"subtitle2",className:t.menuItemText},"Share app URL"))),o.default.createElement(r.MenuItem,null,o.default.createElement(d.default,{className:t.menuItemButton,onClick:R,"aria-label":"Map description"},o.default.createElement(i.default,{className:t.menuItemIcon}),o.default.createElement(g.default,{variant:"subtitle2",className:t.menuItemText,"aria-haspopup":"true"},"Show map details"),o.default.createElement(c.default,{map:m,mapDetailsURL:a.getMapDetailsUrl(m.id),openDialog:k,onDialogChange:R})))))))}))))};y.propTypes={classes:m.default.object.isRequired,urls:m.default.object.isRequired,map:m.default.object.isRequired,openSnack:m.default.func.isRequired},t.default=(0,E.withStyles)((function(){return{mapTitle:{cursor:"pointer"},avatar:{backgroundColor:h.cyan[500],float:"right"},menuItemButton:{color:"#3BBDD4",padding:"1px 10px","&:hover":{backgroundColor:"transparent"}},menuItemIcon:{marginLeft:-16},menuItemText:{marginLeft:16}}}))(y)},tjUo:function(e,t,a){"use strict";var l=u(a("q1tI")),n=u(a("i8i4")),r=u(a("Yurc"));function u(e){return e&&e.__esModule?e:{default:e}}n.default.render(l.default.createElement(r.default,null),document.getElementById("map-list"))},yYuw:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=o(a("QbLZ")),n=o(a("tdZp")),r=o(a("q1tI")),u=a("DfQ9");function o(e){return e&&e.__esModule?e:{default:e}}var i=(0,u.makeStyles)((function(){return{root:{position:"relative"},bottom:{color:"#3BBDD4"},top:{color:"#124e96",animationDuration:"550ms",position:"absolute",left:0},circle:{strokeLinecap:"round"}}})),c=function(e){var t=i();return r.default.createElement("div",{className:t.root},r.default.createElement(n.default,(0,l.default)({variant:"determinate",className:t.bottom,size:40,thickness:4},e,{value:100})),r.default.createElement(n.default,(0,l.default)({variant:"indeterminate",disableShrink:!0,className:t.top,classes:{circle:t.circle},size:40,thickness:4},e)))},d=(0,u.makeStyles)({root:{flexGrow:1,display:"flex",justifyContent:"center"}});t.default=function(){var e=d();return r.default.createElement("div",{className:e.root},r.default.createElement(c,null))}}})}));
//# sourceMappingURL=/static/MapsViewer/dist/sourcemaps/../CartoviewTerria.bundle.js.map
//# sourceMappingURL=CartoviewTerria.bundle.js.map