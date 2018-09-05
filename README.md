## Description
A small package for converting json to html email no matter how deeply nested the objects are. There are a few styling options you can apply.

Fork of https://www.npmjs.com/package/json-make-html designed and styled to be HTML email content:
    

## Installation

    npm install -S json-make-html-email

## Quick Start

 There is only 1 endpoint in this package:

    Convert your JSON object to HTML
    make(json,args,function(html){});

## Usage:

    const jsonMakeHTML = require('json-make-html-email');
    const html = jsonMakeHTML.make(json,args, function(html){});
    
    Note: The callback function is optional. The make method with return the html or pass it through the callback.


## Returns

   Your JSON object in HTML form according to the options you specified.
   
   
## Options

    var args = {
            separator : ': ',
            iterator : 1,
            wrapper : {
                before : '',
                class : 'jsonhtml',
                elem : 'ul',
                after : ''
            },
            child : {
                before : '',
                class : 'jsonhtml__singlechild',
                elem : 'li',
                titleClass : 'jsonhtml__parent',
                titleElem : 'h3',
                after : ''
            },
            css :{
                title : 'margin: 9px 0 0;color:#BA584C;',
                wrapperElem : '',
                childElem : 'list-style-type:none;',
                childElemNested : 'margin-left: 18px;'
            }
    
        };


## License

MIT
