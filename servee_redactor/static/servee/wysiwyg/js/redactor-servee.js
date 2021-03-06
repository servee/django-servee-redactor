//@codekit-prepend "redactor.js";
//@codekit-prepend "plugins/table.js";
//@codekit-prepend "plugins/video.js";
//@codekit-prepend "plugins/imagemanager.js";
//@codekit-prepend "plugins/filemanager.js";
//@codekit-prepend "plugins/codemirror.js";

function load_wysiwyg($par){
    $par.find('textarea:not(.no_wysiwyg)').redactor({
        focus: true,
        replaceDivs: false,
        toolbarFixed: true,
        buttonSource: true,
        imageUpload: '/servee_image/upload/',
        imageManagerJson: '/servee_image/recent/',
        fileUpload: '/servee_document/upload/',
        fileManagerJson: '/servee_document/recent/',
        imageResizable: true,
        imagePosition: true,
        overrideStyles: false,
        plugins: [
        'imagemanager',
        'filemanager',
        'table',
        'video',
        'codemirror'
        ],
        codemirror: {
            lineNumbers: false,
            lineWrapping: true,
            mode: "htmlmixed",
            matchBrackets: true,
            indentUnit: 4
        },

        buttons: [
          'format',
          'bold',
          'italic',
          'lists',
          'image',
          'file',
          'link',
          'video',
          'table',
          'horizontalrule',
          'html'
        ],
        // if jquery matchheight exists, this will fire it after
        // redactor loads and on change. We'll see how this goes.
        initCallback: function(){
            if (typeof $.fn.matchHeight === 'function') {
              $.fn.matchHeight._update();
            }
        },
        changeCallback: function(){
            if (typeof $.fn.matchHeight === 'function') {
              $.fn.matchHeight._update();
            }
        }
    });

//init codemirror after redactor's call
    // function editor(id)
    // {
    //     CodeMirror.fromTextArea(id, {
    //         lineNumbers: false,
    //         mode: "text/html",
    //         matchBrackets: true
    //     });
    // }

    //
    // editor($par.find('textarea:not(.no_wysiwyg)')[0]);
    //
    // if ($('#id_content_html').length > 0 ){
    //     editor($('#id_content_html')[0]);
    // }
    // if ($('#id_quote_citation').length > 0){
    //     editor($('#id_quote_citation')[0]);
    // }
    // if ($('#id_quote_content').length > 0){
    //     editor($('#id_quote_content')[0]);
    // }
 }
