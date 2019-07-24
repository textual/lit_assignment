public with sharing class dcm_LawCaseContact_Controller {
    @AuraEnabled
    public static List<Case_Contact__c> getLawCaseContacts(String strLawCaseId){
        List<Case_Contact__c> contacts = [SELECT Id, Name, Contact__c, Contact__r.Name, Contact__r.Account.Name, Contact_Role__c FROM Case_Contact__c WHERE Law_Case__c = :strLawCaseId];
        return contacts;
    }

    @AuraEnabled
    public static void deleteCaseContactRecord(String strCaseContactId){
        delete [SELECT Id FROM Case_Contact__c WHERE Id = :strCaseContactId];
    }

}
