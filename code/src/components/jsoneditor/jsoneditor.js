define(["knockout", "text!./treeview.html"], function (ko, template) {

    function JsonEditor(route) {
        this.nodes = [
            {
                icon: "../../images/mailIcon.png", label: "Mail", expanded: true, items: [
                { icon: "../../images/calendarIcon.png", label: "Calendar" },
                { icon: "../../images/contactsIcon.png", label: "Contacts", selected: true }
            ]
            },
            {
                icon: "../../images/folder.png", label: "Inbox", expanded: true, items: [
                { icon: "../../images/folder.png", label: "Admin" },
                { icon: "../../images/folder.png", label: "Corporate" },
                { icon: "../../images/folder.png", label: "Finance" },
                { icon: "../../images/folder.png", label: "Other" },
            ]
            },
            { icon: "../../images/recycle.png", label: "Deleted Items" },
            { icon: "../../images/notesIcon.png", label: "Notes" },
            { iconsize: 14, icon: "../../images/settings.png", label: "Settings" },
            { icon: "../../images/favorites.png", label: "Favorites" }
        ];
    }

    return { viewModel: JsonEditor, template: template };

});
