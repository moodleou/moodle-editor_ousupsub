/**
 * Simple javascript unit test script for the OUsupsup editor plugin
 */



var testcases = [
                 {input: "<span><sup>12</sup></span>", expected: "<sup>12</sup>"},
                 {input: "<sup>12</sup><sup>34</sup>", expected: "<sup>1234</sup>"},
                 {input: "<sup>12</sup> <sup>34</sup>", expected: "<sup>12 34</sup>"}
];

function init_ousupsub(id, params) {
    M.str = {"moodle":{"error":"Error","morehelp":"More help","changesmadereallygoaway":"You have made changes. Are you sure you want to navigate away and lose your changes?"},"ousupsub_subscript":{"pluginname":"Subscript"},"ousupsub_superscript":{"pluginname":"Superscript"},"editor_ousupsub":{"editor_command_keycode":"Cmd + {$a}","editor_control_keycode":"Ctrl + {$a}","plugin_title_shortcut":"{$a->title} [{$a->shortcut}]","plugin_title_shortcut":"{$a->title} [{$a->shortcut}]"},"error":{"serverconnection":"Error connecting to the server"}}
    plugins = [];
    if (params.superscript) {
        plugins[plugins,length] = {"name":"superscript","params":[]};
    }
    if (params.subscript) {
        plugins[plugins.length] = {"name":"subscript","params":[]};
    }
    
    var YUI_config = {base: "resources/yui/3.17.2/"}
    YUI().use("node", "moodle-editor_ousupsub-editor","moodle-ousupsub_subscript-button","moodle-ousupsub_superscript-button", 
            function(Y) {YUI.M.editor_ousupsub.createEditor(
            {"elementid":id,"content_css":"","contextid":0,"language":"en",
                "directionality":"ltr","plugins":[{"group":"style1","plugins":plugins}],"pageHash":""});
    });
};

// Initialise an editor to test with.
init_ousupsub("id_description_editor", {"subscript":true, "superscript":true});

function get_editor(id) {
    return YUI.M.editor_ousupsub.getEditor(id);
}

function escape_html(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
}

function run_tests(Y) {
    var editor = get_editor("id_description_editor");
    for(var i=0; i<testcases.length;i++) {
        run_test(editor, testcases[i]);
    }
}


function run_test(editor, test) {
    editor.editor.set('innerHTML', test.input);
    editor.plugins.subscript._normaliseTextareaAndGetSelectedNodes();
    test.actual = editor.editor.get('innerHTML'); 
    test.matched = test.expected == test.actual;
}

function update_display(Y) {
    // Update table.
    var table = Y.one('#results');
    for(var i=0; i<testcases.length;i++) {
        test = testcases[i];
        var rowText = '<tr>';
        rowText += '<td>'+escape_html(test.input)+'</td>';
        rowText += '<td>'+escape_html(test.expected)+'</td>';
        rowText += '<td>'+escape_html(test.actual)+'</td>';
        rowText += '<td class="'+(test.matched?'matched':'notmatched')+'">'+test.matched+'</td>';
        rowText += '</tr>';
        var row = Y.Node.create(rowText);
        table.appendChild(row);
    }
}

YUI().use("node", "moodle-editor_ousupsub-editor","moodle-ousupsub_subscript-button","moodle-ousupsub_superscript-button",
                function(Y) { 
    run_tests();
    update_display(Y);
});