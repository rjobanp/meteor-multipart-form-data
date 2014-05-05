function multipartFormData (parts) {
  var boundary = '----'+(new Date()).getTime();
  var bodyString = [];

  _.each(parts, function(value, name, blah) {

    if ( name === 'attachment' ) {
      bodyString.push(
        '--' + boundary,
        'Content-Disposition: form-data; name="' + name + '";'
        + 'filename="' + value.filename + '"',
        'Content-type: ' + value.contentType,
        '',
        value.value);
    } else {
      bodyString.push(
        '--' + boundary,
        'Content-Disposition: form-data; name="' + name + '"', 
        '',
        value);
    }
    
  });

  bodyString.push('--' + boundary + '--','');

  return {
    content: bodyString.join('\r\n'),
    headers: {
      'Content-Type': 'multipart/form-data; boundary='+boundary
    }
  }

}


MultipartFormData = multipartFormData;