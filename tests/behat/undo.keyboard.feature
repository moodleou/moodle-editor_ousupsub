@ou @ouvle @editor @editor_ousupsub @_bug_phantomjs
Feature: ousupsub superscript undo and redo
  To undo a redo text changes in ousupsub, I need to use the undo and redo key combinations.

  @javascript
  Scenario: Verify Undo and redo by adding and formatting some text
    Given I log in as "admin"
    And I am on the integrated "both" editor test page
    # Set the initial text
    When I "enter" the text "Helicopter" in the "Input" ousupsub editor
    Then I should see "Helicopter" in the "Input" ousupsub editor
    And I select the text in the "Input" ousupsub editor

    # Apply superscript and subscript
    And I press the superscript key in the "Input" ousupsub editor
    And I press the subscript key in the "Input" ousupsub editor
    And I press the subscript key in the "Input" ousupsub editor
    And I should see "<sub>Helicopter</sub>" in the "Input" ousupsub editor

    # Verify undo key works
    And I press the undo key in the "Input" ousupsub editor
    And I should see "Helicopter" in the "Input" ousupsub editor

    And I press the undo key in the "Input" ousupsub editor
    And I should see "<sup>Helicopter</sup>" in the "Input" ousupsub editor

    # Verify redo key works
    And I press the redo key in the "Input" ousupsub editor
    And I should see "Helicopter" in the "Input" ousupsub editor

    And I press the redo key in the "Input" ousupsub editor
    And I should see "<sub>Helicopter</sub>" in the "Input" ousupsub editor

    # Pressing redo too much should not have an effect
    And I press the redo key in the "Input" ousupsub editor
    And I should see "<sub>Helicopter</sub>" in the "Input" ousupsub editor
