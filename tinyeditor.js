var tinyEditor = function (id) {
	var tools = [
		/*{
			name: 'formatBlock',
			title: 'Block',
			command: 'formatBlock',
			args: 'h1|h2|h3|h4|h5|h6|p|pre',
			action: 'select'
		},
		{
			name: 'fontFamily',
			title: 'Font Family',
			command: 'fontName',
			args: 'Arial|Comic Sans MS|Courier New|Georgia|Trebuchet MS|Times New Roman|Verdana',
			action: 'select'
		},
		{
			name: 'fontSize',
			title: 'Font Size',
			command: 'fontSize',
			args: '1|2|3|4|5|6|7',
			action: 'select'
		},*/
		{
			name: 'bold',
			title: '<strong>B</strong>',
			command: 'bold',
			args: null,
			action: 'click'
		},
		{
			name: 'italic',
			title: '<em>I</em>',
			command: 'italic',
			args: null,
			action: 'click'
		},
		{
			name: 'underline',
			title: '<u>U</u>',
			command: 'underline',
			args: null,
			action: 'click'
		},
		{
			name: 'alignLeft',
			title: 'Left',
			command: 'justifyLeft',
			args: null,
			action: 'click'
		},
		{
			name: 'alignCenter',
			title: 'Center',
			command: 'justifyCenter',
			args: null,
			action: 'click'
		},
		{
			name: 'alignRight',
			title: 'Right',
			command: 'justifyRight',
			args: null,
			action: 'click'
		},
		{
			name: 'alignJustify',
			title: 'Justify',
			command: 'justifyFull',
			args: null,
			action: 'click'
		},
		{
			name: 'subscript',
			title: 'x<sub>n</sub>',
			command: 'subscript',
			args: null,
			action: 'click'
		},
		{
			name: 'superscript',
			title: 'x<sup>n</sup>',
			command: 'superscript',
			args: null,
			action: 'click'
		},
		{
			name: 'orderedList',
			title: 'OL',
			command: 'insertOrderedList',
			args: null,
			action: 'click'
		},
		{
			name: 'unorderedList',
			title: 'UL',
			command: 'insertUnorderedList',
			args: null,
			action: 'click'
		},
		{
			name: 'anchor',
			title: 'Link',
			command: 'createLink',
			args: 'link',
			action: 'click'
		},
		{
			name: 'removeAnchor',
			title: 'Unlink',
			command: 'unlink',
			args: null,
			action: 'click'
		},
		{
			name: 'removeFormat',
			title: 'T&times;',
			command: 'removeFormat',
			args: null,
			action: 'click'
		},
		{
			name: 'undo',
			title: 'Undo',
			command: 'undo',
			args: null,
			action: 'click'
		},
		{
			name: 'redo',
			title: 'Redo',
			command: 'redo',
			args: null,
			action: 'click'
		}
	];

	var content = '';
	var parentElement = document.getElementById(id);
	content = parentElement.innerHTML;
	parentElement.innerHTML = '';

	var container = document.createElement('div');
	container.className = 'text_editor_container';

	var toolbar = document.createElement('div');
	toolbar.className = 'text_editor_toolbar';

	for (var i = 0; i < tools.length; i++) {
		(function (i) {
			var tool;
			var actions = tools[i].action.split('|');
			if (actions.indexOf('click') != -1) {
				tool = document.createElement('div');
				tool.addEventListener('click', function () {
					var args = null;
					if (tools[i].args != null) {
						if (tools[i].args == 'link') {
							args = prompt('Link', 'http://');
						}
					}

					document.execCommand(tools[i].command, false, args);
				});

				tool.innerHTML = tools[i].title;
				tool.setAttribute('unselectable', 'on');
			}

			if (actions.indexOf('select') != -1) {
				tool = document.createElement('select');
				if (tools[i].args != null) {
					var items = tools[i].args.split('|');
					for (var j = 0; j < items.length; j++) {
						(function (j) {
							var item = document.createElement('option');
							item.value = items[j];
							item.innerHTML = items[j];
							tool.add(item);
						} (j));
					}
				}

				tool.addEventListener('change', function(){
					document.execCommand(tools[i].command, false, tool.value);
				});
			}

			tool.className = tools[i].name + ' tool';
			tool.setAttribute('tinyeditor-command', tools[i].command);

			toolbar.appendChild(tool);
		}(i));
	}

	var clear = document.createElement('div');
	clear.className = 'text-editor-clear';
	toolbar.appendChild(clear);

	var contentArea = document.createElement('div');
	contentArea.className = 'text_editor_content_area';
	contentArea.innerHTML = content;
	contentArea.setAttribute('contenteditable', 'true');

	container.appendChild(toolbar);
	container.appendChild(contentArea);
	parentElement.appendChild(container);


};