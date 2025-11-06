/**
 * Multiplugin - plugin for UrqW <https://github.com/urqw/multiplugin>
 * Copyright (C) 2025 Nikita Tseykovets <tseikovets@rambler.ru>
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

window.getFileContent = function(filePath) {
	let result = '';
	let errorMessage;

	if (filePath) {
		if (files === null) {
			filePath = normalizeInternalPath(questPath + '/' + filePath);
		} else {
			filePath = files[normalizeInternalPath(filePath)];
		}

		if (filePath) {
			$.ajax({
				url: filePath,
				method: 'GET',
				dataType: 'text',
				contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
				async: false,
				success: function(data) {
					result = data;
				},
				error: function(xhr, status, error) {
					errorMessage = error;
				}
			});
		} else {
			errorMessage = 'File not found.';
		}
	} else {
		errorMessage = 'The file path is empty.';
	}

	if (errorMessage) {
		console.error('Error reading file:', errorMessage);
	}

	return result;
}

window.refreshStyles = function() {
	// Force the browser to refresh styles
	// Micro-animation (there may be a side effect of resetting system focus)
	$('body').hide().show(0);
}

window.addCSS = function(stylePath, elementID = 'additionalstyle') {
	const styleContent = getFileContent(stylePath);
	if (!styleContent) {
		return 0;
	}
	const $element = $(`#${elementID}`);
	if ($element.length === 0) {
		$('<style>')
			.attr('id', elementID)
			.appendTo('head');
	} else {
		if ($element[0].tagName.toLowerCase() !== 'style') {
			return 0;
		}
	}
	$(`#${elementID}`).append(styleContent);
	refreshStyles();
	return 1;
}

window.delCSS = function(elementID = 'additionalstyle') {
	if (elementID === 'additionalstyle') {
		$(`#${elementID}`).empty();
		//refreshStyles();
		return 1;
	}
	const $element = $(`#${elementID}`);
	if ($element.length === 0) {
		return 0;
	}
	if ($element[0].tagName.toLowerCase() !== 'style') {
		return 0;
	}
	$element.remove();
	//refreshStyles();
	return 1;
}

window.evalJS = function(scriptPath) {
	const scriptCode = getFileContent(scriptPath);
	if (!scriptCode) {
		return 0;
	}
	return eval(scriptCode);
}
