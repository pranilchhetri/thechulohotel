// ("#unitcreate").on('keydown',reportKeyEvent);
        $('#unitname').focus();

var unitcreatecount=0;

$('.unitinformations').on('keyup', 'input', function(e) {
    var self = $(this),
        form = self.parents('form:eq(0)'),
        focusable, next, prev;
        // $('#categoryname').focus();

        // $('.unitinformations').find('[autofocus]').focus();

    // if (e.shiftKey) {
        if (e.keyCode == 8) {

            focusable = form.find('input,a,select,button,textarea').filter(':enabled');
            if(this.value.length===0)
            {
            prev = focusable.eq(focusable.index(this) - 1);

            if (prev.length) {
                prev.focus();
            } else {
                form.submit();
            }
        }
        }
    // } else
    if (e.keyCode == 13) {
        // e.preventDefault();
        // $('[id^=accountlist]').html('');



        focusable = form.find('input,a,select,button,textarea').filter(':enabled');
        next = focusable.eq(focusable.index(this) + 1);
        console.log(next);

        if (next.length) {
            next.focus();

        } else {
            form.submit();
        }
        return false;
    }
   e.preventDefault();

});


$("[id^=unitcreate]").on('keydown', reportKeyEvent);


function reportKeyEvent(zEvent) {
    // zEvent.preventDefault();
// alert("Sd");

    var reportStr =
        "The " +
        (zEvent.ctrlKey ? "Control " : "") +
        (zEvent.shiftKey ? "Shift " : "") +
        (zEvent.altKey ? "Alt " : "") +
        (zEvent.metaKey ? "Meta " : "") +
        zEvent.key + " " +
        "key was pressed.";
    console.log(reportStr);
    // <!-- $("#statusReport").text (reportStr); -->

    //--- Was a Ctrl-Alt-E combo pressed?
    if (zEvent.altKey && zEvent.key === "c") {
        $("#unitModal").modal();
        // <!-- this.hitCnt = ( this.hitCnt || 0 ) + 1; -->
        // <!--  $("#statusReport").after (
        //      '<p>Bingo! cnt: ' + this.hitCnt + '</p>'
        //  ); -->
    }
    
    // zEvent.stopPropagation();
}


$('form.unitinformations').on('submit',function(e)
{
    e.preventDefault();

    var itemcreateform = $(".unitinformations").serializeArray();
    var formObj = {};
    $.each(itemcreateform, function (i, input) {
        formObj[input.name] = input.value;
    });
   console.log(formObj);
     $.ajax({
            type: 'post',
            url: '/createunit',
            data: { formobj:formObj },
            error: function(data) {
                // var data=JSON.parse(data);
                console.log(data.result);

                alert("Unit name already in the list");
            },
            success: function(data) {
            
                alert("Unit created successfully");
                // $(".iteminformations").reset();
                $('button.closeunit').click();
                $('form.unitinformations').trigger("reset");
                // $('button.close').click();

                 $('#unitModal').modal('toggle');
                  $("datalist#unitlist").append(`<option>${formObj.unitname}</option>`);

            }

})
})
