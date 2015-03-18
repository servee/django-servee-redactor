//@codekit-prepend "redactor.js";
//@codekit-prepend "plugins/table.js";
//@codekit-prepend "plugins/video.js";
//@codekit-prepend "plugins/imagemanager.js";
//@codekit-prepend "plugins/filemanager.js";

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
            plugins: [
            'imagemanager',
            'filemanager',
            'table',
            'video'
            ],

            buttons: ['formatting', 'bold', 'italic', ,'link',
                'unorderedlist', 'orderedlist', 'outdent', 'indent',
                'image', 'file', 'video', 'table', 'horizontalrule', 'html'],
            // if jquery matchheight exists, this will fire it after
            // redactor loads and on change. We'll see how this goes.
            initCallback: function(){
                $.fn.matchHeight._update();
            },
            changeCallback: function(){
                $.fn.matchHeight._update();
            }
        });
}
