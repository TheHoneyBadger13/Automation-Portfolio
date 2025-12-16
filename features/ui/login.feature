Feature: SauceDemo Login

 Scenario Outline: Successful login with valid credentials
  Given the user navigates to the SauceDemo login page
  Then the login page URL should be correct
  When the user logs in with username "<username>" and password "<password>"
  Then the user is redirected to the inventory page

  Examples:
  | username      | password     |
  | standard_user | secret_sauce |
  | problem_user  | secret_sauce |
  | visual_user   | secret_sauce |


 Scenario Outline: Successful login using standard user
  Given the user navigates to the SauceDemo login page
  Then the login page URL should be correct
  When the user logs in with username "<username>" and password "<password>"
  Then the user is redirected to the inventory page

  Examples:
  | username      | password     |
  | standard_user | secret_sauce |

#standard_user
#locked_out_user
#problem_user
#performance_glitch_user
#error_user
#visual_user