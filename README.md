# Multiplugin

*Version from 2026-11-05 for UrqW 2.0.*

A plugin for [UrqW](https://github.com/urqw/UrqW) that adds the ability to use multiple plugins and connect them from separate files using a command from the URQL code.

The plugin allows you to add multiple separate .css and .js files to a game package, and then apply them individually at the desired time. This may be necessary if the standard UrqW plugin mechanism is not flexible enough to handle the required tasks, or if there is a need to split the plugin into separate physical files.

The following URQL functions are available for calling:

* CSSAdd(stylePath, elementID) - Add styles from a file to the `<style>` element.
	+ The stylePath parameter is the path to the style file within the game package, relative to the main .qst file. This is a required parameter.
	+ The elementID parameter is the ID of the `<style>` element in which the styles from the file at stylePath will be added. This is an optional parameter. By default, styles are added to `<style id="additionalstyle">`.
	+ Return value: true if the styles were successfully added, false if the styles were not added (e.g., an element with the specified ID already exists and is not a `<style>`).
* CSSDel(elementID) - Delete the `<style>` element and all its styles.
	+ The elementID parameter is the ID of the `<style>` element to be deleted along with all its contents. This is an optional parameter. By default, the `<style id="additionalstyle">` element will be processed, but it will be cleared rather than deleted.
	+ Return value: true if the styles were successfully removed, false if the styles were not removed (e.g., an element with the specified ID does not exist or is not a `<style>`).
* JSEval(scriptPath) - execute JavaScript code from a file.
	+ The scriptPath parameter is the path to the file containing the JavaScript code within the game package, relative to the main .qst file. This parameter is required.
	+ Return value: The result of executing the last command from the file.

Note: The contents of all files will be read in UTF-8 encoding.

The plugin and an example of its use can be found in the urqw directory. A demo of the plugin can be viewed at <https://urqw.github.io/UrqW#multiplugin>

For other UrqW plugins, see the [common repository](https://github.com/urqw/plugins).

Be careful, though: not all UrqW plugins can be easily combined.
