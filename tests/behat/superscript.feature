@editor @editor_ousupsub @_bug_phantomjs
Feature: ousupsub superscript button
  To format text in ousupsub, I need to use the superscript button.

  @javascript
  Scenario: Subscript some text
    Given I am on the integrated "sup" editor test page
    And I set the field "Input" to "Helicopter"
    And I select the text in the "Input" ousupsub editor
    When I click on "Superscript" "button"
    Then I should see "<sup>Helicopter</sup>" in the "Input" ousupsub editor

    # Apply superscript inside existing superscript 
    When I select the range "'sup',2,'sup',5" in the "Input" ousupsub editor
    And I click on "Superscript" "button"
    #And I pause
    Then I should see "<sup>He</sup>lic<sup>opter</sup>" in the "Input" ousupsub editor
    
    # Revert superscript 
    And I click on "Superscript" "button"
    Then I should see "<sup>Helicopter</sup>" in the "Input" ousupsub editor
