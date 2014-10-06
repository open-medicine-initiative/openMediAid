define ['components/home-page/home'], (homePage)->
  HomePageViewModel = homePage.viewModel;

  describe 'Home page view model', ->

    it  'should supply a friendly message which changes when acted upon', ->
      instance = new HomePageViewModel();
      expect(instance.message()).to.contain 'Welcome to '

      # See the message change
      instance.doSomething()
      expect(instance.message()) .to.contain 'You invoked doSomething()'
