//Copyright (c) 2009-2017 SAP SE, All Rights Reserved
(function(){"use strict";jQuery.sap.require("sap.ushell.components.tiles.indicatorTileUtils.smartBusinessUtil");jQuery.sap.require("sap.ui.model.analytics.odata4analytics");sap.ui.getCore().loadLibrary("sap.suite.ui.commons");sap.ui.jsview("sap.ushell.components.tiles.indicatordeviation.DeviationTile",{getControllerName:function(){return"sap.ushell.components.tiles.indicatordeviation.DeviationTile";},createContent:function(c){this.setHeight('100%');this.setWidth('100%');var h="Lorem ipsum";var s="Lorem ipsum";var t=sap.ushell.components.tiles.indicatorTileUtils.util.getTileTitleSubtitle(this.getViewData().chip);if(t.title&&t.subTitle){h=t.title;s=t.subTitle;}var d={subheader:s,header:h,footerNum:"",footerComp:"",frameType:"OneByOne",state:sap.m.LoadState.Loading,scale:""};var b=new sap.suite.ui.microchart.BulletMicroChartData({value:"{value}",color:"{color}"});this.oBCTmpl=new sap.suite.ui.microchart.BulletMicroChart({size:sap.m.Size.Auto,scale:"{/scale}",actual:{value:"{/actual/value}",color:"{/actual/color}"},targetValue:"{/targetValue}",actualValueLabel:"{/actualValueLabel}",targetValueLabel:"{/targetValueLabel}",thresholds:{template:b,path:"/thresholds"},state:"{/state}",showActualValue:"{/showActualValue}",showTargetValue:"{/showTargetValue}"});this.oNVConfS=new sap.ushell.components.tiles.sbtilecontent({unit:"{/unit}",size:"{/size}",footer:"{/footerNum}",content:this.oBCTmpl});this.oGenericTile=new sap.m.GenericTile({subheader:"{/subheader}",frameType:"{/frameType}",size:"{/size}",header:"{/header}",tileContent:[this.oNVConfS]});var g=new sap.ui.model.json.JSONModel();g.setData(d);this.oGenericTile.setModel(g);return this.oGenericTile;}});}());
