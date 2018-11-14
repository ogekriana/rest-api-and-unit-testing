Feature: user registration

Scenario: create new user
	Given a request data email address "paimin@gmail.com"
	And a request data password "test12345"
	When I make a POST request to "/users"
	Then I should get new user created

