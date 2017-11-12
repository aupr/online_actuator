//alert('hello');

$(function(){
    $.ajaxSetup({ cache: false });

    LoginPLC('admin', "");
    //alert('ready');
    syncData();
});

var setActuator = function(number, binVal) {

    //url="IOtriangleWave.htm";
    //name = plcTag;//'"webdata".triangleWave';
    //val = binVal;//$('input[id=setvar]').val();
    sdata = escape('"actuator'+number+'"')+'='+binVal;

    $.get('data.html', sdata, function(res) {
        deviceData = JSON.parse(res);
        setStatus(deviceData);
        //alert("ok");
    }).fail(function() {
        alert('Remote communication Error!');
    });
};

var firstHit = true;

var deviceData = {};

var displayControl = function(id, property) {
    $('#'+id).css({display: property});
};

var syncData = function(){
    $.get('data.html', {}, function(res){
        deviceData = JSON.parse(res);
        setStatus(deviceData);
        //console.log(dt);
        /*if(firstHit === true) {
            displayControl('cred', 'block');
            firstHit = false;
        } */
        if(credential === deviceData.system_data) {
            displayControl('cred','none');
            displayControl('scp','block');
        } else {
            displayControl('cred','block');
            displayControl('scp','none');
        }
        setTimeout(function(){
            syncData();
        }, 1000);
    }).fail(function(){
        alert("Something going wrong!");
    });
};

var setStatus = function(val) {
    statusSetter('status01', val.actuator01);
    statusSetter('status02', val.actuator02);
    statusSetter('status03', val.actuator03);
    statusSetter('status04', val.actuator04);
    statusSetter('status05', val.actuator05);
    statusSetter('status06', val.actuator06);
    statusSetter('status07', val.actuator07);
    statusSetter('status08', val.actuator08);
    statusSetter('status09', val.actuator09);
    statusSetter('status10', val.actuator10);
};

var statusSetter = function(id, value) {
    $("#"+id).text(getOnOffText(value));
};

var getOnOffText = function(val) {
    if(val === '0') return 'OFF';
    else return 'ON';
};

var credential = "";

var setCredential = function() {
    credential = $("#credential").val();
    if(credential === deviceData.system_data) {
        displayControl('cred','none');
        displayControl('scp','block');
    } else {
        displayControl('icred', 'block');
        setTimeout(function(){
            displayControl('icred', 'none');
        }, 3000);
    }
};

var destroyCred = function() {
    credential = "";
};

var LoginPLC = function(userid, password){
    //Auto login
    var spost = 'Login='+userid+'&Password='+password;
    var bk = $.post("/FormLogin", spost, function(result) {
        console.log("Access & Login PLC: Success");
    });
    bk.fail(function(){
        console.log("Access & Login PLC: Failed! Retry...");
        setTimeout(function(){
            LoginPLC(userid, password);
        }, 5000);
    });
};

$("#changeCred").click(function(){
    window.location.href = 'password.html';
});