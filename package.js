Package.describe({
  summary: "Create a multipart/form-data encoded string. Useful for sending attachments with Mailgun."
});

Package.on_use(function(api, where) {
  api.add_files('multipart.js', 'server');
  api.export('MultipartFormData', 'server');
});