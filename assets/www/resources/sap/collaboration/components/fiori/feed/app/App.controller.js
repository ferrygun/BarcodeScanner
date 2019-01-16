/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.controller("sap.collaboration.components.fiori.feed.app.App",{onInit:function(){this.oApp=this.getView().oApp;this.oOdataModel=this.getView().getViewData().odataModel;this.oLangBundle=this.getView().getViewData().langBundle;this.sPrefixId=this.getView().getViewData().controlId;this.sAppType=this.getView().getViewData().appType;this.sFeedType=this.getView().getViewData().feedType;this.sGroupIds=this.getView().getViewData().groupIds;this.oBusinessObject=this.getView().getViewData().object;},onBeforeRendering:function(){try{this.initializeUtils();this.createDetailPage();}catch(e){jQuery.sap.log.error(e,"","sap.collaboration.components.fiori.feed.app.App.controller.onBeforeRendering()");this.oCommonUtil.displayError();}},initializeUtils:function(){if(!this.oODataUtil){this.oODataUtil=new sap.collaboration.components.utils.OdataUtil();}if(!this.oCommonUtil){this.oCommonUtil=this.oCommonUtil=new sap.collaboration.components.utils.CommonUtil();}},createDetailPage:function(){try{var v=this.sPrefixId+"detailView";if(!this.oApp.getPage(v)){this.initOData();var d=sap.ui.view({id:v,viewData:{controlId:this.sPrefixId,jamURL:this.sJamUrl,jamToken:this.sJamToken,appType:this.sAppType,feedType:this.sFeedType,groupIds:this.sGroupIds,object:this.oBusinessObject,langBundle:this.oLangBundle},type:sap.ui.core.mvc.ViewType.JS,viewName:"sap.collaboration.components.fiori.feed.commons.Detail"});this.oApp.addPage(d);this.oApp.setInitialPage(d);}}catch(e){jQuery.sap.log.error(e,"","sap.collaboration.components.fiori.feed.app.App.controller.createDetailPage()");throw e;}},getGroupIds:function(){var g;if(this.sFeedType===sap.collaboration.FeedType.group&&(this.sGroupIds===undefined||this.sGroupIds==="")){g=this.oODataUtil.getGroupsData(this.oOdataModel,"/Groups");this.sGroupIds=this.oODataUtil.getGroupIds(g);}else if(this.sFeedType===sap.collaboration.FeedType.objectGroup&&(this.sGroupIds===undefined||this.sGroupIds==="")){g=this.oODataUtil.getGroupsData(this.oOdataModel,"/BusinessObjects('"+this.oBusinessObject.id+"')/AssignedGroups");this.sGroupIds=this.oODataUtil.getGroupIds(g);}else if(this.sFeedType===sap.collaboration.FeedType.objectGroup&&!(this.sGroupIds===undefined||this.sGroupIds==="")){g=this.oODataUtil.getGroupsData(this.oOdataModel,"/BusinessObjects('"+this.oBusinessObject.id+"')/AssignedGroups");var c=this.oODataUtil.getGroupIds(g);this.sGroupIds=this.filterGroupIds(c);}},filterGroupIds:function(c){var g;var C=c.split(",");var I=this.sGroupIds.split(",");for(var i=0;i<I.length;i++){if(C.indexOf(I[i])===-1){I.splice(i,1);i=i-1;}}if(I.length!==0){g=I.join();}else{g="";}return g;},initOData:function(){var s=this;var b=[];var a=false;var p=function(c){s.parseBatchResults(c);};var B=function(e){jQuery.sap.log.error(e,"","sap.collaboration.components.fiori.feed.dialog.Component.initOdata(), fnBatchErrorCallback()");throw e;};try{b=this.createBatchRequests();this.oODataUtil.executeODataBatchRequest(this.oOdataModel,b,p,a,B);}catch(i){jQuery.sap.log.error(i,"","sap.collaboration.components.fiori.feed.app.App.controller.initOdata()");throw i;}},createBatchRequests:function(){var s=this;var b=[];try{if(!s.sJamUrl){b.push(s.oODataUtil.createJamUrlBatchOperation(s.oOdataModel));}b.push(s.oODataUtil.createJamTokenBatchOperation(s.oOdataModel));switch(s.sFeedType){case sap.collaboration.FeedType.object:b=b.concat(s.createExternalUrlBatchRequest(s.oODataUtil,s.oBusinessObject));break;case sap.collaboration.FeedType.group:b.push(s.oODataUtil.createGetGroupsDataBatchOperation(s.oOdataModel));break;case sap.collaboration.FeedType.objectGroup:b.push(s.createObjectGroupBatchRequest(s.oODataUtil,s.oBusinessObject));break;}}catch(c){jQuery.sap.log.error(c,"","sap.collaboration.components.fiori.feed.app.App.controller.createBatchRequests()");throw c;}return b;},createExternalUrlBatchRequest:function(o,b){var s=this;var B=[];if(o&&b){if(b.id){B.push(o.createExternalOdataUrlBatchOperation(s.oOdataModel,b.id));}if(b.type){B.push(o.createExternalOdataUrlBatchOperation(s.oOdataModel,b.type));}}return B;},createObjectGroupBatchRequest:function(o,b){var s=this;var B;if(o&&b&&b.id){B=o.createGetObjectGroupsBatchOperation(s.oOdataModel,b.id);}else{var e=new Error("Missing parameters. Cannot create a batch request for Object Group.");jQuery.sap.log.error(e,"","sap.collaboration.components.fiori.feed.app.App.controller.createObjectGroupBatchRequest()");throw e;}return B;},parseBatchResults:function(b){var s=this;var i=0;if(!s.sJamUrl){if(b[i].error){throw new Error(b[i].error);}else{s.sJamUrl=b[i][s.oODataUtil.OdataUtilConstants.EndPoint.GetCollaborationHostUrl].Url;}i++;}if(b[i].error){throw new Error(b[i].error);}else{s.sJamToken=b[i][s.oODataUtil.OdataUtilConstants.EndPoint.GetSingleUseToken].Id;}i++;if(s.sFeedType==sap.collaboration.FeedType.object){if(b[i].error){throw new Error(b[i].error);}else{s.oBusinessObject.id=b[i][s.oODataUtil.OdataUtilConstants.EndPoint.GetExternalODataURL].URL;s.oBusinessObject.odata_url=s.oBusinessObject.id;}i++;if(b[i].error){throw new Error(b[i].error);}else{s.oBusinessObject.type=b[i][s.oODataUtil.OdataUtilConstants.EndPoint.GetExternalODataURL].URL;s.oBusinessObject.metadata_url=s.oBusinessObject.type;}}else if(s.sFeedType==sap.collaboration.FeedType.group||s.sFeedType==sap.collaboration.FeedType.objectGroup){if(b[i].error){throw new Error(b[i].error);}else{var a=s.oODataUtil.getGroupIds(b[i].results);if(!s.sGroupIds){s.sGroupIds=a;}else{s.sGroupIds=s.filterGroupIds(a);}}}}});
