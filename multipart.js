function multipartFormData (parts) {

  /*
    parts = {
      to: 'steve@apply.com',
      from: 'Bill Gates <bill@microsoft.com>',
      subject: 'How are you?',
      attachment: {
        contentType: 'text/calendar',
        filename: 'CoffeeDate.ics',
        value: IcsData
      }
    }
  }
  */

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