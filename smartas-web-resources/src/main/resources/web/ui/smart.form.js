(function($) {
	// $.json2form = $.json2form || {};
	$.fn.fillForm = function(url, param, callback) {

		if (typeof param === "function") {
			callback = param;
			param == undefined;
		}

		var jonsData = {}
		$.ajax({
			type : 'get',
			url : url,
			data : param,
			dataType : "json",
			async : false,
			success : function(data) {
				jonsData = data;
			}
		});

		var elem = $(this);

		if (!elem.attr("loadedInit")) {// init checkbox radio
			// and select element
			// ,label
			
			
			
			
			
			
			if (jonsData.init) {
				for ( var elem in jonsData.init) {
					var arrayData = config.data.init[elem];
					if ($("#" + config.elem + " input[name='" + elem + "']")) {
						var elemType = $(
								"#" + config.elem + " input[name='" + elem
										+ "']").attr("type");
						var elemName = $(
								"#" + config.elem + " input[name='" + elem
										+ "']").attr("name");
						var initElem = $("#" + config.elem + " input[name='"
								+ elem + "']");
						switch (elemType) {
						case "checkbox":
						case "radio":
							for ( var initelem in arrayData) {
								initElem.after('<input type="' + elemType
										+ '"  name="' + elemName + '" value="'
										+ arrayData[initelem].value + '" />'
										+ arrayData[initelem].display);
							}
							initElem.remove();
							break;
						}
					}
					if ($("#" + config.elem + " select[name='" + elem + "']")) {
						for ( var initelem in arrayData) {
							$(
									"#" + config.elem + " select[name='" + elem
											+ "']").append(
									"<option value='"
											+ arrayData[initelem].value + "'>"
											+ arrayData[initelem].display
											+ "</option>");
						}
					}
				}
			}
			if (config.data.label) {// label
				$("#" + config.elem + " label").each(function() {
					var labelFor = $(this).attr("for");
					if (config.data.label[labelFor]) {
						$(this).html(config.data.label[labelFor]);
					}
				});
			}
		}

		if (config.data) {// input text password hidden button reset submit
			// checkbox radio select textarea
			$("#" + config.elem + " input,select,textarea")
					.each(
							function() {
								var elemType = $(this).attr("type") == undefined ? this.type
										: $(this).attr("type");
								var elemName = $(this).attr("name");
								var elemData = config.data[elemName];
								if (!$("#" + config.elem).attr("loadedInit")
										&& $(this).attr("loadurl")) {
									switch (elemType) {
									case "checkbox":
									case "radio":
									case "select":
									case "select-one":
									case "select-multiple": {
										var _this = this;
										$
												.ajax({
													type : config.type,
													url : $(this).attr(
															"loadurl"),
													dataType : "json",
													async : false,
													success : function(data) {
														if (elemType == "select"
																|| elemType == "select-one"
																|| elemType == "select-multiple") {
															$(_this).empty();
														}
														for ( var elem in data) {
															if (elemType == "select"
																	|| elemType == "select-one"
																	|| elemType == "select-multiple") {
																$(_this)
																		.append(
																				"<option value='"
																						+ data[elem].value
																						+ "'>"
																						+ data[elem].display
																						+ "</option>");
															} else {
																$(_this)
																		.after(
																				'<input type="'
																						+ elemType
																						+ '"  name="'
																						+ elemName
																						+ '" value="'
																						+ data[elem].value
																						+ '" />'
																						+ data[elem].display);
															}
														}
														if (elemType == "checkbox"
																|| elemType == "radio")
															$(_this).remove();
													}
												});
										break;
									}
									}
								}

								if (elemData) {
									switch (elemType) {
									case undefined:
									case "text":
									case "password":
									case "hidden":
									case "button":
									case "reset":
									case "textarea":
									case "submit": {
										if (typeof (elemData) == "string") {
											$(this)
													.val(
															elemData
																	.toUpperCase() == "NULL" ? ""
																	: elemData);
										} else {
											$(this).val(elemData + "");
										}
										break;
									}
									case "checkbox":
									case "radio": {
										$(this).attr("checked", "");
										if (elemData.constructor == Array) {// checkbox
											// multiple
											// value
											// is
											// Array
											for ( var elem in elemData) {
												if (elemData[elem] == $(this)
														.val()) {
													$(this).attr("checked",
															true);
												}
											}
										} else {// radio or checkbox is a string
											// single value
											if (elemData == $(this).val()) {
												$(this).attr("checked", true);
											}
										}
										break;
									}
									case "select":
									case "select-one":
									case "select-multiple": {
										$(this).find("option:selected").attr(
												"selected", false);
										if (elemData.constructor == Array) {
											for ( var elem in elemData) {
												$(this)
														.find(
																"option[value='"
																		+ elemData[elem]
																		+ "']")
														.attr("selected", true);
											}
										} else {
											$(this).find(
													"option[value='" + elemData
															+ "']").attr(
													"selected", true);
										}
										break;
									}
									}
								}
							});
		}

		$("#" + config.elem).attr("loadedInit", "true");// loadedInit is
		// true,next invoke not
		// need init checkbox
		// radio and select
		// element ,label
	};
})(jQuery);