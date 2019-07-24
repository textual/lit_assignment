({
    loadCaseContacts: function (component) {
        var lawCaseId = component.get('v.recordId');
        var action = component.get('c.getLawCaseContacts');
        action.setParams({ strLawCaseId: lawCaseId });
        action.setCallback(this, function (result) {
            var data = result.getReturnValue();
            this.processData(component, data);
        });
        $A.enqueueAction(action);
    },

    setGridColumns: function (component) {
        var buttonColumnWidth = 75;
        var columns = [
            {
                type: 'text',
                fieldName: 'label',
                label: 'Role/Name',
                initialWidth: 200
            },
            {
                type: 'text',
                fieldName: 'account',
                label: 'Account',
                initialWidth: 220
            },
            {
                initialWidth: buttonColumnWidth,
                type: 'button',
                typeAttributes: {
                    name: 'delete',
                    iconName: { fieldName: 'iconName'},
                    iconPosition: 'center',
                    variant: 'neutral',
                    disabled: { fieldName: 'isRole'}
                }

            }
        ];
        component.set("v.gridColumns", columns);

    },
    processData: function (component, contactData) {
        var contactItems = [];
        var expandedRows = [];
        for (var item in contactData) {
            var thing = contactData[item];
            var result = {};
            result = contactItems.find(obj => {
                return obj.name === thing.Contact_Role__c
            })
            if(result == undefined) {
                console.log('create an entry');
                result = { label : thing.Contact_Role__c , name : thing.Contact_Role__c, _children : [] , isRole : "true"};
                contactItems.push(result);
                expandedRows.push(thing.Contact_Role__c);
            }
            result._children.push({ account: thing.Contact__r.Account.Name, label : thing.Contact__r.Name , name : thing.Id, iconName : 'action:delete'});
            
        }
        component.set("v.items", contactItems);
        component.set("v.expandedRows", expandedRows);
    },
    closeModal: function (component) {
        component.set("v.showAddFormModal", false);
        component.set("v.showEditFormModal", false);
    },
    deleteRow: function(component, rowId){
        var action = component.get('c.deleteCaseContactRecord');
        action.setParams({ strCaseContactId: rowId });
        action.setCallback(this, function (result) {
            this.loadCaseContacts(component);
        });
        $A.enqueueAction(action);
    }
})
