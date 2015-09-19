
var html = '';

/**
 * Kickoff the build
 * @param data
 * @param cb
 * @private
 */

module.exports = function buildHTML(data,args,cb){
    if(typeof cb == 'undefined'){var cb = function(){};};
    var args = args || {};
    var data = JSON.parse(data);

    var extend = require('util')._extend;

    var defaults = {
        object : data,
        isNest : false,
        separator : ': ',
        iterator : 1,
        html : '',
        wrapper : {
            before : '',
            class : 'jsonMakeHTML',
            elem : 'ul',
            after : ''
        },
        child : {
            before : '',
            class : 'jsonMakeHTML__child',
            elem : 'li',
            titleClass : 'jsonMakeHTML__parent',
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

    var args = extend(defaults, args);

    html = '<' + args.wrapper.elem + ' class="' + args.wrapper.class + '">';
    html += _constructNested(args);
    html += '</' + args.wrapper.elem + '>';

    cb(html);
    return html;
}

function _constructNested(args){
    var args = args || {}, count = 1;

    // Keep count of nesting levels
    if(typeof args.iterator !== 'undefined'){
        count += args.iterator;
    }

    // Loop through argument object
    for(var key in args.object){

        // Check if object value is itself an object
        if(typeof args.object[key] == 'object'){

            //Build nested layer title
            html += '<' + args.child.elem + ' style="' + args.css.childElem + '" class="' + args.child.titleClass + '--' + count + '--title">';
            html += '<' + args.child.titleElem + ' style="' + args.css.title + '">'+ key +'</' + args.child.titleElem + '>';
            html += '</' + args.child.elem + '>';

            // Update args
            var nestedArgs = {
                object : args.object[key],
                isNest : true,
                separator : args.separator,
                iterator : count,
                wrapper : {
                    before : args.wrapper.before,
                    class : args.wrapper.class,
                    elem : args.wrapper.elem,
                    after : args.wrapper.after
                },
                child : {
                    before : args.child.before,
                    class : args.child.class,
                    elem : args.child.elem,
                    titleClass : args.child.titleClass,
                    titleElem : args.child.titleElem,
                    after : args.child.after
                },
                css :{
                    title : args.css.title,
                    wrapperElem : args.css.wrapperElem,
                    childElem : args.css.childElem,
                    childElemNested : args.css.childElemNested
                }
            };

            // Recursive call to self to build new nest
            _constructNested(nestedArgs);

        }else{// value is not an object
            //determine if key is an array index val
            var isArray = !isNaN(key);

            // Handle nested and non-nested lis
            html += args.child.before;
            if(args.isNest){
                html += '<' + args.child.elem + ' style="' + args.css.childElem + args.css.childElemNested + '" class="' + args.child.nestedClass + '--' + count + '">';
                html+= isArray ? '' : '<span>'+ key +'</span>' + args.separator;
                html+= '<span>'+ args.object[key] +'</span>';
                html+= '</' + args.child.elem + '>';
            }else{
                html += '<' + args.child.elem + ' style="' + args.css.childElem + '" class="' + args.child.class + '--' + count + '">';
                html+= isArray ? '' : '<span>'+ key +'</span>' + args.separator;
                html+= '<span>'+ args.object[key] +'</span>';
                html+= '</' + args.child.elem + '>';
            }
            html += args.child.after;
        }
    }

    return html;
}
