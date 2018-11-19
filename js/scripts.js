$(function(){
  console.log('scripts loaded');

function loop5(){
  var myKey = config.MY_KEY;
  var url = 'http://api.open-notify.org/iss-now.json';
  var url2 = '';
  var data = [];
  var geocodeData = [];
  var lat = '';
  var long = '';
  var html = '';



  $.ajax({
    type:'GET',
    url: url,
    dataType:'json',
    async: true,
    data: data,
    success:function(data){
      console.log(data);
      lat= data.iss_position.latitude
      long = data.iss_position.longitude
      console.log(lat +' '+ long);
      url2 = ' https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + long;
      $.ajax({
        type:'GET',
        url: url2,
        dataType:'json',
        async: true,
        data: geocodeData,
        success:function loop5(geocodeData){
          console.log(geocodeData);

          if( url2=geocodeData.error){
            html+='<p> The spacestation is currently over the ocean!</p>'
          }
          else{
          html+= '<div>'
          html+= '<p> The spacestation is currently over ' + geocodeData.address.state + ', ' + geocodeData.address.country + '</p>'
          html+= '</div>'

        };
        $('#results').html(html);

        } //success


      }); //second ajax request

    }
  }); //ajax request

}


loop5();
setInterval(function(){
loop5()
}, 5000);


}); //wrapper
