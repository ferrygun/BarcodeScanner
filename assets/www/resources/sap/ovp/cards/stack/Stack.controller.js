(function(){"use strict";jQuery.sap.require("sap.ovp.ui.ObjectStream");jQuery.sap.require("sap.ovp.cards.AnnotationHelper");sap.ui.controller("sap.ovp.cards.stack.Stack",{onInit:function(){var v=this._oCard=this.getView().byId("stackContent");v.addEventDelegate({onclick:this.openStack.bind(this),onkeydown:function(e){if(!e.shiftKey&&(e.keyCode==13||e.keyCode==32)){e.preventDefault();this.openStack();}}.bind(this)});if(sap.ui.Device.system.phone){this.bAfterColumnUpdateAttached=false;this.bDeviceOrientationAttached=false;}this._createObjectStream();},onExit:function(){if(this.oObjectStream){this.oObjectStream.destroy();}},addPlaceHolder:function(n){var v=this.getView();var c=v.getModel("ovpCardProperties");var o=c.getProperty("/objectStreamCardsNavigationProperty");var s=o?true:false;if(!s){var N=this.getEntityNavigationEntries();if(N.length>0){var a=N[0].label;if(this.sPlaceHolderText==undefined){this.sPlaceHolderText=sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("PlaceHolder_default");}var p=this._createPlaceHolder(n,this.sPlaceHolderText,a);var t=this;p.addEventDelegate({onclick:function(){t.doNavigation(null);}});this.oObjectStream.setPlaceHolder(p);}}},onAfterRendering:function(){if(sap.ui.Device.system.phone){this._cardWidth=this.getView().$().width();if(!this.bAfterColumnUpdateAttached){var c=this.getOwnerComponent().getComponentData();if(c&&c.mainComponent){var m=c.mainComponent,l=m.byId("ovpLayout");l.attachAfterColumnUpdate(function(e){this._setObjectStreamCardsSize(false);}.bind(this));this.bAfterColumnUpdateAttached=true;}}if(!this.bDeviceOrientationAttached){sap.ui.Device.orientation.attachHandler(function(e){this._setObjectStreamCardsSize(true);}.bind(this));}}if(this.bSetErrorState&&this.bSetErrorState===true){this.setErrorState();return;}var v=this.getView();if(this.oObjectStream){var L=this.oObjectStream.getBinding("content");L.attachDataRequested(function(){if(this.getView().byId('stackSize')!==undefined&&this.getView().byId('stackTotalSize')!==undefined){jQuery(this.getView().byId('stackSize').getDomRef()).css('visibility','hidden');jQuery(this.getView().byId('stackTotalSize').getDomRef()).css('visibility','hidden');}},this);L.attachDataReceived(function(){var a=this.getView().getModel("ovpCardProperties").getObject("/category"),n=L.getCurrentContexts().length,b=L.getLength();v.byId("stackSize").setText(n);v.byId("stackTotalSize").setText(sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("Total_Size_Stack_Card",[b]));var s=this.getView().byId("stackContent").getDomRef();jQuery(s).attr("aria-label",sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("stackCardContent",[n,b,a]));var d=this.getView().byId("stackSize").getDomRef();jQuery(d).attr("aria-label",sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("stackCard",[n]));this.addPlaceHolder(b);if(this.getView().byId('stackSize')!==undefined&&this.getView().byId('stackTotalSize')!==undefined){jQuery(this.getView().byId('stackSize').getDomRef()).css('visibility','visible');jQuery(this.getView().byId('stackTotalSize').getDomRef()).css('visibility','visible');}var C=this.getView().getDomRef();var e=jQuery(C).find('.sapOvpCardContentContainer');if(b!==0){if(e.length!==0){e.addClass('sapOvpCardNavigable');}}else{if(e.length!==0){var f=e.find("[role='button']");if(f.length!==0){f.removeAttr("role");}}}},this);this.addPlaceHolder("");if(L.bPendingRequest===false){L.fireDataReceived();}if(this.checkNavigation()){this.oObjectStream.getTitle().addStyleClass('sapOvpCardNavigable');}}},_setObjectStreamCardsSize:function(i){var c=this.getView().$().width();if(this._cardWidth!=c||i){this.oObjectStream.setCardsSize(c);this._cardWidth=c;}},_createObjectStream:function(){if(this.oObjectStream instanceof sap.ovp.ui.ObjectStream){return;}var o=this.getOwnerComponent();var c=o.getComponentData&&o.getComponentData();var p;var P;if(c.i18n){var a=c.i18n;}if(c&&c.mainComponent){p=c.mainComponent._getOvplibResourceBundle();}else{p=o.getOvplibResourceBundle();}P=o.getPreprocessors(p);var m=c.model;var C=P.xml.ovpCardProperties;var e=C.getProperty("/entitySet");var O=C.getProperty("/objectStreamCardsSettings");var M=m.getMetaModel();var E=M.getODataEntitySet(e);var b=M.getODataEntityType(E.entityType);var A=C.getProperty("/annotationPath");var d=(A)?A.split(","):[];var f,g,G;if(c){f=c.appComponent;g=c.mainComponent;}if(g){G=g.getView().byId("ovpGlobalFilter");}function h(K){if(K==="ovpCardProperties"){return C;}else if(K==="dataModel"){return m;}else if(K==="_ovpCache"){return{};}}var F=[{getSetting:h,bDummyContext:true},E].concat(d);var B=sap.ovp.cards.AnnotationHelper.formatItems.apply(this,F);var i=sap.ui.base.BindingParser.complexParser(B);var s=C.getProperty("/objectStreamCardsNavigationProperty");var S=s?true:false;var j;var k=C.getProperty("/objectStreamCardsTemplate");if(S){if(k==="sap.ovp.cards.quickview"){jQuery.sap.log.error("objectStreamCardsTemplate cannot be 'sap.ovp.cards.quickview' when objectStreamCardsNavigationProperty is provided");this.bSetErrorState=true;return;}j=this._determineFilterPropertyId(m,E,b,s);O.entitySet=m.getMetaModel().getODataAssociationSetEnd(b,s).entitySet;}else{if(k!=="sap.ovp.cards.quickview"){jQuery.sap.log.error("objectStreamCardsTemplate must be 'sap.ovp.cards.quickview' when objectStreamCardsNavigationProperty is not provided");this.bSetErrorState=true;return;}var I=null;var l=C.getProperty("/identificationAnnotationPath");var n=(l)?l.split(","):[];if(n&&n.length>1){I=n[1];}if(I){O.identificationAnnotationPath=I;}if(b["com.sap.vocabularies.UI.v1.HeaderInfo"]&&b["com.sap.vocabularies.UI.v1.HeaderInfo"].TypeName&&b["com.sap.vocabularies.UI.v1.HeaderInfo"].TypeName.String){O.title=b["com.sap.vocabularies.UI.v1.HeaderInfo"].TypeName.String;}else{O.title=b.name;}O.entitySet=e;}O.isObjectStream=true;i.factory=function(t,u){var v=O,w;if(S){w={filters:[{path:j.foreignKey,operator:"EQ",value1:u.getProperty(j.key)}]};v=jQuery.extend(w,O);}var x=new sap.ui.core.ComponentContainer();var y={name:C.getProperty("/objectStreamCardsTemplate"),async:true,componentData:{cardId:t,model:m,settings:v,appComponent:f,mainComponent:g}};if(G){y.componentData.globalFilter={getUiState:G.getUiState.bind(G)};}sap.ui.component(y).then(function(z){z.setBindingContext(u);if(a){z.setModel(a,"@i18n");}x.setComponent(z);x.setBindingContext=function(u){z.setBindingContext(u);};});return x;};var q=C.getObject("/title");this.sPlaceHolderText=C.getObject("/itemText");var r=new sap.m.Link({text:q,subtle:true,press:this.handleObjectStreamTitlePressed.bind(this)}).addStyleClass("sapOvpObjectStreamHeader");r.addCustomData(new sap.ovp.ui.CustomData({key:"tabindex",value:"0",writeToDom:true}));r.addCustomData(new sap.ovp.ui.CustomData({key:"aria-label",value:q,writeToDom:true}));this.oObjectStream=new sap.ovp.ui.ObjectStream(this.getView().getId()+"_ObjectStream",{title:r,content:i});this.oObjectStream.setModel(m);},_determineFilterPropertyId:function(m,e,E,n){var N,a=E.namespace,r,A;for(var i=0;i<E.navigationProperty.length;i++){if(E.navigationProperty[i].name===n){N=E.navigationProperty[i];break;}}r=N.relationship;A=sap.ovp.cards.AnnotationHelper.getAssociationObject(m,r,a);var R=A.referentialConstraint,f={};if(R){f.foreignKey=R.dependent.propertyRef[0].name;f.key=R.principal.propertyRef[0].name;return f;}},_createPlaceHolder:function(n,p,a){var i=new sap.ui.core.Icon({src:"sap-icon://display-more",useIconTooltip:false,layoutData:new sap.m.FlexItemData({alignSelf:sap.m.FlexAlignSelf.Center,styleClass:"sapOvpStackPlaceHolderIconContainer"})});i.addStyleClass("sapOvpStackPlaceHolderIcon");var c=n+" "+p;var s=sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("SeeMoreContentAppName",[c,a]);var t=new sap.m.Text({text:s,textAlign:"Center",layoutData:new sap.m.FlexItemData({alignSelf:sap.m.FlexAlignSelf.Center,maxWidth:"14rem"})});t.addCustomData(new sap.ovp.ui.CustomData({key:"role",value:"heading",writeToDom:true}));t.addCustomData(new sap.ovp.ui.CustomData({key:"aria-label",value:s,writeToDom:true}));t.addStyleClass("sapOvpStackPlaceHolderTextLine");var d=new sap.m.VBox({items:[t]});d.addStyleClass("sapOvpStackPlaceHolderLabelsContainer");d.addCustomData(new sap.ovp.ui.CustomData({key:"tabindex",value:"0",writeToDom:true}));d.addCustomData(new sap.ovp.ui.CustomData({key:"role",value:"button",writeToDom:true}));var v=new sap.m.VBox({items:[i,d]});v.addStyleClass("sapOvpStackPlaceHolder");v.addEventDelegate({onkeydown:function(e){if(!e.shiftKey&&(e.keyCode==13||e.keyCode==32)){e.preventDefault();e.srcControl.$().click();}}});return v;},openStack:function(){if(this.oObjectStream){var l=this.oObjectStream.getBinding("content");if(l.getCurrentContexts().length>0){var c=this.getView().$().width();this.getView().addDependent(this.oObjectStream);this.oObjectStream.setModel(this.getView().getModel("@i18n"),"@i18n");this.oObjectStream.open(c,this._oCard);}}},handleObjectStreamTitlePressed:function(e){this.doNavigation(null);}});})();
