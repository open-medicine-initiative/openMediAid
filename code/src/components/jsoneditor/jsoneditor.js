define( [
    "knockout",
    "text!./jsoneditor.html",
    "pipeline",
    "assembly",
    "lodash",
    "editor.Node"], function ( ko, template, Pipeline, assembly, _, Node ) {

    function JsonEditor ( route ) {
        this.nodes = ko.observableArray( parse( [
            { id : 1, icon : "../../images/mailIcon.png", label : "Mail", expanded : true, items : [11, 12]},
            { id : 11, icon : "../../images/calendarIcon.png", label : "Calendar" },
            { id : 12, icon : "../../images/contactsIcon.png", label : "Contacts", selected : true },
            { id : 2, icon : "../../images/folder.png", label : "Inbox", expanded : true, items : [21, 22, 23, 24]},
            { id : 21, icon : "../../images/folder.png", label : "Admin" },
            { id : 22, icon : "../../images/folder.png", label : "Corporate" },
            { id : 23, icon : "../../images/folder.png", label : "Finance" },
            { id : 24, icon : "../../images/folder.png", label : "Other" },
            { id : 3, icon : "../../images/recycle.png", label : "Deleted Items" },
            { id : 4, icon : "../../images/notesIcon.png", label : "Notes" }
        ] ) );
    }

    function parse ( nodes ) {
        var nodesById = new assembly.Indexer(),
            childsByParentId = new assembly.Indexer( {target : function ( node ) {
                return node.items;
            }} ),
            nodeAssembly = new Pipeline()
                .stage( childsByParentId.asStage() )
                .stage( function ( src ) { return new Node( src );} )
                .stage( nodesById.asStage() );
        var parsed = nodeAssembly.consumeAll( nodes );
        listToTree( parsed,
            function ( node ) {
                return _( childsByParentId.index[node.id] )
                    .map( function ( nodeId ) {
                        return nodesById.index[nodeId];
                    } )
                    .valueOf();
            }, function ( node, elements ) {
                _( elements ).each( function ( element ) {
                    node.nodes.push( element );
                } );
            } );
        return parsed;
    }

    function listToTree ( elements, getChildren, setChildren ) {
        _( elements ).each( function ( element ) {
            setChildren( element, getChildren( element ) );
        } );
    }

    return { viewModel : JsonEditor, template : template };

} );
