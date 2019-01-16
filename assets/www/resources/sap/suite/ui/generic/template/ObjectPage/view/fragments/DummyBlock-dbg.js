sap.ui.define(['sap/uxap/BlockBase'],
	function (BlockBase) {
		"use strict";

		var DummyBlock = BlockBase.extend("sap.suite.ui.generic.template.ObjectPage.view.fragments.DummyBlock", {
			metadata: {
				views: {
					Collapsed: {
						viewName: "sap.suite.ui.generic.template.ObjectPage.view.fragments.DummyBlock",
						type: "XML"
					},
					Expanded: {
						viewName: "sap.suite.ui.generic.template.ObjectPage.view.fragments.DummyBlock",
						type: "XML"
					}
				}
			}.fragments
		});

		return DummyBlock;

	});