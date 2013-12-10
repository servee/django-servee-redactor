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
            buttons: ['formatting', 'bold', 'italic', '|','link', '|',
                'unorderedlist', 'orderedlist', 'outdent', 'indent', '|',
                'image', 'video', '|', 'table', '|', 'horizontalrule', '|', 'html'],
            plugins: ['document']
        });
}

// This isn't really redactor code, but it works here for the moment.
// TODO: Move to a more appropriate place. It makes a thumbail image
// out of the link in the file upload boxes.

if ($('.file-upload a').attr('href') !== 'undefined'){
    var thumbURL = $('.file-upload a').attr('href');
    $('.file-upload').prepend('<img src="' + thumbURL + '" style="max-width:100%;margin-bottom:10px;display:block;">');
}
