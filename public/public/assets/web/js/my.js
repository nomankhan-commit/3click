/**
 * Created by Salim on 3/5/2018.
 */


var ssl_d_weekday = new Array(7);
ssl_d_weekday[0] =  "Sunday";
ssl_d_weekday[1] = "Monday";
ssl_d_weekday[2] = "Tuesday";
ssl_d_weekday[3] = "Wednesday";
ssl_d_weekday[4] = "Thursday";
ssl_d_weekday[5] = "Friday";
ssl_d_weekday[6] = "Saturday";

var ssl_d_month = new Array();
ssl_d_month[0] = "January";
ssl_d_month[1] = "February";
ssl_d_month[2] = "March";
ssl_d_month[3] = "April";
ssl_d_month[4] = "May";
ssl_d_month[5] = "June";
ssl_d_month[6] = "July";
ssl_d_month[7] = "August";
ssl_d_month[8] = "September";
ssl_d_month[9] = "October";
ssl_d_month[10] = "November";
ssl_d_month[11] = "December";

var ssl_d_month_shot = new Array();
ssl_d_month_shot[0] = "Jan";
ssl_d_month_shot[1] = "Feb";
ssl_d_month_shot[2] = "Mar";
ssl_d_month_shot[3] = "Apr";
ssl_d_month_shot[4] = "May";
ssl_d_month_shot[5] = "Jun";
ssl_d_month_shot[6] = "Jul";
ssl_d_month_shot[7] = "Aug";
ssl_d_month_shot[8] = "Sep";
ssl_d_month_shot[9] = "Oct";
ssl_d_month_shot[10] = "Nov";
ssl_d_month_shot[11] = "Dec";


function submit_data(
    btn,
    header_,
    form_id,
    data_array,
    url,
    modal_id,
    web_url,
    resst_true,
    function_call,
    html_ref,
    notify,
    r_respon,
    async_status,
    xfomr_urlencoded_status){
    
       
    if(btn != ''){

        $(btn).attr("disabled", true);
        //  console.log(btn);
    }

    // console.log(btn);


    if(r_respon === undefined) {
        r_respon = false;
    }

    if(async_status === undefined) {
        async_status = false;
    }

    if(xfomr_urlencoded_status === undefined) {
        xfomr_urlencoded_status = false;
    }

   
    
    if(xfomr_urlencoded_status){

        header_ = {
             'Content-Type': 'application/x-www-form-urlencoded',
        }
       
    }
    

    var response_data;

    if(form_id!=""){

        var myForm = $("#"+form_id);
        /*document.getElementById(form_id);*/

        var validator = $(myForm).validate();

        if($(myForm).valid() == false){

            if(btn != ''){
                $(btn).removeAttr("disabled");
            }
            validator.focusInvalid();
            return;
        }

        if(xfomr_urlencoded_status){
            var data = $(myForm).serialize();

        }else{
            var tem_f = document.getElementById(form_id);
            var data = new FormData(tem_f);

        }
           
      
    

    }else{

        if(xfomr_urlencoded_status){
            var data = $(myForm).serialize();

        }else{
            var  data = new FormData();
            $(data_array).each(function (i) {
                $tem_data = data_array[i].split("|");
                data.append($tem_data[0],$tem_data[1]);
            });
        }

    }

    // $('#loader-wrapper').addClass("show_loader");



    $.ajax({
        type: 'POST',
        headers: header_,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json',        
        // enctype: 'multipart/form-data',
        url: url,
        data: data,
        async: async_status,
        success: function (response) {

            $('#loader-wrapper').removeClass("show_loader");

            if (response.status == true) {

                if(modal_id != ""){

                    $("#"+modal_id).modal();

                }

                if(notify==true){

                   
                    suss_modal(response.message,web_url);


                }else{

                    if(web_url != ""){



                        window.location.href = web_url;

                    }

                }



                if(resst_true ==true){

                   var tem_f = document.getElementById(form_id);
                   tem_f.reset();
                }



                if(function_call != ""){
                    window[function_call](response,html_ref);

                }

                if(r_respon == true){

                    response_data  = response;
                }

                if(btn != ''){

                    $(btn).removeAttr("disabled");
        
                }

            } else {


               /* Lobibox.notify('error', {
                    title: 'Error',
                    msg: response.message
                });*/

                error_modal(response.message);
                if(btn != ''){
                    $(btn).removeAttr("disabled");
                }

            }





        }, error: function () {

        }


    });

   
    if(r_respon == true){
       
        return response_data;
    }

}

function error_modal(message_) {

    $.toast({
        heading: 'Error',
        text: message_,
        position: 'top-right',
        icon: 'error',
        stack: false
      });
   


}
function suss_modal(message_,href_) {


    $.toast({
        heading: 'Success',
        text: message_,
        position: 'top-right',
        icon: 'success',
        stack: false
      });


}


function isInArray(value, array) {
    return array.indexOf(value) > -1;
}