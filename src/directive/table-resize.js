

// 表头拖动
function tableResize(el) {
    console.log(el.querySelectorAll('thead > tr > th'));

    // 鼠标滑过表头添加可拖动标识
    el.addEventListener('mouseover', evt => {
        console.log(evt.target);
    }, false);

    // 鼠标滑过表头添加可拖动标识
    // $ele.on('mouseover', 'thead > tr > th', function (evt) {
    //     if (!$(this).find('.mpui-th-resize-line').length) {
    //         $(this).addClass('mpui-th-resize');
    //         $(this).append('<div class="mpui-th-resize-line"></div>');
    //     }					
    // });

    // // 鼠标移开表头删除可拖动标识
    // $ele.on('mouseleave', '.mpui-tb-header-inner > table > thead > tr > th', function (evt) {
    //     $(this).removeClass('mpui-th-resize');
    //     $(this).find('.mpui-th-resize-line').remove();
    // });

    // // 拖动
    // $ele.on('mousedown', '.mpui-th-resize-line', function (evt) {
    //     evt.stopPropagation();
    //     evt.preventDefault();

    //     var $th = $(this).closest('th');
    //     var index = $th.index();
    //     var oldClientX = evt.clientX;
    //     var oldWidth = $th.outerWidth();
    //     var headerCols = $ele.find('.mpui-tb-header-inner > table > colgroup > col');
    //     var headerThs = $ele.find('.mpui-tb-header-inner > table > thead > tr > th');
    //     var bodyCols = $ele.find('.mpui-tb-body > table > colgroup > col');
    //     var bodyThs = $ele.find('.mpui-tb-body > table > thead > tr > th');
    //     var resizeMask = $('<i class="mpui-resize-mask"></i>').appendTo('body');
    //     isResizing = true;

    //     resizeMask.on('mousemove.mpui-th-resize', function (evt) {
    //         var newWidth = Math.max(evt.clientX - oldClientX + oldWidth, 20);
    //         if (headerCols.length) {
    //             headerCols.eq(index).attr('width', newWidth);
    //             bodyCols.eq(index).attr('width', newWidth);
    //         } else {
    //             headerThs.eq(index).attr('width', newWidth);
    //             bodyThs.eq(index).attr('width', newWidth);
    //         }
    //         evt.preventDefault();
    //         evt.stopPropagation();
    //     });
        
    //     resizeMask.on('mouseup.mpui-th-resize', function (evt) {
    //         resizeMask.remove();
    //         $th.find('.mpui-th-resize-line').remove();
    //         evt.preventDefault();
    //         evt.stopPropagation();
    //     });
    // });
}

tableResize.directiveName = 'table-resize';

export default tableResize;