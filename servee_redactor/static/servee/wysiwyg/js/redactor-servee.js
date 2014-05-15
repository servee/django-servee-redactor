//@codekit-prepend "redactor.js";
//@codekit-dont-prepend "redactor-document.js";

function load_wysiwyg($par){
    $par.find('textarea:not(.no_wysiwyg)').redactor({
            focus: true,
            linkEmail: true,
            linkAnchor: true,
            observeLinks: true,
            convertDivs: false,
            fixed: true,
            toolbarFixedBox: true,
            convertImageLinks: true,
            convertVideoLinks: true,
            imageUpload: '/en/servee_image/upload/',
            imageGetJson: '/en/servee_image/recent/',
            fileUpload: '/en/servee_document/upload/',
            buttons: ['formatting', 'bold', 'italic', ,'link',
                'unorderedlist', 'orderedlist', 'outdent', 'indent',
                'image', 'file', 'video', 'table', 'horizontalrule', 'html']

        });
}
