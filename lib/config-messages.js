exports.menu = {
  "contents":[
    { "type": "paragraph", "text": "Welcome to the Ninja Neurio monitor"},
    { "type": "paragraph", "text": "You can choose how often you want the data to be updated (in seconds). \n\rThe default value is 10 seconds."},
    { "type": "input_field_text", "field_name": "poll_interval", "value": "10", "label": "Update Interval", "required": true},
    { "type": "input_field_text", "field_name": "ClientID", "value": "10", "label": "Client ID", "required": true},
    { "type": "input_field_text", "field_name": "ClientSecret", "value": "10", "label": "Client Secret", "required": true},
    { "type": "submit", "name": "Save", "rpc_method": "echo" },
  ]
};

exports.echo = {
  "contents":[
    { "type": "paragraph", "text": "Settings saved!" }
  ]
};
