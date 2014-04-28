//@codekit-prepend "redactor.js";
//@codekit-prepend "redactor-document.js";

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
            imageUpload: '/servee_image/upload/',
            imageGetJson: '/servee_image/recent/',
            documentGetJson: '/servee_document/recent/',
            documentUpload: '/servee_document/upload/',
            buttons: ['formatting', 'bold', 'italic', ,'link',
                'unorderedlist', 'orderedlist', 'outdent', 'indent',
                'image', 'video', 'table', 'horizontalrule', 'html'],
            plugins: ['document']
        });
}
