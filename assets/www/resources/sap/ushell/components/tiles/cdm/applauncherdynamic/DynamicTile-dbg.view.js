// Copyright (c) 2009-2017 SAP SE, All Rights Reserved

sap.ui.define(function() {
	"use strict";

    sap.ui.jsview("sap.ushell.components.tiles.cdm.applauncherdynamic.DynamicTile", {
        getControllerName: function () {
            return "sap.ushell.components.tiles.cdm.applauncherdynamic.DynamicTile";
        },
        createContent: function (oController) {
            this.setHeight('100%');
            this.setWidth('100%');

            jQuery.sap.require('sap.m.GenericTile');
            var oController = this.getController();

            return new sap.m.GenericTile({
                size:       'Auto',
                header:     '{/properties/title}',
                subheader:  '{/properties/subtitle}',
                tileContent: [new sap.m.TileContent({
                    size: 'Auto',
                    footer: '{/properties/info}',
                    footerColor: '{/data/display_info_state}',
                    unit:   '{/properties/number_unit}',
                    content: [new sap.m.NumericContent({
                        truncateValueTo: 5,//Otherwise, The default value is 4.
                        scale:      '{/properties/number_factor}',
                        value:      '{/properties/number_value}',
                        indicator:  '{/properties/number_state_arrow}',
                        valueColor: '{/properties/number_value_state}',
                        icon:       '{/properties/icon}',
                        width: '100%'
                    })]
                })],
                press : [ oController.onPress, oController ]
            });
        }

    });


}, /* bExport= */ true);
