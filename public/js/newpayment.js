Cookies.set('name', 'Shailesh', { expires: 1 });
console.log(Cookies.get('name'));
// Cookies.remove('paymentno');

// function changemonth(event,value)
// {
//     $(thi)
// }



$("[id^=month-]").on('click',function(e)
{
var month =event.target.id.split('-')[1];
var monthdata=$(event.target.data).data(month);
console.log(monthdata);
})


$("#report").click(function() {
    $(".reportlist").toggle();
});

function createnewpayment(e)
{
  
    var i = parseInt(e.target.id.split('-')[1])+1;
    console.log('Pressed');
    if(e.altKey && e.key === "c")
    {
        console.log("EJ");
        $('#totalamount').focus();
    }
    // if(e.keyCode===13)
    // {
    if($(`#accounttype-${i}`).length === 0 && e.keyCode===
        13)
  {
          $('.paymenttable').append(`<tr  class=" extraadded m-0 row text-center">
      <td id="sn" class="col-md-1  ">${i}</td>
      <td   class="col-md-1 p-0"><input list="dctypelist" class="form-control" name="dctype" id="dctype-${i}" type="text" required maxlength="1" oninput="javascript:oninputdctype(event);" />

      <td  class="col-md-4 p-0"><input list="accountnamelist" name="accounttype" id="accounttype-${i}" type="text" class="form-control text-center" disabled required /></td>
      <td  class="col-md-3 p-0"><input onkeypress="javascript:createnewpayment(event)" oninput="javascript:checktotaldc(event);" name="dcamount" id="debit-${i}"  type="number" min="0" class="form-control" required disabled /></td>
      <td   class="col-md-3 p-0"><input onkeypress="javascript:createnewpayment(event)" oninput="javascript:checktotaldc(event);" name="dcamount" id="credit-${i}"  type="number" min="0" class="form-control" required disabled/></td>
     
    </tr>`)
}
}

function checktotaldc(event) {
    // event.preventDefault();
    var credittag = $("[id^=credit]");
    var debitamount = 0;
    var creditamount = 0;
    var debittag = $("[id^=debit]");
    for (var i = 0; i < credittag.length; i++) {
        if (credittag[i].value !== '') {
            console.log(credittag[i].value);
            // debittag[i].value == 0;
            var subcredit = parseInt(credittag[i].value);
            creditamount = creditamount + subcredit;
            console.log(creditamount);

        }
    }

    for (var i = 0; i < debittag.length; i++) {
        if (debittag[i].value !== '') {
            console.log(debittag[i].value);
            // debittag[i].value == 0;
            var subdebit = parseInt(debittag[i].value);
            debitamount = debitamount + subdebit;
            console.log(debitamount);
        }
    }
    $("#totalcredit").text(creditamount);
    $("#totaldebit").text(debitamount);

}

function oninputdctype(event) {
    var targetid = event.target.id.split('-')[1];
    if (event.target.value != 'c' || event.target.value != 'd') {
        $("#debit-" + targetid).attr('disabled', 'disabled');
        $("#accounttype-" + targetid).attr('disabled', 'disabled');
        $("#credit-" + targetid).attr('disabled', 'disabled');
        $("#debit-" + targetid).attr('disabled', 'disabled');
        $("#narration-" + targetid).attr('disabled', 'disabled');
    }
    event.target.value = event.target.value.replace(/[^cd]/, '');
    // targetid=event.target.id.split('-')[1];


    console.log(targetid);
    if (targetid !== 1 && (event.target.value === 'c' || event.target.value === 'd')) {
        var checkprevious = $(`#dctype-${targetid-1}`).val();
        console.log(checkprevious);
        if (checkprevious === 'c') {

            if ($(`#accounttype-${targetid-1}`).val() === '') {
                console.log('error');
                $(`#accounttype-${targetid-1}`).addClass('border-danger');
            } else {
                if ($(`#accounttype-${targetid-1}`).hasClass('border-danger')) {
                    $(`#accounttype-${targetid-1}`).removeClass('border-danger');
                }

            }
            if ($(`#credit-${targetid-1}`).val() === '') {
                $(`#credit-${targetid-1}`).addClass('border-danger');
                checktotaldc('event');

            } else {
                if ($(`#credit-${targetid-1}`).hasClass('border-danger')) {
                    $(`#credit-${targetid-1}`).removeClass('border-danger');
                    checktotaldc('event');

                }
            }
        }
        if (checkprevious === 'd') {


            if ($(`#accounttype-${targetid-1}`).val() === '') {
                console.log('error');
                $(`#accounttype-${targetid-1}`).addClass('border-danger');
            } else {
                if ($(`#accounttype-${targetid-1}`).hasClass('border-danger')) {
                    $(`#accounttype-${targetid-1}`).removeClass('border-danger');
                }

            }
            if ($(`#debit-${targetid-1}`).val() === '') {
                $(`#debit-${targetid-1}`).addClass('border-danger');
                checktotaldc('event');

            } else {
                if ($(`#debit-${targetid-1}`).hasClass('border-danger')) {
                    $(`#debit-${targetid-1}`).removeClass('border-danger');
                    checktotaldc('event');

                }
            }
        }
    }


    if (event.target.value === 'c') {


        $("#debit-" + targetid).attr('disabled', 'disabled');
        $("#accounttype-" + targetid).removeAttr('disabled', 'disabled');
        $("#debit-" + targetid).val('');
        checktotaldc('event');

        $("#credit-" + targetid).removeAttr('disabled', 'disabled');
        // $("#debit-"+targetid).addClass('bg-white');
        $("#narration-" + targetid).removeAttr('disabled', 'disabled');
    }


    if (event.target.value === 'd') {
        if (targetid !== 1) {
            $("#accounttype-" + targetid).removeAttr('disabled', 'disabled');
            $("#narration-" + targetid).removeAttr('disabled', 'disabled');
            checktotaldc('event');

            $("#debit-" + targetid).removeAttr('disabled', 'disabled');
            $("#credit-" + targetid).attr('disabled', 'disabled');
            $("#credit-" + targetid).val('');

            // $("#credit-"+targetid).addClass('bg-white');
        }
    }
}

function createpopup(event) {
    event.preventDefault();
    $("#master").addClass('bg-dark');


}

function keypresshandler(event) {
    event.preventDefault();
    var charCode = event.keyCode;
    // var targetid = event.target.id.split('-');
    // var targetid= targetid[1];
    // console.log(targetid);
    console.log(charCode);
    //Non-numeric character range
    if (charCode === 47 || charCode === 48)
        //   {
        //    if(charCode===47)
        //    {
        //      $("#credit-"+targetid).attr('disabled','disabled');
        //    }
        //    if(charCode===48)
        //    {
        //      $("#credit-"+targetid).attr('disabled','disabled');

        //    }

        // }
        return false;
}


function paymentform() {
    $("#transactiontitle").text('Payment');
        $('#transactionno').text(paymentno);
        $('#dctype-1').focus();

    if ($('.paymentreceiptjournalcontraform').hasClass('d-none')) {
        $('.paymentreceiptjournalcontraform').removeClass('d-none');
    }

    if (!$(".salespurchaseform").hasClass('d-none')) {
        $(".salespurchaseform").addClass('d-none');
         $('#transactionno').text(purchaseno)

    }

}

function receiptform() {
    $("#transactiontitle").text('Receipt');
         $('#transactionno').text(receiptno);
        $('#dctype-1').focus();


    if ($('.paymentreceiptjournalcontraform').hasClass('d-none')) {
        $('.paymentreceiptjournalcontraform').removeClass('d-none');
    }
    if (!$(".salespurchaseform").hasClass('d-none')) {
        $(".salespurchaseform").addClass('d-none');
         $('#transactionno').text(purchaseno)

    }


}

function journalform(event) {
    $("#transactiontitle").text('Journal');
         $('#transactionno').text(journalno)
        $('#dctype-1').focus();

    if ($('.paymentreceiptjournalcontraform').hasClass('d-none')) {
        $('.paymentreceiptjournalcontraform').removeClass('d-none');
    }
    if (!$(".salespurchaseform").hasClass('d-none')) {
        $(".salespurchaseform").addClass('d-none');
         $('#transactionno').text(purchaseno)

    }



}

function contraform(event) {
    $("#transactiontitle").text('Contra');
         $('#transactionno').text(contrano);
        $('#dctype-1').focus();


    if ($('.paymentreceiptjournalcontraform').hasClass('d-none')) {
        $('.paymentreceiptjournalcontraform').removeClass('d-none');
         alert("COntra");
    }
    if (!$(".salespurchaseform").hasClass('d-none')) {
        $(".salespurchaseform").addClass('d-none');
         $('#transactionno').text(purchaseno)

    }
}


function salesform(event) {
    $("#transactiontitle1").text('Sales');
    $('#transactionno1').text(salesno)
        $('#accountname').focus();
    

    if (!$('.paymentreceiptjournalcontraform').hasClass('d-none')) {
        $('.paymentreceiptjournalcontraform').addClass('d-none');
    }
    if ($(".salespurchaseform").hasClass('d-none')) {
        $(".salespurchaseform").removeClass('d-none');


    }

}

function purchaseform(event) {
         $('#transactionno1').text(purchaseno)
        $('#accountname').focus();

    $("#transactiontitle1").text('Purchase');
    if (!$('.paymentreceiptjournalcontraform').hasClass('d-none')) {
        $('.paymentreceiptjournalcontraform').addClass('d-none');
    }
    if ($(".salespurchaseform").hasClass('d-none')) {
        $(".salespurchaseform").removeClass('d-none');
    }
}

// function paymentform() {
//     $("#transactiontitle").text('Payment');
//     if ($('.paymentreceiptjournalcontraform').hasClass('d-none')) {
//         $('.paymentreceiptjournalcontraform').removeClass('d-none');
//     }
//     $("#accountname").focus();
//     if (!$(".salespurchaseform").hasClass('d-none')) {
//         $(".salespurchaseform").addClass('d-none');
//     }

// }

// function receiptform() {
//     $("#transactiontitle").text('Receipt');
//     if ($('.paymentreceiptjournalcontraform').hasClass('d-none')) {
//         $('.paymentreceiptjournalcontraform').removeClass('d-none');

//     }
//     $("#accountname").focus();
//     if (!$(".salespurchaseform").hasClass('d-none')) {
//         $(".salespurchaseform").addClass('d-none');
//     }



// }

// function journalform(event) {
//     $("#transactiontitle").text('Journal');
//     if ($('.paymentreceiptjournalcontraform').hasClass('d-none')) {
//         $('.paymentreceiptjournalcontraform').removeClass('d-none');
//     }
//     if (!$(".salespurchaseform").hasClass('d-none')) {
//         $(".salespurchaseform").addClass('d-none');
//     }



// }

// function contraform(event) {
//     $("#transactiontitle").text('Contra');
//     if ($('.paymentreceiptjournalcontraform').hasClass('d-none')) {
//         $('.paymentreceiptjournalcontraform').removeClass('d-none');
//     }
//     if (!$(".salespurchaseform").hasClass('d-none')) {
//         $(".salespurchaseform").addClass('d-none');
//     }
// }


// function salesform(event) {
//     $("#transactiontitle1").text('Sales');
//     if (!$('.paymentreceiptjournalcontraform').hasClass('d-none')) {
//         $('.paymentreceiptjournalcontraform').addClass('d-none');
//     }
//     $("#accountname").focus();

//     if ($(".salespurchaseform").hasClass('d-none')) {
//         $(".salespurchaseform").removeClass('d-none');
//     }

// }

// function purchaseform(event) {
//     $("#transactiontitle1").text('Purchase');
//     if (!$('.paymentreceiptjournalcontraform').hasClass('d-none')) {
//         $('.paymentreceiptjournalcontraform').addClass('d-none');
//     }
//     $("#accountname").focus();

//     if ($(".salespurchaseform").hasClass('d-none')) {
//         $(".salespurchaseform").removeClass('d-none');
//     }
// }


// function submitdata(event) {
    $('form#paymenttranscation').on('submit',function(e)
    {
    e.preventDefault();

    var paymentform = $("#paymenttranscation").serializeArray();
    console.log($("#paymenttranscation").serializeArray());
    console.log("payment submit is "+paymentform);
    var o = {};
    var op = [];
    var transactiontitle = $("#transactiontitle").text();
    var transactionno= $('#transactionno').text();
    var paymentdate= $('#datemodify').val();
    var narration= $('#narration').val();
    $.each(paymentform, function(i,input) {
    if(!o[input.name])
    {
        o[input.name]=[];
        o['transactiontitle']=[];
        o['transactionno']=[];
        o['paymentdate']=[];
    }
        }
       );


    





     $.each(paymentform, function(i,input) {
 
        if(o[input.name])
        {
           o[input.name].push(input.value);
        }
        else
        { 
           o[input.name]=input.value;
         }
        }
       );


    var lengthofname= o['accounttype'].length;

for(i=0;i<lengthofname;i++)
{
o['transactiontitle'].push(transactiontitle);
o['transactionno'].push(transactionno);
o['paymentdate'].push(paymentdate);
}
console.table(o); 

    // console.log(o);
var count = 0;
var paymentlength = $("[id^=accounttype]:enabled").length;
console.log(paymentlength);
var paymentdetails=[transactiontitle,transactionno,$('#totaldebit').text(),$('#totalcredit').text(),paymentdate,narration];
console.log("Paymentdetails is ["+ paymentdetails+"]");
    console.log(op);
    if (($("#totalcredit").text() === $("#totaldebit").text())) {
        $.ajax({
            type: 'post',
            url: '/updatepaymentsubmit',
            data: { transactiontitle:transactiontitle,transactionno:transactionno,o:o,paymentdetails:paymentdetails},
            async:false,
            error: function(data) {
                // var data=JSON.parse(data);
                alert("Transaction didn't get completed. Please try again.")
                // console.log(data.result);
            },
            success: function(data) {
                console.log(data);

                console.log("payment no is "+contrano);
                        }

        });
    }


    // var a= JSON.stringify(paymentform);
    // console.log(a);
});


$("[id^=credit]").on('keyup', function(event) {
    var value = event.target.value;
    var targetid = event.target.id.split('-')[1];
    // length= value.length;
    if (value > 0) {
        if ($(`#credit-${targetid}`).hasClass('border-danger')) {
            $(`#credit-${targetid}`).removeClass('border-danger')
            checktotaldc('event');

        }
    } else {
        if (!$(`#credit-${targetid}`).hasClass('border-danger')) {
            $(`#credit-${targetid}`).addClass('border-danger');
            checktotaldc('event');

        }
    }
});

function selectaccount(event) {
    console.log("Clicked list");
    console.log(event.which);
    console.log($('li.selected').text());
    $('#accounttype-1').val($('li.selected').text());
    $("#accountlist-1").text('');

}
$("[id^=debit]").on('keyup', function(event) {
    var value = event.target.value;
    var targetid = event.target.id.split('-')[1];
    // length= value.length;
    if (value > 0) {
        if ($(`#debit-${targetid}`).hasClass('border-danger')) {
            $(`#debit-${targetid}`).removeClass('border-danger')
        }
        checktotaldc('event');

    } else {
        if (!$(`#debit-${targetid}`).hasClass('border-danger')) {
            $(`#debit-${targetid}`).addClass('border-danger');
            checktotaldc('event');

        }
    }

})

var gc = $.calendars.instance('nepali', 'ne');
var currentdate = gc.newDate();
var currenttime = new Date();
var currenttime = currenttime.toLocaleTimeString();

$('.dates').append(`<input  id='datemodify' class='ml-1 border-0 d-inline' value=${currentdate}>`);
$('.times').append("<h6 class='timeupdate ml-1 d-inline'>" + currenttime + "</h6>");
$('#datemodify').calendarsPicker({ calendar: $.calendars.instance('nepali'),dateFormat: 'yyyy-mm-dd'});

$('#previousyear').calendarsPicker({ calendar: $.calendars.instance('nepali'),dateFormat: 'yyyy-mm-dd'});


               

const addprice = (event, id) => {
    var items = [{ 'item': 'Momo', 'price': 100 }, { 'item': 'Chicken', 'price': 100 }, { 'item': 'Coffee', 'price': 55 }, { 'item': 'Tea', 'price': 30 }, { 'item': 'Rice', 'price': 250 }, { 'item': 'Chowmein', 'price': 100 }];
    console.log(event.target.textContent);

    var itemselected = event.target.textContent;
    $("#itemlist-" + id).hide();
    $("#itemname-" + id).val(`${itemselected}`);
    for (var i in items) {
        if (items[i]['item'] === itemselected) {
            $("#itemsprice-" + id).val(`${items[i]['price']}`);
        }
    }

}

function submitaccount(event) {
    event.preventDefault();
    var accountdata = $(".accountinformations").serializeArray();
    console.log(accountdata);
    formobj=[];
    alert("Entered");

    
    // var inputs = $('#'+formId).serializeArray();
    $.each(accountdata, function (i, input) {
        formobj.push(input.value);
    });
 

    var previousyeardate = $("#previousyear").val().split('-');
   
    console.log(formobj);
    $.ajax({
        type: 'post',
        url: '/accountsubmit',
        data: { formobj:formobj },
        async:false,
        success: function(data) {
            console.log(data.result);
            $('datalist#accountnamelist').append(`<option>${formobj[0]}</option>`);
            $("#closecreateaccount").click();
        },
        error:function(data)
        {
            alert("Accountname already in the list");
        }
    });


}

function handle(el) {
    $('ul').scrollTop(60);
    $('ul').animate({ scrollTop: el.position().top });
}


$(document).on('keyup', 'form#paymenttranscation input', function(e) {
    e.preventDefault();
  var self = $(this),
      form = self.parents('form:eq(0)'),
      focusable, next, prev;
  console.log("PRessed n");

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
      } else
  if (e.keyCode == 13) {
      e.preventDefault();
    //   $('[id^=accountlist]').html('');

      focusable = form.find('input,a,select,button,textarea').filter(':enabled');
      next = focusable.eq(focusable.index(this) + 1);
      if (next.length) {
          next.focus();
      } else {
          form.submit();
      }
      return false;
  }
});

$('.accountinformations').on('keydown', 'input', function(e) {
      e.preventDefault();

    var self = $(this),
        form = self.parents('form:eq(0)'),
        focusable, next, prev;


        if (e.keyCode === 8) {

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
        }else
    if (e.keyCode === 13) {
        e.preventDefault();
        // $('[id^=accountlist]').html('');

        focusable = form.find('input,a,select,button,textarea').filter(':enabled');
        next = focusable.eq(focusable.index(this) + 1);
        if (next.length) {
            next.focus();
        } else {
            form.submit();
        }
        return false;
    }
});

$('#newaccount').on('click', function(e) {
    e.preventDefault();

});


$('#myModal').on('shown.bs.modal', function() {
    console.log("Entered");
    $(this).find('[autofocus]').focus();
});

// Form control on enter
$('.contraform').on('keydown', 'input', function(e) {

    var self = $(this),
        form = self.parents('form:eq(0)'),
        focusable, next, prev;

    if (e.shiftKey) {
        if (e.keyCode == 13) {

            focusable = form.find('input,a,select,button,textarea').filter(':enabled');
            prev = focusable.eq(focusable.index(this) - 1);

            if (prev.length) {
                prev.focus();
            } else {
                form.submit();
            }
        }
    } else
    if (e.keyCode == 13) {
        // e.preventDefault();
        // $('[id^=accountlist]').html('');



        focusable = form.find('input,a,select,button,textarea').filter(':enabled');
        next = focusable.eq(focusable.index(this) + 1);
        console.log(next);

        if (next.length) {
            next.focus();
            next.select();
        } else {
            form.submit();
        }
        return false;
    }
});

function submitcontra(event) {
    event.preventDefault();
    var contradata = $('.contraform').serializeArray();
    var contrafinaldata = [];
    for (var i = 0; i < 3; i++) {
        contrafinaldata.push(contradata[i]['value']);
    }
    console.log(contrafinaldata);
    $.ajax({
        type: 'post',
        url: 'submitcontra',
        data: { contrafinaldata },
        success: function(data) {
            console.log("Inserted Successfully");
        }
    });
}

$('#contraentry').on('shown.bs.modal', function(e) {
    e.preventDefault();
    console.log("Entered");
    $(this).find('[autofocus]').focus();
});

function changeaccounttype(event) {
    var value = event.target.value;
    console.log(value);
    if (value > 0 && value < 4) {
        $("#accountnodiv").show();
        $("#accountno").removeAttr('disabled', 'disabled');
    } else {
        $("#accountnodiv").hide();
        $("#accountno").attr('disabled', 'disabled');
    }
}
// var currentDate = new Date();
// var currentNepaliDate = calendarFunctions.getBsDateByAdDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
// var formatedNepaliDate = calendarFunctions.bsDateFormat("%y-%m-%d", currentNepaliDate.bsYear, currentNepaliDate.bsMonth, currentNepaliDate.bsDate);



// $("#previousyear").nepaliDatePicker({
//     dateFormat: "%y-%m-%d",
//     closeOnDateSelect: true,
//     minDate: "२०७०-१-२०",
//     maxDate: formatedNepaliDate
// });







$("#clear-bth").on("click", function(event) {


    $(".bod-picker").val('');

});