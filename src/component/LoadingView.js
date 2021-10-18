
function LoadingView({$app,initialState}) {

  this.state = initialState
  this.$target = document.createElement('div');
  this.$target.className="Loading Modal";
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState
    this.render();
  }

  this.render = () => {
    this.$target.innerHTML = `<div class="content"><img src="../../assets/loading.gif"></div>`
    this.$target.style.display = this.state.isLoading ? 'block': 'none';
  }

  this.render();
}

export default LoadingView

