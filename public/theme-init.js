(function () {
  try {
    var theme = localStorage.getItem('sage-ai-playbook-theme');
    document.documentElement.dataset.theme = theme === 'light' ? 'light' : 'dark';
  } catch (error) {
    document.documentElement.dataset.theme = 'dark';
  }
}());
