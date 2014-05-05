[![LICENSE](http://img.shields.io/badge/LICENSE-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# meteor-multipart-form-data

Create a multipart/form-data encoded string. Useful for sending attachments with Mailgun.

## API

```javascript
  // Call MultipartFormData() anywhere in your server code

  /*
    Structure of 'parts' parameter
    --- Can take any key-value pair required by email API
    --- 'attachment' key should include object using options below. Will be treated separately to send file data appropriately
  */

  parts = {
    to: 'steve@apple.com',
    from: 'Bill Gates <bill@microsoft.com>',
    subject: 'How are you?',
    attachment: {
      contentType: 'text/calendar',
      filename: 'CoffeeDate.ics',
      value: IcsData
    }
  }

  var formatted = MultipartFormData(parts);

  // MultipartFormData returns headers and content
  var headers = formatted.headers;
  var content = formatted.content;

```

## Example Usage

```javascript
  /*
    Sending through Mailgun. Using Mailgun 'recipient variables' and attachment 
  */

  var parts = {
    from: 'test@meteor.com',
    to: ['jony@apple.com', 'steve@microsoft.com'],
    'h:Reply-To': 'fred@meteor.com',
    subject: subject,
    html: '<p>How is everything going %recipient.name%?</p><p>Your friend,<br>Steve</p>',
    'recipient-variables': JSON.stringify({
      'jony@apple.com': {
        name: 'Jony'
      },
      'steve@microsoft.com': {
        name: 'Steve'
      }
    }),
    'o:tag': 'Personal Message',
    attachment: {
      contentType: 'text/csv',
      name: 'spreadsheet1.csv',
      value: CsvData.generate() // fake function to generate csv data
    }
  };

  var formData = MultipartFormData(parts);

  HTTP.call(
    'POST',
    'https://api.mailgun.net/v2/yourdomain.com/messages',
    {
      auth: 'api:key-***************************',
      content: formData.content,
      headers: formData.headers
    },
    function (error, result) {
      if (error) {
        console.log(error, 'Error sending email.');
      }
    }
  );
```