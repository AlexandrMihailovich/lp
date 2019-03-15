import './scss/base.scss';

import "bootstrap-sass/assets/javascripts/bootstrap/transition.js";
import "bootstrap-sass/assets/javascripts/bootstrap/modal.js";

import './js/owl/dist/owl.carousel';
import './js/owl/dist/assets/owl.carousel.css';
import './js/owl/dist/assets/owl.theme.default.css';

import './js/scrollto/jquery.scrollTo';


$(document).ready(function(){
    $('.brand-carousel').owlCarousel({
        loop:true,
        margin:85,
        nav:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    });


    $('.client-carousel').owlCarousel({
        loop:true,
        margin:85,
        nav:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    });

    /*$('#contact').waypoint(function() {
        alert("Waypoint reached.");
    });*/

    $('#toContact').click(function (event) {
        $.scrollTo(
        $(this).attr("href"),
        {
            duration: 200,
            offset: { 'left':0, 'top':-0.15*$(window).height() }
        });
        return false
    });


    $("#inputName").change(function () {
        var el_l    = $("#inputName");
        if ( el_l.val().length < 4 ) {
            $("#inputName").parent('div').addClass('has-error');
            $('#submitForm').attr("disabled", true);
        } else {
            $("#inputName").parent().removeClass('has-error');
            $('#submitForm').removeAttr("disabled");
        }
    });

    $("#trynow_form").submit(function(e) {

        function validation() {
            var message = '';

            var success = false;

            var el_l    = $("#inputName");
            if ( el_l.val().length < 4 ) {
                success = true;
                message += 'Name < 3.<br>'
                $("#inputName").parent('div').addClass('has-error');
            } else {
                $("#inputName").parent().removeClass('has-error');
            }


            var reg     = /^\w+([\.-]?\w+)*@(((([a-z0-9]{2,})|([a-z0-9][-][a-z0-9]+))[\.][a-z0-9])|([a-z0-9]+[-]?))+[a-z0-9]+\.([a-z]{2}|(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum))$/i;
            var el_e    = $("#inputEmail");
            var v_email = el_e.val() ? false : true;

            if ( v_email ) {
                success = true;
                message += 'Email == false. <br>'
                $("#inputEmail").parent('div').addClass('has-error');
            } else if ( !reg.test( el_e.val() ) ) {
                success = true;
                message += 'Email not correct. <br>'
                $("#inputEmail").parent('div').addClass('has-error');
            } else {
                $("#inputEmail").parent().removeClass('has-error');
            }



            $('#error-modal .modal-body').html(message);

            return success;
        }

        if (validation()) {
            $('#error-modal').modal();
            return false;
        }


        var url = "send.php"; // the script where you handle the form input.

        $.ajax({
            type: "POST",
            url: url,
            data: $("#trynow_form").serialize(), // serializes the form's elements.
            success: function(data)
            {
                $('#my-modal .modal-body').html(data);
                $('#my-modal').modal();
            },
            error:  function(xhr, str){
                alert('error: ' + xhr.responseCode);
            }
        });

        e.preventDefault(); // avoid to execute the actual submit of the form.
    });

});