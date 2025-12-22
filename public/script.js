function do_something(){
    window.location.href = "https://iyiiquiz.netlify.app/";
}
function do_another_thing(){
    window.location.href = "https://iyiiweather.netlify.app/";
}
function do_another_thingg(){
    window.location.href = "https://iyiicalc.netlify.app/";
}
function go_to_whatsapp(){
    window.location.href = "https://wa.me/2347078226362";
}
function go_to_github(){
    window.location.href = "https://wa.me/2348053474133";
}
function go_to_tiktok(){
    window.location.href = "https://tiktok.com/@iyii_iyiii";
}
function what_the_fuck(){
    let name_d = document.getElementById('name_element').value;
    let email_d = document.getElementById('email_element').value;
    let request_d = document.getElementById('request_element').value;
    let error_message = document.getElementById('error_message');

    if (!name_d) {
        error_message.innerHTML = 'Please let us know your name';
        return false
    }else if(name_d.length > 50){
        error_message.innerHTML = 'Your name is too long';
        return false
    }
    else if (!email_d) {
        error_message.innerHTML = 'Input your email';
        return false
    }else if (!email_d.includes('@')) {
        error_message.innerHTML = 'Please enter a valid email';
        return false
    }else if (!request_d) {
        error_message.innerHTML = 'Please submit a request or a demand';
        return false
    }else if(request_d.length < 20){
        error_message.innerHTML = "Your request is too short";
        return false
    }else if(request_d.length > 2000){
        error_message.innerHTML = "Your request body is greater than 2000 characters";
        return false
    }else{
        window.alert("Your request has been received and we will get back to you through your email or through any phone numbers you have provided in the request body")
        return true;
    }
}
// All rights reserved Iyii Inc