Feature: user authentication

Scenario: register a new user
	When I create a new user with detail:
		| email		|	riana@mitrais.com	|
		| password	|	rianamahlia		|
	Then I should get new user created

Scenario Outline: login user
	Given a request data email address "<email>"
	And a request data password "<password>"
	When I login to "/users/login"
	Then I should be able to login

Examples:
	|	email				|	password	|
	|	riana@mitrais.com	|	rianamahlia	|
	|	ogek@gmail.com		|	ogekriana	|

