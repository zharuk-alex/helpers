// convert json inner html to object

$.ajax({
  url: "some.php",
  dataType: "html",
  data: {q: "q"},
  type: "POST",
  success: function(json) {
    var json_data_obj;
    $.parseHTML(json).map(function(item, index) {
      try {
        json_data_obj = ($.parseJSON($.parseHTML(json)[index].textContent));
      } catch (e) {
        // console.log(e);  error
      }
    });
    $(json).appendTo(container);
    switch (json_data_obj['type']) {
      case 'data':  myfunc(json_data_obj, container); break;
    }
  }
});
// convert json inner html to object END
// ajax chain
var req_serials = [];
var qwery = [1,2,3,4];
function ajaxReq(q){
  return $.ajax({
    url: "some.php",
    dataType: "html",
    data: {q: "q"},
    type: "POST",
    success: function(json) {
      console.log('ok');
    }
  });
}
qwery.map(function(item){
  req_serials.push(function(){return ajaxReq(item)});
})

if(req_serials.length > 0){
	req_serials.reduce(function(previousValue, currentValue, index, array){
		return previousValue.then(currentValue);
	},$.when());
}
// ajax chain END
