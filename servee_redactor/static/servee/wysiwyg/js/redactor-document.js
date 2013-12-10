if (typeof RedactorPlugins === 'undefined') var RedactorPlugins = {};

RedactorPlugins.document = {
	docThumbClick: function(e)
	{
		var doc = '<a href="' + $(e.target).attr('data-href') + '">' + $(e.target).text() + '</a>';

		if (this.opts.paragraphy) img = '<p>' + doc + '</p>';

		this.imageInsert(doc, true);
	},
	docInsert: function(json, link)
	{
		this.selectionRestore();

		if (json !== false)
		{
			var html = '';
			if (link !== true)
			{
				html = '<a id="doc-marker" href="' + json.filelink + '">' + json.title + '</a>';
				if (this.opts.paragraphy) html = '<p>' + html + '</p>';
			}
			else
			{
				html = json;
			}

			this.execCommand('inserthtml', html, false);

			var doc = $(this.$editor.find('a#doc-marker'));

			if (doc.length) doc.removeAttr('id');
			else doc = false;

			this.sync();

			// upload image callback
			link !== true && this.callback('docUpload', doc, json);
		}

		this.modalClose();
		this.observeImages();
	},
	docCallback: function(data)
	{
		this.docInsert(data);
	},
	docCallbackLink: function()
	{
		var val = $('#redactor_file_link').val();

		if (val !== '')
		{
			var data = '<a id="doc-marker" href="' + val + '">' + val + '</a>';
			if (this.opts.linebreaks === false) data = '<p>' + data + '</p>';

			this.docInsert(data, true);

		}
		else this.modalClose();
	},



	init: function()
	{
		var modal_document = '<section>'
					+ '<div id="redactor_tabs">'
						+ '<a href="#" class="redactor_tabs_act">' + this.opts.curLang.upload + '</a>'
						+ '<a href="#">' + this.opts.curLang.choose + '</a>'

					+ '</div>'
					+ '<div id="redactor-progress" class="redactor-progress redactor-progress-striped" style="display: none;">'
							+ '<div id="redactor-progress-bar" class="redactor-progress-bar" style="width: 100%;"></div>'
					+ '</div>'
					+ '<form id="redactorInsertImageForm" method="post" action="" enctype="multipart/form-data">'
						+ '<div id="redactor_tab1" class="redactor_tab">'
							+ '<input type="file" id="redactor_file" name="file" />'
						+ '</div>'
						+ '<div id="redactor_tab2" class="redactor_tab" style="display: none;">'
							+ '<div id="redactor_document_box"></div>'
						+ '</div>'
					+ '</form>'

				+ '</section>'
				+ '<footer>'
					+ '<button class="redactor_modal_btn redactor_btn_modal_close">' + this.opts.curLang.cancel + '</button>'
					+ '<input type="button" name="upload" class="redactor_modal_btn" id="redactor_upload_btn" value="' + this.opts.curLang.insert + '" />'
				+ '</footer>';

		this.buttonAddAfter('image', 'document', 'Document', function()
		{

			this.selectionSave();

			var callback = $.proxy(function()
			{
				// json
				if (this.opts.documentGetJson)
				{
					$.getJSON(this.opts.documentGetJson, $.proxy(function(data)
					{
						var folders = {}, count = 0;

						// folders
						$.each(data, $.proxy(function(key, val)
						{
							if (typeof val.folder !== 'undefined')
							{
								count++;
								folders[val.folder] = count;
							}

						}, this));

						var folderclass = false;
						$.each(data, $.proxy(function(key, val)
						{
							// title
							var thumbtitle = '';
							if (typeof val.title !== 'undefined') thumbtitle = val.title;

							var folderkey = 0;
							if (!$.isEmptyObject(folders) && typeof val.folder !== 'undefined')
							{
								folderkey = folders[val.folder];
								if (folderclass === false) folderclass = '.redactorfolder' + folderkey;
							}
							// This is where the list goes, and where all the data needs to come from. #TODO - put this somewhere more obvious.
							var doc = $('<p class="doc-thumb" data-href="' + val.thumb + '">' + val.title + '</p>');
							$('#redactor_document_box').append(doc);
							$(doc).click($.proxy(this.docThumbClick, this));

						}, this));

						// folders
						if (!$.isEmptyObject(folders))
						{
							$('.redactorfolder').hide();
							$(folderclass).show();

							var onchangeFunc = function(e)
							{
								$('.redactorfolder').hide();
								$('.redactorfolder' + $(e.target).val()).show();
							};

							var select = $('<select id="redactor_document_box_select">');
							$.each( folders, function(k, v)
							{
								select.append( $('<option value="' + v + '">' + k + '</option>'));
							});

							$('#redactor_document_box').before(select);
							select.change(onchangeFunc);
						}
					}, this));

				}
				else
				{
					$('#redactor_tabs').find('a').eq(1).remove();
				}

				if (this.opts.documentUpload || this.opts.s3)
				{
					// dragupload
					if (!this.isMobile() && this.opts.s3 === false)
					{
						if ($('#redactor_file' ).length)
						{
							this.draguploadInit('#redactor_file', {
								url: this.opts.documentUpload,
								uploadFields: this.opts.uploadFields,
								success: $.proxy(this.docCallback, this),
								error: $.proxy(function(obj, json)
								{
									this.callback('documentUploadError', json);

								}, this)
							});
						}
					}

					if (this.opts.s3 === false)
					{
						// ajax upload
						this.uploadInit('redactor_file', {
							auto: true,
							url: this.opts.documentUpload,
							success: $.proxy(this.docCallback, this),
							error: $.proxy(function(obj, json)
							{
								this.callback('documentUploadError', json);

							}, this)
						});
					}
					// s3 upload
					else
					{
						$('#redactor_file').on('change.redactor', $.proxy(this.s3handleFileSelect, this));
					}

				}
				else
				{
					$('.redactor_tab').hide();
					if (!this.opts.documentGetJson)
					{
						$('#redactor_tabs').remove();
						$('#redactor_tab3').show();
					}
					else
					{
						var tabs = $('#redactor_tabs').find('a');
						tabs.eq(0).remove();
						tabs.eq(1).addClass('redactor_tabs_act');
						$('#redactor_tab2').show();
					}
				}

				$('#redactor_upload_btn').click($.proxy(this.docCallbackLink, this));

				if (!this.opts.documentUpload && !this.opts.documentGetJson)
				{
					setTimeout(function()
					{
						$('#redactor_file_link').focus();

					}, 200);
				}

			}, this);

			this.modalInit("Insert Document", modal_document, 610, callback);

		});
	}

}

