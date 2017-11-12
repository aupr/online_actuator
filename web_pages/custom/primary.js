
$(function(){

});

$('#backButton').click(function(){
    window.location.href = 'index.html';
});

var setNewCredential = function() {

    $.get('data.html', function(resp){
        if( resp.system_data === $('#oldCredential').val() ) {

            sdata = escape('"system".data')+'='+$('#newCredential').val();
            $.get('data.html', sdata, function(res){
                if(res.system_data === $('#newCredential').val()) {
                    displayControl('successCrdc', 'block');
                    displayControl('oicred', 'none');
                } else {
                    alert('Something absurt!');
                }
            }, 'JSON').fail(function(){
                alert('Something is going wrong!');
            });
        } else {
            displayControl('successCrdc', 'none');
            displayControl('oicred', 'block');
            setInterval(function(){
                displayControl('oicred', 'none');
            }, 3000);
        }
    }, 'JSON').fail(function(){
        alert('data communication error!');
    });
};

var displayControl = function(id, property) {
    $('#'+id).css({display: property});
};