({
    init : function(component, event, helper) {
        helper.setGridColumns(component);
		helper.loadCaseContacts(component);
    },
    handleNewContact: function(component, event, helper){
        component.set('v.showAddFormModal', true);
    },
    handleNewContactSubmit: function(component, event, helper){
        var caseId = component.get("v.recordId");
        event.preventDefault(); // stop form submission
        var eventFields = event.getParam("fields");
        eventFields["Law_Case__c"] = caseId;
        component.find("newCaseContactForm").submit(eventFields);
    },
    handleNewContactSuccess: function(component, event, helper){
        helper.loadCaseContacts(component);
        helper.closeModal(component);
    },
    handleRowAction : function(component, event, helper){
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'delete':
                if(confirm('Do you want to remove this contact from this case?')){
                    helper.deleteRow(component, row.name);
                }
                break;
        }
    },
    closeModal : function(component, event, helper){
        helper.closeModal(component);

    },
})
