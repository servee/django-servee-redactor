if(typeof RedactorPlugins=="undefined")var RedactorPlugins={};RedactorPlugins.document={docThumbClick:function(e){var t='<a href="'+$(e.target).attr("data-href")+'">'+$(e.target).text()+"</a>";this.opts.paragraphy&&(img="<p>"+t+"</p>");this.imageInsert(t,!0)},docInsert:function(e,t){this.selectionRestore();if(e!==!1){var n="";if(t!==!0){n='<a id="doc-marker" href="'+e.filelink+'">'+e.title+"</a>";this.opts.paragraphy&&(n="<p>"+n+"</p>")}else n=e;this.execCommand("inserthtml",n,!1);var r=$(this.$editor.find("a#doc-marker"));r.length?r.removeAttr("id"):r=!1;this.sync();t!==!0&&this.callback("docUpload",r,e)}this.modalClose();this.observeImages()},docCallback:function(e){this.docInsert(e)},docCallbackLink:function(){var e=$("#redactor_file_link").val();if(e!==""){var t='<a id="doc-marker" href="'+e+'">'+e+"</a>";this.opts.linebreaks===!1&&(t="<p>"+t+"</p>");this.docInsert(t,!0)}else this.modalClose()},init:function(){var e='<section><div id="redactor_tabs"><a href="#" class="redactor_tabs_act">'+this.opts.curLang.upload+"</a>"+'<a href="#">'+this.opts.curLang.choose+"</a>"+"</div>"+'<div id="redactor-progress" class="redactor-progress redactor-progress-striped" style="display: none;">'+'<div id="redactor-progress-bar" class="redactor-progress-bar" style="width: 100%;"></div>'+"</div>"+'<form id="redactorInsertImageForm" method="post" action="" enctype="multipart/form-data">'+'<div id="redactor_tab1" class="redactor_tab">'+'<input type="file" id="redactor_file" name="file" />'+"</div>"+'<div id="redactor_tab2" class="redactor_tab" style="display: none;">'+'<div id="redactor_document_box"></div>'+"</div>"+"</form>"+"</section>"+"<footer>"+'<button class="redactor_modal_btn redactor_btn_modal_close">'+this.opts.curLang.cancel+"</button>"+'<input type="button" name="upload" class="redactor_modal_btn" id="redactor_upload_btn" value="'+this.opts.curLang.insert+'" />'+"</footer>";this.buttonAddAfter("image","document","Document",function(){this.selectionSave();var t=$.proxy(function(){this.opts.documentGetJson?$.getJSON(this.opts.documentGetJson,$.proxy(function(e){var t={},n=0;$.each(e,$.proxy(function(e,r){if(typeof r.folder!="undefined"){n++;t[r.folder]=n}},this));var r=!1;$.each(e,$.proxy(function(e,n){var i="";typeof n.title!="undefined"&&(i=n.title);var s=0;if(!$.isEmptyObject(t)&&typeof n.folder!="undefined"){s=t[n.folder];r===!1&&(r=".redactorfolder"+s)}var o=$('<p class="doc-thumb" data-href="'+n.thumb+'">'+n.title+"</p>");$("#redactor_document_box").append(o);$(o).click($.proxy(this.docThumbClick,this))},this));if(!$.isEmptyObject(t)){$(".redactorfolder").hide();$(r).show();var i=function(e){$(".redactorfolder").hide();$(".redactorfolder"+$(e.target).val()).show()},s=$('<select id="redactor_document_box_select">');$.each(t,function(e,t){s.append($('<option value="'+t+'">'+e+"</option>"))});$("#redactor_document_box").before(s);s.change(i)}},this)):$("#redactor_tabs").find("a").eq(1).remove();if(this.opts.documentUpload||this.opts.s3){!this.isMobile()&&this.opts.s3===!1&&$("#redactor_file").length&&this.draguploadInit("#redactor_file",{url:this.opts.documentUpload,uploadFields:this.opts.uploadFields,success:$.proxy(this.docCallback,this),error:$.proxy(function(e,t){this.callback("documentUploadError",t)},this)});this.opts.s3===!1?this.uploadInit("redactor_file",{auto:!0,url:this.opts.documentUpload,success:$.proxy(this.docCallback,this),error:$.proxy(function(e,t){this.callback("documentUploadError",t)},this)}):$("#redactor_file").on("change.redactor",$.proxy(this.s3handleFileSelect,this))}else{$(".redactor_tab").hide();if(!this.opts.documentGetJson){$("#redactor_tabs").remove();$("#redactor_tab3").show()}else{var e=$("#redactor_tabs").find("a");e.eq(0).remove();e.eq(1).addClass("redactor_tabs_act");$("#redactor_tab2").show()}}$("#redactor_upload_btn").click($.proxy(this.docCallbackLink,this));!this.opts.documentUpload&&!this.opts.documentGetJson&&setTimeout(function(){$("#redactor_file_link").focus()},200)},this);this.modalInit("Insert Document",e,610,t)})}};