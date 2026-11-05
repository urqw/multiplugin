/**
 * Multiplugin - plugin for UrqW <https://github.com/urqw/multiplugin>
 * Copyright (C) 2025, 2026 Nikita Tseykovets <tseikovets@rambler.ru>
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

window.refreshStyles = function() {
	// Force the browser to refresh styles
	// Micro-animation (there may be a side effect of resetting system focus)
	$('body').hide().show(0);
}

functions.cssadd = function(stylePath, elementID = 'additionalstyle') {
	if (arguments.length < 1 || arguments.length > 2) {
		throw new Error('The cssadd() function takes 1 or 2 arguments.');
	}
	const styleContent = functions.filecontent(stylePath);
	if (styleContent === '') {
		setGlobalError(1, `Failed to retrieve the contents of the style file: ${stylePath}`);
		return false;
	}
	const $element = $(`#${elementID}`);
	if ($element.length === 0) {
		$('<style>')
			.attr('id', elementID)
			.appendTo('head');
	} else {
		if ($element[0].tagName.toLowerCase() !== 'style') {
			setGlobalError(1, `The element with the specified ID (${elementID}) is not a <style> element.`);
			return false;
		}
	}
	$(`#${elementID}`).append(styleContent);
	refreshStyles();
	return true;
}

functions.cssdel = function(elementID = 'additionalstyle') {
	if (arguments.length > 1) {
		throw new Error('The cssdel() function takes 0 or 1 argument.');
	}
	if (elementID === 'additionalstyle') {
		$(`#${elementID}`).empty();
		//refreshStyles();
		return true;
	}
	const $element = $(`#${elementID}`);
	if ($element.length === 0) {
		setGlobalError(1, `The element with the specified ID (${elementID}) does not exist.`);
		return false;
	}
	if ($element[0].tagName.toLowerCase() !== 'style') {
		setGlobalError(1, `The element with the specified ID (${elementID}) is not a <style> element.`);
		return false;
	}
	$element.remove();
	//refreshStyles();
	return true;
}

functions.jseval = function(scriptPath) {
	if (arguments.length !== 1) {
		throw new Error('The jseval() function takes 1 argument.');
	}
	const scriptCode = functions.filecontent(scriptPath);
	if (scriptCode === '') {
		setGlobalError(1, `Failed to retrieve the contents of the script file: ${scriptPath}`);
		return '';
	}
	return eval(scriptCode);
}
